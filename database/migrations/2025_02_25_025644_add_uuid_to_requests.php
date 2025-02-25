<?php

use App\Models\RequestModel;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::table('requests', function (Blueprint $table) {
            $table->uuid()->nullable();
        });
        RequestModel::all()->each(function (RequestModel $model) {
            $model->update(['uuid' => Str::uuid()->toString()]);
        });
        Schema::table('requests', function (Blueprint $table) {
            $table->uuid()
                ->after('id')
                ->index()
                ->nullable(false)
                ->change();
        });
    }

    public function down(): void
    {
        Schema::table('requests', function (Blueprint $table) {
            $table->dropIndex(['uuid']);
            $table->dropColumn('uuid');
        });
    }
};
