<?php

use App\Services\PageService;

function page(): PageService
{
    return app(PageService::class);
}

if (!function_exists('trans_df')) {
    function trans_df(string $key, array $replace = [], ?string $locale = null, ?string $default = null): string
    {
        $translation = trans($key, $replace, $locale);

        if ($key === $translation && !is_null($default))
            return $default;

        return $translation;
    }
}
