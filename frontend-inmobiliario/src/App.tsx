import MapaGoogle from './components/MapaGoogle';
import './styles.css';

// src/App.tsx


function App() {
  return (
    <div>
      <header>
        <h1>🏡 Proyectos Inmobiliarios</h1>
        <p>Explora propiedades disponibles en el mapa</p>
      </header>

      <main>
        <div className="card">
          <MapaGoogle />
        </div>
      </main>

      <footer>
        © {new Date().getFullYear()} Propital · Prueba Técnica
      </footer>
    </div>
  );
}

export default App;
