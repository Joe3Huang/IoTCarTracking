<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class RegisterUser extends Model
{
    protected $table='register_users';
    // public $timestamps = false;
    protected $primaryKey = 'uid';
    public $incrementing = false;

    protected $fillable = [
        'uid',
        'first_name',
        'last_name',
        'email',
        'password',
        'city'
    ];

    // protected $hidden = [
    //     'password',
    // ];

}



