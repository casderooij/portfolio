@extends('layouts.app')

@section('content')
    <div class="cms-single-tag-container">
        <h2>{{ $tag->name }}</h2>

        <form class="cms-single-tag-form" action="/cms/tags/{{ $tag->id }}/edit" method="POST">
            {{ csrf_field() }}

            <label for="tagname">Type new name:</label>
            <input type="text" name="tagname" value="{{ $tag->name }}">

            <button type="submit" name="button">
                Submit change
            </button>
        </form>

        <form class="cms-single-tag-delete-form" action="/cms/tags/{{ $tag->id }}" method="POST">
            {{ method_field('DELETE') }}
            {{ csrf_field() }}

            <button type="submit" name="button">
                Delete tag
            </button>
        </form>

    </div>
@endsection
