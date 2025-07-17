import { useState, useEffect } from 'react';
import recipeData from './data/recipes.json';
import categories from './data/categories';
import RecipeList from './components/RecipeList';
import './App.css';

function App() {
  const [recipes, setRecipes] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [visibleCount, setVisibleCount] = useState(4);

  useEffect(() => {
    setRecipes(recipeData);
  }, []);

  const toggleCategory = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
    setVisibleCount(4); // reset count when categories change
  };


  // Optional: mapping selected category to specific ingredients
  const mapCategoryToIngredients = (category) => {
    const mapping = {
      kambing: ["kambing", "daging kambing", "goat", "mutton", "lamb", "sate kambing", "kambing muda", "kaki kambing", "gulai kambing", "lamb chop", "goat meat", "tongseng kambing", "kambing guling", "sop kambing", "kambing lada hitam", "balungan kambing"],
      tahu: ["tahu", "tofu", "soybean curd", "firm tofu", "soft tofu", "silken tofu", "tahu putih", "tahu kuning", "fried tofu", "tofu puff", "tofu block","tahu goreng", "tahu isi", "tahu sumedang", "tahu bulat", "tahu bacem", "tahu gejrot", "tahu telur"],
      tempe: ["tempe", "tempeh", "fermented soybean cake", "soybean cake", "tempe goreng", "tempe orek", "tempe kering", "tempe bacem", "sambal tempe", "keripik tempe", "oseng tempe", "tempe balado"],
      seafood: ["seafood", "udang", "cumi", "lobster", "kepiting", "kerang", "shrimp", "squid", "crab", "clams", "udang goreng", "udang rebus", "kerang hijau", "kerang dara", "crayfish", "prawn", "prawns", "baby squid", "baby octopus", "seafood mix", "kerang kupas", "seafood frozen","kerang saus padang", "cumi goreng tepung", "kepiting saus tiram", "seafood platter", "seafood asam manis"],
      spaghetti: ["bolognese", "pasta", "spaghetti", "fettuccine", "makaroni", "fusilli", "lasagna", "rafioli", "penne", "macaroni", "pasta", "angel hair", "tagliatelle", "rigatoni", "elbow macaroni", "linguine", "mie spaghetti", "pasta saus tomat", "spageti bolognese", "spageti carbonara", "pasta keju"],
      telur: ["telur", "telur ayam", "telur bebek", "telur puyuh", "telur asin", "egg", "chicken egg", "duck egg", "quail egg", "salted egg", "omelet", "omelette", "scrambled egg", "boiled egg", "egg yolk", "egg white", "poached egg", "telur dadar", "telur ceplok", "telur balado", "telur gulung", "telur kecap"],
      sayur: ["sayur", "sayuran", "vegetables", "brokoli", "wortel", "bayam", "kubis", "buncis", "cabbage", "spinach", "carrot", "broccoli",  "green beans", "pokcoy", "bok choy", "sawi", "kale", "terong", "tomat", "labu", "sayur asem", "vegetable mix", "kecambah", "bean sprouts", "zucchini", "tomato", "eggplant", "daun singkong", "cassava leaves", "jagung", "corn", "labu siam", "pare", "daun pepaya", "rebung", "lodeh", "sayur bayam", "kangkung", "tumis genjer"],
      jamur: ["jamur", "mushroom", "jamur kancing", "shiitake", "enoki", "oyster mushroom", "champignon", "shiitake mushroom", "enoki mushroom",  "jamur tiram", "jamur kuping", "wood ear mushroom", "button mushroom", "portobello", "cremini", "chanterelle", "morel", "fungi", "jamur crispy", "tumis jamur", "jamur merang", "jamur champignon", "jamur hitam"],
      kentang: ["kentang", "potato", "ubi", "sweet potato", "yam", "kentang manis", "ubi jalar", "kentang goreng", "french fries", "mashed potato", "baked potato", "hashbrown", "kentang rebus", "kentang kukus", "potato wedges", "baby potatoes", "crispy potato", "perkedel", "keripik kentang", "kentang balado", "kentang mustofa"]// Add more as needed
    };
    return mapping[category] || [category];
  };

const filteredRecipes =
  selectedCategories.length === 0
    ? []
    : recipes
        .filter((recipe) => {
          const title = (recipe['Title Cleaned'] || '');
          return selectedCategories.every((cat) => {
            const keywords = mapCategoryToIngredients(cat).map(k => k.toLowerCase());
            return keywords.some((keyword) => {
              const regex = new RegExp(`${keyword}`, 'i'); // Case-insensitive, partial match
              return regex.test(title);
            });
          });
        })
        .sort((a, b) => (b.Loves || 0) - (a.Loves || 0)); // 🔥 Sort descending by Loves


  const visibleRecipes = filteredRecipes.slice(0, visibleCount);

  const loadMore = () => setVisibleCount((prev) => prev + 4);

  return (
    <div className="flex flex-col items-center px-4 pb-12">
      <div className="w-full max-w-4xl py-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6 whitespace-nowrap">
          Masak Apa?
        </h1>
        <p className="text-center text-lg text-gray-200 mb-6 font-semibold">
          Ada bahan apa di kulkas?
        </p>

      <div className="max-w-5xl mx-auto px-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-8">
          {categories.map((cat) => {
            const isSelected = selectedCategories.includes(cat);
            return (
              <div
                key={cat}
                onClick={() => toggleCategory(cat)}
                className={`w-40 h-20 sm:w-40 sm:h-20 text-2xl cursor-pointer rounded-xl flex items-center justify-center text-center font-semibold capitalize border transition 
                  ${
                    isSelected
                      ? 'bg-green-600 text-white border-green-700'
                      : 'bg-amber-500 hover:bg-amber-600 text-white border-amber-600'
                }`}
              >
            {cat}
        </div>

            );
          })}
        </div>
      </div>

        <div className="text-m text-center text-gray-100 mb-4">
          <p>Kategori terpilih: {selectedCategories.join(', ') || '-'}</p>
          <p>
            Menampilkan {visibleRecipes.length} dari {filteredRecipes.length} resep
          </p>
        </div>

        <RecipeList recipes={visibleRecipes} />

        {visibleRecipes.length < filteredRecipes.length && (
          <div className="flex justify-center mt-8">
            <button
              onClick={loadMore}
              className="px-6 py-3 bg-gradient-to-r from-amber-400 to-rose-400 hover:from-amber-500 hover:to-rose-500 text-white font-semibold rounded-full shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-0"
            >
              Tampilkan Lebih Banyak
            </button>
          </div>
        )}
      </div>
      
      <footer className="w-full text-center py-4 mt-10 text-sm text-gray-500 border-t border-gray-200">
      © {new Date().getFullYear()} MasakApa App. Built with ❤️ by Adelia Chitra S.
      </footer>

    </div>

    
  );

}

export default App;
