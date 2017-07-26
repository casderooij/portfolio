@extends('layouts.app')

@section('content')

    <div class="single-project-container">
        <div class="project-top">
            <h1 class="project-title">{{ $project->title }}</h1>
            @if(Auth::check())
                <a href="/cms/project/{{ $project->id }}" style="font-weight: bold; margin: 0 0 0 1rem;">Edit project</a>
            @endif
            <p class="project-meta">{{ Carbon\Carbon::parse($project->enddate)->format('jS \\of F Y') }} - {{ $project->meta["location"] }}</p>
        </div>

        <div class="project-content">

            <div class="project-content-left">
                @if(count($project->tags))
                <div class="project-tag-container">
                    <p class="tag-header">tags:</p>
                        @foreach($project->tags as $tag)
                            <a href="/tags/{{ $tag->id }}" class="project-tag">{{ $tag->name }}</a>
                        @endforeach
                </div>
                @endif
                @if($project->meta["collaboration"])
                    <div class="project-collaboration-container">
                        <p class="collaboration-header">collaboration:</p>
                        @foreach($project->meta["collaboration"] as $collaboration)
                            <a class="collaboration-name" href="{!! $collaboration['url'] !!}" target="_blank">{{ $collaboration['name'] }}</a>
                        @endforeach
                    </div>
                @endif
            </div>

            <div class="project-content-middle">
                @if($project->images)
                    <div class="project-main-image">
                        <img src="{{ asset('storage/' . $project->images[0]["image_file"]) }}">
                        @if($project->images[0]["image_description"])
                            <p class="project-main-image-description">{{ $project->images[0]["image_description"] }}</p>
                        @endif
                    </div>
                @endif

                <div class="project-description">
                    @for($i = 0; $i < count($project->description); $i++)
                        @if($i === 0)
                            <p class="project-first-description-paragraph">{!! $project->description[$i] !!}</p>
                        @else
                            <p class="project-description-paragraph">{!! $project->description[$i] !!}</p>
                        @endif
                    @endfor
                </div>

                @if(strlen($project->video_url) > 5)
                    <div class="project-video">
                        <div class="aspect-ratio">
                            <iframe src="https://player.vimeo.com/video/{{ $project->video_url }}" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
                        </div>
                    </div>
                @endif

                @if($project->images)
                    <div class="project-image">
                        @for($i = 1; $i < count($project->images); $i++)
                            <img src="{{ asset('storage/' . $project->images[$i]["image_file"]) }}">
                            @if($project->images[$i]["image_description"])
                                <p>{{ $project->images[$i]["image_description"] }}</p>
                            @endif
                        @endfor
                    </div>
                @endif
            </div>

            <div class="project-content-right">

            </div>

        </div>

        <div class="project-bottom">
            <div class="project-links-container">
                <a class="previous-link" href="/project/{{ $previous }}">previous<br>project</a>
                <p class="filler"></p>
                <a class="next-link" href="/project/{{ $next }}">next<br>project</a>
            </div>
        </div>

    </div>

@endsection
