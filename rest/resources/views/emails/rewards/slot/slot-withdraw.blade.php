@component('mail:message')

# Slot can be withdrawn

<p>
  Congratulations on successfully completing the activity {{$activity_name}}.
  <br/>You are now eligible to withdraw the reward. Please click on the button below to transact. {{$link_to_advocacy_page}}
  <br />Thank you for contributing to Jur.<br />
</p>

Best,<br />
{{ config('jur.name') }}

@endcomponent
