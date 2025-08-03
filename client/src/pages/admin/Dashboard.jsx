
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetPurchasedCoursesQuery } from "@/features/api/purchaseApi";
import { DollarSign, Library, TrendingUp } from "lucide-react";
import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const Dashboard = () => {
  const { data, isLoading, isError } = useGetPurchasedCoursesQuery();

  if (isLoading) return <DashboardSkeleton />;
  if (isError) return <ErrorState />;

  const purchasedCourses = data?.purchasedCourse || [];

  const courseData = purchasedCourses.map((course) => ({
    name: course.courseId.courseTitle.length > 20 ? `${course.courseId.courseTitle.substring(0, 20)}...` : course.courseId.courseTitle,
    price: course.courseId.coursePrice,
  }));

  const totalRevenue = purchasedCourses.reduce((acc, element) => acc + (element.amount || 0), 0);
  const totalSales = purchasedCourses.length;

  return (
    <div className="bg-stone-50 dark:bg-stone-950 p-6 md:p-8 min-h-screen">
      <header className="mb-8">
        <h1 className="font-serif text-3xl font-bold text-stone-800 dark:text-stone-200">
          Instructor Dashboard
        </h1>
        <p className="text-stone-600 dark:text-stone-400">
          An overview of your course performance.
        </p>
      </header>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2">
        {/* --- Stat Cards --- */}
        <StatCard
          title="Total Revenue"
          value={`$${totalRevenue.toFixed(2)}`}
          icon={<DollarSign className="h-6 w-6 text-stone-500 dark:text-stone-400" />}
        />
        <StatCard
          title="Total Sales"
          value={totalSales}
          icon={<Library className="h-6 w-6 text-stone-500 dark:text-stone-400" />}
        />
      </div>

      {/* --- Chart Card --- */}
      <Card className="mt-6 bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-sm shadow-none">
        <CardHeader>
          <CardTitle className="font-serif text-xl font-semibold text-stone-700 dark:text-stone-300 flex items-center gap-2">
             <TrendingUp size={20} />
             Sales Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={courseData} margin={{ top: 5, right: 20, left: -10, bottom: 50 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis
                dataKey="name"
                stroke="hsl(var(--muted-foreground))"
                angle={-45}
                textAnchor="end"
                interval={0}
                tick={{ fontSize: 12 }}
              />
              <YAxis stroke="hsl(var(--muted-foreground))" tick={{ fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--background))",
                  borderColor: "hsl(var(--border))",
                  borderRadius: '2px'
                }}
                formatter={(value) => [`$${value}`, "Price"]}
              />
              <Line
                type="monotone"
                dataKey="price"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                dot={{ fill: "hsl(var(--primary))", r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

// --- Reusable Stat Card Component ---
const StatCard = ({ title, value, icon }) => (
  <Card className="bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-sm shadow-none">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium text-stone-600 dark:text-stone-400">
        {title}
      </CardTitle>
      {icon}
    </CardHeader>
    <CardContent>
      <div className="text-3xl font-bold text-amber-900 dark:text-amber-600">
        {value}
      </div>
    </CardContent>
  </Card>
);

// --- Themed Skeleton Component ---
const DashboardSkeleton = () => (
    <div className="p-6 md:p-8">
         <header className="mb-8 space-y-2">
            <Skeleton className="h-8 w-64 bg-stone-200 dark:bg-stone-800" />
            <Skeleton className="h-5 w-80 bg-stone-200 dark:bg-stone-800" />
         </header>
         <div className="grid gap-6 grid-cols-1 sm:grid-cols-2">
            <Skeleton className="h-28 rounded-sm bg-stone-200 dark:bg-stone-800" />
            <Skeleton className="h-28 rounded-sm bg-stone-200 dark:bg-stone-800" />
         </div>
         <Skeleton className="h-96 mt-6 rounded-sm bg-stone-200 dark:bg-stone-800" />
    </div>
);

// --- Themed Error State Component ---
const ErrorState = () => (
    <div className="p-8 text-center">
        <h2 className="font-serif text-xl text-red-800 dark:text-red-500">Failed to Load Dashboard</h2>
        <p className="text-stone-600 dark:text-stone-400">There was an error fetching your performance data.</p>
    </div>
);

export default Dashboard;