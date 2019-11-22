@component('mail::message')
# Contact Accepted

<p>Hey {{$creator}},<br>
your contract <strong>has been accepted</strong> by {{$recipient}}. You can access the smart legal contract's detail page in order to fund the contract from the following link: <a href="{{$contractUrl}}" target="_blank">Proceed to payment</a></p>

Best,<br>
{{ config('jur.name') }}
@endcomponent
