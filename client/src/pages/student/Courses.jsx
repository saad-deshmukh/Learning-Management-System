
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";
import Course from "./Course"; // We'll create a matching Course component below
import { useGetPublishedCourseQuery } from "@/features/api/courseApi";

const Courses = () => {
  const { data, isLoading, isError } = useGetPublishedCourseQuery();

  if (isError) return <h1>Some error occurred while fetching courses.</h1>;

  return (
    // 1. Changed background to the 'stone' palette for thematic consistency
    <div className="bg-stone-100 dark:bg-stone-950">
      <div className="max-w-7xl mx-auto px-6 py-20">
        {/* 2. Applied serif font and theme colors to the heading */}
        <h2 className="font-serif font-bold text-4xl text-stone-800 dark:text-stone-200 text-center mb-12">
          Our Course Catalogue
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {isLoading
            ? Array.from({ length: 8 }).map((_, index) => (
                <CourseSkeleton key={index} />
              ))
            : data?.courses &&
              data.courses.map((course) => (
                <Course key={course._id} course={course} />
              ))}
        </div>
      </div>
    </div>
  );
};

export default Courses;

const CourseSkeleton = () => {
  return (
    // 3. Replaced shadow with a border, removed rounded corners for a sharp look
    <div className="bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-sm overflow-hidden">
      {/* 4. Themed the skeleton component's color */}
      <Skeleton className="w-full h-40 bg-stone-200 dark:bg-stone-800" />
      <div className="px-5 py-4 space-y-4">
        <Skeleton className="h-6 w-3/4 bg-stone-200 dark:bg-stone-800" />
        <div className="flex items-center gap-3">
          {/* 5. Changed avatar from rounded-full to a square to match the theme */}
          <Skeleton className="h-6 w-6 rounded-sm bg-stone-200 dark:bg-stone-800" />
          <Skeleton className="h-4 w-24 bg-stone-200 dark:bg-stone-800" />
        </div>
        <Skeleton className="h-5 w-20 bg-stone-200 dark:bg-stone-800" />
      </div>
    </div>
  );
};