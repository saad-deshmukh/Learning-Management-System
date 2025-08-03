
import { Menu, GraduationCap, LogOut, User, LayoutDashboard, Library } from "lucide-react";
import React, { useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import DarkMode from "@/DarkMode";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Link, useNavigate } from "react-router-dom";
import { useLogoutUserMutation } from "@/features/api/authApi";
import { toast } from "sonner";
import { useSelector } from "react-redux";

// --- Main Navbar Component ---
const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const [logoutUser, { data, isSuccess }] = useLogoutUserMutation();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    await logoutUser();
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message || "You have been logged out.");
      navigate("/login");
    }
  }, [isSuccess, data, navigate]);

  return (
    // Themed navbar with a blurred background effect
    <div className="h-16 bg-stone-50/80 dark:bg-stone-950/80 backdrop-blur-sm border-b border-stone-200 dark:border-stone-800 fixed top-0 left-0 right-0 z-50">
      
      <div className="max-w-7xl mx-auto hidden md:flex justify-between items-center h-full px-6">
        
        <Link to="/" className="flex items-center gap-2 group">
          <GraduationCap className="h-7 w-7 text-stone-700 dark:text-stone-300 group-hover:text-amber-900 dark:group-hover:text-amber-500 transition-colors" />
          <h1 className="font-serif font-bold text-2xl text-stone-800 dark:text-stone-200">
            CourseVerse
          </h1>
        </Link>

        {/* User actions and Dark Mode */}
        <div className="flex items-center gap-4">
          {user ? (
            <UserMenu user={user} onLogout={logoutHandler} />
          ) : (
            <div className="flex items-center gap-2">
              <Button variant="ghost" onClick={() => navigate("/login")}>
                Login
              </Button>
              <Button
                onClick={() => navigate("/login")}
                className="bg-stone-800 text-stone-100 hover:bg-stone-700 dark:bg-stone-200 dark:text-stone-900 dark:hover:bg-stone-300 rounded-sm"
              >
                Sign Up
              </Button>
            </div>
          )}
          <DarkMode />
        </div>
      </div>

      
      <div className="flex md:hidden items-center justify-between px-4 h-full">
        <Link to="/" className="flex items-center gap-2">
           <GraduationCap className="h-6 w-6 text-stone-700 dark:text-stone-300" />
           <h1 className="font-serif font-bold text-xl text-stone-800 dark:text-stone-200">CourseVerse</h1>
        </Link>
        <MobileNavbar user={user} onLogout={logoutHandler} />
      </div>
    </div>
  );
};


const UserMenu = ({ user, onLogout }) => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <button className="focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-800 rounded-sm">
        <Avatar className="h-9 w-9 rounded-sm">
          <AvatarImage src={user?.photoUrl} alt={user?.name} />
          <AvatarFallback className="bg-stone-200 dark:bg-stone-700 rounded-sm">
            {user?.name?.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </button>
    </DropdownMenuTrigger>
    <DropdownMenuContent className="w-56" align="end">
      <DropdownMenuLabel className="font-sans">
        {user?.name}
      </DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <DropdownMenuItem asChild>
          <Link to="/my-learning"><Library className="mr-2 h-4 w-4" />My Learning</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/profile"><User className="mr-2 h-4 w-4" />Edit Profile</Link>
        </DropdownMenuItem>
      </DropdownMenuGroup>
      {user?.role === "instructor" && (
        <>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link to="/admin/dashboard"><LayoutDashboard className="mr-2 h-4 w-4" />Instructor Dashboard</Link>
          </DropdownMenuItem>
        </>
      )}
      <DropdownMenuSeparator />
      <DropdownMenuItem onClick={onLogout}>
        <LogOut className="mr-2 h-4 w-4" />
        <span>Log out</span>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);


const MobileNavbar = ({ user, onLogout }) => {
  const navigate = useNavigate();
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" variant="ghost">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col bg-stone-50 dark:bg-stone-950 border-l-stone-200 dark:border-l-stone-800">
        <SheetHeader>
          <SheetTitle className="font-serif text-2xl text-stone-800 dark:text-stone-200 text-left">
            Menu
          </SheetTitle>
        </SheetHeader>
        <div className="border-b border-stone-200 dark:border-stone-800 my-4"></div>
        <nav className="flex flex-col gap-4 text-lg">
          {user ? (
            <>
              <Link to="/my-learning" className="text-stone-700 dark:text-stone-300 hover:text-amber-900 dark:hover:text-amber-500">My Learning</Link>
              <Link to="/profile" className="text-stone-700 dark:text-stone-300 hover:text-amber-900 dark:hover:text-amber-500">Edit Profile</Link>
              {user.role === 'instructor' && (
                 <Link to="/admin/dashboard" className="text-stone-700 dark:text-stone-300 hover:text-amber-900 dark:hover:text-amber-500">Dashboard</Link>
              )}
              <button onClick={onLogout} className="text-left text-stone-700 dark:text-stone-300 hover:text-amber-900 dark:hover:text-amber-500">Log out</button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-stone-700 dark:text-stone-300 hover:text-amber-900 dark:hover:text-amber-500">Login</Link>
              <Link to="/login" className="text-stone-700 dark:text-stone-300 hover:text-amber-900 dark:hover:text-amber-500">Sign Up</Link>
            </>
          )}
        </nav>
        <div className="mt-auto pt-4">
            <DarkMode />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Navbar;