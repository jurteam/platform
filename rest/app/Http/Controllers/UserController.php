<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class UserController extends Controller
{
    /**
     * Get user info.
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request)
    {
        $wallet = $request->header('wallet');
        $user = User::byWallet($wallet)->firstOrFail();

        return response()->json(compact('user'));
    }

    /**
     * Store a new user.
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $this->validate($request, [
            'name' => 'unique:users,name'
        ]);

        $user = User::createByWallet($request);

        return response()->json(compact('user'), 201);
    }

    /**
     * Update user info.
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        $user = $this->getUser($request);

        $this->validate($request, [
            'accepted_terms' => 'accepted',
            'name' => [
                Rule::unique('users')->ignore($user->id),
            ]
        ]);

        $user->update($request->all());

        return response()->json(compact('user'));
    }

    /**
     * Delete a user.
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request)
    {
        User::deleteByWallet($request);

        return response()->json(['status' => 'deleted']);
    }

    /**
     * Checking if exist user from wallet.
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function checkForRegistered(Request $request)
    {
        $wallet = $request->header('wallet');
        $user = User::byWallet($wallet)->first();

        if ($user) {
            return response()->json([
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'wallet' => $user->wallet
            ]);
        }

        return response()->json([]);
    }

    /**
     * @param  \Illuminate\Http\Request $request
     * @return \App\Models\User
     */
    protected function getUser(Request $request)
    {
        $wallet = $request->header('wallet');
        return User::byWallet($wallet)->firstOrFail();
    }
}
