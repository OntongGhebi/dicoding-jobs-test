"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function EditVacancyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    description: "",
    salary: "",
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/vacancies/${resolvedParams.id}`,
        );
        setFormData(response.data.data);
      } catch (error) {
        console.error("Error fetching detail:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [resolvedParams.id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/vacancies/${resolvedParams.id}`,
        formData,
      );
      alert("Vacancy updated successfully!");
      router.push(`/vacancies/${resolvedParams.id}`);
    } catch (error) {
      console.error("Error updating vacancy:", error);
      alert("Failed to update vacancy.");
    } finally {
      setSubmitting(false);
    }
  };

  const inputClassName =
    "w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-900 font-medium transition";

  if (loading)
    return (
      <div className="text-center py-20 text-gray-500">Loading form...</div>
    );

  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-sm border border-gray-200 p-6 sm:p-8">
        <Link
          href={`/vacancies/${resolvedParams.id}`}
          className="inline-flex items-center text-sm text-blue-600 hover:underline gap-1 mb-6"
        >
          <ArrowLeft size={16} /> Back to Detail
        </Link>

        <h1 className="text-2xl font-extrabold text-gray-900 mb-6">
          Edit Job Vacancy
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Job Title
            </label>
            <input
              type="text"
              name="title"
              required
              value={formData.title}
              onChange={handleChange}
              className={inputClassName}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Company Name
            </label>
            <input
              type="text"
              name="company"
              required
              value={formData.company}
              onChange={handleChange}
              className={inputClassName}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Location
            </label>
            <input
              type="text"
              name="location"
              required
              value={formData.location}
              onChange={handleChange}
              className={inputClassName}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Salary (Optional)
            </label>
            <input
              type="text"
              name="salary"
              value={formData.salary}
              onChange={handleChange}
              className={inputClassName}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              name="description"
              required
              rows={5}
              value={formData.description}
              onChange={handleChange}
              className={inputClassName}
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-amber-500 text-white py-2.5 rounded-md font-semibold hover:bg-amber-600 transition disabled:opacity-50"
          >
            {submitting ? "Updating..." : "Save Changes"}
          </button>
        </form>
      </div>
    </main>
  );
}
