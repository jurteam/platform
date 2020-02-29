@component('mail::message')
# Closing Sent

<p>Hey {{$creator}},<br>
you have successfully sent a closing proposal for <strong>contract {{$contract->address}}</strong> which has a due date of {{$expirationDate->formatLocalized('%d %b %Y')}}. The smart legal contract's is now waiting for your counterparty's confirmation. We will notify if there is any update.<br>You can also check the contract's status by visiting the following link:<br><a href="{{$url}}" class="button button-inline button-jur" target="_blank">Go to contract</a>
</p>

Best,<br>
{{ config('jur.name') }}
@endcomponent
