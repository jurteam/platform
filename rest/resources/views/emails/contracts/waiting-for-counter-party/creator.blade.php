@component('mail::message')
# Contract Sent

<p>Hey {{$creator}},<br>
your contract has been successfully sent to {{$recipient}}. You can always access the smart legal contract's detail page from the following link: <a href="{{$contractUrl}}" target="_blank">Go to contract</a></p>

Best,<br>
{{ config('jur.name') }}
@endcomponent
