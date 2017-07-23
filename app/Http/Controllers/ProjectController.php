<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Project;

class ProjectController extends Controller
{
    public function project($id) {
        // return Project::findOrFail($id);
        return Project::where('id', $id)->with('tags')->get();
    }

    public function getAllProjects() {
        return Project::with('tags')->get();
    }
}
