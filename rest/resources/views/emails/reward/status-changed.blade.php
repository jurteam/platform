@component('mail::message')

<p>Hey {{$username}},<br>

 <p>We regret to inform you that your slot for the activity <strong>{{$activity_name}}</strong> has been <strong>{{$status}}</strong>. You can write to us at {{ config('jur.support_url') }} for any further clarifications.</p>

<p><strong>Thank you for helping JUR make justice transparent and accessible!</strong></p>

<p>JUR recommends using <a class="button button-inline button-jur" href="https://env.vechain.org/">Sync Browser</a> for a safer and smoother blockchain experience.</p><br/>

Best,<br>
{{ config('jur.name') }}
@endcomponent
