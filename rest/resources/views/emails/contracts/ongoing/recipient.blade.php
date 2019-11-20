@component('mail::message')
# Contract Started

<p>Hey {{$creator}},<br>
your contract with {{$recipient}} <strong>has started</strong>. We will remind you when it will be close to its expiration on {{$expirationDate->formatLocalized('%d %b %Y')}}. You can access the smart legal contract's detail page in order to check its details and attachments at the following link:<br><a href="{{$url}}" target="_blank">Go to contract</a></p>

Best,<br>
{{ config('jur.name') }}
@endcomponent
