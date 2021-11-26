<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    public function register(Request $request){
        
        $fields = Validator::make(
            $request->all(),
            [
                'f_name' => 'required|string|regex:/(^([a-zA-Z]+)(\d+)?$)/u',
                'l_name' => 'required|string|regex:/(^([a-zA-Z]+)(\d+)?$)/u',
                'email' => 'required|email|unique:users,email',
                'password' => 'required|string|confirmed'
            ]);

        if ($fields->fails()) {
            return response()->json($fields->errors(), 400);
        }

        $user = User::create([
            'f_name' => $request['f_name'],
            'l_name' => $request['l_name'],
            'email' => $request['email'],
            'password' => bcrypt($request['password'])
        ]);

        return response()->json($user, 200);
    }

    public function login(Request $request){
        
        $fields = Validator::make(
            $request->all(),
            [
                'email' => 'required',
                'password' => 'required'
            ]);
        
        if ($fields->fails()) {
            return response()->json($fields->errors(), 400);
        }

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request['password'], $user->password)) {
            return response()->json(['msg'=>'You have entered wrong Email/Password, please check and try again'], 401);
        }

        return response()->json($user, 200);
    }

    public function update(Request $request, $id){

        $request->validate([
            'f_name' => 'required|string|regex:/(^([a-zA-Z]+)(\d+)?$)/u',
            'l_name' => 'required|string|regex:/(^([a-zA-Z]+)(\d+)?$)/u',
            'password' => 'required|string'
        ]);

        $user = User::find($id);

        $user->f_name = $request->f_name;
        $user->l_name = $request->l_name;
        $user->password = $request->password;
        $user->save();

        return response()->json($user, 201);
    }
}
