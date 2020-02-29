@component('mail::message')
# Closing Proposal

<p>Hey {{$recipient}},<br>
{{$creator}} has proposed you to <strong>successfully close</strong> the <strong>contract {{$contract->address}}</strong> which has a due date of {{$expirationDate->formatLocalized('%d %b %Y')}}. You can access the smart legal contract's detail page in order to accept it (<i>Success</i> button) or open a dispute (<i>Dispute</i> button) from the following link:<br><a href="{{$url}}" class="button button-inline button-jur" target="_blank">Go to contract</a></p>

Best,<br>
{{ config('jur.name') }}
@endcomponent
