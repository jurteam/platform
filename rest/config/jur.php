<?php

return [

    'name' => 'Jur Team',

    'url' => env('JUR_FE_URL'),

    'from' => [
        'address' => env('JUR_MAIL_FROM_ADDRESS', 'hello@example.com'),
        'name' => env('JUR_MAIL_FROM_NAME', 'Example'),
    ],

    'part_a_label' => 'a',
    'part_b_label' => 'b',

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
            'label' => 'Waiting for payment',
            'code' => 3
        ],
        [
            'label' => 'Ongoing',
            'code' => 5
        ],
        [
            'label' => 'Agreed',
            'code' => 7
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
            'label' => 'Contract Closed',
            'code' => 10
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
            'label' => 'Open Dispute',
            'code' => 32
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
                'label_name' => 'Accepted :name',
                'label_status' => null
            ],
            [
                'status_code' => 3,
                'label_name' => 'Paid contract value of :value JUR',
                'label_status' => null
            ],
            [
                'status_code' => 5,
                'label_name' => 'Paid contract value of :value JUR',
                'label_status' => null
            ],
            [
                'status_code' => 7,
                'label_name' => 'Agreed contract closing',
                'label_status' => null
            ],
            [
                'status_code' => 9,
                'label_name' => null,
                'label_status' => 'Contract closed'
            ],
            [
                'status_code' => 10,
                'label_name' => null,
                'label_status' => 'Widthdrawn :value JUR from contract'
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
                'status_code' => 32,
                'label_name' => 'Sent',
                'label_status' => 'Open Dispute'
            ]
        ]
    ],

    'emails' => [
        [
            'code' => 1,
            'templates' => [
                'sender' => [
                    'subject' => 'Contract successfully sent',
                    'heading' => 'Contract Sent',
                    'body' => "Hey [from],<br>your contract <strong>has been successfully sent</strong> to [to].<br>You can always access the smart legal contract's detail page from the following link:<br>[url]",
                ],
                'recipient' => [
                    'subject' => 'You received a new contract',
                    'heading' => 'Contract Received',
                    'body' => "Hey [to],<br>you <strong>have received a new smart legal contract proposal</strong> from [from]. You can access the smart legal contract's detail page and accept it or reject it from the following link:<br>[url]",
                ]
            ]
        ],
        [
            'code' => 2,
            'templates' =>[
                [
                    'subject' => 'Fund your contract',
                    'heading' => 'Contract Accepted',
                    'body' => "Hey [from],<br>your contract <strong>has been accepted by [to]</strong>. You can access the smart legal contract's detail page in order to fund the contract from the following link:<br>[url]",
                ],
                [
                    'subject' => 'Fund your contract',
                    'heading' => 'Contract Accepted',
                    'body' => "Hey [to],<br>you have <strong>accepted the contract</strong> proposed by [from]. You can access the smart legal contract's detail page in order to fund the contract from the following link:<br>[url]"
                ]
            ]
        ],
        [
            'code' => 5,
            'templates' => [
                [
                    'subject' => 'Your contract has started',
                    'heading' => 'Contract Started',
                    'body' => "Hey [from],<br>your contract with [to] <strong>has started</strong>. We will remind you when it will be close to its expiration on [date].<br>You can access the smart legal contract's legal page in order to check its details and attachments at the following link:<br>[url]",
                ]
            ]
        ],
        [
            'code' => 3,
            'templates' => [
                [
                    'subject' => 'Waiting for your counterparty',
                    'heading' => 'Waiting for counterparty',
                    'body' => "Hey [from],<br>thanks for funding your contract. The smart legal contract is currenlty waiting for your counterparty to do the same.<br>We will send you a notification when this will be completed.<br>You can also directly check the contract's status at the following link:<br>[url]",
                ],
                [
                    'subject' => 'Waiting for your counterparty',
                    'heading' => 'Payment Pending',
                    'body' => "Hey [from],<br>your payment for the contract #[number] is pending and your counterparty is waiting.<br>You can access the smart legal contract's detail page in order to complete the payment of [amount] from the following link:<br>[url]",
                ]
            ]
        ],
        [
            'code' => 5,
            'templates' => [
                [
                    'subject' => 'Contract about to close',
                    'heading' => 'Contract Closing',
                    'body' => "Hey [from],<br>your contract #[number] will reach its closing date on [date].<br>We hope that everything is going good with your counterparty. If that is not the case, remember that <strong>you can always open a friendly resolution or a dispute</strong> through the platform. You just need to access your contract and press the `<i>Dispute</i>` button.<br>[url]",
                ],
                [
                    'subject' => 'Contract to be closed',
                    'heading' => 'Contract Closing',
                    'body' => "Hey [from],<br>your contract #[number] has reached its expiration date on [date].<br>We hope that everything is going good with your counterparty. If this is the case kindly press the 'Success' button in order to send the closing proposal to your counterparty. If you had any problem, <strong>you can open a friendly resolution or a dispute</strong> through platform. You just need to access your contract and press the `<i>Dispute</i>` button.<br>[url]",
                ]
            ]
        ],
        [
            'code' => 7,
            'templates' => [
                [
                    'subject' => 'Successful closing proposal sent',
                    'heading' => 'Closing Sent',
                    'body' => "Hey [from],<br>you have successfully sent a closing proposal for <strong>contract #[contract]</strong> which has a due date of [date]. The smart legal contract is now waiting for your counterparty's confirmation. We will notify if there is any update. You can also check the contract's status by visiting the following link:<br><a href='[url]' target='blank'>[url]</a>",
                ],
                [
                    'subject' => 'Successful closing proposal',
                    'heading' => 'Closing Proposal',
                    'body' => "Hey [from],[to] has proposed you to <strong>successfully close</strong> the <strong>contract #[contract]</strong> which has a due date of [date].<br>You can access the smart legal contract's detail page in order to accept it (<i>Success</i> button) or open a dispute (<i>Dispute</i> button) from the following link:<br>[url]",
                ]
            ]
        ],
        [
            'code' => 9,
            'templates' => [
                [
                    'subject' => 'Contract successfully closed',
                    'heading' => 'Contract Successfully Closed',
                    'body' => "Hey [from],<br>we are happy to inform you that your counterparty to the <strong>contract #[contract]</strong> which has a due date of [date] has <strong>accepted your closing proposal</strong>. Thank you for using the Jur Beta Platform for your needs we hope that you liked the experience.<br>You can leave us your feedback here:<br><a href='[feedback_url]' target='blank'>[feedback_url]</a> <br>As a reminder you can always check the contract's details by visiting thw following link:<br><a href='[url]' target='blank'>[url]</a>",
                ]
            ]
        ],
        [
            'code' => 21,
            'templates' => [
                [
                    'subject' => 'Friendly resolution received',
                    'heading' => 'Friendly Resolution Received',
                    'body' => "Hey [from],<br>your counterparty [to] to the contract #[contract] which has a due date of [date] <strong>has sent you a friendly resolution</strong> in order to amend the contract's condition. If you like the proposal, press on <i>Accept</i>. In case you do not feel free to open a dispute by pressing the <i>Dispute</i> button.<br>If you decide to open a dispute please remember that the contract's details will be made public to the Open Layer voters.<br><a href='[url]' target='blank'>[url]</a>",
                ],
                [
                    'subject' => 'Friendly resolution received',
                    'heading' => 'Friendly Resolution Received',
                    'body' => "Hey [from],<br>your counterparty [to] to the contract #[contract] which has a due date of [date] <strong>has sent you a friendly resolution</strong> in order to amend the contract's condition. If you like the proposal, press on <i>Accept</i>. In case you do not feel free to open a dispute by pressing the <i>Dispute</i> button.<br>If you decide to open a dispute please remember that the contract's details will be made public to the Open Layer voters.<br><a href='[url]' target='blank'>[url]</a>",
                ]
            ]
        ],
        [
            'code' => 31,
            'templates' => [
                [
                    'subject' => 'Dispute opened',
                    'heading' => 'Dispute Opened',
                    'body' => "Hey [from],<br>you <strong>have successfully rejected your counterparty's friendly resolution</strong> for the contract #[contract].<br>The contract is now in a dispute state and it will wait for 24 hours for your counterparty's proposal. If the proposal does not arrive within the timeframe the smart legal contract will automatically propose the maximum for your counterparty. We will notify you of any update and you also can check the dispute's status by accessing the detail page directly:<br>[url]"
                ],
                [
                    'subject' => 'Dispute opened',
                    'heading' => 'Dispute Opened',
                    'body' => "We are sorry about this but disagreements sometime happen, make sure you send your dispute resolution proposal within 24 hours or the smart legal contract will itself propose the maximum in your favour which might not be what you believe fair in this situation. You can submit your resolution to the Open Layer by accessing the dispute's details:<br>[link]"
                ]
            ]
        ],
        [
            'code' => 35,
            'templates' => [
                [
                    'subject' => 'Dispute voting starts',
                    'heading' => 'Dispute Voting Starts',
                    'body' => "Hey [from],<br>as a party involved in the disputed contract #[contract] we wanted to inform you that the voting phase has started and, if no extension occurs, it will end on [date].<br>As a reminder, you can also vote on yourself as many JUR tokens as you want as fair as the value matches what you believe fair.<br>[url]"
                ],
                [
                    'subject' => 'A new dispute has been opened',
                    'heading' => 'New Dispute Opened',
                    'body' => "Hey [member],<br>as a Jur Community member we want to inform you that a new dispute (#[dispute]) has been opened on the Jur Beta Platform. If no extension occurs, the voting will end on [date].<br>You can access the voting section by accessing the following link:<br>[url]"
                ],
                [
                    'subject' => 'Majority vote has changed',
                    'heading' => 'Majority Change',
                    'body' => "Hey [member],<br>as a Jur Community member we want to inform you that a majority change has happened on dispute #[dispute]. If no extension occurs, the voting will end on [date].<br>You can access the voting section by accessing the following link:<br>[url]"
                ],
                [
                    'subject' => 'Dispute about to end',
                    'heading' => 'Dispute Ending',
                    'body' => "Hey [member],<br>as a party involved in the dispute #[dispute] we want to inform you that <strong>voting process is about to end</strong>. If no extension occurs, the voting will end on [date].<br>You can access the voting section by accessing the following link:<br>[url]"
                ],
                [
                    'subject' => 'Majority vote has changed',
                    'heading' => 'Majority Changed',
                    'body' => "Hey [member],<br>as a Jur Community member we want to inform you that a majority change has happened on dispute #[dispute]. If no extension occurs, the voting will end on [date].<br>You can access the voting section by accessing the following link:<br>[url]"
                ],
                [
                    'subject' => 'Dispute about to end',
                    'heading' => 'Dispute Ending',
                    'body' => "Hey [member],<br>as a Jur Community member we want to inform you that the dispute #[dispute] id <strong>about to end</strong>. If no extension occurs, the <strong>voting will end on [date]</strong>.<br>You can access the voting section by accessing the following link:<br>[url]"
                ]
            ]
        ],
        [
            'code' => 39,
            'templates' => [
                [
                    'subject' => 'You have won the dispute',
                    'heading' => 'Dispute Win',
                    'body' => "Hey [from],<br>we are happy to inform you that you <strong>have successfully won</strong> the dispute #[contract] with your counterparty [to].<br>As a last step, after 24 hours, you need to withdraw the funds from the smart legal contract.<br>To do so please access the dispute detail page and press the <i>Withdraw</i> button:<br>[url]<br>Thank you for using the Jur Beta Platform for your needs we hope that you liked the experience.<br>You can leave us your feedback here: [feedback_url]"
                ],
                [
                    'subject' => 'You have lost the dispute',
                    'heading' => 'Dispute Closed',
                    'body' => "Hey [from],<br>we are sorry to inform you that you <strong>have lost</strong> the dispute #[contract] with your counterparty [to].<br>We hope that you understood the outcome of the dispute and make treasure of this experience for your future contracts.<br>We want to thank you for using the Jur Beta Platform and hope that it will satisfy your future needs despite this loss.<br>You can leave us your feedback here:<br>[feedback_url]"
                ],
                [
                    'subject' => 'You have won the dispute',
                    'heading' => 'Dispute Win',
                    'body' => "Hey [wallet],<br>as a party involved in the dispute #[contract] we are happy to inform you taht you <strong>have won a reward for your vote</strong>.<br>You can withdraw you reward after 24 hours from the dispute detail page:<br>[url]"
                ],
                [
                    'subject' => 'You have won the dispute',
                    'heading' => 'Dispute Closed',
                    'body' => "Hey [wallet],<br>as a party involved in the dispute #[contract] we are sorry to inform you that you <strong>have lost your tokens for voting for the minority side</strong>.<br>We hope that you will be ablie to vote properly in the next dispute. You can check the final results of the dispute's voting process in the dispute's detail page:<br>[url]"
                ],
                [
                    'subject' => 'Your resolution has been credited',
                    'heading' => 'Resolution Enforced',
                    'body' => "Hey [from],<br>the dispute #[contract] has been successfully closed enforcing the contract #[contract].<br>You have <strong>successfully received the credit</strong> due."
                ],
                [
                    'subject' => 'Your reward has been credited',
                    'heading' => 'Reward Credited',
                    'body' => "Hey [from],<br>you have been credited the reward oj JUR [amount] for successfully contributing in closing the dispute #[contract].<br>Thank you for your valuable contribution and for using the JBP."
                ]
            ]
        ]
    ]
];
