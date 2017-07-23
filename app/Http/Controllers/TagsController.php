<?php

namespace App\Http\Controllers;

use App\Tag;
use Illuminate\Http\Request;

class TagsController extends Controller
{
    public function index($tag) {
        return Tag::find($tag)->projects;
    }

    public function allTags() {
        return Tag::orderBy('name', 'asc')->get();
    }
}
