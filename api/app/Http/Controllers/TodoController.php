<?php

namespace App\Http\Controllers;

use App\Models\Todo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class TodoController extends Controller
{
    public function fetch_todo($id){
        $todo_list =  Todo::where('user_id', $id)->where('done', 0)->orderBy('created_at', 'desc')->get();
        return response()->json($todo_list, 200);
    }

    public function fetch_done($id)
    {
        $todo_list =  Todo::where('user_id', $id)->where('done', 1)->orderBy('created_at', 'desc')->get();
        return response()->json($todo_list, 200);
    }

    public function create(Request $request, $id){

        $fields = Validator::make(
            $request->all(),
            [
                'title' => 'required|string'
            ]
        );

        if ($fields->fails()) {
            return response()->json($fields->errors(), 400);
        }

        $user = Todo::create([
            'user_id' => $id,
            'title' => $request->title,
            'done' => 0
        ]);

        return response()->json($user, 201);
    }

    public function update(Request $request, $id){

        $fields = Validator::make(
            $request->all(),
            [
                'title' => 'required|string'
            ]
        );

        if ($fields->fails()) {
            return response()->json($fields->errors(), 400);
        }

        $todo = Todo::find($id);

        $todo->title = $request->title;

        $todo->save();

        return response()->json(201);
    }

    public function search(Request $request, $id){
        
        if ($request->title == '') {
            return response()->json([]);
        }
        $results = Todo::where('title', 'like', '%'.$request->title.'%')->where('user_id', $id)->get();
        return response()->json($results, 200);
    }

    public function destroy($id){

        $flight = Todo::find($id);

        $flight->delete();

        return response()->json(200);
    }

    public function done($id){
        $item = Todo::find($id);

        if ($item->done) {
            $item->done = 0;
        }else{
            $item->done = 1;
        }

        $item->save();

        return response()->json(201);
        
    }
}