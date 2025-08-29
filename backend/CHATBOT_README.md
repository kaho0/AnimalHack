# 🛍️ Cruelty-Free Shopping Chatbot

A powerful AI-powered shopping assistant that helps users find vegan alternatives to products that use animal materials. Built with RAG (Retrieval-Augmented Generation) using the Gemini API and FAISS for semantic search.

## ✨ Features

- **Smart Product Search**: Find vegan alternatives using natural language queries
- **Comprehensive Database**: Access to 350+ luxury products with cruelty-free alternatives
- **Semantic Understanding**: Uses advanced embeddings to understand user intent
- **Product Filtering**: Filter by category, price, and material type
- **Interactive Chat**: Natural conversation interface for shopping assistance
- **Educational Content**: Learn about animal cruelty in fashion and why to choose vegan

## 🚀 Quick Start

### 1. Install Dependencies

```bash
pip install -r requirements.txt
```

### 2. Set Up Environment Variables

Create a `.env` file in the backend directory:

```bash
# Required for the chatbot
GEMINI_API_KEY=your_gemini_api_key_here

# Optional (for IUCN features)
IUCN_API_TOKEN=your_iucn_token_here
```

**Get your Gemini API key:**

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Copy the key to your `.env` file

### 3. Run the Backend

```bash
cd backend
python main.py
```

The server will start on `http://localhost:8000`

### 4. Test the Chatbot

```bash
python test_chatbot.py
```

## 🏗️ Architecture

### Backend Components

- **`cruelty_free_chatbot.py`**: Core chatbot logic with RAG implementation
- **`main.py`**: FastAPI server with chatbot endpoints
- **`luxury_animal_products_vegan_alternatives.csv`**: Product database

### Frontend Components

- **`CrueltyFreeChatbot.tsx`**: React component with chat interface
- **Integrated into main page**: Floating chat button with full interface

### API Endpoints

- `POST /api/chatbot/query` - Query the chatbot
- `POST /api/chatbot/chat` - Interactive chat
- `GET /api/chatbot/suggestions` - Get product suggestions
- `GET /api/chatbot/categories` - Get available categories

## 💡 Usage Examples

### Basic Queries

```
"What are vegan alternatives to leather handbags?"
"Tell me about products that use ostrich leather"
"What are the most affordable vegan alternatives?"
"How are animals harmed in the wool industry?"
"Show me vegan alternatives under $200"
```

### Product Categories

- **Handbags**: Luxury bags and purses
- **Footwear**: Shoes, boots, and sandals
- **Outerwear**: Coats, jackets, and parkas
- **Accessories**: Belts, gloves, scarves
- **Small Leather Goods**: Wallets, key pouches, card cases

### Materials Covered

- **Animal Materials**: Leather, wool, silk, down, fur, exotic skins
- **Vegan Alternatives**: Cork leather, mycelium leather, bio-based leather, recycled materials, plant-based silk

## 🔧 Configuration

### Environment Variables

| Variable         | Description                            | Required |
| ---------------- | -------------------------------------- | -------- |
| `GEMINI_API_KEY` | Google Gemini API key for AI responses | Yes      |
| `IUCN_API_TOKEN` | IUCN Red List API token                | No       |

### Model Configuration

The chatbot uses:

- **Embedding Model**: `all-MiniLM-L6-v2` (fast, efficient)
- **AI Model**: `gemini-2.0-flash-exp` (powerful, responsive)
- **Vector Database**: FAISS for fast similarity search

## 📊 Data Structure

The CSV file contains:

| Column                  | Description                          |
| ----------------------- | ------------------------------------ |
| `Product Name`          | Original luxury product name         |
| `Category`              | Product category                     |
| `Animal Materials Used` | Materials derived from animals       |
| `Animal Cruelty Flag`   | Whether animal cruelty is involved   |
| `Cruelty Note`          | Detailed explanation of animal harm  |
| `Estimated Price`       | Original product price               |
| `Vegan Alternative`     | Cruelty-free alternative product     |
| `Material`              | Vegan material used                  |
| `Price`                 | Vegan alternative price              |
| `Why Choose Vegan`      | Benefits of choosing the alternative |

## 🧪 Testing

### Run Tests

```bash
python test_chatbot.py
```

### Test Coverage

- ✅ Chatbot initialization
- ✅ Product data loading
- ✅ FAISS index building
- ✅ Query processing
- ✅ Product suggestions
- ✅ Category filtering
- ✅ Price filtering

## 🚀 Deployment

### Local Development

```bash
# Backend
cd backend
python main.py

# Frontend (in another terminal)
cd frontend
npm run dev
```

### Production

1. Set environment variables
2. Install dependencies: `pip install -r requirements.txt`
3. Run with production server: `uvicorn main:app --host 0.0.0.0 --port 8000`

## 🔍 Troubleshooting

### Common Issues

**"GEMINI_API_KEY not set"**

- Check your `.env` file
- Ensure the variable name is correct
- Restart the server after changes

**"CSV file not found"**

- Verify `luxury_animal_products_vegan_alternatives.csv` is in the backend directory
- Check file permissions

**"Failed to initialize chatbot"**

- Verify your Gemini API key is valid
- Check internet connection
- Review error logs for specific issues

### Performance Tips

- The first query may be slower due to model loading
- FAISS index is built once on startup
- Consider saving/loading the index for faster restarts

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Add tests for new functionality
4. Submit a pull request

## 📝 License

This project is part of OneEarth and follows the same licensing terms.

## 🙏 Acknowledgments

- **Google Gemini API** for AI capabilities
- **FAISS** for efficient vector search
- **Sentence Transformers** for text embeddings
- **OneEarth community** for inspiration and support

---

**Happy cruelty-free shopping! 🌱🛍️**
