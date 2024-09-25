import React from 'react';
import './CategorySelector.css'; // Make sure to create this CSS file

function CategorySelector({ categories, onSelectCategory }) {
  return (
    <div className="category-selector">
      <h2 className="category-title">Select a Category</h2>
      <select 
        className="category-dropdown"
        onChange={(e) => onSelectCategory(e.target.value)}
      >
        <option value="">Select a category</option>
        {categories.map(category => (
          <option key={category} value={category}>{category}</option>
        ))}
      </select>
    </div>
  );
}

export default CategorySelector;
