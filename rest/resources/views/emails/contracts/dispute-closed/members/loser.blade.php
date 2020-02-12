@component('mail::message')
# Dispute Closed

<p>Hey {{$member}},<br>
as a party involved in the dispute #{{$contract->id}} we are sorry to inform you that you <strong>have lost your tokens for voting for the minority side.</strong><br>We hope that you will be able to vote properly in the next dispute. You can check the final results of the dispute's voting process in the dispute's detail page: <a href="{{$url}}" class="button button-inline button-jur" target="_blank">Go to dispute's details</a></p>

Best,<br>
{{ config('app.name') }}
@endcomponent
