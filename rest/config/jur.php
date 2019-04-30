<?php

return [

    'from' => [
        'address' => env('JUR_MAIL_FROM_ADDRESS', 'hello@example.com'),
        'name' => env('JUR_MAIL_FROM_NAME', 'Example'),
    ],

    'statuses' => [
        [
            'label' => 'Rejected',
            'code' => -1
        ],
        [
            'label' => 'Draft',
            'code' => 0
        ],
        [
            'label' => 'Waiting for counterparty',
            'code' => 1
        ],
        [
            'label' => 'Waiting for payment',
            'code' => 2
        ],
        [
            'label' => 'Ongoing',
            'code' => 5
        ],
        [
            'label' => 'Expired',
            'code' => 8
        ],
        [
            'label' => 'Contract Closed',
            'code' => 9
        ],
        [
            'label' => 'Open Friendly Resolution',
            'code' => 21
        ],
        [
            'label' => 'Closed Friendly Resolution',
            'code' => 29
        ],
        [
            'label' => 'Open Dispute',
            'code' => 31
        ],
        [
            'label' => 'Ongoing Dispute',
            'code' => 35
        ],
        [
            'label' => 'Extended Dispute',
            'code' => 36
        ],
        [
            'label' => 'Expired Dispute',
            'code' => 38
        ],
        [
            'label' => 'Dispute Closed',
            'code' => 39
        ]
    ],

    'activities' => [
        'types' => [
            'status_changed' => 'status_changed'
        ],

        'labels' => [
            [
                'status_code' => -1,
                'label_name' => 'The Contract was rejected',
                'label_status' => null
            ],
            [
                'status_code' => 1,
                'label_name' => 'Sent contract to :part',
                'label_status' => null
            ],
            [
                'status_code' => 2,
                'label_name' => 'Accepted',
                'label_status' => null
            ],
            [
                'status_code' => 5,
                'label_name' => 'Paid contract value of :value JUR',
                'label_status' => null
            ],
            [
                'status_code' => 9,
                'label_name' => null,
                'label_status' => 'Contract closed'
            ],
            [
                'status_code' => 21,
                'label_name' => 'Offered a',
                'label_status' => 'Friendly resolution'
            ],
            [
                'status_code' => 29,
                'label_name' => null,
                'label_status' => 'Closed Friendly Resolution'
            ],
            [
                'status_code' => 31,
                'label_name' => 'Created an',
                'label_status' => 'Open Dispute'
            ],
            [
                'status_code' => 35,
                'label_name' => 'Sent',
                'label_status' => 'Open Dispute'
            ]
        ]
    ]
];
