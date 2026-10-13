"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import JobCard from "@/components/JobCard";
import { Search } from "lucide-react";

interface Vacancy {
  id: number;
  title: string;
  company: string;
  location: string;
  salary?: string;
}

export default function VacanciesPage() {
  const [vacancies, setVacancies] = useState<Vacancy[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/vacancies`)
      .then((response) => {
        if (active) setVacancies(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching vacancies:", error);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const filteredVacancies = vacancies.filter((vacancy) =>
    vacancy.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 mb-1">
              Dicoding Jobs Platform
            </h1>
            <p className="text-gray-600">
              Find your dream tech career opportunities.
            </p>
          </div>
          <Link
            href="/vacancies/create"
            className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-green-700 transition"
          >
            + Create Vacancy
          </Link>
        </div>

        {/* Search Bar */}
        <div className="relative mb-8">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
            <Search size={20} />
          </span>
          <input
            type="text"
            placeholder="Search job by title (e.g. Backend Developer)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          />
        </div>

        {/* List */}
        {loading ? (
          <p className="text-center text-gray-500">Loading vacancies...</p>
        ) : filteredVacancies.length > 0 ? (
          <div className="grid grid-cols-1 gap-4">
            {filteredVacancies.map((vacancy) => (
              <JobCard key={vacancy.id} {...vacancy} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No job vacancies found.</p>
        )}
      </div>
    </main>
  );
}
