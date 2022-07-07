import { useState, useEffect } from "react";
import "./App.css";

const api_url = "https://api.quotable.io/random";

function App() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState("");

  const getQuote = async () => {
    setLoading(true);
    try {
      const response = await fetch(api_url);
      const { statusCode, statusMessage, ...data } = await response.json();
      if (!response.ok) throw new Error(`${statusCode} ${statusMessage}`);
      setData(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setData({ content: "Oops.. something went wrong" });
    }
  };

  useEffect(() => {
    getQuote();
  }, []);

  if (loading) {
    return (
      <>
        <h1>Loading ....</h1>
      </>
    );
  }

  return (
    <main className="App">
      <div className="card">
        <h2 className="author">{data.author}</h2>
        <p>"{data.content}"</p>
        <button className="button" type="button" onClick={() => getQuote()}>
          New Quote
        </button>
      </div>
    </main>
  );
}

export default App;
