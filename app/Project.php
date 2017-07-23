<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    protected $fillable = [
        'title',
        'description',
        'meta',
        'images',
        'video_url',
        'startdate',
        'enddate',
        'year',
        'days',
        'block_position',
    ];

    protected $casts = [
        'description' => 'array',
        'meta' => 'array',
        'images' => 'array',
        'year' => 'array',
        'block_position' => 'array',
    ];

    public function tags() {
        return $this->belongsToMany(Tag::class);
    }
}
