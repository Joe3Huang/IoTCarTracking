<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateRegisterUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('register_users', function (Blueprint $table) {
            $table->string('uid', 36)->unique();
            $table->string('first_name')->nullable();
            $table->string('last_name')->nullable();
            $table->string('email', '100');
            $table->string('password', '100');
            $table->string('city', '50')->nullable();
            $table->timestamps();
        });
    }

/**
 * Reverse the migrations.
 *
 * @return void
 */
public function down()
{
    //
    Schema::drop('register_users');
}
}
