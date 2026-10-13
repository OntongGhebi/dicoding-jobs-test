import Link from "next/link";
import { Building2, MapPin, Banknote } from "lucide-react";

interface JobCardProps {
  id: number;
  title: string;
  company: string;
  location: string;
  salary?: string;
}

export default function JobCard({
  id,
  title,
  company,
  location,
  salary,
}: JobCardProps) {
  return (
    <div className="border border-gray-200 rounded-lg p-5 shadow-sm hover:shadow-md transition bg-white flex flex-col justify-between">
      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-1">{title}</h3>
        <div className="flex items-center text-gray-600 text-sm mb-2 gap-4">
          <span className="flex items-center gap-1">
            <Building2 size={16} /> {company}
          </span>
          <span className="flex items-center gap-1">
            <MapPin size={16} /> {location}
          </span>
        </div>
        {salary && (
          <div className="flex items-center text-green-600 font-medium text-sm mb-4 gap-1">
            <Banknote size={16} /> {salary}
          </div>
        )}
      </div>
      <Link
        href={`/vacancies/${id}`}
        className="inline-block text-center bg-blue-600 text-white py-2 px-4 rounded-md text-sm font-semibold hover:bg-blue-700 transition"
      >
        View Details
      </Link>
    </div>
  );
}
