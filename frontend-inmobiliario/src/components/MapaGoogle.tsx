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

const containerStyle = {
  width: '100%',
  height: '500px',
};

const API_KEY = 'AIzaSyCzKJJo-AVUCBxxL9dz9-UknR1Rg6RAP8s';

const MapaGoogle = () => {
  const [proyectos, setProyectos] = useState<Proyecto[]>([]);
  const [seleccionado, setSeleccionado] = useState<Proyecto | null>(null);

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: API_KEY,
  });

  useEffect(() => {
    fetch('http://localhost:8000/proyectos/')
      .then((res) => res.json())
      .then((data) => setProyectos(data))
      .catch((err) => console.error('Error al obtener proyectos:', err));
  }, []);

  const center =
    proyectos.length > 0
      ? { lat: proyectos[0].latitud, lng: proyectos[0].longitud }
      : { lat: 4.67, lng: -74.11 };

  if (loadError) return <div className="text-red-600">❌ Error al cargar Google Maps</div>;
  if (!isLoaded) return <div className="text-blue-500">⏳ Cargando mapa...</div>;

  return (
    <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={13}>
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
          <div className="max-w-[200px] text-sm">
            <img
              src={seleccionado.imagen_url}
              alt={seleccionado.nombre}
              className="w-full h-24 object-cover rounded mb-2"
            />
            <h2 className="font-bold">{seleccionado.nombre}</h2>
            <p>{seleccionado.descripcion}</p>
            <p className="text-green-700 font-semibold">${seleccionado.precio.toLocaleString()}</p>
            <p className="text-xs text-gray-500">{seleccionado.ubicacion}</p>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
};

export default MapaGoogle;
