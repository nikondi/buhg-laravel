<button {{ $attributes->merge([
    'class' => 'btn',
    'type' => 'button'
]) }}>
    {{ $slot }}
</button>
