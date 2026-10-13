<?php

use App\Http\Controllers\Api\VacancyController;
use Illuminate\Support\Facades\Route;

// RESTful API routes for Vacancies
Route::apiResource('vacancies', VacancyController::class);