@props([
    'name', 'label', 'class', 'type'
])
<label {{ $attributes->merge(['class' => 'form-input'.($errors->has($name)?' form-input--error':'')])->except(['name', 'label', 'type']) }}>
    <span class="form-input__label">{{ $label }}</span>
    <input type="{{ $type ?? 'text' }}" name="{{ $name }}" placeholder="{{ $label ?? '' }}"  value="{{ old($name, $value ?? '')}}"/>
    @error($name)
        <span class="form-input__error">{{ $message }}</span>
    @enderror
</label>
