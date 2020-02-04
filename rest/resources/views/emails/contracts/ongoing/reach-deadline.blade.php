@component('mail::message')
# Contract Closing

<p>Hey {{$party['name']}},<br>
your contract {{$contract->address}} will reach its closing date on {{$expirationDate->formatLocalized('%d %b %Y')}}. If that is not the case, remember that <strong>you can always open a friendly resolution or a dispute</strong> through the platform. You just need to access your contract and press "<i>Dispute</i>" button. <a href="{{$url}}" class="button button-inline button-jur" target="_blank">Go to contract</a></p>

Best,<br>
{{ config('jur.name') }}
@endcomponent
