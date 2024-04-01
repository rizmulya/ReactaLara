<?php
// created by 'php artisan make:controller ExampleController --resource --model=Example'
namespace App\Http\Controllers;

use App\Models\Example;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ExampleController extends Controller
{
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
        })->paginate(10);
        
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
        ]);

        Example::create([
            'name' => $request->name,
        ]);

        return redirect()->route('example.index')->with('message', 'Data Added!');
    }

    /**
     * Display the specified resource.
     */
    public function show(Example $example)
    {
        return Inertia::render("Example/Show", [
            'example' => $example
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Example $example)
    {
        return Inertia::render("Example/Edit", [
            'example' => $example,
            // just for redirect purposes
            'referer' =>  request()->header('referer'),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Example $example)
    {
        $request->validate([
            'name'   => 'required',
        ]);

        $example->update([
            'name' => $request->name,
        ]);

        if (!is_null($request->referer))
            return redirect($request->referer)->with('message', 'Data Updated!');
        return redirect()->route('example.index')->with('message', 'Data Updated!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Example $example)
    {
        $example->delete();
        return redirect(request()->header('referer'))->with('message', 'Data Deleted!');
    }
}
