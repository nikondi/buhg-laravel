<?php

use App\Models\RequestModel;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::table('requests', function (Blueprint $table) {
            $table->json('files')->nullable()->after('file');
        });
        RequestModel::all()->each(function ($model) {
            $model->update(['files' => $model->file]);
        });
        Schema::table('requests', function (Blueprint $table) {
            $table->dropColumn('file');
        });
    }

    public function down(): void
    {
        Schema::table('requests', function (Blueprint $table) {

        });
    }
};
