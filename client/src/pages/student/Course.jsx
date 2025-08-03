
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import React from "react";
import { Link } from "react-router-dom";

const Course = ({ course }) => {
  return (
    <Link to={`/course-detail/${course._id}`} className="group block">
      {/* Replaced shadows and scaling with a subtle border that changes color on hover.
        This provides a more classic and less "bouncy" interaction.
      */}
      <Card className="overflow-hidden h-full rounded-sm bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-none transition-colors duration-300 group-hover:border-stone-400 dark:group-hover:border-stone-600">
        <div className="w-full h-40 bg-stone-200 dark:bg-stone-800">
          {/* Uncommented the image tag and updated the src prop */}
          <img
            src={course.courseThumbnail}
            alt="course"
            className="w-full h-36 object-cover rounded-t-lg"
          />
       
        </div>
        <CardContent className="p-4 flex flex-col justify-between flex-grow h-full">
          <div>
            <Badge
              variant="outline"
              className="rounded-sm mb-2 text-xs font-sans border-stone-300 dark:border-stone-600 text-stone-600 dark:text-stone-400"
            >
              {course.courseLevel || "All Levels"}
            </Badge>
            {/* Title uses the theme's serif font and accent color on hover */}
            <h3 className="font-serif font-bold text-lg text-stone-800 dark:text-stone-200 truncate transition-colors duration-300 group-hover:text-amber-900 dark:group-hover:text-amber-500">
              {course.courseTitle}
            </h3>

            {/* Instructor info with a square avatar */}
            <div className="flex items-center gap-2 mt-3">
              <Avatar className="h-6 w-6 rounded-sm">
                <AvatarImage src={course.creator?.photoUrl} />
                <AvatarFallback className="rounded-sm bg-stone-200 dark:bg-stone-700">
                  {course.creator?.name?.charAt(0) || "C"}
                </AvatarFallback>
              </Avatar>
              <p className="font-sans text-sm text-stone-600 dark:text-stone-400">
                {course.creator?.name}
              </p>
            </div>
          </div>

          {/* Price is prominent and uses the theme's accent color */}
          <div className="text-xl font-bold font-sans text-amber-900 dark:text-amber-600 mt-4">
            <span>${course.coursePrice}</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default Course;