@component('mail::message')
# Contract Successfully Closed

<p>Hey {{$creator}},<br>
we are happy to inform you that your counterparty to the <strong>contract #{{$contract->id}}</strong> which has a due date of {{$expirationDate->formatLocalized('%d %b %Y')}} has <strong>accepted your closing proposal</strong>. Thank you for using the Jur Beta Platform for your needs we hope that you liked the experience.<br>
You can leave us your feedback here: <a href="{{$feedbackUrl}}" class="button button-inline button-jur" target="_blank">{{$feedbackUrl}}</a><br>
As a reminder you can always check the contract's details by visiting the following link: <a href="{{$url}}" class="button button-inline button-jur" target="_blank">Go to contract</a></p>

Best,<br>
{{ config('app.name') }}
@endcomponent
