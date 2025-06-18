🏠 Visualizador de Proyectos Inmobiliarios


Este proyecto consiste en un sistema de visualización de proyectos inmobiliarios, dividido en dos partes:

Backend (API REST) en FastAPI con endpoints para gestionar proyectos y estadísticas.

Frontend en React + TypeScript que muestra un mapa interactivo con los proyectos.

📁 Estructura del proyecto


visualizador-inmobiliario/
├── backend/             # API REST (FastAPI)
│   ├── main.py
│   ├── routers/
│   ├── models/
│   ├── database.py
│   └── ...
├── frontend/            # SPA con React + Vite + Leaflet
│   ├── src/
│   │   ├── components/
│   │   ├── api/
│   │   ├── types/
│   │   └── App.tsx
│   └── ...
└── README.md            # (este archivo)
🌐 Frontend - React + Vite + Leaflet



🔹 Descripción
La aplicación muestra un mapa interactivo donde se visualizan los proyectos inmobiliarios. Cada proyecto aparece como un marcador que, al hacer clic, despliega una ventana emergente con su información.

🔹 Características
Visualización de proyectos inmobiliarios en Leaflet.

Popups con nombre, ubicación, imagen y descripción.

Estilo responsivo y centrado en experiencia móvil.

Consumo de API REST con fetch/axios.

Escrito en TypeScript.

🔹 Instalación y ejecución
bash


cd frontend
npm install
npm run dev
El frontend estará disponible en: http://localhost:5173

🔧 Backend - FastAPI
🔹 Descripción
API RESTful que permite crear, listar y consultar estadísticas de proyectos inmobiliarios.

🔹 Endpoints disponibles
📦 Proyectos
Método	Ruta	Descripción
GET	/proyectos/	Listar todos los proyectos
POST	/proyectos/	Crear un nuevo proyecto

🎯 Ofertas
Método	Ruta	Descripción
GET	/ofertas/	Listar ofertas (placeholder)

📊 Estadísticas
Método	Ruta	Descripción
GET	/stats/stats/	Consultar estadísticas de proyectos

Se puede extender fácilmente para incluir filtrado, paginación y autenticación.

🔹 Instalación y ejecución
bash

cd backend
python -m venv venv
source venv/bin/activate  # En Windows: venv\Scripts\activate
pip install -r requirements.txt
    
uvicorn main:app --reload
La API estará disponible en: http://localhost:8000

🔹 Documentación automática
Accede a la documentación interactiva:

Swagger: http://localhost:8000/docs



🧪 Datos de prueba
Puedes registrar un proyecto de prueba desde Swagger (POST /proyectos/) o usando curl:

json

{
  "nombre": "Residencial El Bosque",
  "descripcion": "Proyecto con zonas verdes y parque infantil",
  "latitud": 4.6705,
  "longitud": -74.1123,
  "ubicacion": "Bogotá, Colombia",
  "tipo": "Casa",
  "precio": 350000000,
  "superficie": 90,
  "imagen_url": "https://via.placeholder.com/150"
}



🐳 Docker (opcional)
bash
Copiar
Editar
docker-compose up --build
Esto levantará tanto el backend como el frontend en modo desarrollo.



✅ Tecnologías utilizadas
Backend: FastAPI, MYSQL xAMPP, Pydantic, Uvicorn

Frontend: React, TypeScript, Leaflet, TailwindCSS

Otros: Axios, Vite, React Router

📌 Consideraciones
CORS habilitado en el backend para desarrollo.

API y frontend pueden desplegarse en servicios como Vercel + Railway o AWS.

La base de datos puede migrarse fácilmente a PostgreSQL.


Prueba Técnica Propital - TuNombre

