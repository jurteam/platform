@component('mail::message')
# Dispute Voting Started

<p>Hey {{$recipient}},<br>
as a party involved in the disputed contract #{{$contract->id}} we wanted to inform you that the voting phase has started and, if no extension occurs, it will end on {{$expirationDate->formatLocalized('%d %b %Y')}}. As a reminder, you can also vote on yourself as many JUR tokens as you want as fair as the value matches what you believe fair. <a href="{{$url}}" class="button button-inline button-jur" target="_blank">Go to dispute's voting</a></p>

Best,<br>
{{ config('app.name') }}
@endcomponent
