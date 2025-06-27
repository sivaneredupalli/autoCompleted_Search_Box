import "./styles.css";
import { useState, useEffect } from "react";

export default function App() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [cache, setCache] = useState({});
  useEffect(() => {
    //Applying Memoization technique 
    if (cache[input]) {
      console.log("Returned cache : " + input);
      setResult(cache[input]);
      return;
    }
    const timer = setTimeout(() => {
      console.log("API call : " + input);
      const fetchData = async () => {
        const data = await fetch("https://dummyjson.com/recipes/search?q=" + input);
        const json = await data.json();
        setResult(json?.recipes);
        //Setting the cache value
        setCache((prev) => ({ ...prev, [input]: json?.recipes }));
      };
      fetchData();
    }, 300);
  
    return () => clearTimeout(timer);
  }, [input]);
  return (
    <div className="App">
      <h1>AutoComplete Search Bar</h1>
      <div>
        <input
          type="text"
          className="search-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onFocus={(e) => setShowResults(true)}
          onBlur={(e) => setShowResults(false)}
        />
        {showResults && (
          <div className="search-Container">
            {result.map((e) => (
              <span className="results" key={e.id}>
                {e.name}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
