@component('mail::message')
# {{$subject}}

<p class="text-center">{{$attributes['name']}} {{$subject}}</p>

@component('mail::button-inline', ['url' => $contractUrl, 'color' => 'jur'])
{{__('Show Contract Detail')}}
@endcomponent

{{__('Thanks')}},<br>
{{ config('app.name') }}
@endcomponent
