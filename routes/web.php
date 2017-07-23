<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Auth::routes();

// CMS routes
Route::get('/cms', 'CmsController@index');
Route::get('/cms/tags/{id}', 'CmsController@tagEdit');
Route::post('/cms/tags/{id}', 'CmsController@tagNew');
Route::post('/cms/tags/{id}/edit', 'CmsController@tagPatch');
Route::delete('/cms/tags/{id}', 'CmsController@tagDestroy');

Route::get('/cms/newproject', 'CmsController@projectNew');
Route::post('/cms/project/new', 'CmsController@projectStore');

Route::get('/cms/project/{id}', 'CmsController@projectEdit');
Route::post('/cms/project/{id}', 'CmsController@projectPatch');
Route::post('/cms/project/{id}/remove', 'CmsController@projectDestroy');

Route::post('/cms/imageupload', 'CmsController@imageUpload');
Route::get('/cms/image/{id}', 'CmsController@getImage');
Route::post('/cms/image/{id}/remove', 'CmsController@removeImage');

Route::post('/cms/removetag/{id}', 'CmsController@removeTag');
Route::post('/cms/addtag/{id}', 'CmsController@addTag');

Route::get('/cms/about', 'CmsController@editAbout');
Route::post('/cms/about', 'CmsController@storeAbout');

// Common pages
Route::get('/', 'PageController@index');
Route::get('/project/{id}', 'PageController@project');

Route::get('/tags/{id}', 'PageController@tag');

Route::get('/home', 'HomeController@index')->name('home');

Route::get('/about', 'AboutController@index');
