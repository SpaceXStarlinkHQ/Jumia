import { Link } from "wouter";
import { PackageSearch } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center py-20">
      <div className="text-center max-w-md mx-auto px-4">
        <div className="w-24 h-24 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <PackageSearch className="w-12 h-12 text-[#F68B1E]" />
        </div>
        <h1 className="text-4xl font-black text-gray-900 mb-2">404</h1>
        <h2 className="text-xl font-bold text-gray-800 mb-3">Page Not Found</h2>
        <p className="text-gray-500 text-sm mb-8 leading-relaxed">
          The page you're looking for doesn't exist or has been moved.
          Let's get you back to shopping!
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="px-8 py-3 bg-[#F68B1E] text-white font-bold rounded shadow-md hover:bg-[#E07B10] uppercase text-sm transition-colors"
          >
            Back to Home
          </Link>
          <Link
            href="/?category=Electronics"
            className="px-8 py-3 border border-[#F68B1E] text-[#F68B1E] font-bold rounded hover:bg-orange-50 uppercase text-sm transition-colors"
          >
            Browse Products
          </Link>
        </div>
      </div>
    </div>
  );
}
