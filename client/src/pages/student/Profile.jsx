

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  useLoadUserQuery,
  useUpdateUserMutation,
} from "@/features/api/authApi";
import { BookMarked, Edit, Loader2, UserCircle2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import Course from "./Course";
import { Skeleton } from "@/components/ui/skeleton";

const Profile = () => {
  const [name, setName] = useState("");
  const [profilePhoto, setProfilePhoto] = useState(null);

  const { data, isLoading, isError, refetch } = useLoadUserQuery();
  const [
    updateUser,
    {
      data: updateUserData,
      isLoading: updateUserIsLoading,
      isError: isUpdateError,
      error: updateError,
      isSuccess: isUpdateSuccess,
    },
  ] = useUpdateUserMutation();

  const user = data?.user;

  useEffect(() => {
    if (user) {
      setName(user.name);
    }
  }, [user]);

  useEffect(() => {
    if (isUpdateSuccess) {
      refetch();
      toast.success(updateUserData?.message || "Profile updated successfully.");
    }
    if (isUpdateError) {
      toast.error(updateError?.data?.message || "Failed to update profile.");
    }
  }, [isUpdateSuccess, isUpdateError, updateUserData, updateError, refetch]);

  const onChangeHandler = (e) => {
    const file = e.target.files?.[0];
    if (file) setProfilePhoto(file);
  };

  const updateUserHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (name !== user.name) formData.append("name", name);
    if (profilePhoto) formData.append("profilePhoto", profilePhoto);
    
    if (formData.has("name") || formData.has("profilePhoto")) {
        await updateUser(formData);
    } else {
        toast.info("No changes to save.");
    }
  };

  if (isLoading) return <ProfileSkeleton />;
  if (isError || !user) return <ErrorState />;

  return (
    <div className="bg-stone-50 dark:bg-stone-950 min-h-screen">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <header className="border-b border-stone-200 dark:border-stone-800 pb-5 mb-10">
          <h1 className="font-serif font-bold text-4xl text-stone-800 dark:text-stone-200">
            Account Profile
          </h1>
          <p className="mt-2 font-sans text-stone-600 dark:text-stone-400">
            Manage your personal information and enrolled courses.
          </p>
        </header>

        <div className="bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-sm p-8 flex flex-col md:flex-row items-start gap-8">
          <div className="flex-shrink-0">
            <Avatar className="h-32 w-32 rounded-sm border-4 border-white dark:border-stone-800 shadow-md">
              <AvatarImage src={user.photoUrl} alt={user.name} />
              <AvatarFallback className="rounded-sm bg-stone-200 dark:bg-stone-700">
                {/* --- THIS LINE IS CORRECTED --- */}
                {user?.name?.charAt(0).toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>
          </div>
          <div className="flex-grow space-y-4">
            <ProfileDetailRow label="Full Name" value={user.name} />
            <ProfileDetailRow label="Email Address" value={user.email} />
            <ProfileDetailRow label="Account Role" value={user.role.toUpperCase()} />
            
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="mt-4 rounded-sm">
                  <Edit className="mr-2 h-4 w-4" /> Edit Profile
                </Button>
              </DialogTrigger>
              <DialogContent className="rounded-sm">
                <DialogHeader>
                  <DialogTitle className="font-serif">Edit Your Profile</DialogTitle>
                </DialogHeader>
                <form onSubmit={updateUserHandler} className="grid gap-6 py-4">
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} className="mt-2" />
                  </div>
                  <div>
                    <Label htmlFor="profile-photo">Profile Photo</Label>
                    <Input id="profile-photo" onChange={onChangeHandler} type="file" accept="image/*" className="mt-2" />
                  </div>
                  <DialogFooter>
                    <Button type="submit" disabled={updateUserIsLoading} className="rounded-sm">
                      {updateUserIsLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      Save Changes
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="mt-12">
          <h2 className="font-serif font-bold text-2xl text-stone-800 dark:text-stone-200 mb-6">
            Courses You're Enrolled In
          </h2>
          {user.enrolledCourses.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {user.enrolledCourses.map((course) => (
                <Course course={course} key={course._id} />
              ))}
            </div>
          ) : (
            <EmptyState />
          )}
        </div>
      </div>
    </div>
  );
};

const ProfileDetailRow = ({ label, value }) => (
    <div>
        <p className="text-sm font-sans font-medium text-stone-500 dark:text-stone-400">{label}</p>
        <p className="text-lg font-sans text-stone-800 dark:text-stone-200">{value}</p>
    </div>
);

const ProfileSkeleton = () => (
    <div className="max-w-6xl mx-auto px-6 py-12">
        <header className="border-b border-stone-200 dark:border-stone-800 pb-5 mb-10 space-y-2">
            <Skeleton className="h-10 w-64 bg-stone-200 dark:bg-stone-800" />
            <Skeleton className="h-5 w-80 bg-stone-200 dark:bg-stone-800" />
        </header>
        <div className="p-8 flex flex-col md:flex-row items-start gap-8">
            <Skeleton className="h-32 w-32 rounded-sm bg-stone-200 dark:bg-stone-800 shrink-0" />
            <div className="flex-grow space-y-6 w-full">
                <Skeleton className="h-10 w-full bg-stone-200 dark:bg-stone-800" />
                <Skeleton className="h-10 w-full bg-stone-200 dark:bg-stone-800" />
                <Skeleton className="h-10 w-32 bg-stone-200 dark:bg-stone-800" />
            </div>
        </div>
    </div>
);

const ErrorState = () => (
  <div className="min-h-screen flex flex-col items-center justify-center text-center">
    <UserCircle2 className="mx-auto h-12 w-12 text-stone-400 dark:text-stone-500 mb-4" />
    <h2 className="font-serif text-xl font-semibold">Could Not Load Profile</h2>
    <p>There was an error fetching your information.</p>
  </div>
);

const EmptyState = () => (
  <div className="text-center py-16 px-6 border border-dashed border-stone-300 dark:border-stone-700 rounded-sm">
    <BookMarked className="mx-auto h-12 w-12 text-stone-400 dark:text-stone-500 mb-4" />
    <h2 className="font-serif text-xl font-semibold">No Courses Enrolled</h2>
    <p>Your learning journey awaits. Enroll in a course to begin.</p>
  </div>
);

export default Profile;