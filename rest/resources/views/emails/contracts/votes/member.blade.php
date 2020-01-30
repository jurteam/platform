@component('mail::message')
# Majority Change

<p>Hey {{$member->getPublicName()}},<br>
as a Jur Community member we want to inform you that a majority change has happened on dispute #{{$dispute->id}}. If no extension occurs, the voting will end on {{$expirationDate->formatLocalized('%d %b %Y')}}. You can access the voting section by accessing the following link: <a href="{{$url}}" class="button button-inline button-jur" target="_blank">Go to dispute's voting</a></p>

Best,<br>
{{ config('app.name') }}
@endcomponent
