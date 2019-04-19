<?php

return [

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
        ]
    ]
];
