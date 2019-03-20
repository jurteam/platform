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
        $wallet = str_random(20);
        $user = factory(App\Models\User::class)->create([
            'wallet' => $wallet
        ]);

        Storage::fake('attachments');

        $attachments[] = UploadedFile::fake()->image('attachment.jpg');

        $contract = factory(App\Models\Contract::class)->create([
            'user_id' => $user->id
        ]);
        $response = $this->put("api/v1/contracts/{$contract->id}", [
            'attachments' => $attachments,
            'kpi' => 'test'
        ], [
            'wallet' => $wallet
        ]);

        $this->seeInDatabase('media', ['model_id' => $contract->id]);
    }
}
