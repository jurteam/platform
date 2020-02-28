<?php

namespace App\Models;

use App\Models\Traits\WalletTrait;
use Illuminate\Auth\Authenticatable;
use Laravel\Lumen\Auth\Authorizable;
use Illuminate\Database\Eloquent\Model;
use Tymon\JWTAuth\Contracts\JWTSubject;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Contracts\Auth\Access\Authorizable as AuthorizableContract;

class User extends Model implements AuthenticatableContract, AuthorizableContract, JWTSubject
{
    use Authenticatable, Authorizable, WalletTrait;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'email',
        'wallet',
        'birth_date',
        'gender',
        'location',
        'category',
        'show_fullname',
        'accepted_terms',
        'accepted_disclaimer'
    ];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = [
        'password',
    ];

    protected $casts = [
        'show_fullname' => 'boolean'
    ];

    public function scopeByEmail($query)
    {
        return $query->whereNotNull('email');
    }

    public function scopeExceptFromContracts($query, $collection)
    {
        return $query->byEmail()->whereNotIn('wallet', $collection->toArray());
    }

    // Rest omitted for brevity

    /**
     * Get the identifier that will be stored in the subject claim of the JWT.
     *
     * @return mixed
     */
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    /**
     * Return a key value array, containing any custom claims to be added to the JWT.
     *
     * @return array
     */
    public function getJWTCustomClaims()
    {
        return [];
    }

    public function contracts()
    {
        return $this->hasMany(Contract::class);
    }
}
