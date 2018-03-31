<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class UpdateTableUser extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('uid', 36)->unique();
            $table->string('first_name', '100')->nullable()->change();
            $table->string('last_name', '100')->nullable()->change();
            $table->string('username', '50')->nullable();
            $table->enum('role', array('BASIC_USER', 'ADMIN_USER'))->default('BASIC_USER');
            $table->tinyInteger('isActive');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {

    }
}
