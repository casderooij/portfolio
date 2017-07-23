@extends('layouts.app')

@section('content')
    <div class="cms-new-project">
        <a href="/cms/newproject"><h2>New Project</h2></a>
    </div>
    <div class="cms-logout">
        <a href="{{ route('logout') }}"
            onclick="event.preventDefault();
                     document.getElementById('logout-form').submit();">
            Logout
        </a>

        <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
            {{ csrf_field() }}
        </form>
    </div>

    <div class="cms-tags-container">
        <p>Create, Update or delete tags:</p>
        @foreach($tags as $tag)
            <div class="tag">
                <a href="/cms/tags/{{ $tag->id }}"> - {{ $tag->name }}</a><br>
            </div>
        @endforeach

        <form class="cms-new-tag-form" action="/cms/tags/{{ $tag->id }}" method="POST">
            {{ csrf_field() }}

            <label for="tagname">New tag:</label>
            <input type="text" name="tagname">

            <button type="submit" name="button">
                Submit new tag
            </button>
        </form>
    </div>

    <div class="timeline-container">

        <project-block source="/api/projects"></project-block>
        <timelines></timelines>

    </div>
@endsection
