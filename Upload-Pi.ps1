$piUser = "ogirard"
$piHost = "192.168.50.10"
$piPath = "/home/ogirard/upload"

$piTarget = "$piUser@${piHost}:$piPath"

Remove-Item -Path $PSScriptRoot\voci-client_latest.tar -Force -ErrorAction SilentlyContinue
docker save -o $PSScriptRoot\voci-client_latest.tar voci-client:latest 

Remove-Item -Path $PSScriptRoot\voci-api_latest.tar -Force -ErrorAction SilentlyContinue
docker save -o $PSScriptRoot\voci-api_latest.tar voci-api:latest

scp $PSScriptRoot\voci-client_latest.tar $piTarget
scp $PSScriptRoot\voci-api_latest.tar $piTarget
scp $PSScriptRoot\docker-compose.yml $piTarget

Write-Host "Run on Pi:"
Write-Host "  > docker load -i $piPath/voci-client_latest.tar"
Write-Host "  > docker load -i $piPath/voci-api_latest.tar"
Write-Host "  > docker compose -f $piPath/docker-compose.yml -p voci up --detach"