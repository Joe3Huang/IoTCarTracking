<?php

namespace App;

use Illuminate\Auth\Authenticatable;
use Illuminate\Foundation\Auth\Access\Authorizable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Contracts\Auth\Access\Authorizable as AuthorizableContract;
use Illuminate\Database\Eloquent\SoftDeletes;
use Laravel\Passport\HasApiTokens;

class User extends Model implements AuthenticatableContract, AuthorizableContract
{
    use HasApiTokens, Authenticatable, Authorizable;

    const ADMIN_ROLE = 'ADMIN_USER';
    const BASIC_ROLE = 'BASIC_USER';
    /**
     * The attributes that are mass assignable.
     *
     * @var array

     */

    protected $table='users';

    protected $fillable = [
        'id',
        'uid',
        'first_name',
        'last_name',
        'email',
        'password',
        'city',
        'status',
        'username',
        'role',
        'isActive'
    ];

   // protected $primarykey = 'uid';

    // public $incrementing = false;
    /*
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = [
        'password',
    ];

    /**
     * @return bool
     */
    public function isAdmin()
    {
        return (isset($this->role) ? $this->role : self::BASIC_ROLE) == self::ADMIN_ROLE;
    }

    // public function getIdAttribute()
    // {
    //     return $this->uid();
    // }

    // public function findForPassport($username) {
    //     return $this->where('uid', $username)->first();
    // }
    // public function findForPassport($username) {
    //     return $this->where('id', $username)->first();
    // }
    // public function find($id)
    // {
    //         // if (!Passport::$useClientUUIDs) {
    //         //     return Client::find($id);
    //         // } else {
    //              return Client::where('uid', $id)->firstOrFail();
    //         //}
    // }
}
