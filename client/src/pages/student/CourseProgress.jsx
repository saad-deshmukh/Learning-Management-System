

import { Button } from "@/components/ui/button";
import {
  useCompleteCourseMutation,
  useGetCourseProgressQuery,
  useInCompleteCourseMutation,
  useUpdateLectureProgressMutation,
} from "@/features/api/courseProgressApi";
import { BookUp, Check, Circle, Library } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";

const CourseProgress = () => {
  const params = useParams();
  const courseId = params.courseId;
  const { data, isLoading, isError, refetch } =
    useGetCourseProgressQuery(courseId);

  const [updateLectureProgress] = useUpdateLectureProgressMutation();
  const [completeCourse, { data: markCompleteData, isSuccess: completedSuccess }] =
    useCompleteCourseMutation();
  const [inCompleteCourse, { data: markInCompleteData, isSuccess: inCompletedSuccess }] =
    useInCompleteCourseMutation();

  const [currentLecture, setCurrentLecture] = useState(null);

  useEffect(() => {
    if (completedSuccess) {
      refetch();
      toast.success(markCompleteData.message);
    }
    if (inCompletedSuccess) {
      refetch();
      toast.success(markInCompleteData.message);
    }
  }, [completedSuccess, inCompletedSuccess, markCompleteData, markInCompleteData, refetch]);

  if (isLoading) return <CourseProgressSkeleton />;
  if (isError) return <ErrorState />;

  const { courseDetails, progress, completed } = data.data;
  const { courseTitle, lectures } = courseDetails;

  const initialLecture = currentLecture || (lectures && lectures[0]);

  const isLectureCompleted = (lectureId) => {
    return progress.some((prog) => prog.lectureId === lectureId && prog.viewed);
  };

  const handleLectureProgress = async (lectureId) => {
    if (!lectureId) return;
    await updateLectureProgress({ courseId, lectureId });
    refetch();
  };

  const handleSelectLecture = (lecture) => {
    setCurrentLecture(lecture);
    handleLectureProgress(lecture._id);
  };

  const handleCompleteCourse = () => completeCourse(courseId);
  const handleInCompleteCourse = () => inCompleteCourse(courseId);

  return (
    <div className="flex h-screen bg-stone-100 dark:bg-stone-950">
      {/* --- Left Panel: Syllabus / Lecture List --- */}
      <aside className="w-80 h-full flex-col border-r border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900 hidden lg:flex">
        <div className="p-5 border-b border-stone-200 dark:border-stone-800">
          <h2 className="font-serif text-xl font-bold text-stone-800 dark:text-stone-200 truncate">
            {courseTitle}
          </h2>
          <p className="text-sm text-stone-500 dark:text-stone-400">Course Syllabus</p>
        </div>
        <nav className="flex-1 overflow-y-auto">
          {lectures.map((lecture, index) => (
            <button
              key={lecture._id}
              onClick={() => handleSelectLecture(lecture)}
              className={`w-full text-left flex items-start gap-4 p-4 text-sm transition-colors ${
                lecture._id === initialLecture?._id
                  ? "bg-stone-200/60 dark:bg-stone-800/60"
                  : "hover:bg-stone-100 dark:hover:bg-stone-800/40"
              }`}
            >
              <div className="mt-1">
                {isLectureCompleted(lecture._id) ? (
                  <Check size={16} className="text-amber-700 dark:text-amber-600 shrink-0" />
                ) : (
                  <Circle size={16} className="text-stone-400 dark:text-stone-500 shrink-0" />
                )}
              </div>
              <div>
                <p className="font-medium text-stone-800 dark:text-stone-200">Chapter {index + 1}</p>
                <p className="text-stone-600 dark:text-stone-400">{lecture.lectureTitle}</p>
              </div>
            </button>
          ))}
        </nav>
      </aside>

      {/* --- Right Panel: Video Player & Controls --- */}
      <main className="flex-1 flex flex-col">
        <div className="flex-1 p-4 md:p-8 flex items-center justify-center">
          <div className="w-full max-w-5xl aspect-video bg-black rounded-sm border border-stone-200 dark:border-stone-800">
            <video
              key={initialLecture?._id} // Force re-render on lecture change
              src={initialLecture?.videoUrl}
              controls
              autoPlay
              className="w-full h-full"
              onPlay={() => handleLectureProgress(initialLecture?._id)}
            />
          </div>
        </div>
        <footer className="flex items-center justify-between p-4 border-t border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900">
          <div>
             <h3 className="font-serif font-semibold text-lg text-stone-800 dark:text-stone-200">
                {initialLecture?.lectureTitle}
             </h3>
             <p className="text-sm text-stone-500 dark:text-stone-400">
                Chapter {lectures.findIndex(lec => lec._id === initialLecture?._id) + 1} of {lectures.length}
             </p>
          </div>
          <Button
            onClick={completed ? handleInCompleteCourse : handleCompleteCourse}
            variant={completed ? "outline" : "default"}
            className="rounded-sm"
          >
            <BookUp className="mr-2 h-4 w-4" />
            {completed ? "Mark as In-Progress" : "Mark Course as Completed"}
          </Button>
        </footer>
      </main>
    </div>
  );
};

// --- Themed Skeleton Component ---
const CourseProgressSkeleton = () => (
    <div className="flex h-screen bg-stone-100 dark:bg-stone-950">
      <aside className="w-80 h-full flex-col border-r border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900 hidden lg:flex">
        <div className="p-5 border-b border-stone-200 dark:border-stone-800 space-y-2">
            <Skeleton className="h-6 w-3/4 bg-stone-200 dark:bg-stone-800"/>
            <Skeleton className="h-4 w-1/2 bg-stone-200 dark:bg-stone-800"/>
        </div>
        <div className="p-4 space-y-4">
            {Array.from({length: 6}).map((_, i) => (
                <div key={i} className="flex items-start gap-4">
                    <Skeleton className="h-5 w-5 mt-1 bg-stone-200 dark:bg-stone-800"/>
                    <div className="space-y-2 flex-1">
                        <Skeleton className="h-5 w-1/3 bg-stone-200 dark:bg-stone-800"/>
                        <Skeleton className="h-4 w-full bg-stone-200 dark:bg-stone-800"/>
                    </div>
                </div>
            ))}
        </div>
      </aside>
      <main className="flex-1 flex flex-col">
        <div className="flex-1 p-4 md:p-8 flex items-center justify-center">
            <Skeleton className="w-full max-w-5xl aspect-video bg-stone-200 dark:bg-stone-800 rounded-sm"/>
        </div>
        <footer className="flex items-center justify-between p-4 border-t border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900">
            <div className="space-y-2">
                <Skeleton className="h-6 w-48 bg-stone-200 dark:bg-stone-800"/>
                <Skeleton className="h-4 w-32 bg-stone-200 dark:bg-stone-800"/>
            </div>
            <Skeleton className="h-10 w-48 bg-stone-200 dark:bg-stone-800 rounded-sm"/>
        </footer>
      </main>
    </div>
);

// --- Themed Error State Component ---
const ErrorState = () => (
    <div className="min-h-screen flex flex-col items-center justify-center bg-stone-50 dark:bg-stone-950 text-center px-4">
       <Library className="mx-auto h-12 w-12 text-stone-400 dark:text-stone-500 mb-4" />
      <h2 className="font-serif text-2xl font-semibold text-stone-700 dark:text-stone-300">Could Not Load Course</h2>
      <p className="mt-2 text-stone-600 dark:text-stone-400">
        We were unable to load the progress for this course. Please try again later.
      </p>
    </div>
  );

export default CourseProgress;