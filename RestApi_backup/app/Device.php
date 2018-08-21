<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Device extends Model
{

    const MOBILE_GPS = 'MOBLIE_GPS';
    const BROWSER_ADMIN = 'BROWSER_ADMIN';
    /**
     * The attributes that are mass assignable.
     *
     * @var array

     */
    protected $table='devices';

    protected $primaryKey = 'uid';
    
    public $incrementing = false;

    protected $fillable = [
        'uid',
        'device_type',
        'name',
        'owner_uid',
        'isExpired',
        'random_link_ucode',
        'device_code',
        'status',
        'expires_date'
    ];

   

}
