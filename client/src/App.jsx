// import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import "./App.css";
// import Login from "./pages/Login";
// import HeroSection from "./pages/student/HeroSection";
// import MainLayout from "./layout/MainLayout";
// import Courses from "./pages/student/Courses";
// import MyLearning from "./pages/student/MyLearning";
// import Profile from "./pages/student/Profile";
// import Sidebar from "./pages/admin/Sidebar";
// import Dashboard from "./pages/admin/Dashboard";
// import CourseTable from "./pages/admin/course/CourseTable";
// import AddCourse from "./pages/admin/course/AddCourse";
// import EditCourse from "./pages/admin/course/EditCourse";
// import CreateLecture from "./pages/admin/lecture/CreateLecture";
// import EditLecture from "./pages/admin/lecture/EditLecture";
// import CourseDetail from "./pages/student/CourseDetail";
// import CourseProgress from "./pages/student/CourseProgress";
// import SearchPage from "./pages/student/SearchPage";
// import {
//   AdminRoute,
//   AuthenticatedUser,
//   ProtectedRoute,
// } from "./components/ProtectedRoutes";
// import PurchaseCourseProtectedRoute from "./components/PurchaseCourseProtectedRoute";
// import { ThemeProvider } from "./components/ThemeProvider";

// const appRouter = createBrowserRouter([
//   {
//     path: "/",
//     element: <MainLayout />,
//     children: [
//       {
//         path: "/",
//         element: (
//           <>
//             <HeroSection />
//             <Courses />
//           </>
//         ),
//       },
//       {
//         path: "login",
//         element: (
//           <AuthenticatedUser>
//             <Login />
//           </AuthenticatedUser>
//         ),
//       },
//       {
//         path: "my-learning",
//         element: (
//           <ProtectedRoute>
//             <MyLearning />
//           </ProtectedRoute>
//         ),
//       },
//       {
//         path: "profile",
//         element: (
//           <ProtectedRoute>
//             <Profile />
//           </ProtectedRoute>
//         ),
//       },
//       {
//         path: "course/search",
//         element: (
//           <ProtectedRoute>
//             <SearchPage />
//           </ProtectedRoute>
//         ),
//       },
//       {
//         path: "course-detail/:courseId",
//         element: (
//           <ProtectedRoute>
//             <CourseDetail />
//           </ProtectedRoute>
//         ),
//       },
//       {
//         path: "course-progress/:courseId",
//         element: (
//           <ProtectedRoute>
//             <PurchaseCourseProtectedRoute>
//             <CourseProgress />
//             </PurchaseCourseProtectedRoute>
//           </ProtectedRoute>
//         ),
//       },

//       // admin routes start from here
//       {
//         path: "admin",
//         element: (
//           <AdminRoute>
//             <Sidebar />
//           </AdminRoute>
//         ),
//         children: [
//           {
//             path: "dashboard",
//             element: <Dashboard />,
//           },
//           {
//             path: "course",
//             element: <CourseTable />,
//           },
//           {
//             path: "course/create",
//             element: <AddCourse />,
//           },
//           {
//             path: "course/:courseId",
//             element: <EditCourse />,
//           },
//           {
//             path: "course/:courseId/lecture",
//             element: <CreateLecture />,
//           },
//           {
//             path: "course/:courseId/lecture/:lectureId",
//             element: <EditLecture />,
//           },
//         ],
//       },
//     ],
//   },
// ]);

// function App() {
//   return (
//     <main>
//       <ThemeProvider>
//       <RouterProvider router={appRouter} />
//       </ThemeProvider>
//     </main>
//   );
// }

// export default App;


import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import HeroSection from "./pages/student/HeroSection";
import MainLayout from "./layout/MainLayout";
import Courses from "./pages/student/Courses";
import MyLearning from "./pages/student/MyLearning";
import Profile from "./pages/student/Profile";
import Sidebar from "./pages/admin/Sidebar";
import Dashboard from "./pages/admin/Dashboard";
import CourseTable from "./pages/admin/course/CourseTable";
import AddCourse from "./pages/admin/course/AddCourse";
import EditCourse from "./pages/admin/course/EditCourse";
import CreateLecture from "./pages/admin/lecture/CreateLecture";
import EditLecture from "./pages/admin/lecture/EditLecture";
import CourseDetail from "./pages/student/CourseDetail";
import CourseProgress from "./pages/student/CourseProgress";
import SearchPage from "./pages/student/SearchPage";
import {
  AdminRoute,
  AuthenticatedUser,
  ProtectedRoute,
} from "./components/ProtectedRoutes";
import PurchaseCourseProtectedRoute from "./components/PurchaseCourseProtectedRoute";
import { ThemeProvider } from "./components/ThemeProvider";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: (
          <>
            <HeroSection />
            <Courses />
          </>
        ),
      },
      {
        path: "login",
        element: (
          <AuthenticatedUser>
            <Login />
          </AuthenticatedUser>
        ),
      },
      {
        path: "my-learning",
        element: (
          <ProtectedRoute>
            <MyLearning />
          </ProtectedRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
      {
        path: "course/search",
        element: (
          <ProtectedRoute>
            <SearchPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "course-detail/:courseId",
        element: (
          <ProtectedRoute>
            <CourseDetail />
          </ProtectedRoute>
        ),
      },
      {
        path: "course-progress/:courseId",
        element: (
          <ProtectedRoute>
            <PurchaseCourseProtectedRoute>
              <CourseProgress />
            </PurchaseCourseProtectedRoute>
          </ProtectedRoute>
        ),
      },

      // admin routes start from here
      {
        path: "admin",
        element: (
          <AdminRoute>
            <Sidebar />
          </AdminRoute>
        ),
        children: [
          {
            path: "dashboard",
            element: <Dashboard />,
          },
          {
            path: "course",
            element: <CourseTable />,
          },
          {
            path: "course/create",
            element: <AddCourse />,
          },
          {
            path: "course/:courseId",
            element: <EditCourse />,
          },
          {
            path: "course/:courseId/lecture",
            element: <CreateLecture />,
          },
          {
            path: "course/:courseId/lecture/:lectureId",
            element: <EditLecture />,
          },
        ],
      },
    ],
  },
]);
function App() {
  return (
    <main className="min-h-screen bg-gradient-to-r from-amber-300 via-teal-300 to-blue-300 dark:from-[#0f172a] dark:via-[#164e63] dark:to-[#0e7490] bg-gradient-to-br from-pink-200 via-purple-300 to-blue-100">
      <ThemeProvider>
        <RouterProvider router={appRouter} />  
      </ThemeProvider>
    </main>
  );
}


export default App;
