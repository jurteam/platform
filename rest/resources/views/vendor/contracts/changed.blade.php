@component('mail::message')
# {{$subject}}

<p class="text-center">{{$attributes['name']}} {{$subject}}</p>

@component('mail::button', ['url' => $contractUrl])
{{__('Show Contract Detail')}}
@endcomponent

{{__('Thanks')}},<br>
{{ config('app.name') }}
@endcomponent
