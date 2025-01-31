<?php

use App\Services\PageService;

function page(): PageService
{
    return app(PageService::class);
}
