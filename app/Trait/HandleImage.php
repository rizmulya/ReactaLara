<?php // php artisan make:trait HandleImage

namespace App\Trait;

use Illuminate\Support\Str;

trait HandleImage
{
    // protected $uploadPath;
    // protected $defaultImage;

    // $image => $request->file()
    public function uploadImage($image)
    {
        if ($image) {
            $fileName = date('Ymd') . "-" . Str::random(16) . "." . $image->getClientOriginalExtension();
            $image->move(public_path($this->uploadPath), $fileName);
            return $fileName;
        }
        return $this->defaultImage;
    }

    // $imageName => $example->getRawOriginal()
    public function deleteImage($imageName)
    {
        if ($imageName !== $this->defaultImage) {
            $filePath = public_path($this->uploadPath . '/' . $imageName);
            if (is_file($filePath))
                unlink($filePath);
        }
    }
}
