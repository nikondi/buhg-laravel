<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::rename('history', 'comments');
        Schema::table('comments', function (Blueprint $table) {
            $table->renameColumn('comment', 'text');
        });
    }

    public function down(): void
    {
        Schema::rename('comments', 'history');
        Schema::table('history', function (Blueprint $table) {
            $table->renameColumn('text', 'comment');
        });
    }
};
