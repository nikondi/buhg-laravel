<?php

namespace App\Mail;

use App\Helpers\RequestFormatter;
use App\Models\RequestModel;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Attachment;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class RequestChangedMail extends Mailable
{
    use Queueable, SerializesModels;

    protected array $dirty;

    /**
     * Create a new message instance.
     */
    public function __construct(
        public RequestModel $request,
        public ?string $comment,
    )
    {
        $this->prepareDirty();
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Уведомление о заявке #'.($this->request->getOriginal('number') ?? $this->request->number),
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'mail.request.changed',
            text: 'mail.request.changed-text',
            with: [
                'request' => $this->request,
                'comment' => $this->comment,
                'dirty' => $this->dirty
            ]
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, Attachment>
     */
    public function attachments(): array
    {
        return [];
    }

    protected function prepareDirty(): void
    {
        $dirty = $this->request->getDirty();
        foreach (RequestFormatter::exceptFields() as $key) {
            unset($dirty[$key]);
        }

        $this->dirty = array_map(function ($key, $value) {
            return [
                'value' => RequestFormatter::formatValue($key, $value),
                'old_value' => RequestFormatter::formatValue($key, $this->request->getOriginal($key)),
                'label' => $this->getLabel($key),
            ];
        }, array_keys($dirty), $dirty);
    }



    protected function getLabel($key): string
    {
        $label = (string)__('request.changed.'.$key);
        return ($label == 'request.changed.'.$key)?$key:$label;
    }
}
