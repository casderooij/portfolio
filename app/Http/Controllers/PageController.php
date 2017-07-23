<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Project;
use App\Tag;

class PageController extends Controller
{
    public function index() {
        $tags = Tag::orderBy('name', 'asc')->get();
        return view('pages.index', ['tags' => $tags]);
    }

    public function project($id) {
        $project = Project::where('id', $id)->with('tags')->get();
        $previous = Project::where('id', '<', $id)->max('id');
        $next = Project::where('id', '>', $id)->min('id');

        if(!$previous) {
            $previous = Project::all()->last()->id;
        }

        if(!$next) {
            $next = Project::all()->first()->id;
        }

        return view('pages.project', ['project' => $project[0], 'previous' => $previous, 'next' => $next]);
    }

    public function tag($id) {
        $tags = Tag::orderBy('name', 'asc')->get();
        return view('pages.tags', ['tag_id' => $id, 'tags' => $tags]);
    }
}
