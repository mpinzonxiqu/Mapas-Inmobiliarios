// src/components/MapaGoogle.tsx
import { GoogleMap, Marker, InfoWindow, useJsApiLoader } from '@react-google-maps/api';
import { useEffect, useState } from 'react';

interface Proyecto {
  nombre: string;
  descripcion: string;
  latitud: number;
  longitud: number;
  ubicacion: string;
  tipo: string;
  precio: number;
  superficie: number;
  imagen_url: string;
}

// Estilo contenedor del mapa
const containerStyle = {
  width: '100%',
  height: '500px',
};

// TU API KEY (funciona solo si la API está habilitada y facturación activa)
const API_KEY = 'AIzaSyCzKJJo-AVUCBxxL9dz9-UknR1Rg6RAP8s';

const MapaGoogle = () => {
  const [proyectos, setProyectos] = useState<Proyecto[]>([]);
  const [seleccionado, setSeleccionado] = useState<Proyecto | null>(null);

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: API_KEY,
  });

  // Llamada a la API de proyectos
  useEffect(() => {
    fetch('http://localhost:8000/proyectos/')
      .then((res) => res.json())
      .then((data) => setProyectos(data))
      .catch((err) => console.error('Error al obtener proyectos:', err));
  }, []);

  // Centro del mapa
  const center = proyectos.length > 0
    ? { lat: proyectos[0].latitud, lng: proyectos[0].longitud }
    : { lat: 4.67, lng: -74.11 }; // fallback Bogotá

  // Errores de carga
  if (loadError) return <p style={{ color: 'red' }}>❌ Error al cargar Google Maps</p>;
  if (!isLoaded) return <p style={{ color: 'blue' }}>⏳ Cargando mapa...</p>;

  return (
    <div style={{ border: '1px solid #ccc', borderRadius: '8px', overflow: 'hidden' }}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={13}
        options={{
          fullscreenControl: false,
          mapTypeControl: false,
          streetViewControl: false,
        }}
      >
        {proyectos.map((proyecto, i) => (
          <Marker
            key={i}
            position={{ lat: proyecto.latitud, lng: proyecto.longitud }}
            onClick={() => setSeleccionado(proyecto)}
          />
        ))}

        {seleccionado && (
          <InfoWindow
            position={{ lat: seleccionado.latitud, lng: seleccionado.longitud }}
            onCloseClick={() => setSeleccionado(null)}
          >
            <div style={{
              maxWidth: '240px',
              fontFamily: 'Segoe UI, sans-serif',
              fontSize: '14px',
              color: '#333'
            }}>
              <img
                src={seleccionado.imagen_url}
                alt={seleccionado.nombre}
                style={{
                  width: '100%',
                  height: '110px',
                  objectFit: 'cover',
                  borderRadius: '6px',
                  marginBottom: '8px'
                }}
              />
              <h2 style={{ fontWeight: 'bold', color: '#0066cc', marginBottom: '4px' }}>
                {seleccionado.nombre}
              </h2>
              <p><strong>Tipo:</strong> {seleccionado.tipo}</p>
              <p><strong>Ubicación:</strong> {seleccionado.ubicacion}</p>
              <p><strong>Superficie:</strong> {seleccionado.superficie} m²</p>
              <p><strong>Precio:</strong> ${seleccionado.precio.toLocaleString()}</p>
              <p style={{ marginTop: '6px' }}>{seleccionado.descripcion}</p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  );
};

export default MapaGoogle;
