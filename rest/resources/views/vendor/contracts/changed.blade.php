@component('mail::message')
# {{$subject}}

{{$attributes['name']}} {{$subject}}

@component('mail::button', ['url' => $contractUrl])
Show Contract Detail
@endcomponent

Thanks,<br>
{{ config('app.name') }}
@endcomponent
