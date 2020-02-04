@component('mail::message')
# Dispute closed

<p>Hey {{$loser}},<br>
we are sorry to inform you <strong>have lost</strong> the dispute #{{$dispute->id}} with your counterparty {{$winner}}. We hope that you understood the outcome of the dispute and make tresure of this experience for your future contracts.<br>We want to thank you for using th Jur Beta Platform and hope that it will satisfy your future needs despite this loss.<br>You can leave us your feedback here: <a href="{{$feedbackUrl}}">{{$feedbackUrl}}</a></p>

Best,<br>
{{ config('app.name') }}
@endcomponent
