@echo off
echo Starting RAG Chatbot...
echo.
echo Make sure you have:
echo 1. Created a .env file with your GEMINI_API_KEY
echo 2. Activated your virtual environment
echo.
echo Press any key to continue...
pause >nul

python rag_chatbot.py
pause 