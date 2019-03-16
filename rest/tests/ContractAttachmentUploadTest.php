<?php

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Laravel\Lumen\Testing\DatabaseMigrations;
use Laravel\Lumen\Testing\DatabaseTransactions;

class ContractAttachmentUploadTest extends TestCase
{
    /**
     * @test
     *
     * @return void
     */
    public function an_user_can_upload_attachment_for_an_existing_contract()
    {
        $wallet = 'QHx5VJEg3zO2jseSEq8R/wtCljguCvHSMA49HQ1IWiI=';

        Storage::fake('attachments');

        $attachments[] = UploadedFile::fake()->image('attachment.jpg');

        $contract = factory(App\Models\Contract::class)->create([
            'user_id' => factory(App\Models\User::class)->create()->id
        ]);
        $response = $this->post("api/v1/contracts/medias/{$contract->id}", [
            'attachments' => $attachments
        ], [
            'wallet' => $wallet
        ]);

        $this->seeInDatabase('media', ['model_id' => $contract->id]);
    }
}
