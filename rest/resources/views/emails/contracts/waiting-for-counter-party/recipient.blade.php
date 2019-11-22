@component('mail::message')
# Contract Received

<p>Hey {{$recipient}},<br>
your <strong>have received a new smart legal contract proposal</strong> from {{$creator}}. You can access the smart legal contract's detail page and accept it or reject it from the following link: <a href="{{$contractUrl}}" target="_blank">Go to contract</a></p>

Best,<br>
{{ config('jur.name') }}
@endcomponent
