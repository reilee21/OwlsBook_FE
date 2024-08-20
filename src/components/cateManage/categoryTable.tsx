import React from 'react';
import { FaCircle } from "react-icons/fa";
import Thead from "../shared/TABLE/Thead";
import TRow from '../shared/TABLE/TRow';
import TCell from '../shared/TABLE/TCell';

interface Category {
    categoryName: string;
    parentCategory?: number;
    parentCategoryNavigation?: Category;
  }
  
  interface CategoryTableProps {
    categories: Category[];
    setEditCategory: (item: Category) => void;
  }
  

  const CategoryTable: React.FC<CategoryTableProps> = ({ categories, setEditCategory }) => {
    return (
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white">
        <div className="block w-full overflow-x-auto">
          <table className="items-center w-full bg-transparent border-collapse">
            <thead>
              <tr>
                <Thead>Tên</Thead>
                <Thead>Danh mục cha</Thead>
              </tr>
            </thead>
            <tbody>
              {categories && categories.map((item, index) => (
                <TRow key={index} 
                    onClick={() => setEditCategory(item)}
                    >
                  <TCell>
                    <div className='font-semibold'>
                      {item.categoryName}
                    </div>
                  </TCell>
                  <TCell>
                    {item.parentCategoryNavigation ? item.parentCategoryNavigation.categoryName : 'None'}
                  </TCell>
                 
                </TRow>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };
  
  export default CategoryTable;