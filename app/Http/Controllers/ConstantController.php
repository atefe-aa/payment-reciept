<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Constant;
use Illuminate\Http\Request;

class ConstantController extends Controller
{
    public function update(Request $request){
        $incomingData =$request->validate([
            'id'=>'required|integer|exists:constants,id',
            'value'=>'required|integer'
        ]);
        $constant = Constant::whereId($incomingData['id'])->first();
        if($constant){
            $constant->update($incomingData);
            return back()->with('status','success');
        }

return back()->with('status','failed');
    }
}
