<?php

namespace App\Http\Controllers;

use App\Models\Todo;
use Illuminate\Http\Request;

class TodoController extends Controller
{
    public function fetch($id){
        return Todo::where('user_id', $id)->get();
    }

    public function create(Request $request, $id){

        $request->validate(['title'=> 'required|string|unique:todos,user_id']);

        $user = Todo::create([
            'user_id' => $id,
            'title' => $request->title,
        ]);

        return response()->json($user, 201);
    }

    public function update(Request $request, $id){

        $request->validate(['title'=> 'required|string|unique:todos,user_id']);

        $todo = Todo::find($id);

        $todo->title = $request->title;

        $todo->save();

        return response()->json($todo, 201);
    }

    public function destroy($id){

        $flight = Todo::find($id);

        $flight->delete();

        return response()->json(200);
    }
}
