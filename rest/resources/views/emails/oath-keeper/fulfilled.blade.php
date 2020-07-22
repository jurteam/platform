@component('mail::message')

<p>Hey {{$username}},<br>

<p>Happy to report you that your oath worth <strong>{{$oath->amount}} JUR </strong> has taken on <strong>{{$oath->start_at}}</strong> has been successfully fulfilled.</p><br/>

<p>please visit the link to withdraw the amount back to your wallet.<p><br/>
<a href="{{$withdrawUrl}}" class="button button-inline button-jur" target="_blank">Withdraw Oath</a><br/>
<p><strong>Thank you for helping JUR make justice transparent and accessible!</strong></p>

<p>JUR recommends using <a>Sync Browser</a> for a safer and smoother blockchain experience.</p><br/>

Best,<br>
{{ config('jur.name') }}
@endcomponent
