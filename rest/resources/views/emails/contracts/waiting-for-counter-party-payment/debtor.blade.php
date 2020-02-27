@component('mail::message')
# Payment Pending

<p>Hey {{$debtor}},<br>
your payment for the contract #{{$contract->address}} is pending and your counterparty is waiting.<br>
You can access the smart legal contract's detail page in order to complete the payment of {{$amount}} from the following link: <a href="{{$url}}" class="button button-inline button-jur" target="_blank">Proceed to payment</a></p>

Best,<br>
{{ config('jur.name') }}
@endcomponent
