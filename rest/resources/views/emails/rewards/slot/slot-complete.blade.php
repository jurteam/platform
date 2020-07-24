@component('mail:message')

# Slot can be completed by the user

<p>Hey {{ $recipient }}</p>

<p>
  The due date for your activity {{ $activity_name }} has passed. <br /> You can now mark it complete to lock the reward.<br />
  Please visit {{ $link }} to transact
</p>

<p>Best, <br />
{{ config('jur.name') }}
</p>
@endcomponent
