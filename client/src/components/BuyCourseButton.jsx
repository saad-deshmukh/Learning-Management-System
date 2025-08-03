import React, { useEffect } from "react";
import { Button } from "./ui/button";
import { useCreateCheckoutSessionMutation } from "@/features/api/purchaseApi";
import { Key, Loader2 } from "lucide-react";
import { toast } from "sonner";

const BuyCourseButton = ({ courseId }) => {
  const [createCheckoutSession, { data, isLoading, isSuccess, isError, error }] =
    useCreateCheckoutSessionMutation();

  const purchaseCourseHandler = async () => {
    await createCheckoutSession(courseId);
  };

  useEffect(() => {
    if (isSuccess) {
      if (data?.url) {
        window.location.href = data.url; // Redirect to stripe checkout url
      } else {
        toast.error("Invalid response from server.");
      }
    }
    if (isError) {
      toast.error(error?.data?.message || "Failed to create checkout session");
    }
  }, [data, isSuccess, isError, error]);

  return (
    <Button
      disabled={isLoading}
      onClick={purchaseCourseHandler}
      size="lg"
      className="w-full rounded-sm bg-stone-800 text-stone-100 hover:bg-stone-700 dark:bg-stone-200 dark:text-stone-900 dark:hover:bg-stone-300"
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Processing...
        </>
      ) : (
        <>
          <Key className="mr-2 h-4 w-4" />
          Purchase Course
        </>
      )}
    </Button>
  );
};

export default BuyCourseButton;