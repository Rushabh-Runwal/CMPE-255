import React, { useState, useEffect } from "react";
import axios from "axios";
import CategorySelector from "./CategorySelector";
import NewsList from "./NewsList";
import "./App.css";

function App() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [news, setNews] = useState([]);

  // Fetch categories from the backend
  useEffect(() => {
    axios
      .get("http://127.0.0.1:5000/categories")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the categories!", error);
      });
  }, []);

  // Fetch news based on the selected category
  useEffect(() => {
    if (selectedCategory) {
      axios
        .get(`http://127.0.0.1:5000/news?category=${selectedCategory}`)
        .then((response) => {
          setNews(response.data);
        })
        .catch((error) => {
          console.error("There was an error fetching the news!", error);
        });
    }
  }, [selectedCategory]);

  return (
    <div className="App">
      <h1>News Sentiment App</h1>
      <CategorySelector
        categories={categories}
        onSelectCategory={setSelectedCategory}
      />
      <NewsList news={news} />
      {/* generate footer */}
      <footer className="footer">
        <p>© 2023 News Sentiment App. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
