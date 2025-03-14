<?php

namespace App\Traits;

trait HighlightSearch
{
    public function highlightAttribute(string $search, string $attribute): void
    {
        $attr = $this->getAttribute($attribute);

        if (empty($search))
            return;

        $pos = strpos(strtolower($attr), strtolower($search));

        if ($pos !== false) {
            $replaced = substr($attr, 0, $pos);
            $replaced .= '<span class="search-marked">' . substr($attr, $pos, strlen($search)) . '</span>';
            $replaced .= substr($attr, $pos + strlen($search));
        } else {
            $replaced = $attr;
        }

        $this->setAttribute($attribute, $replaced);
    }

    public function highlightAttributes(string $search, array $attributes): void
    {
        foreach ($attributes as $attribute)
            $this->highlightAttribute($search, $attribute);
    }
}
