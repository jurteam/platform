<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="format-detection" content="telephone=no">
    <!-- disable auto telephone linking in iOS -->
    <!--[if gte mso 9]>
    <xml>
        <o:OfficeDocumentSettings>
        <o:AllowPNG/>
        <o:PixelsPerInch>96</o:PixelsPerInch>
        </o:OfficeDocumentSettings>
    </xml>
    <![endif]-->
</head>
<body>
    <style>
        @media only screen and (max-width: 600px) {
            .inner-body {
                width: 100% !important;
            }

            .footer {
                width: 100% !important;
            }
        }

        @media only screen and (max-width: 500px) {
            .button {
                width: 100% !important;
            }
        }
    </style>

    <table class="wrapper" width="100%" cellpadding="0" cellspacing="0" role="presentation">
        <tr>
            <td align="center">
                <table class="container-padding header" width="100%" cellpadding="0" cellspacing="0" role="presentation">
                    @component('mail::header', ['url' => config('app.url')])
                        <img src="https://jur.io/wp-content/uploads/2019/07/logo.png" alt="Jur">
                    @endcomponent

                    <!-- Email Body -->
                    <tr>
                        <td class="body" width="100%" cellpadding="0" cellspacing="0">
                            <table class="inner-body" align="center" width="570" cellpadding="0" cellspacing="0" role="presentation">
                                <!-- Body content -->
                                <tr>
                                    <td class="content content-cell">
                                        <div class="body-text">
                                            <div class="container-padding">
                                                {{ Illuminate\Mail\Markdown::parse($slot) }}

                                                {{ $subcopy ?? '' }}
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    @component('mail::footer')
                        <p>
                            <span style="text-align: center; font-size: 11px; padding: 20px 0px 20px; display: block;">©
                            2017-19 Jur® IS A REGISTERED
                            TRADEMARK.</span>
                        </p>
                    @endcomponent
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
