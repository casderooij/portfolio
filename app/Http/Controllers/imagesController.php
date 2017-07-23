<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Image;

class imagesController extends Controller
{
    public function allImages() {
        return Image::all();
    }
}
