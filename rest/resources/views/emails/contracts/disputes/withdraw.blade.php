@component('mail::message')
# Resolution Enforced

<p>Hey {{$user->getPublicName()}}<br>,
the the dispute #{{$withdrawal->contract_id}} has been successfully closed enforing the contract #{{$withdrawal->contract_id}}. You have <strong>successfully received the credit</strong> due.</p>

Best,<br>
{{ config('app.name') }}
@endcomponent
