<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class PasswordReset extends Model
{
    protected $table='password_resets';
    public $timestamps = false;
    // protected $primaryKey = 'token';
    // public $incrementing = false;

    protected $fillable = [
        'email',
        'token',
        'created_at'
    ];

    public function setCreatedAtAttribute($value) { 
        $this->attributes['created_at'] = \Carbon\Carbon::now(); 
    }

}



