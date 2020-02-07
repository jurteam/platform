@component('mail::message')
# Dispute Ending

<p>Hey {{$partecipant->getPublicName()}},<br>
as a party involved in the dispute #{{$dispute->address}} we want to inform you that <strong>voting process is about to end</strong>. If no extension occurs, the voting will end on {{$expirationDate->formatLocalized('%d %b %Y')}}.<br>You can access the voting section by accessing the following link:<br><a href="{{$url}}" class="button button-inline button-jur" target="_blank">Go to dispute's voting</a></p>

Best,<br>
{{ config('jur.name') }}
@endcomponent
