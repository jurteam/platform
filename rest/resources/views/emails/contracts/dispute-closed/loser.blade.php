@component('mail::message')
# Dispute closed

<p>Hey {{$loser}},<br>
we are sorry to inform you <strong>have lost</strong> the dispute #{{$dispute->address}} with your counterparty {{$winner}}. We hope that you understood the outcome of the dispute and make tresure of this experience for your future contracts.<br>
We want to thank you for using the Jur Beta Platform and hope that it will satisfy your future needs despite this loss.<br>
You can leave us your feedback here: <a href="{{$feedbackUrl}}" class="button button-inline button-jur" target="_blank">{{$feedbackUrl}}</a></p>

Best,<br>
{{ config('jur.name') }}
@endcomponent