<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreVacancyRequest;
use App\Models\Vacancy;
use Illuminate\Http\JsonResponse;

class VacancyController extends Controller
{
    // Mandatory: List Vacancies
    public function index(): JsonResponse
    {
        $vacancies = Vacancy::latest()->get();
        return response()->json([
            'success' => true,
            'message' => 'List of all job vacancies',
            'data' => $vacancies
        ], 200);
    }

    // Mandatory: Create Vacancy
    public function store(StoreVacancyRequest $request): JsonResponse
    {
        $vacancy = Vacancy::create($request->validated());

        return response()->json([
            'success' => true,
            'message' => 'Vacancy created successfully',
            'data' => $vacancy
        ], 201);
    }

    // Mandatory: Detail Vacancy
    public function show(Vacancy $vacancy): JsonResponse
    {
        return response()->json([
            'success' => true,
            'message' => 'Detail vacancy data',
            'data' => $vacancy
        ], 200);
    }

    // Optional: Update Vacancy
    public function update(StoreVacancyRequest $request, Vacancy $vacancy): JsonResponse
    {
        $vacancy->update($request->validated());

        return response()->json([
            'success' => true,
            'message' => 'Vacancy updated successfully',
            'data' => $vacancy
        ], 200);
    }

    // Optional: Delete Vacancy
    public function destroy(Vacancy $vacancy): JsonResponse
    {
        $vacancy->delete();

        return response()->json([
            'success' => true,
            'message' => 'Vacancy deleted successfully'
        ], 200);
    }
}
