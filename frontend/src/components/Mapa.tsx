import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { getProyectos } from "../api/proyectos";
import type { Proyecto } from "../types";

// Corrige el icono por defecto de Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

export default function Mapa() {
  const [proyectos, setProyectos] = useState<Proyecto[]>([]);

  useEffect(() => {
    getProyectos().then(setProyectos).catch(console.error);
  }, []);

  return (
    <MapContainer center={[4.6482837, -74.2478937]} zoom={11} className="h-[600px] w-full rounded shadow">
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {proyectos.map((proyecto) => (
        <Marker key={proyecto.id} position={[proyecto.latitud, proyecto.longitud]}>
          <Popup>
            <strong>{proyecto.nombre}</strong><br />
            {proyecto.descripcion}<br />
            Precio: ${proyecto.precio}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
