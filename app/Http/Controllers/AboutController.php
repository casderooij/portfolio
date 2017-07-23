<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\About;

class AboutController extends Controller
{
    public function aboutShow() {
        $about = About::first();
        return $about->toArray();
    }

    public function index() {
        $about = About::all();
        return view('pages.about', ['about' => $about[0]]);
    }
}
