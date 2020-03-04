@component('mail::message')
# Friendly Resolution Sent

<p>Hey {{$creator}},<br>
you <strong>have successfully sent a friendly resolution</strong> to your counterparty {{$recipient}} to the contract {{$contract->address}} which has a due date of {{$expirationDate->formatLocalized('%d %b %Y')}} in order to amend the contract's conditions. We will notify if your counterparty accepts your proposal or rejects it by opening a dispute.<br>
<a href="{{$url}}" class="button button-inline button-jur" target="_blank">Go to contract</a></p>

Best,<br>
{{ config('jur.name') }}
@endcomponent
