

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// A placeholder for a subtle background image URL
const bgImageUrl = "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=2728&auto=format&fit=crop"; 

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const searchHandler = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      navigate(`/course/search?query=${searchQuery}`);
    }
    setSearchQuery("");
  };

  return (
    <div 
      className="relative py-32 px-4 text-center bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImageUrl})` }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-stone-900/70 dark:bg-black/80"></div>

      <div className="relative max-w-3xl mx-auto z-10">
        <h1 className="text-stone-50 font-serif text-5xl font-bold mb-4">
          A Universe of Knowledge Awaits
        </h1>
        <p className="text-stone-300 dark:text-stone-400 text-lg mb-10">
          Curated courses for the discerning mind.
        </p>

        <form onSubmit={searchHandler} className="flex items-center bg-stone-100/90 dark:bg-stone-800/80 rounded-none shadow-lg max-w-xl mx-auto mb-6">
          <Input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by subject, title, or author"
            className="flex-grow border-none focus-visible:ring-0 px-6 py-3 h-14 bg-transparent text-stone-900 dark:text-stone-100 placeholder:text-stone-500"
          />
          <Button 
            type="submit" 
            className="bg-stone-800 dark:bg-stone-200 text-stone-100 dark:text-stone-900 px-8 h-14 rounded-none hover:bg-stone-700 dark:hover:bg-stone-300 text-base font-semibold tracking-wide"
          >
            Find
          </Button>
        </form>
        
        <Button 
          onClick={() => navigate(`/course/search?query`)} 
          variant="link" 
          className="text-stone-200 dark:text-stone-300 hover:text-white"
        >
          Browse the Catalogue
        </Button>
      </div>
    </div>
  );
};

export default HeroSection;