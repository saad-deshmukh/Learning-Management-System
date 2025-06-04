import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
const navigate = useNavigate();
  const searchHandler = (e) => {
    e.preventDefault();
    if(searchQuery.trim() !== ""){
      navigate(`/course/search?query=${searchQuery}`)
    }
    setSearchQuery("");
  }

 
 return (
  <div className="relative bg-gradient-to-r from-amber-300 to-blue-400 dark:from-[#0f172a] dark:to-[#1e3a8a] py-24 px-4 text-center transition-colors duration-500">
    <div className="max-w-3xl mx-auto">
      <h1 className="text-gray-900 dark:text-white text-4xl font-bold mb-4">
        Unlock Your Potential – Explore Courses Tailored Just for You
      </h1>
      <p className="text-gray-700 dark:text-gray-300 mb-8">
        Learn What Matters – Upgrade Your Skills, Anytime, Anywhere.
      </p>

      <form onSubmit={searchHandler} className="flex items-center bg-white dark:bg-[#1e293b] rounded-full shadow-lg overflow-hidden max-w-xl mx-auto mb-6">
        <Input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search Courses"
          className="flex-grow border-none focus-visible:ring-0 px-6 py-3 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 bg-transparent"
        />
        <Button type="submit" className="bg-blue-600 dark:bg-blue-700 text-white px-6 py-3 rounded-r-full hover:bg-blue-700 dark:hover:bg-blue-800 transition-colors duration-300">
          Search
        </Button>
      </form>

      <Button 
        onClick={() => navigate(`/course/search?query`)} 
        className="bg-white dark:bg-[#1e293b] text-blue-600 dark:text-white px-6 py-3 rounded-full hover:bg-amber-400 dark:hover:bg-blue-800 transition-colors duration-300">
        Explore Courses
      </Button>
    </div>
  </div>
);

};

export default HeroSection;
