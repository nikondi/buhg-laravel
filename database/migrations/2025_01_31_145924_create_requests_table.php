<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('requests', function (Blueprint $table) {
            $table->id();
            $table->uuid()->index();

            $table->char('number', 12)
                ->nullable()
                ->unique();

            $table->foreignId('director_id')
                ->nullable()
                ->constrained()
                ->nullOnDelete()
                ->cascadeOnUpdate();
            $table->foreignId('organization_id')
                ->nullable()
                ->constrained()
                ->nullOnDelete()
                ->cascadeOnUpdate();

            $table->string('status', 15)
                ->default('new');
            $table->string('education_type');
            $table->string('pickup_type');

            $table->tinyInteger('changes_count')
                ->unsigned()
                ->default(0);

            $table->string('surname', 31);
            $table->string('name', 31);
            $table->string('lastname', 31)->nullable();

            $table->char('phone', 10);
            $table->string('email', 31);
            $table->date('birthdate');
            $table->string('inn', 12);

            $table->tinyInteger('doc_type');
            $table->string('doc_number', 31);
            $table->string('doc_date');

            $table->string('contract_number', 20);
            $table->string('contract_date');
            $table->float('contract_cost');
            $table->string('report_year');

            $table->boolean('same_student');

            $table->string('student_surname', 31)->nullable();
            $table->string('student_name', 31)->nullable();
            $table->string('student_lastname', 31)->nullable();
            $table->char('student_phone', 10)->nullable();
            $table->date('student_birthdate')->nullable();
            $table->string('student_inn', 12)->nullable();
            $table->tinyInteger('student_doc_type')->nullable();
            $table->string('student_doc_number', 31)->nullable();
            $table->string('student_doc_date')->nullable();

            $table->json('files')->nullable();

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('requests');
    }
};
