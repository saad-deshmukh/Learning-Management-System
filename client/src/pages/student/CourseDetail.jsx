

import BuyCourseButton from "@/components/BuyCourseButton";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useGetCourseDetailWithStatusQuery } from "@/features/api/purchaseApi";
import { BookCheck, Clock, Library, Lock, PlayCircle, Users } from "lucide-react";
import React from "react";
import ReactPlayer from "react-player/lazy";
import { useNavigate, useParams } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";

const CourseDetail = () => {
  const params = useParams();
  const courseId = params.courseId;
  const navigate = useNavigate();
  const { data, isLoading, isError } =
    useGetCourseDetailWithStatusQuery(courseId);

  if (isLoading) return <CourseDetailSkeleton />;
  if (isError) return <ErrorState />;

  const { course, purchased } = data;

  const handleContinueCourse = () => {
    if (purchased) {
      navigate(`/course-progress/${courseId}`);
    }
  };

  return (
    <div className="bg-stone-50 dark:bg-stone-950 min-h-screen">
      {/* --- Course Header --- */}
      <header className="bg-stone-100 dark:bg-stone-900 border-b border-stone-200 dark:border-stone-800">
        <div className="max-w-7xl mx-auto py-10 px-6 space-y-3">
          <h1 className="font-serif font-bold text-4xl md:text-5xl text-stone-800 dark:text-stone-100">
            {course?.courseTitle}
          </h1>
          <p className="text-lg text-stone-600 dark:text-stone-400 max-w-3xl">
            {course?.subtitle || "An in-depth exploration of the subject matter."}
          </p>
          <div className="flex items-center gap-2 pt-2">
            <img
              src={course?.creator.avatar}
              alt={course?.creator.name}
              className="h-6 w-6 rounded-sm object-cover"
            />
            <p className="text-sm text-stone-700 dark:text-stone-300">
              Created by{" "}
              <span className="font-semibold text-amber-900 dark:text-amber-600">
                {course?.creator.name}
              </span>
            </p>
          </div>
          <div className="flex items-center gap-6 text-sm text-stone-600 dark:text-stone-400 pt-1">
            <div className="flex items-center gap-2">
              <Clock size={14} />
              <span>Last updated {new Date(course?.createdAt).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users size={14} />
              <span>{course?.enrolledStudents.length} students enrolled</span>
            </div>
          </div>
        </div>
      </header>

      {/* --- Main Content --- */}
      <main className="max-w-7xl mx-auto my-10 px-6 flex flex-col lg:flex-row justify-between gap-12">
        {/* Left Column: Description & Content */}
        <div className="w-full lg:w-[60%] space-y-10">
          <div>
            <h2 className="font-serif font-bold text-2xl text-stone-800 dark:text-stone-200 mb-4">
              Description
            </h2>
            <div
              className="prose dark:prose-invert prose-stone max-w-none"
              dangerouslySetInnerHTML={{ __html: course.description }}
            />
          </div>
          <div className="border-t border-stone-200 dark:border-stone-800 pt-10">
            <h2 className="font-serif font-bold text-2xl text-stone-800 dark:text-stone-200 mb-4">
              Course Content
            </h2>
            <div className="border border-stone-200 dark:border-stone-800 rounded-sm">
              {course.lectures.map((lecture, idx) => (
                <div key={idx} className="flex items-center gap-4 p-4 border-b border-stone-200 dark:border-stone-800 last:border-b-0">
                  <span>
                    {purchased ? <PlayCircle size={16} className="text-stone-500" /> : <Lock size={16} className="text-stone-500" />}
                  </span>
                  <p className="text-sm font-medium text-stone-700 dark:text-stone-300">{lecture.lectureTitle}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Player & Purchase Card */}
        <aside className="w-full lg:w-[35%] lg:sticky top-28 h-fit">
          <Card className="rounded-sm border-stone-200 dark:border-stone-800 shadow-none">
            <CardContent className="p-0">
              <div className="w-full aspect-video bg-stone-900">
                <ReactPlayer
                  width="100%"
                  height="100%"
                  url={course.lectures[0]?.videoUrl}
                  controls={true}
                  light={course.thumbnail} // Shows thumbnail until played
                  playing={false}
                />
              </div>
              <div className="p-6">
               <p className="text-3xl font-bold text-stone-800 dark:text-stone-200">
               ₹ <span> </span>{course.coursePrice}
               </p>
                <Separator className="my-4" />
                <p className="text-sm text-stone-600 dark:text-stone-400">
                  This course includes lifetime access to all lectures.
                </p>
              </div>
            </CardContent>
            <CardFooter className="p-6 pt-0">
              {purchased ? (
                <Button onClick={handleContinueCourse} size="lg" className="w-full rounded-sm">
                  <BookCheck className="mr-2 h-4 w-4" />
                  Continue Learning
                </Button>
              ) : (
                <BuyCourseButton courseId={courseId} />
              )}
            </CardFooter>
          </Card>
        </aside>
      </main>
    </div>
  );
};

// --- Themed Skeleton Component ---
const CourseDetailSkeleton = () => (
  <div className="space-y-5">
    <header className="bg-stone-100 dark:bg-stone-900 border-b border-stone-200 dark:border-stone-800">
      <div className="max-w-7xl mx-auto py-10 px-6 space-y-4">
        <Skeleton className="h-12 w-3/4 bg-stone-200 dark:bg-stone-800" />
        <Skeleton className="h-6 w-1/2 bg-stone-200 dark:bg-stone-800" />
        <div className="flex gap-4 pt-2">
          <Skeleton className="h-5 w-48 bg-stone-200 dark:bg-stone-800" />
          <Skeleton className="h-5 w-48 bg-stone-200 dark:bg-stone-800" />
        </div>
      </div>
    </header>
    <main className="max-w-7xl mx-auto my-10 px-6 flex flex-col lg:flex-row justify-between gap-12">
      <div className="w-full lg:w-[60%] space-y-6">
        <Skeleton className="h-8 w-48 bg-stone-200 dark:bg-stone-800" />
        <Skeleton className="h-4 w-full bg-stone-200 dark:bg-stone-800" />
        <Skeleton className="h-4 w-full bg-stone-200 dark:bg-stone-800" />
        <Skeleton className="h-4 w-2/3 bg-stone-200 dark:bg-stone-800" />
      </div>
      <aside className="w-full lg:w-[35%]">
        <Skeleton className="h-80 w-full bg-stone-200 dark:bg-stone-800 rounded-sm" />
      </aside>
    </main>
  </div>
);

// --- Themed Error State Component ---
const ErrorState = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-stone-50 dark:bg-stone-950 text-center px-4">
     <Library className="mx-auto h-12 w-12 text-stone-400 dark:text-stone-500 mb-4" />
    <h2 className="font-serif text-2xl font-semibold text-stone-700 dark:text-stone-300">An Error Occurred</h2>
    <p className="mt-2 text-stone-600 dark:text-stone-400">
      We were unable to load the details for this course.
    </p>
  </div>
);

export default CourseDetail;