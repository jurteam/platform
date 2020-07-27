@component('mail::message')

<p>Hey {{$username}},<br>

<p>We have added a new activity <strong>{{$activity_name}}</strong>. You are invited to take part in it and contribute towards building a more transparent and accessible justice system.</p>

<p>Please click on the button to see the availabilities.</p>

<a href="{{$url}}" style="font-style: normal;font-family: Helvetica,Arial,sans-serif!important;box-sizing: border-box;border-color: #07f;font-weight: 600;text-decoration: none;display: inline-block;margin: 0;color: #ffffff;background-color: #07f;border: solid 1px #07f;border-radius: 2px;font-size: 16px;padding: 15px 45px;" target="_blank" >See Availablities</a>
<p><strong>Thank you for helping JUR make justice transparent and accessible!</strong></p>

<p>JUR recommends using <a class="button button-inline button-jur" href="https://env.vechain.org/">Sync Browser</a> for a safer and smoother blockchain experience.</p><br/>

Best,<br>
{{ config('jur.name') }}
@endcomponent
