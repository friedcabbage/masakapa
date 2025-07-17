import { useState } from 'react';

function RecipeList({ recipes }) {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleExpand = (index) => {
    setExpandedIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {recipes.map((recipe, index) => (
        <div
          key={index}
          onClick={() => toggleExpand(index)} // 👈 make the tile clickable
          className={`bg-orange-100 rounded-xl shadow-md border border-orange-100 overflow-hidden transition-all duration-300 ease-in-out hover:shadow-lg`}
        >
          <h3 className="font-bold text-base sm:text-lg text-amber-700 break-words leading-snug p-4">
            {recipe['Title Cleaned']}
          </h3>

          <div
  className={`transition-all duration-500 ease-in-out px-4 overflow-hidden ${
    expandedIndex === index ? 'max-h-[500px] py-4 opacity-100' : 'max-h-0 opacity-0'
  }`}
>
  <div className="overflow-y-auto max-h-80 pr-2 text-sm text-gray-700 space-y-3 border-t border-green-300 pt-3">
    <div>
      <strong>Bahan:</strong>
      <p>{recipe.Ingredients}</p>
    </div>

    <div>
      <strong>Langkah:</strong>
      <p className="whitespace-pre-line">{recipe.Steps}</p>
    </div>

    {recipe.URL && (
      <div>
        <a
          href={recipe.URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-green-800 hover:underline"
        >
          Lihat Resep Asli 🔗
        </a>
      </div>
    )}
  </div>
</div>

        </div>
      ))}
    </div>
  );
}

export default RecipeList;
