FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build-env
WORKDIR /app

COPY . ./
RUN dotnet restore
RUN dotnet publish -c Release -o out -r linux-x64


FROM mcr.microsoft.com/dotnet/aspnet:7.0

ENV ASPNETCORE_ENVIRONMENT=Production
ENV ASPNETCORE_URLS=http://+:8080
EXPOSE 8080

WORKDIR /app
COPY --from=build-env /app/out .

ENTRYPOINT ["dotnet", "VocabularyTrainer.Api.dll"]