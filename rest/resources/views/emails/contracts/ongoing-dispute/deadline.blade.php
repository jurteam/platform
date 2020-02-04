@component('mail::message')
# Dispute Ending

<p>Hey {{$member->getPublicName()}},<br>
as a Jur Community member we want to inform you that the dispute {{$contract->address}} is <strong>about to end</strong>. If no extension occurs, the <strong>voting will end on {{$expirationDate->formatLocalized('%d %b %Y')}}</strong>.<br>You can access the voting section by accessing the followin link:<br><a href="{{$url}}" class="button button-inline button-jur" target="_blank">Go to dispute's voting</a></p>

Best,<br>
{{ config('jur.name') }}
@endcomponent
