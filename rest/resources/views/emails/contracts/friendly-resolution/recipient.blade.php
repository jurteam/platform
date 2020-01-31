@component('mail::message')
# Friendly Resolution Received

<p>Hey {{$creator}},<br>
your cunterparty {{$recipient}} to the contract #{{$contract->id}} which has a due date of {{$expirationDate->formatLocalized('%d %b %Y')}} <strong>has sent you a friendly resolution</strong> in order to amend the contract's conditions. If you like the proposal, press on <i>Accept</i>. In case you do not feel free to open a dispute by pressing the <i>Dispute</i> button.<br>
If you decide to open a dispute please remember that the contract's details will be made public to the Open Layer voters.<br>
<a href="{{$url}}" class="button button-inline button-jur" target="_blank">Go to contract</a></p>

Best,<br>
{{ config('app.name') }}
@endcomponent
