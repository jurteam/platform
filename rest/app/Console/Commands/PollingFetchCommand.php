<?php

namespace App\Console\Commands;

use App\Libraries\PollingHelper;
use GuzzleHttp\Client;
use Illuminate\Console\Command;

class PollingFetchCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'polling:fetch {param?}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Fetch & Process transactions from polling service';

    /**
     * Host of polling producer service.
     */
    protected $client;

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();

        $host = config('polling.ProducerHost') . '/api/v1/polling-service/past-events/'; // get host info from config
        $this->client = new Client([
            'base_uri' => $host,
            'timeout' => 100.0
        ]);
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $choice = $this->choice(
            'Please select polling channel',
            ['Producer', 'Blockchain'],
            0,
            $maxAttempts = null,
            $allowMultipleSelections = false
        );

        if (!$this->confirm('Are you sure to fetch transactions from ' . $choice . '?')) {
            return;
        }

        // set url to fetch all transactions from polling service
        $url = 'blocks/';

        $this->info('Sending request to server...');

        // get artisan argument
        $param = $this->argument('param');

        if (isset($param)) {

            // split `=` delimited param
            $values = explode("=", $param);

            if (sizeof($values) != 2) {
                abort(422, "wrong argument!");
            }

            switch ($values[0]) {
                case 'block':

                    // validate block number
                    if (!is_numeric($values[1])) {
                        abort(422, "block should be a number!");
                    }

                    // set url to get past events by block number
                    $url = 'blocks/' . $values[1];

                    $this->sendRequest($url, [
                        'blockchain' => $choice == 'Blockchain'
                    ]);

                    break;

                case 'asset':

                    // set url to get past events by asset name
                    $url = 'assets/' . $values[1];

                    $this->sendRequest($url, [
                        'blockchain' => $choice == 'Blockchain'
                    ]);

                    break;

                case 'contract':

                    // set url to get past events by contract address
                    $url = 'contracts/' . $values[1];

                    $this->sendRequest($url, [
                        'blockchain' => $choice == 'Blockchain'
                    ]);

                    break;

                case 'tx':

                    // set url to get past events by transaction address
                    $url = 'tx/' . $values[1];

                    $this->sendRequest($url, [
                        'blockchain' => $choice == 'Blockchain'
                    ]);

                    break;

                case 'blocks':

                    // split comma delimited value
                    $blocks = explode(",", $values[1]);

                    // validate format
                    if (sizeof($blocks) != 2) {
                        abort(422, "please specify from & to blocks properly!");
                    }

                    // validate block number
                    if (!is_numeric($blocks[0]) || !is_numeric($blocks[1])) {
                        abort(422, "block numbers should be a valid number!");
                    }
                    // set url to get past events by transaction address
                    $url = 'blocks/';

                    for ($i = $blocks[0]; $i <= $blocks[1]; $i++) {
                        $found = $this->sendRequest($url . $i, [
                            'blockchain' => $choice == 'Blockchain',
                            'from' => $blocks[0],
                            'to' => $blocks[1]
                        ]);

                        if (!$found) {
                            $this->line('No transactions found for blockNumber => ' . $i);
                            continue;
                        }
                    }

                    break;
            }
        }
    }

    /**
     * Send request to polling server
     *
     * @return mixed
     */
    public function sendRequest($url, $param)
    {
        // send request to get transactions
        $response = $this->client->request('GET', $url, [
            'query' => $param
        ]);

        if ($response->getStatusCode() != 200) {
            return false;
        }

        $data = json_decode($response->getBody()->getContents());

        foreach ($data->transactions as $transaction) {
            $this->line('Processing transaction -> ' . $transaction->asset_name . ':' .
                $transaction->event_name . ' -> BlockNumber=' . $transaction->block_number);
            // process transaction
            $success = PollingHelper::processTransaction($transaction);

            if ($success == 0) {
                $this->comment('Already exists -> ' . $transaction->asset_name . ':' .
                    $transaction->event_name . ' -> BlockNumber=' . $transaction->block_number);
            } elseif ($success == 1) {
                $this->info('Processed transaction  -> ' . $transaction->asset_name . ':' .
                    $transaction->event_name . ' -> BlockNumber=' . $transaction->block_number);
            } elseif ($success == -1) {
                $this->comment('No consumers -> ' . $transaction->asset_name . ':' .
                    $transaction->event_name . ' -> BlockNumber=' . $transaction->block_number);
            }

        }

        return sizeof($data->transactions) > 0;
    }

}
