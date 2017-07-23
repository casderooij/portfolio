<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Carbon\Carbon;
use App\Tag;
use App\Project;
use App\Image;
use App\About;

class CmsController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function index() {
        $tags = Tag::orderBy('name', 'asc')->get();
        return view('pages.cms.index', ['tags' => $tags]);
    }

    public function tagNew(Request $request) {
        $tag = new Tag;
        $tag->name = $request->tagname;
        $tag->save();
        return redirect('/cms');
    }

    public function tagEdit($id) {
        $tag = Tag::findOrFail($id);
        return view('pages.cms.tag', ['tag' => $tag]);
    }

    public function tagPatch(Request $request, $id) {
        $tag = Tag::find($id);
        $tag->name = $request->tagname;
        $tag->update();
        return redirect('/cms');
    }

    public function tagDestroy($id) {
        $tag = Tag::find($id);
        $tag->delete();
        return redirect('/cms');
    }

    public function projectEdit($id) {
        $project = Project::findOrFail($id);
        return view('pages.cms.project', ['project' => $project]);
    }

    public function projectPatch(Request $request, $id) {
        $project = Project::find($id);
        $project->title = $request->project['title'];
        $project->description = $request->project['description'];
        $project->meta = $request->project['meta'];
        $project->images = $request->project['images'];
        $project->video_url = $request->project['video_url'];
        $project->startdate = $request->project['startdate'];
        $project->enddate = $request->project['enddate'];

        $sdate = new Carbon($request->project['startdate']);
        $edate = new Carbon($request->project['enddate']);
        $days = $sdate->diffInDays($edate);

        $project->days = $days;

        $project->block_position = $request->project['block_position'];

        $project->update();
    }

    public function projectDestroy(Request $request, $id) {
        $project = Project::find($id);
        if($request->removeproject == true) {
            $project->delete();
        }
    }

    public function imageUpload(Request $request) {
        $exploded = explode(',', $request->image);
        $decoded = base64_decode($exploded[1]);
        $filename = $request->name;

        Storage::put('public/' . $filename, $decoded);

        $image = new Image;
        $image->name = $filename;
        $image->save();
    }

    public function getImage($id) {
        $image = Image::find($id);
        return view('pages.cms.image', ['image' => $image]);
    }

    public function removeImage($id) {
        $image = Image::find($id);

        Storage::delete('public/' . $image->name);

        $image->delete();

        return redirect('/cms');
    }

    public function removeTag(Request $request, $id) {
        $tag = $request->tag;
        $project = Project::find($id);

        $project->tags()->detach($tag);
    }

    public function addTag(Request $request, $id) {
        $tags = $request->tags;
        $project = Project::find($id);

        for($i = 0; $i < count($tags); $i++) {
            $project->tags()->attach($tags[$i]);
        }
    }

    public function projectNew() {
        return view('pages.cms.newproject');
    }

    public function projectStore(Request $request) {
        $project = new Project;

        $project->title = $request->title;
        $project->description = $request->description;
        $project->meta = $request->meta;
        $project->images = $request->images;
        $project->video_url = $request->video_url;
        $project->startdate = $request->startdate;
        $project->enddate = $request->enddate;

        $sdate = new Carbon($request->startdate);
        $edate = new Carbon($request->enddate);
        $project->days = $sdate->diffInDays($edate);
        $project->year = $edate->year;

        $project->block_position = $request->block_position;

        $project->save();
    }

    public function editAbout() {
        $about = About::all();
        return view('pages.cms.about', ['about' => $about[0]]);
    }

    public function storeAbout(Request $request) {
        $about = About::all()->first();

        $about->name = $request->about['name'];
        $about->photo = $request->about['photo'];
        $about->text = $request->about['text'];
        $about->social = $request->about['social'];
        $about->email = $request->about['email'];

        $about->update();
    }
}
