# SuperHerosTeam

A full-stack web application to browse superheroes, view detailed information, manage favourites, and build teams based on hero attributes.

The backend is built with **Django & Django REST Framework**, and the frontend uses **Next.js (App Router)**.  
The entire stack is containerized using **Docker** for easy local setup.

---

## Project Overview

### Features

- Public superhero listing with pagination
- Superhero detailed view (biography, appearance, powerstats, etc.)
- User registration & login (JWT authentication)
- Mark / unmark superheroes as favourites
- View all favourite superheroes
- Favourite status embedded directly in hero APIs
- Django Admin panel for editing hero data
- Team Recommendation based on different parameters
    * Based on Powers
    * Based on Balanced Team
    * Based on Random Sampling
    * Based on Favorite SuperHero Listing
- Recommended Team Approve/Remove Action
- Manually Update the Details of Team name, Description, and Explanation
- Team Listing with Filters
    * Filter by Recommended team
    * Filter by Approved team
    * Filter by Removed team


---

## Tech Stack

### Backend

- **Python** (3.13)
- **Django** (6.0.1)
- **Django REST Framework**
- **PostgreSQL**
- **JWT Authentication**

### Frontend

- **Node.js** 23.9.0
- **Next.js** (App Router)
- **TypeScript**
- **pnpm**
- **Tailwind CSS**
- **shadcn/ui**

### DevOps

- **Docker**
- **Docker Compose**

### Background services

- **Celery**
- **Redis**

---

## Getting Started

### Step 1: Clone the Repository

```bash
git clone <repository-url>
cd <repository-name>
```

### Step 2: Project Prerequisites

Ensure the following tools are installed on your system:

#### Required

- Docker
- Docker Compose
- Git

#### Optional (for non-Docker usage)

- Python 3.13+
- Node.js 23.9.0
- pnpm
- virtualenv

### Step 3: Environment Configuration

Create a `.env` file in the project root directory:

```env
# PostgreSQL
POSTGRES_DB=<db_name>
POSTGRES_USER=<user_name>
POSTGRES_PASSWORD=<password_name>

# Django
DJANGO_SECRET_KEY=<secret_key>
DJANGO_DEBUG=<boolean_value>

# SuperHero API
SUPERHERO_API_TOKEN=<superhero_api_key>

# Pagination Config
PAGE_SIZE=<page-size:number>

# Team Config
TEAM_SIZE=number

# LLM config
OLLAMA_URL=<ollama_url>
OLLAMA_MODEL=<ollama_model_name>

# Celery Config
CELERY_BROKER_URL=<broker_url>
CELERY_RESULT_BACKEND=<broker_url>
```

Setup a `.env.local` file inside frontend directory:

```env
NEXT_PUBLIC_BACKEND_API_URL=<backend-api-url>

PAGE_SIZE=<page-size>
```

---

### SuperHero API Key Setup (Required for Seeding Data)

This project uses the **SuperHero API** to fetch superhero data and seed the database.

#### Step 1: Generate an API Access Token

1. Visit the official SuperHero API website: [SuperHero API Webite](https://www.superheroapi.com/)
2. Sign in using a GitHub or Facebook account.
3. After signing in, you will receive an **access token**.

```bash
Example token: 123456789012345
```

---

#### Step 2: Configure the API Key

Add the token value for `SUPERHERO_API_TOKEN` to your `.env` file:

### Step 4: Docker Setup

#### Build Containers

```bash
docker-compose build
```

#### Run Containers

```bash
docker-compose up
```

The services will be available at:

- **Backend API** → http://localhost:8000
- **Frontend** → http://localhost:3000

### Step 5: Post-Setup Commands

After all services are running, execute the following commands:

#### Apply Database Migrations

```bash
docker-compose exec backend python manage.py makemigrations
docker-compose exec backend python manage.py migrate
```

#### Create Django Superuser

```bash
docker-compose exec backend python manage.py createsuperuser
```

Access the Django Admin Panel at:

```
http://localhost:8000/admin
```

#### Seed SuperHero Data

```bash
docker-compose exec backend python manage.py seed_super_heros
```

This command fetches superhero data from the external SuperHero API and populates the database.

---

## 🔧 Alternative Setup (Without Docker)

### Backend Setup

```bash
cd backend
virtualenv -p python3.13 venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser
python manage.py seed_superheroes
python manage.py runserver
```

### Frontend Setup

```bash
cd frontend
pnpm install
pnpm dev
```

Frontend will be available at http://localhost:3000

---

## Troubleshooting

### Database Connection Issues

- Ensure PostgreSQL container is running: `docker-compose ps`
- Check database credentials in `.env` file

### Port Already in Use

- Stop existing services on ports 3000 and 8000
- Or modify ports in `docker-compose.yml`

### Migration Errors

- Reset database: `docker-compose down -v`
- Rebuild containers: `docker-compose build --no-cache`

---
