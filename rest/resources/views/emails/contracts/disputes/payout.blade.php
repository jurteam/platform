@component('mail::message')
# Reward Credited

<p>Hey {{$user->getPublicNamee()}},<br>
 you have been credited the reward of JUR {{$withdrawal->amount}} for successfully contributing in closing the the dispute #{{$withdrawal->contract_id}}. Thank you for your valuable contribution and for using the JBP. </p>

Best,<br>
{{ config('app.name') }}
@endcomponent
