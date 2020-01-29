@component('mail::message')
# Contract Received

<p>Hey {{$creator}},<br>
your <strong>have received a new smart legal contract proposal</strong> from {{$creator}}. You can access the smart legal contract's detail page and accept it or reject it from the following link: <a href="{{$url}}" class="button button-inline button-jur" target="_blank">Go to contract</a></p>

Best,<br>
{{ config('jur.name') }}
@endcomponent
