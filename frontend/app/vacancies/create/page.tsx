"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function CreateVacancyPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    description: "",
    salary: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/vacancies`,
        formData,
      );

      setFormData({
        title: "",
        company: "",
        location: "",
        description: "",
        salary: "",
      });

      alert("Vacancy created successfully!");
      router.push("/");
    } catch (error: unknown) {
      console.error("Error creating vacancy:", error);
      alert("Failed to create vacancy. Please check inputs.");
    } finally {
      setLoading(false);
    }
  };

  const getInputClassName = (value: string) => {
    return `w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition ${
      value ? "text-gray-900 font-medium" : "text-gray-400"
    }`;
  };

  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-sm border border-gray-200 p-6 sm:p-8">
        <Link
          href="/"
          className="inline-flex items-center text-sm text-blue-600 hover:underline gap-1 mb-6"
        >
          <ArrowLeft size={16} /> Back to List
        </Link>

        <h1 className="text-2xl font-extrabold text-gray-900 mb-6">
          Create New Job Vacancy
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
              className={getInputClassName(formData.title)}
              placeholder="e.g. Product Engineer"
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
              className={getInputClassName(formData.company)}
              placeholder="e.g. Dicoding Indonesia"
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
              className={getInputClassName(formData.location)}
              placeholder="e.g. Bandung / Remote"
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
              className={getInputClassName(formData.salary)}
              placeholder="e.g. Rp 8.000.000 - Rp 12.000.000"
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
              className={getInputClassName(formData.description)}
              placeholder="Describe job requirements and responsibilities..."
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2.5 rounded-md font-semibold hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? "Saving..." : "Publish Vacancy"}
          </button>
        </form>
      </div>
    </main>
  );
}
