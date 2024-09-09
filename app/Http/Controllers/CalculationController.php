<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Imports\TimeTableImport;
use App\Models\Constant;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Maatwebsite\Excel\Facades\Excel;

class CalculationController extends Controller
{
    public function index()
    {
        $constants = Constant::get();
        return Inertia::render('Welcome', ["constants" => $constants->toArray()]);
    }
    public function calculate(Request $request){
        $request->validate([
            'excel' => 'required|mimes:xlsx,xls|max:2048'
        ]);
        // Parse the Excel file and import the data
       Excel::import(new TimeTableImport, $request->file('excel'));

        // Perform calculations with the data (e.g., sum a column)
//        $result = $this->performCalculations($data);

        return response()->json([
            'success' => true,
            'data' => $data,
        ]);
    }
    public function downloadExcel(){
        $filePath = public_path('files/shift.xlsx'); // File path to the Excel file
logger()->info($filePath);
        // Ensure the file exists before returning it
        if (file_exists($filePath)) {
            return response()->download('files/shift.xlsx');
        }

        // Handle the case where the file is missing
        return redirect()->back()->withErrors(['File not found.']);
    }
}
