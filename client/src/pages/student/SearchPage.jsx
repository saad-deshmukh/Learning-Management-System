

import React, { useState } from "react";
import Filter from "./Filter";
import SearchResult from "./SearchResult";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetSearchCourseQuery } from "@/features/api/courseApi";
import { Link, useSearchParams } from "react-router-dom";
import { BookX } from "lucide-react";
import { Button } from "@/components/ui/button";

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sortByPrice, setSortByPrice] = useState("");

  const { data, isLoading } = useGetSearchCourseQuery({
    searchQuery: query,
    categories: selectedCategories,
    sortByPrice,
  });

  const isEmpty = !isLoading && data?.courses.length === 0;

  const handleFilterChange = (categories, price) => {
    setSelectedCategories(categories);
    setSortByPrice(price);
  };

  return (
    <div className="bg-stone-50 dark:bg-stone-950 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* --- Header --- */}
        <div className="mb-10 border-b border-stone-200 dark:border-stone-800 pb-6">
          <p className="font-sans text-stone-600 dark:text-stone-400">Search Results</p>
          <h1 className="font-serif text-4xl font-bold text-stone-800 dark:text-stone-200">
            "{query}"
          </h1>
        </div>

        <div className="flex flex-col md:flex-row gap-10">
          
          <Filter handleFilterChange={handleFilterChange} />

          
          <div className="flex-1 space-y-6">
            {isLoading
              ? Array.from({ length: 3 }).map((_, idx) => <CourseSkeleton key={idx} />)
              : isEmpty
              ? <CourseNotFound />
              : data?.courses?.map((course) => <SearchResult key={course._id} course={course} />)
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;

// --- Themed "Not Found" Component ---
const CourseNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center p-10 border border-dashed border-stone-300 dark:border-stone-700 rounded-sm">
      <BookX className="h-12 w-12 text-stone-500 dark:text-stone-400 mb-4" />
      <h2 className="font-serif text-2xl font-bold text-stone-800 dark:text-stone-200 mb-2">
        No Results Found
      </h2>
      <p className="text-stone-600 dark:text-stone-400 mb-6 max-w-md">
        Your search yielded no results. Try adjusting your filters or searching for a different term.
      </p>
      <Link to="/">
        <Button variant="link" className="text-amber-800 dark:text-amber-600">
          Browse the Full Catalogue
        </Button>
      </Link>
    </div>
  );
};

// --- Themed Skeleton for Search Results ---
const CourseSkeleton = () => {
  return (
    <div className="flex flex-col md:flex-row gap-6 border-b border-stone-200 dark:border-stone-800 pb-6">
      <Skeleton className="h-40 w-full md:w-56 bg-stone-200 dark:bg-stone-800 rounded-sm shrink-0" />
      <div className="flex-1 space-y-3">
        <Skeleton className="h-6 w-3/4 bg-stone-200 dark:bg-stone-800" />
        <Skeleton className="h-4 w-1/2 bg-stone-200 dark:bg-stone-800" />
        <div className="flex items-center gap-2 pt-2">
          <Skeleton className="h-5 w-5 rounded-sm bg-stone-200 dark:bg-stone-800" />
          <Skeleton className="h-4 w-24 bg-stone-200 dark:bg-stone-800" />
        </div>
        <Skeleton className="h-5 w-16 pt-2 bg-stone-200 dark:bg-stone-800" />
      </div>
    </div>
  );
};