@extends('layouts.app')

@section('content')

    <div class="image-container">
        <h2 class="image-title">{{ $image->name }}</h2>
        <img src="{{ asset('storage/' . $image->name) }}">
        <form class="image-remove" action="/cms/image/{{ $image->id }}/remove" method="post">
            {{ csrf_field() }}
            <button type="submit" name="remove image">Remove image</button>
        </form>
    </div>

@endsection
