@extends('layouts.app')

@section('content')
    <timeline-slider></timeline-slider>
    
    <div class="tags-container">
        <p class="tag-toggle" onclick="toggleFilter()">Filter</p>
        <div id="all-tags-container" class="all-tags-container">
            <a class="tag-all-tags" href="/">all</a>
            @foreach($tags as $tag)
                <a href="/tags/{{ $tag->id }}">{{ $tag->name }}</a>
            @endforeach
        </div>
    </div>

    <div class="timeline-container">

        <project-block source="/api/projects"></project-block>
        <timelines></timelines>

    </div>
@endsection

<script type="text/javascript">
    function toggleFilter() {
        const tagcontainer = document.getElementById('all-tags-container');
        if (tagcontainer.style.display === 'block') {
            tagcontainer.style.display = 'none';
        } else {
            tagcontainer.style.display = 'block';
        }
    }
</script>
