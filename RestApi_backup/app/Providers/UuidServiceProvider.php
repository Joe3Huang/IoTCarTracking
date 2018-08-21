<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Library\Services\UuidService;

class UuidServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->bind('App\Library\Services\UuidInterface', function ($app) {
            return new UuidService();
          });
    }
}
