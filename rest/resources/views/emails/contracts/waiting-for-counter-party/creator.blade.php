@component('mail::message')
# Contract Sent

<p>Hey {{$creator}},<br>
your contract <strong>has been successfully sent</strong> to {{$recipient}}. You can always access the smart legal contract's detail page from the following link: <a href="{{$url}}" class="button button-inline button-jur" target="_blank">Go to contract</a></p>

Best,<br>
{{ config('jur.name') }}
@endcomponent
