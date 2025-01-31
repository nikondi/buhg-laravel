<?php

namespace App\Services;

use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

/**
 * @property string $title
 * @property string $pageTitle
*/
class PageService
{
    private array $data = [
        'title' => '',
        'pageTitle' => '',
    ];

    public function __construct()
    {
        $this->data['user'] = Auth::user();
    }

    public function __get(string $name)
    {
        return $this->data[$name] ?? null;
    }

    public function title(string $title): static {
        $this->data['title'] = $title;
        return $this;
    }

    public function pageTitle(string $title): static {
        $this->data['pageTitle'] = $title;
        return $this;
    }

    public function render($view, array $data = []): \Inertia\Response
    {
        if(empty($this->pageTitle))
            $this->pageTitle($this->title);

        Inertia::share($this->data);

        return Inertia::render($view, $data);
    }
}
