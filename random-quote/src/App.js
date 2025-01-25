import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [visible, setVisible] = useState(false); 
  const [themeColor, setThemeColor] = useState("#333"); 

  const generateRandomColor = () => {
    return `rgb(${Math.floor(Math.random() * 128)}, ${Math.floor(
      Math.random() * 128
    )}, ${Math.floor(Math.random() * 128)})`;
  };

  
  const getQuotesData = async () => {
    setVisible(false); 
    try {
      const response = await axios.get("https://api.api-ninjas.com/v1/quotes", {
        headers: {
          "X-Api-Key": "dEvDyqbLA7kBRnA/4FQ+GQ==KzoGa6hqJFgUU7vF",
        },
      });
      const data = response.data[0];
      setTimeout(() => {
        setQuote(data.quote);
        setAuthor(data.author);
        setVisible(true);
      }, 500); 
    } catch (error) {
      console.error("Error fetching quote:", error);
      setTimeout(() => {
        setQuote("Oops! Something went wrong.");
        setAuthor("");
        setVisible(true);
      }, 250);
    }
  };

  useEffect(() => {
    getQuotesData(); 
    setThemeColor(generateRandomColor()); 
  }, []);

  const handleNewQuote = () => {
    setThemeColor(generateRandomColor());
    getQuotesData();
  };

  return (
    <div
      className="app-container"
      style={{
        backgroundColor: themeColor,
        transition: "background-color 0.5s ease",
      }}
    >
      <div id="quote-box">
        {/* text */}
        <div
          id="text"
          className={visible ? "visible" : ""}
          style={{ color: themeColor }}
        >
          <i className="fa fa-quote-left"></i> {quote}
        </div>

        {/* author */}
        <h6
          id="author"
          className={visible ? "visible" : ""}
        >
          {author ? `- ${author}` : "- Unknown"}
        </h6>

        {/* button */}
        <div className="link-button">
          <a
            id="tweet-quote"
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
              `${quote} - ${author}`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              backgroundColor: themeColor,
              border: "none",
            }}
          >
            <i className="fa-brands fa-twitter"></i> Tweet
          </a>
          <button
            id="new-quote"
            onClick={handleNewQuote}
            style={{ backgroundColor: themeColor }}
          >
            New Quote
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
