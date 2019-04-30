@component('mail::message')
# {{$subject}}

{{$attributes['name']}} {{$subject}}

@component('mail::button', ['url' => ''])
Show detail
@endcomponent

Thanks,<br>
{{ config('app.name') }}
@endcomponent