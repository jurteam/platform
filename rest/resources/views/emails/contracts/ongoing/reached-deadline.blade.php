@component('mail::message')
# Contract Closing

<p>Hey {{$party['name']}},<br>
your contract #{{$contract->id}} has reached its expiration date on {{$expirationDate->formatLocalized('%d %b %Y')}}.<br>We hope that everything went good with your counterparty. If this is not the case kindly press "Success" button in order to send the closing proposal to your counterparty. If you had any problem, <strong>you can open a friendly resolution or a dispute</strong> through the platform. You just need to access your contract and press the "<i>Dispute</i>" button. <a href="{{$url}}" class="button button-inline button-jur" target="_blank">Go to contract</a></p>

Best,<br>
{{ config('jur.name') }}
@endcomponent
