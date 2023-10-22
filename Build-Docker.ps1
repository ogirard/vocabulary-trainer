docker compose -f .\docker-compose.yml -p voci down --remove-orphans
docker image rm voci-api:latest voci-client:latest

docker build --file .\Api.Dockerfile --tag voci-api:latest $PSScriptRoot
docker build --file .\Client.Dockerfile --tag voci-client:latest $PSScriptRoot\client\