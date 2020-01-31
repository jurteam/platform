@component('mail::message')
# Dispute Opened

<p>Hey {{$creator}},<br>
you <strong>have successfully rejected your counterparty's friendly resolution</strong> for the contract #{{$contract->id}}.<br>The contract is now in a dispute state and it will wait for 24 hours for you counterparty's proposal. If the proposal does not arrive within the timeframe the smart legal contract will automatically propose the maximum for your counterparty. We will notify you of any udpate and you also can check the dispute's status by accessing the detail page directly:<br><a href="{{$url}}" class="button button-inline button-jur" target="_blank">Go to contract</a>
</p>

Best,<br>
{{ config('app.name') }}
@endcomponent
