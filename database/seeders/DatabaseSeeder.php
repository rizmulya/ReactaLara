<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Example;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash; //n

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Admin',
            'email' => 'admin@mail.com',
            'role' => 'admin',
            'password' => Hash::make('admin'),
        ]);
        User::factory()->create([
            'name' => 'User',
            'email' => 'user@mail.com',
            'role' => 'user',
            'password' => Hash::make('user'),
        ]);

        Example::factory(37)->create();
    }
}
