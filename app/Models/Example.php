<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute; // n

class Example extends Model
{
    use HasFactory;

    protected $fillable = [
        'name', 'image'
    ];

    // get full frontend image url
    protected function image(): Attribute
    {
        return Attribute::make(
            get: fn ($value) => $value ? (str_starts_with($value, 'default/') ? asset("assets/" . $value) : url('uploads/example/' . $value))
                : null,
        );
    }
}
