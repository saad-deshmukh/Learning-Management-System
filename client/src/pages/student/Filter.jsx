
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React, { useState } from "react";

const categories = [
  { id: "nextjs", label: "Next JS" },
  { id: "data science", label: "Data Science" },
  { id: "frontend development", label: "Frontend Development" },
  { id: "fullstack development", label: "Fullstack Development" },
  { id: "mern stack development", label: "MERN Stack Development" },
  { id: "backend development", label: "Backend Development" },
  { id: "javascript", label: "Javascript" },
  { id: "python", label: "Python" },
  { id: "docker", label: "Docker" },
  { id: "mongodb", label: "MongoDB" },
  { id: "html", label: "HTML" },
];

const Filter = ({ handleFilterChange }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sortByPrice, setSortByPrice] = useState("");

  const handleCategoryChange = (categoryId) => {
    const newCategories = selectedCategories.includes(categoryId)
      ? selectedCategories.filter((id) => id !== categoryId)
      : [...selectedCategories, categoryId];

    setSelectedCategories(newCategories);
    handleFilterChange(newCategories, sortByPrice);
  };

  const selectByPriceHandler = (selectedValue) => {
    setSortByPrice(selectedValue);
    handleFilterChange(selectedCategories, selectedValue);
  };
  
  return (
    <aside className="w-full md:w-64">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-serif font-bold text-xl text-stone-800 dark:text-stone-200">Filters</h2>
        <Select onValueChange={selectByPriceHandler}>
          <SelectTrigger className="w-[150px] rounded-sm focus:ring-amber-700">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent className="rounded-sm">
            <SelectGroup>
              <SelectLabel>Sort by price</SelectLabel>
              <SelectItem value="low">Low to High</SelectItem>
              <SelectItem value="high">High to Low</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      
      <div className="border-b border-stone-200 dark:border-stone-800 mb-4"></div>

      <div>
        <h3 className="font-serif font-semibold text-lg text-stone-700 dark:text-stone-300 mb-3">
          Category
        </h3>
        <div className="space-y-3">
          {categories.map((category) => (
            <div key={category.id} className="flex items-center space-x-3">
              <Checkbox
                id={category.id}
                onCheckedChange={() => handleCategoryChange(category.id)}
                className="rounded-[2px]"
              />
              <Label
                htmlFor={category.id}
                className="font-sans text-sm text-stone-700 dark:text-stone-300 font-medium cursor-pointer"
              >
                {category.label}
              </Label>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default Filter;