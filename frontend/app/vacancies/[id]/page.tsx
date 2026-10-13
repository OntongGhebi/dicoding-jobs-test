"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import {
  Building2,
  MapPin,
  Banknote,
  ArrowLeft,
  Trash2,
  Edit,
} from "lucide-react";
import Link from "next/link";

interface Vacancy {
  id: number;
  title: string;
  company: string;
  location: string;
  description: string;
  salary?: string;
}

export default function VacancyDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const router = useRouter();
  const [vacancy, setVacancy] = useState<Vacancy | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/vacancies/${resolvedParams.id}`,
        );
        setVacancy(response.data.data);
      } catch (error) {
        console.error("Error fetching vacancy detail:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [resolvedParams.id]);

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this vacancy?")) {
      try {
        await axios.delete(
          `${process.env.NEXT_PUBLIC_API_URL}/vacancies/${resolvedParams.id}`,
        );
        alert("Vacancy deleted successfully");
        router.push("/");
      } catch (error) {
        console.error("Error deleting vacancy:", error);
      }
    }
  };

  if (loading)
    return (
      <div className="text-center py-20 text-gray-500">Loading detail...</div>
    );
  if (!vacancy)
    return (
      <div className="text-center py-20 text-gray-500">Vacancy not found.</div>
    );

  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-sm border border-gray-200 p-6 sm:p-8">
        <div className="flex justify-between items-center mb-6">
          <Link
            href="/"
            className="inline-flex items-center text-sm text-blue-600 hover:underline gap-1"
          >
            <ArrowLeft size={16} /> Back to List
          </Link>
          <div className="flex gap-2">
            <Link
              href={`/vacancies/${vacancy.id}/edit`}
              className="inline-flex items-center gap-1 bg-amber-500 text-white px-3 py-1.5 rounded-md text-sm font-semibold hover:bg-amber-600 transition"
            >
              <Edit size={16} /> Edit
            </Link>
            <button
              onClick={handleDelete}
              className="inline-flex items-center gap-1 bg-red-600 text-white px-3 py-1.5 rounded-md text-sm font-semibold hover:bg-red-700 transition"
            >
              <Trash2 size={16} /> Delete
            </button>
          </div>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-3">
          {vacancy.title}
        </h1>

        <div className="flex flex-wrap items-center text-gray-600 text-sm mb-4 gap-6">
          <span className="flex items-center gap-1">
            <Building2 size={18} className="text-gray-400" /> {vacancy.company}
          </span>
          <span className="flex items-center gap-1">
            <MapPin size={18} className="text-gray-400" /> {vacancy.location}
          </span>
        </div>

        {vacancy.salary && (
          <div className="flex items-center text-green-600 font-semibold text-base mb-6 gap-1">
            <Banknote size={20} /> {vacancy.salary}
          </div>
        )}

        <hr className="mb-6 border-gray-100" />

        <h2 className="text-lg font-bold text-gray-900 mb-2">
          Job Description
        </h2>
        <div className="text-gray-700 whitespace-pre-line leading-relaxed">
          {vacancy.description}
        </div>
      </div>
    </main>
  );
}
