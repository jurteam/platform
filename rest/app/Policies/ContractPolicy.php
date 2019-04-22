<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Contract;
use Illuminate\Http\Request;
use Illuminate\Auth\Access\HandlesAuthorization;

class ContractPolicy
{
    use HandlesAuthorization;

    protected $request;

    /**
     * Create a new policy instance.
     *
     * @return void
     */
    public function __construct(Request $request)
    {
        $this->request = $request;
    }

    public function view(?User $user, Contract $contract)
    {
        if ($this->userIsTheContractOwner($contract)) {
            return true;
        }

        return $this->counterPartCouldBeAccessToContract($contract);
    }

    protected function userIsTheContractOwner(Contract $contract)
    {
        $contractWallet = strtolower($contract->part_a_wallet);
        $requestWallet = strtolower($this->request->header('wallet'));

        return $contractWallet == $requestWallet;
    }

    protected function counterPartCouldBeAccessToContract(Contract $contract)
    {
        $contractWallet = strtolower($contract->part_b_wallet);
        $requestWallet = strtolower($this->request->header('wallet'));

        if ($contractWallet == $requestWallet) {
            return $contract->isNotDraft();
        }
    }
}
