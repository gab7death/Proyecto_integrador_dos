import React, { useState, useEffect } from 'react';
import '../Styles.css';
import logo from '../assets/logo_header.png';
import usuarioIcono from '../assets/usuario_icono.png';
import menuIcono from '../assets/menu_icono.png';
import campanaIcono from '../assets/campana_header.png';

function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [productos, setProductos] = useState([]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/productos');
        const data = await response.json();
        setProductos(data);
      } catch (error) {
        console.error('Error al obtener productos:', error);
      }
    };

    fetchProductos();
  }, []);

  return (
    <>
      <header className="header" style={{ position: 'relative', width: '100%', backgroundColor: '#90b77d' }}>
        <div className='menu container'>
          <a href='#' className='logo'>
            <img src={logo} alt="Logo" />
          </a>

          <div className='menucontainer'>
            <button className='menu-button' onClick={toggleMenu}>
              <img src={menuIcono} className='menuicono' alt='Menú' />
            </button>

            {menuOpen && (
              <nav className='navbar'>
                <ul>
                  <li><a href="#"><img src={usuarioIcono} alt="Usuario" /></a></li>
                  <li><a href="#"><img src={campanaIcono} alt="Campana" /></a></li>
                  <li>
                    <a href="#" style={{ backgroundColor: '#67805a', color: 'white', padding: '10px', borderRadius: '5px' }}>
                      Cerrar sesión
                    </a>
                  </li>
                </ul>
              </nav>
            )}
          </div>
        </div>
      </header>

      {/* Tabla de productos */}
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>ID</th>
              <th>Fecha de caducidad</th>
              <th>Cantidad</th>
              <th>Fecha de ingreso</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((producto) => (
              <tr key={producto[0]}>
                <td>{producto[1]}</td>
                <td>{producto[0]}</td>
                <td>{producto[2]}</td>
                <td>{producto[3]} kgs</td>
                <td>{producto[4]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Home;

