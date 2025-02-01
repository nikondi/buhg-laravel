<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class RequestModel extends Model
{
    public $timestamps = false;
    protected $table = 'requests';

    public function director(): BelongsTo
    {
        return $this->belongsTo(Director::class);
    }

    public function organization(): BelongsTo
    {
        return $this->belongsTo(Organization::class);
    }

    protected function casts(): array
    {
        return [
            'same_student' => 'boolean',
            'student_birthdate' => 'date',
            'birthdate' => 'date',
            'contract_date' => 'date',
        ];
    }
    protected $fillable = [
        'director_id',
        'organization_id',

        'status',
        'education_type',
        'pickup_type',
        'surname',
        'name',
        'lastname',
        'phone',
        'birthdate',
        'inn',
        'doc_type',
        'doc_number',
        'doc_date',
        'contract_number',
        'contract_date',
        'contract_cost',
        'contract_year',

        'same_student',

        'student_surname',
        'student_name',
        'student_lastname',
        'student_phone',
        'student_birthdate',
        'student_doc_type',
        'student_doc_number',
        'student_doc_date',
    ];
}
