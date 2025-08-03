

import React from "react";
import Course from "./Course";
import { useLoadUserQuery } from "@/features/api/authApi";
import { Skeleton } from "@/components/ui/skeleton";
import { BookMarked,  } from "lucide-react";

const MyLearning = () => {
  const { data, isLoading } = useLoadUserQuery();

  const myLearning = data?.user.enrolledCourses || [];

  return (
    <div className="bg-stone-50 dark:bg-stone-950 min-h-screen">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="border-b border-stone-200 dark:border-stone-800 pb-5 mb-10">
          <h1 className="font-serif font-bold text-4xl text-stone-800 dark:text-stone-200">
            My Learning
          </h1>
          <p className="mt-2 font-sans text-stone-600 dark:text-stone-400">
            Courses you have enrolled in.
          </p>
        </div>

        <div>
          {isLoading ? (
            <MyLearningSkeleton />
          ) : myLearning.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {myLearning.map((course) => (
                <Course key={course._id} course={course} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyLearning;

// --- Skeleton Component for Loading State ---
// This reuses the same detailed skeleton as the main courses page for consistency.
const MyLearningSkeleton = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {Array.from({ length: 3 }).map((_, index) => (
      <div
        key={index}
        className="bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-sm overflow-hidden"
      >
        <Skeleton className="w-full h-40 bg-stone-200 dark:bg-stone-800" />
        <div className="px-5 py-4 space-y-4">
          <Skeleton className="h-6 w-3/4 bg-stone-200 dark:bg-stone-800" />
          <div className="flex items-center gap-3">
            <Skeleton className="h-6 w-6 rounded-sm bg-stone-200 dark:bg-stone-800" />
            <Skeleton className="h-4 w-24 bg-stone-200 dark:bg-stone-800" />
          </div>
          <Skeleton className="h-5 w-20 bg-stone-200 dark:bg-stone-800" />
        </div>
      </div>
    ))}
  </div>
);

// --- Thematic Component for Empty State ---
const EmptyState = () => (
  <div className="text-center py-20 px-6 border border-dashed border-stone-300 dark:border-stone-700 rounded-sm">
    <BookMarked className="mx-auto h-12 w-12 text-stone-400 dark:text-stone-500 mb-4" />
    
    <h2 className="font-serif text-2xl font-semibold text-stone-700 dark:text-stone-300">Your course dashboard is currently empty</h2>
    <p className="mt-2 text-stone-600 dark:text-stone-400">
      Browse available courses to initiate your training.
    </p>
  </div>
);