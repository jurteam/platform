@component('mail::message')
# New Dispute Opened

<p>Hey {{$recipient}},<br>
as a Jur Community member we want to inform you that a new dispute (#{{$contract->id}}) has been opened on the Jur Beta Platform. If no extension occurs, the voting will end on {{$expirationDate->formatLocalized('%d %b %Y')}}. You can acccess the voting section by accessing the following link: <a href="{{$url}}" class="button button-inline button-jur" target="_blank">Go to dispute's voting</a></p>

Best,<br>
{{ config('app.name') }}
@endcomponent
