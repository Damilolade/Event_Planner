import React from 'react'
import { useState } from 'react'

const DeleteSelector = ({ items = [], onDelete }) => {
  const [selected, setSelected] = useState([]);

  const handleToggle = (id) => {
    setSelected(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete(selected);
      setSelected([]);
    }
  };

  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <div className="space-y-2 mb-4">
        {items.map(item => (
          <label key={item.id} className="flex items-center gap-3 p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors">
            <input 
              type='checkbox'
              checked={selected.includes(item.id)}
              onChange={() => handleToggle(item.id)}
              className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700"
            />
            <span className="text-gray-700 dark:text-gray-200">{item.name}</span>
          </label>
        ))}
      </div>

      <button 
        onClick={handleDelete} 
        disabled={selected.length === 0}
        className="w-full py-2 px-4 bg-red-600 hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors duration-200"
      >
        Delete ({selected.length})
      </button>
    </div>
  )
}

export default DeleteSelector
