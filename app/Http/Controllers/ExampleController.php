<?php
// created by 'php artisan make:controller ExampleController --resource --model=Example'
namespace App\Http\Controllers;

use App\Models\Example;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Trait\HandleImage;
use App\Trait\Decryptor;

class ExampleController extends Controller
{
    use HandleImage, Decryptor;

    protected $uploadPath = 'uploads/example';
    protected $defaultImage = 'default/profile.png';

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        // get search input
        $search = $request->input('search');

        // pagination
        $examples = Example::when($search, function ($query, $search) {
            return $query->where('name', 'LIKE', "%{$search}%");
            // ->orWhere('more', 'LIKE', "%{$search}%");
        })->orderBy('created_at', 'desc')
            ->paginate(10);

        // hold the search result
        $examples->appends(['search' => $search]);

        return Inertia::render("Example/Index", [
            'examples' => $examples,
            'search' => $search,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render("Example/Create");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name'   => 'required',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048'
        ]);

        $input = $request->all();
        $input['image'] = $this->uploadImage($request->file('image'));

        Example::create($input);

        return redirect()->route('example.index')->with('message', 'Data Added!');
    }

    /**
     * Display the specified resource.
     */
    // public function show(Example $example)
    public function show($id)
    {
        $example = $this->decryptId(Example::class, $id);

        return Inertia::render("Example/Show", [
            'example' => $example
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $example = $this->decryptId(Example::class, $id);

        return Inertia::render("Example/Edit", [
            'example' => $example,
            // just for redirect purposes
            'referer' =>  request()->header('referer'),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $example = $this->decryptId(Example::class, $id);

        $request->validate([
            'name'   => 'required',
        ]);

        $input = $request->all();

        if ($image = $request->file('image')) {
            $input['image'] = $this->uploadImage($image);
            $this->deleteImage($example->getRawOriginal('image'));
        } else {
            unset($input['image']);
        }

        $example->update($input);

        return !is_null($request->referer)
            ? redirect($request->referer)->with('message', 'Data Updated!')
            : redirect()->route('example.index')->with('message', 'Data Updated!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $example = $this->decryptId(Example::class, $id);
        
        $this->deleteImage($example->getRawOriginal('image'));
        $example->delete();
        return redirect(request()->header('referer'))->with('message', 'Data Deleted!');
    }
}
