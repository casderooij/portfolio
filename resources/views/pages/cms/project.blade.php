@extends('layouts.app')

@section('content')

    <project-edit-form source="/api/projects/{{ $project->id }}" projectid="{{ $project->id }}"></project-edit-form>

@endsection
