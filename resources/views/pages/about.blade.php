@extends('layouts.app')

@section('content')
    <div class="about-container">
        <h2>{{ $about->name }}</h2>
        <div class="about-image">
            <img src="{{ asset('storage/' . $about->photo) }}">
        </div>
        <div class="about-text">
            @for($i = 0; $i < count($about->text); $i++)
                <p>{{ $about->text[$i] }}</p>
            @endfor
        </div>
        <div class="about-bottom-container">
            <div class="about-email">
                <a href="mailto:{{ $about->email }}">{{ $about->email }}</a>
            </div>
            <div class="about-social">
                @foreach($about->social as $social)
                    <a href="{{ $social['url'] }}" target="_blank">{{ $social['socialmedia'] }}</a>
                @endforeach
            </div>
        </div>
    </div>
@endsection
