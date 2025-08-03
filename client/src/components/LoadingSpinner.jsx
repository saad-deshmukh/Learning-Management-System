import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-stone-100 dark:bg-stone-950">
      <div className="relative h-20 w-20">
      
        <div className="absolute inset-0 border-4 border-stone-500/80 dark:border-stone-400/80 rounded-sm animate-spin"></div>

        <div className="absolute inset-4 border-2 border-stone-800 dark:border-stone-200 rounded-sm animate-spin-reverse"></div>
      </div>
      <p className="mt-6 font-sans text-lg font-semibold text-stone-700 dark:text-stone-300 tracking-wider">
        Loading...
      </p>
    </div>
  );
};

export default LoadingSpinner;