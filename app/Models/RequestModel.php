<?php

namespace App\Models;

use App\Enums\DocumentType;
use App\Enums\EducationType;
use App\Enums\PickupType;
use App\Enums\RequestStatus;
use App\Observers\RequestObserver;
use Illuminate\Database\Eloquent\Attributes\ObservedBy;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

#[ObservedBy(RequestObserver::class)]
class RequestModel extends Model
{
    protected $table = 'requests';

    public function director(): BelongsTo
    {
        return $this->belongsTo(Director::class);
    }

    public function organization(): BelongsTo
    {
        return $this->belongsTo(Organization::class);
    }

    public function history(): HasMany
    {
        return $this->hasMany(History::class, 'request_id');
    }

    public function getFileUrls(): array
    {
        return !empty($this->files)?array_map(fn($file, $key) => [
            'url' => Storage::disk('requests')->url($this->id.'/'.$file),
            'label' => basename($file),
            'key' => $key
        ], $this->files, array_keys($this->files)):[];
    }

    protected function casts(): array
    {
        return [
            'education_type' => EducationType::class,
            'pickup_type' => PickupType::class,
            'status' => RequestStatus::class,
            'same_student' => 'boolean',
            'student_birthdate' => 'date',
            'birthdate' => 'date',
            'doc_date' => 'date',
            'student_doc_date' => 'date',
            'contract_date' => 'date',
            'doc_type' => DocumentType::class,
            'student_doc_type' => DocumentType::class,
            'files' => 'array',
        ];
    }

    protected static function boot(): void
    {
        static::creating(function (RequestModel $model) {
            if (!$model->uuid) {
                $model->uuid = Str::uuid()->toString();
            }
        });

        static::deleted(function (RequestModel $model) {
            Storage::disk('requests')->deleteDirectory($model->id);
        });

        parent::boot();
    }

    protected $fillable = [
        'id', 'uuid',
        'number',

        'director_id',
        'organization_id',

        'status',
        'education_type',
        'pickup_type',

        'surname',
        'name',
        'lastname',

        'phone',
        'email',

        'birthdate',
        'inn',
        'doc_type',
        'doc_number',
        'doc_date',
        'contract_number',
        'contract_date',
        'contract_cost',
        'report_year',

        'same_student',

        'student_surname',
        'student_name',
        'student_lastname',
        'student_phone',
        'student_inn',
        'student_birthdate',
        'student_doc_type',
        'student_doc_number',
        'student_doc_date',

        'changes_count',
        'files'
    ];
}
