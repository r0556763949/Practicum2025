# שלב 1: בחר את תמונת הבסיס עם .NET
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

# שלב 2: בניית האפליקציה
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY ["practicum-server/practicum-server.csproj", "practicum-server/"]
RUN dotnet restore "YourProject/practicum-server.csproj"
COPY . .
WORKDIR "/src/practicum-server"
RUN dotnet build "practicum-server.csproj" -c Release -o /app/build

# שלב 3: פרסום האפליקציה
FROM build AS publish
RUN dotnet publish "practicum-server.csproj" -c Release -o /app/publish

# שלב 4: יצירת התמונה הסופית
FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "practicum-server.dll"]
