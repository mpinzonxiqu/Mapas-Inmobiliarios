import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useEffect, useState } from "react";
import { getProyectos } from "../api/proyectos";
import type { Proyecto } from "../types";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "leaflet/dist/leaflet.css"; // Obligatorio para que se vea el mapa


// Evitar error por íconos por defecto
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({


});

export default function Mapa() {
  const [proyectos, setProyectos] = useState<Proyecto[]>([]);

  useEffect(() => {
    getProyectos().then(setProyectos);
  }, []);

  return (
    <MapContainer center={[4.65, -74.1]} zoom={10} className="h-[80vh] w-full">
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {proyectos.map((p) => (
        <Marker key={p.id} position={[p.latitud, p.longitud]}>
          <Popup>
            <div>
              <h2 className="font-bold">{p.nombre}</h2>
              <p>{p.ubicacion}</p>
              <p>{p.descripcion}</p>
              <img src={p.imagen_url} alt={p.nombre} className="w-32 mt-2" />
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
