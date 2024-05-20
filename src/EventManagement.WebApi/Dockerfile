#See https://aka.ms/customizecontainer to learn how to customize your debug container and how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443
RUN apt-get update
RUN apt-get install -y curl
RUN apt-get install -y libpng-dev libjpeg-dev curl libxi6 build-essential libgl1-mesa-glx
RUN curl -sL https://deb.nodesource.com/setup_lts.x | bash -
RUN apt-get install -y nodejs

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
RUN apt-get update
RUN apt-get install -y curl
RUN apt-get install -y libpng-dev libjpeg-dev curl libxi6 build-essential libgl1-mesa-glx
RUN curl -sL https://deb.nodesource.com/setup_lts.x | bash -
RUN apt-get install -y nodejs
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["src/EventManagement.Frontend/nuget.config", "src/EventManagement.Frontend/"]
COPY ["src/EventManagement.WebApi/EventManagement.WebApi.csproj", "src/EventManagement.WebApi/"]
COPY ["src/EventManagement.Application/EventManagement.Application.csproj", "src/EventManagement.Application/"]
COPY ["src/EventManagement.Domain/EventManagement.Domain.csproj", "src/EventManagement.Domain/"]
COPY ["src/EventManagement.Infrastructure/EventManagement.Infrastructure.csproj", "src/EventManagement.Infrastructure/"]
COPY ["src/EventManagement.Frontend/nuget.config", "src/EventManagement.Frontend/"]
COPY ["src/EventManagement.Frontend/eventmanagement.frontend.esproj", "src/EventManagement.Frontend/"]
RUN dotnet restore "./src/EventManagement.WebApi/EventManagement.WebApi.csproj"
RUN npm install typescript
COPY . .
WORKDIR "/src/src/EventManagement.WebApi"
RUN dotnet build "./EventManagement.WebApi.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "./EventManagement.WebApi.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "EventManagement.WebApi.dll"]