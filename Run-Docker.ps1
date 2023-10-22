docker compose -f .\docker-compose.yml -p voci up --detach

Write-Host App running on http://localhost:28081 -ForegroundColor Yellow
Write-Host API running on http://localhost:28080/swagger -ForegroundColor Yellow