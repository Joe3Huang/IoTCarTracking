<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserDeviceLink extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array

     */
    protected $table='user_device_link';

    protected $primaryKey = 'uid';
    
    public $incrementing = false;

    protected $fillable = [
        'uid',
        'user_id',
        'device_id'
    ];

   

}
