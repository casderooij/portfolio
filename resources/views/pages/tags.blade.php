@extends('layouts.app')

@section('content')
    <timeline-slider></timeline-slider>

    <div class="tags-container">
        <p class="tag-toggle">Filter</p>
        <a href="/">all</a>
        @foreach($tags as $tag)
            @if($tag->id == $tag_id)
                <a href="/tags/{{ $tag->id }}" style="color: #353535;font-weight:bold;">{{ $tag->name }}</a>
            @else
                <a href="/tags/{{ $tag->id }}">{{ $tag->name }}</a>
            @endif
        @endforeach
    </div>
    <div class="timeline-container">

        <project-block source="/api/projects/tags/{{ $tag_id }}"></project-block>
        <timelines></timelines>

    </div>
@endsection
