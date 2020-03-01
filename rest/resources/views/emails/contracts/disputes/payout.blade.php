@component('mail::message')
# Reward Credited

<p>Hey {{$user->getPublicName()}},<br>
 you have been credited the reward of JUR {{$withdrawal->amount}} for successfully contributing in closing the dispute #{{$contract->address}}. Thank you for your valuable contribution and for using the JBP. </p>

Best,<br>
{{ config('jur.name') }}
@endcomponent
