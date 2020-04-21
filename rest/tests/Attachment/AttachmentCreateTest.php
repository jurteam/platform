<?php

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Laravel\Lumen\Testing\DatabaseTransactions;

class AttachmentCreateTest extends TestCase
{
    use DatabaseTransactions;

    /**
     * @test
     *
     * @return void
     */
    public function should_upload_a_file_with_an_existing_contract()
    {
        $wallet = '0xdab6AbeF495D2eeE6E4C40174c3b52D3Bc9616A7';

        // create user
        $user = factory(App\Models\User::class)->create([
            'wallet' => $wallet,
        ]);

        // generate fake image
        Storage::fake('attachments');

        $attachments[] = UploadedFile::fake()->image('attachment.jpg');

        // create a contract
        $contract = factory(App\Models\Contract::class)->create([
            'user_id' => $user->id,
        ]);

        // get encoded id
        $id = encodeId($contract->id);

        // update contract with attachment
        $response = $this->put("api/v1/contracts/{$id}", [
            'attachments' => $attachments,
            'kpi' => 'test',
        ], [
            'wallet' => $wallet,
        ]);

        // validate status
        $this->seeStatusCode(200);

        // check attachment available in database
        $this->seeInDatabase('media', [
            'model_type' => \App\Models\Contract::class,
        ]);
    }

}
