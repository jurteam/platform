@component('mail::message')
# Waiting for counterparty

<p>Hey {{$paying}},<br>
thanks for funding your contract. The smart legal contract is currently waiting for your counterparty to do the same. We will send you a notification when this will be completed.<br>You can also directly check the contract's status at the following link:<br>
<a href="{{$url}}" class="button button-inline button-jur" target="_blank">Go to contract</a></p>

Best,<br>
{{ config('jur.name') }}
@endcomponent
