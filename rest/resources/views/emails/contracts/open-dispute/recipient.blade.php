@component('mail::message')
# Dispute Opened

<p>Hey {{$creator}},<br>
your counterparty {{$recipient}} to the contract #{{$contract->id}} which has a due date of {{$expirationDate->formatLocalized('%d %b %Y')}} <strong>has rejected your friendly resolution by opening a dispute</strong>.<br>We are sorry about this but disagreements sometime happen, make sure you send your dispute resolution proposal within 24 hours or the smart legal contract will itself propose the maximum in your favour which not be what you believe fair in this situation. You can submit your resolution to the Open Layer by accessing the dispute's details:<br><a href="{{$url}}" class="button button-inline button-jur" target="_blank">Go to contract</a></p>

Best,<br>
{{ config('app.name') }}
@endcomponent
