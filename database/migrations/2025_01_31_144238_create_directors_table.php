<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('directors', function (Blueprint $table) {
            $table->id();
            $table->tinyInteger('type');
            $table->string('name', 31);
            $table->string('surname', 31);
            $table->string('lastname', 31)->nullable();
            $table->string('document', 31);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('directors');
    }
};
