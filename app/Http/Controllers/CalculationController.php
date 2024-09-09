<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Constant;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CalculationController extends Controller
{
    public function index()
    {
        $constants = Constant::get();
        return Inertia::render('Welcome', ["constants" => $constants->toArray()]);
    }
}
