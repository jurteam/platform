@component('mail::message')
# Dispute Win

<p>Hey {{$member}},<br>
as a party involved in the dispute #{{$contract->id}} we are happy to inform you that you <strong>have won a reward for your vote.</strong> You can withdraw your reward after 24 hours from the dispute detail page:<br><a href="{{$url}}" class="button button-inline button-jur" target="_blank">Go to dispute's details</a></p>

Best,<br>
{{ config('jur.name') }}
@endcomponent
