<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class About extends Model
{
    protected $table = 'about';

    protected $fillable = [
        'name',
        'text',
        'photo',
        'social',
        'email',
    ];

    protected $casts = [
        'text' => 'array',
        'social' => 'array',
    ];
}
