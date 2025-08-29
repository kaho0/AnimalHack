Write-Host "Starting AnimalHack Backend Server..." -ForegroundColor Green
Write-Host ""
Write-Host "Make sure you have:" -ForegroundColor Yellow
Write-Host "1. Python 3.8+ installed" -ForegroundColor White
Write-Host "2. A .env file with GEMINI_API_KEY" -ForegroundColor White
Write-Host "3. Dependencies installed (run: pip install -r requirements.txt)" -ForegroundColor White
Write-Host ""
Write-Host "Starting server on http://localhost:8000" -ForegroundColor Cyan
Write-Host "Press Ctrl+C to stop" -ForegroundColor Red
Write-Host ""

try {
    python main.py
} catch {
    Write-Host "Error starting backend: $_" -ForegroundColor Red
    Write-Host "Press any key to continue..." -ForegroundColor Yellow
    $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
} 