<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/projects', 'ProjectController@getAllProjects');
Route::get('/projects/{id}', 'ProjectController@project');

Route::get('/projects/tags/{id}', 'TagsController@index');

Route::get('/images', 'imagesController@allImages');

Route::get('/tags', 'TagsController@allTags');

Route::get('/about', 'AboutController@aboutShow');
