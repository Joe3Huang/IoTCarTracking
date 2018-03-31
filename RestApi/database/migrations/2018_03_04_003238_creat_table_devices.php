<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatTableDevices extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('devices', function (Blueprint $table) {
            $table->string('uid', 36)->unique();
            $table->enum('device_type', array('MOBILE_GPS', 'ADMIN'))->default('MOBILE_GPS');
            $table->string('name', '100')->nullable();
            $table->string('owner_uid', 36);
            $table->tinyInteger('isActive');
            $table->tinyInteger('isExpired');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
       Schema::drop('devices');
    }
}
