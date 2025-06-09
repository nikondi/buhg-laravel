<?php

namespace App\Models;

use App\Enums\DocumentType;
use App\Enums\EducationType;
use App\Enums\PickupType;
use App\Enums\RequestStatus;
use App\Interfaces\HasHistoryInterface;
use App\Observers\RequestObserver;
use App\Traits\HasHistory;
use App\Traits\HighlightSearch;
use Illuminate\Database\Eloquent\Attributes\ObservedBy;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Laravel\Scout\Searchable;

#[ObservedBy(RequestObserver::class)]
class RequestModel extends Model implements HasHistoryInterface
{
    use Searchable,
        HighlightSearch,
        HasHistory,
        HasFactory;

    protected $table = 'requests';

    public function director(): BelongsTo
    {
        return $this->belongsTo(Director::class);
    }

    public function organization(): BelongsTo
    {
        return $this->belongsTo(Organization::class);
    }

    public function comments(): HasMany
    {
        return $this->hasMany(Comment::class, 'request_id');
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

    public function scopeOrdered(Builder $query): Builder
    {
        return $query
            ->orderByRaw("(case status
              when 'new' then 1
              when 'in_work' then 2
              when 'ready_pickup' then 3
              when 'duplicate' then 4
              when 'downloaded_xml' then 5
              when 'done' then 6
              when 'declined' then 7
              ELSE 8
              end)")
            ->orderBy('created_at');
    }

    public function scopeFiltered(Builder $query, Request $request): Builder
    {
        if($request->has('status'))
            $query->where('status', $request->get('status'));
        if($request->has('year'))
            $query->where('report_year', $request->get('year'));

        return $query;
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

    public function toSearchableArray(): array
    {
        return [
            'id' => (string)$this->id,
            'inn' => (string)$this->inn,
            'surname' => $this->surname,
            'name' => $this->name,
            'student_name' => (string)$this->student_name,
            'student_surname' => (string)$this->student_surname,
            'report_year' => $this->report_year,
            'email' => $this->email,
            'phone' => $this->phone,
            'status' => $this->status->value,
            'created_at' => $this->created_at->timestamp
        ];
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
