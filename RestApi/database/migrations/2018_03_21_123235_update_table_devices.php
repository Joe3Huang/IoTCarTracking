<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class UpdateTableDevices extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('devices', function (Blueprint $table) {
            //$table->dropColumn('device_type');
           // $table->enum('device_type', array('mobile_gps', 'browser_admin'))->default('mobile_gps');
            $table->string('random_link_ucode', 36)->nullable();
            $table->bigIncrements('device_code')->length(6);
            $table->enum('status', array('CONNECTED', 'UNCONNECTED'))->default('UNCONNECTED');
            $table->timestamp('expires_date');
            $table->dropColumn('isActive');

        });

        DB::statement("ALTER TABLE devices CHANGE COLUMN device_type device_type ENUM('MOBILE_GPS', 'BROWSER_ADMIN')");
        $startId = 100000;
        DB::table('devices')->insert(['device_code'=> $startId - 1]);
        DB::table('devices')->where('device_code',$startId - 1)->delete();
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('devices', function (Blueprint $table) {
           // $table->dropColumn('device_type');
            //$table->enum('device_type', array('mobile_gps', 'admin'))->default('mobile_gps');
            $table->dropColumn('random_link_ucode');
            $table->dropColumn('device_code');
            $table->dropColumn('status');
            $table->dropColumn('expires_date');  
            $table->tinyInteger('isActive');      
        });

    }
}
