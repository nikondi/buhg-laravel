<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('history', function (Blueprint $table) {
            $table->id();
            // Which table are we tracking
            $table->morphs('reference');
            $table->foreignId('user_id')
                ->nullable()
                ->constrained()
                ->references('id')
                ->on('users')
                ->nullOnDelete()
                ->cascadeOnUpdate();
            $table->json('old_body');
            $table->json('body');
            $table->text('comment')->nullable();

            $table->boolean('sended')->default(false);

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('history');
    }
};
