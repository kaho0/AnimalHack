#!/usr/bin/env python3
"""
Setup script for the Cruelty-Free Shopping RAG System
"""

import os
import sys
import subprocess

def check_python_version():
    """Check if Python version is compatible"""
    if sys.version_info < (3, 8):
        print("❌ Python 3.8 or higher is required")
        return False
    print(f"✅ Python {sys.version_info.major}.{sys.version_info.minor} detected")
    return True

def install_requirements():
    """Install required packages"""
    print("📦 Installing required packages...")
    try:
        subprocess.check_call([sys.executable, "-m", "pip", "install", "-r", "requirements_rag.txt"])
        print("✅ Requirements installed successfully")
        return True
    except subprocess.CalledProcessError as e:
        print(f"❌ Failed to install requirements: {e}")
        return False

def check_csv_file():
    """Check if the CSV file exists"""
    csv_file = "luxury_animal_products_vegan_alternatives.csv"
    if os.path.exists(csv_file):
        print(f"✅ CSV file found: {csv_file}")
        return True
    else:
        print(f"⚠️  CSV file not found: {csv_file}")
        print("   Please ensure the CSV file is in the current directory")
        return False

def check_api_key():
    """Check if API key is configured"""
    api_key = os.getenv("GEMINI_API_KEY")
    if api_key and api_key != "your_gemini_api_key_here":
        print("✅ Gemini API key found in environment")
        return True
    else:
        print("⚠️  Gemini API key not configured")
        print("   Please set GEMINI_API_KEY environment variable")
        print("   Example: export GEMINI_API_KEY='your_api_key_here'")
        return False

def create_config_file():
    """Create a config.py file if it doesn't exist"""
    config_file = "config.py"
    if not os.path.exists(config_file):
        print("📝 Creating config.py file...")
        try:
            with open(config_file, "w") as f:
                f.write('''# Configuration for RAG Chatbot
# Update this with your actual API key

GEMINI_API_KEY = "your_gemini_api_key_here"
CSV_PATH = "luxury_animal_products_vegan_alternatives.csv"
LOG_LEVEL = "INFO"
TOP_K_CHUNKS = 5
EMBEDDING_MODEL = "all-MiniLM-L6-v2"
GEMINI_MODEL = "gemini-2.5-flash"
''')
            print("✅ config.py created")
            return True
        except Exception as e:
            print(f"❌ Failed to create config.py: {e}")
            return False
    else:
        print("✅ config.py already exists")
        return True

def main():
    """Main setup function"""
    print("🌱 Setting up Cruelty-Free Shopping RAG System")
    print("=" * 50)
    
    # Check Python version
    if not check_python_version():
        return
    
    # Install requirements
    if not install_requirements():
        return
    
    # Check CSV file
    csv_ok = check_csv_file()
    
    # Check API key
    api_ok = check_api_key()
    
    # Create config file
    config_ok = create_config_file()
    
    print("\n" + "=" * 50)
    if csv_ok and api_ok and config_ok:
        print("🎉 Setup complete! You can now run:")
        print("   python improved_rag_chatbot.py")
    else:
        print("⚠️  Setup incomplete. Please address the issues above.")
        print("\nNext steps:")
        if not csv_ok:
            print("   1. Place your CSV file in the current directory")
        if not api_ok:
            print("   2. Set your Gemini API key")
        print("   3. Run: python improved_rag_chatbot.py")

if __name__ == "__main__":
    main() 