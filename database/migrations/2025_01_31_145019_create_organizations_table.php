<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('organizations', function (Blueprint $table) {
            $table->id();
            $table->string('name', 63);
            $table->string('inn', 12);
            $table->string('kpp', 12);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('organizations');
    }
};
