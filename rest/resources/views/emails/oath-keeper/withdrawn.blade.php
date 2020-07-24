@component('mail::message')

<p>Hey {{$username}},<br>

<p>Happy to report you that your oath worth <strong>{{$oath->amount}} JUR </strong> has taken on <strong>{{$oath->start_at}}</strong> has been successfully released and the amount has been credited to your wallet.</p><br/>
<p><strong>Thank you for helping JUR make justice transparent and accessible!</strong></p>

<p>JUR recommends using <a class="button button-inline button-jur" href="https://env.vechain.org/">Sync Browser</a> for a safer and smoother blockchain experience.</p><br/>

Best,<br>
{{ config('jur.name') }}
@endcomponent