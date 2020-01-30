@component('mail::message')
# Majority Change

<p>Hey {{$partecipant->getPublicName()}},<br>
as a party involved in the dispute #{{$dispute->id}} we want to inform you that there was a majority change during the voting process. If no extension occurs, the voting will end on {{$expirationDate->formatLocalized('%d %b %Y')}}. You can access the voting section by accessing the following link: <a href="{{$url}}" class="button button-inline button-jur" target="_blank">Go to dispute's voting</a></p>

Best,<br>
{{ config('app.name') }}
@endcomponent
