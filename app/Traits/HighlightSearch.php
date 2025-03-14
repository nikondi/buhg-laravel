<?php

namespace App\Traits;

trait HighlightSearch
{
    public function highlightAttribute(string $search, string $attribute): void
    {
        $attr = $this->getAttribute($attribute);

        if (empty($search))
            return;

        $pos = mb_strpos(mb_strtolower($attr), mb_strtolower($search));

        if ($pos !== false) {
            $replaced = mb_substr($attr, 0, $pos);
            $replaced .= '<span class="search-marked">' . mb_substr($attr, $pos, mb_strlen($search)) . '</span>';
            $replaced .= mb_substr($attr, $pos + mb_strlen($search));
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
