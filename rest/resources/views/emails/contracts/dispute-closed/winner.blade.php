@component('mail::message')
# Dispute Win

<p>Hey {{$winner}},<br>
we are happy to inform you that you <strong>have successfully won</strong> the dispute #{{$dispute->address}} with your counterparty {{$loser}}.<br>
As a last step, after 24 hours, you need to withdraw the funds from the smart legal contract. To do so please access the dispute detail page and press the <i>Withdraw</i> button: <a href="{{$url}}" class="button button-inline button-jur" target="_blank">Go to dispute</a><br>
Thank you for using the Jur Beta Platform for your needs we hope that you liked the experience.<br>
You can leave us your feedback here: <a href="{{$feedbackUrl}}" class="button button-inline button-jur" target="_blank">{{$feedbackUrl}}</a></p>

Best,<br>
{{ config('jur.name') }}
@endcomponent
