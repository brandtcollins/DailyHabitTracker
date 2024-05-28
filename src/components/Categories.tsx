import { FunctionComponent, useEffect, useState } from "react";
import { CategoryGroup } from "../ts/Interfaces";
import { supabase } from "../lib/supabaseClient";

interface CategoriesProps {}

const Categories: FunctionComponent<CategoriesProps> = () => {
  const [selectedCategoryGroup, setSelectedCategoryGroup] = useState<number>(0);
  const [categoryGroups, setCategoryGroups] = useState<CategoryGroup[] | null>(
    null
  );

  const fetchCategoryGroups = async () => {
    let { data: category_groups, error } = await supabase
      .from("category_groups")
      .select("*");

    if (error) {
      console.log("error", error);
      return;
    } else {
      setCategoryGroups(category_groups);
    }
  };

  useEffect(() => {
    console.log(categoryGroups);
  }, [categoryGroups]);

  useEffect(() => {
    fetchCategoryGroups();
  }, []);

  if (!categoryGroups)
    return <div className="flex flex-col justify-center mr-6">Loading</div>;
  return (
    <div className="flex flex-col justify-center mr-6">
      {categoryGroups.map((category) => (
        <div
          onClick={() => setSelectedCategoryGroup(category.id)}
          key={category.id}
          className={`px-4 py-1 my-1 rounded-md flex items-center text-sm flex-col ${
            selectedCategoryGroup === category.id ? "bg-slate-100" : ""
          }`}
        >
          {category.text}
        </div>
      ))}
      <input type="text" className="border-2 w-32 mt-2 rounded" />
    </div>
  );
};

export default Categories;
