from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS
from textblob import TextBlob
import requests

app = Flask(__name__)
CORS(app)


# get categories for news
CATEGORIES = [
    "business",
    "entertainment",
    "general",
    "health",
    "science",
    "sports",
    "technology",
]


# NewsAPI key
NEWS_API_KEY = "c88a8eb1107e4f8cb0f34d86ff7a1a98"


@app.route("/categories", methods=["GET"])
def get_categories():
    return jsonify(CATEGORIES)


@app.route("/news", methods=["GET"])
def get_news():
    # Normally, you would fetch this based on saved user preferences
    # For now, we'll fetch for a specific category
    category = request.args.get("category", "technology")

    url = f"https://newsapi.org/v2/top-headlines?category={category}&language=en&apiKey={NEWS_API_KEY}"
    response = requests.get(url)
    articles = response.json().get("articles", [])

    # Process each article for sentiment analysis
    processed_articles = []
    for article in articles:
        sentiment = analyze_sentiment(article["title"])
        processed_articles.append(
            {
                "title": article["title"],
                "description": article["description"],
                "url": article["url"],
                "sentiment": sentiment,
            }
        )

    return jsonify(processed_articles)


def analyze_sentiment(text):
    # Simple sentiment analysis using TextBlob
    analysis = TextBlob(text)
    if analysis.sentiment.polarity > 0:
        return "Positive"
    elif analysis.sentiment.polarity < 0:
        return "Negative"
    else:
        return "Neutral"


if __name__ == "__main__":
    app.run(debug=True)
