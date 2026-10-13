<?php

namespace Tests\Feature\Api;

use App\Models\Vacancy;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class VacancyApiTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function it_can_list_all_vacancies()
    {
        Vacancy::factory()->create([
            'title' => 'Product Engineer'
        ]);

        $response = $this->getJson('/api/vacancies');

        $response->assertStatus(200)
                 ->assertJsonStructure([
                     'success',
                     'message',
                     'data' => [
                         '*' => ['id', 'title', 'company', 'location', 'description', 'salary', 'created_at', 'updated_at']
                     ]
                 ]);
    }

    /** @test */
    public function it_can_create_a_vacancy_with_valid_data()
    {
        $payload = [
            'title' => 'Frontend Engineer',
            'company' => 'Dicoding Indonesia',
            'location' => 'Remote',
            'description' => 'Mengembangkan antarmuka aplikasi menggunakan Next.js.',
            'salary' => 'Rp 10.000.000'
        ];

        $response = $this->postJson('/api/vacancies', $payload);

        $response->assertStatus(201)
                 ->assertJson([
                     'success' => true,
                     'message' => 'Vacancy created successfully',
                 ]);

        $this->assertDatabaseHas('vacancies', [
            'title' => 'Frontend Engineer',
            'company' => 'Dicoding Indonesia'
        ]);
    }

    /** @test */
    public function it_fails_validation_when_creating_vacancy_without_required_fields()
    {
        $response = $this->postJson('/api/vacancies', []);

        $response->assertStatus(422)
                 ->assertJsonValidationErrors(['title', 'company', 'location', 'description']);
    }

    /** @test */
    public function it_can_show_vacancy_detail()
    {
        $vacancy = Vacancy::factory()->create();

        $response = $this->getJson("/api/vacancies/{$vacancy->id}");

        $response->assertStatus(200)
                 ->assertJson([
                     'success' => true,
                     'data' => [
                         'id' => $vacancy->id,
                         'title' => $vacancy->title
                     ]
                 ]);
    }
}
