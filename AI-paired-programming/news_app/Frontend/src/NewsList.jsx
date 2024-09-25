import React from 'react';
import './NewsList.css';

function NewsList({ news }) {
  return (
    <div className="news-container">
      <h2 className="news-header">News Articles</h2>
      <div className="news-list">
        {news.map((article, index) => (
          <div key={index} className="news-item">
            <h3 className="news-title">{article.title}</h3>
            <p className="news-description">{article.description}</p>
            <p className="news-sentiment"><strong>Sentiment:</strong> {article.sentiment}</p>
            <a className="news-link" href={article.url} target="_blank" rel="noopener noreferrer">Read more</a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NewsList;
