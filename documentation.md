# 💼 Dicoding Jobs Platform — Product Engineer Technical Test

Welcome to the **Dicoding Jobs Platform** repository! This project is a full-stack job vacancy management system built as part of the Product Engineer technical assessment for Dicoding Indonesia. It empowers **Recruiters** to post and manage job openings and enables **Job Seekers** to explore and search for career opportunities seamlessly.

## 📐 System Architecture & Tech Stack

This repository is structured as a monorepo containing both backend and frontend applications:

* **Backend:** Laravel 11 (PHP 8.2+) — RESTful API with validation, controller logic, and automated tests.

* **Frontend:** Next.js 15 (App Router), React 19, TypeScript, and Tailwind CSS.

* **Database:** PostgreSQL (Neon Serverless PostgreSQL).

* **E2E Testing:** Playwright.

* **Unit/Integration Testing:** Pest PHP / PHPUnit.

## 📁 Repository Structure

```
dicoding_jobs/
├── backend/                  # Laravel 11 RESTful API
│   ├── app/
│   │   ├── Http/Controllers/ # Vacancy API Controllers
│   │   └── Models/           # Vacancy Model & Business Logic
│   ├── routes/api.php        # API Endpoints (/api/vacancies)
│   └── tests/                # Feature & Unit Tests (Pest/PHPUnit)
├── frontend/                 # Next.js 15 Frontend Application
│   ├── app/
│   │   ├── page.tsx          # Vacancy Listing & Search UI
│   │   └── vacancies/
│   │       ├── create/       # Create Vacancy Form
│   │       └── [id]/         # Detail & Edit Vacancy Pages
│   └── e2e/                  # Playwright E2E Test Suite
└── README.md                 # Project Documentation

```

## 🚀 Getting Started

Follow the step-by-step instructions below to run both the backend and frontend services on your local machine.

### Prerequisites

Make sure you have the following tools installed on your system:

* **PHP** `>= 8.2` & **Composer**

* **Node.js** `>= 18.x` & **npm**

* **PostgreSQL** database instance (or Neon PostgreSQL connection string)

### Step 1: Backend Setup (Laravel)

1. Navigate to the `backend` directory:

   ```
   cd backend
   
   ```

2. Install PHP dependencies:

   ```
   composer install
   
   ```

3. Configure Environment Variables:
   Copy `.env.example` to `.env`:

   ```
   cp .env.example .env
   
   ```

   Open `.env` and configure your database credentials:

   ```
   DB_CONNECTION=pgsql
   DB_HOST=your-neon-db-host.neon.tech
   DB_PORT=5432
   DB_DATABASE=your_db_name
   DB_USERNAME=your_db_user
   DB_PASSWORD=your_db_password
   
   ```

4. Generate Application Key:

   ```
   php artisan key:generate
   
   ```

5. Publish CORS Configuration (if needed):

   ```
   php artisan config:publish cors
   
   ```

6. Run Database Migrations & Seeders:

   ```
   php artisan migrate --seed
   
   ```

7. Start the Laravel Backend Development Server:

   ```
   php artisan serve
   
   ```

   The API will be available at **`http://127.0.0.1:8000`**.

### Step 2: Frontend Setup (Next.js)

1. Open a new terminal tab and navigate to the `frontend` directory:

   ```
   cd frontend
   
   ```

2. Install Node.js dependencies:

   ```
   npm install
   
   ```

3. Configure Environment Variables:
   Create a `.env.local` file in the root of the `frontend` directory:

   ```
   NEXT_PUBLIC_API_URL=http://127.0.0.1:8000/api
   
   ```

4. Start the Next.js Development Server:

   ```
   npm run dev
   
   ```

   The frontend application will run at **`http://localhost:3000`**.

## 📡 API Endpoints Overview

| Method | Endpoint | Description | 
| ----- | ----- | ----- | 
| `GET` | `/api/vacancies` | Retrieve all job vacancies (supports `?search=` query) | 
| `POST` | `/api/vacancies` | Store a new job vacancy | 
| `GET` | `/api/vacancies/{id}` | Retrieve details of a specific vacancy | 
| `PUT` | `/api/vacancies/{id}` | Update an existing job vacancy (Optional Feature) | 
| `DELETE` | `/api/vacancies/{id}` | Delete a job vacancy by ID (Optional Feature) | 

## 🧪 Running Automated Tests

### 1. Backend Testing (Laravel Unit & Integration Tests)

Navigate to the `backend` directory and execute:

```
php artisan test

```

### 2. Frontend Testing (Playwright E2E Tests)

Ensure the Laravel backend is running, then navigate to the `frontend` directory and execute:

```
npx playwright test

```

To run tests in interactive **UI Mode**:

```
npx playwright test --ui

```

## ✨ Features & UX Enhancements

* **Form State Reset:** Automatically clears input state after successful vacancy submission.

* **Dynamic Input Text Styling:** Input text seamlessly shifts from placeholder gray (`text-gray-400`) to high-contrast dark text (`text-gray-900`) once filled by the user.

* **Automated Playwright WebServer Integration:** E2E suite automatically handles and verifies server status prior to test execution.

## 👤 Author

Developed for the **Dicoding Product Engineer Technical Test**.