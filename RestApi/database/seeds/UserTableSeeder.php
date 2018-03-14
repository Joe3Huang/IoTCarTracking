<?php

use Illuminate\Database\Seeder;

class UserTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
       // 
    	//$this->call(UserTableSeeder::class);
        factory(App\User::class, 5)->create();
    }
}
