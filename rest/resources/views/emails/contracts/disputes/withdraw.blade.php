@component('mail::message')
# Resolution Enforced

<p>Hey {{$user->getPublicName()}},<br>
the dispute #{{$contract->address}} has been successfully closed enforing the contract #{{$contract->address}}. You have <strong>successfully received the credit</strong> due.</p>

Best,<br>
{{ config('jur.name') }}
@endcomponent
