import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

import '../Estilos/style.css';

const Sidebar = () => {
  const { cerrarSesion } = useAuth();
  const navBarRef = useRef(null);

  useEffect(() => {
    const menuLateral = () => {
      const navBar = navBarRef.current;
      const menuBtns = document.querySelectorAll('.menu-icon');
      const overlay = document.querySelector('.overlay');

      if (navBar && menuBtns && overlay) {
        const handleClick = () => {
          navBar.classList.toggle('open');
        };

        const handleOverlayClick = () => {
          navBar.classList.remove('open');
        };

        const handleLinkClick = () => {
          navBar.classList.remove('open');
        };

        menuBtns.forEach((menuBtn) => {
          menuBtn.addEventListener('click', handleClick);
        });

        overlay.addEventListener('click', handleOverlayClick);

        // Agregar event listener a cada enlace para cerrar el menú al hacer clic
        const links = navBar.querySelectorAll('a');
        links.forEach((link) => {
          link.addEventListener('click', handleLinkClick);
        });

        return () => {
          menuBtns.forEach((menuBtn) => {
            menuBtn.removeEventListener('click', handleClick);
          });

          overlay.removeEventListener('click', handleOverlayClick);

          // Eliminar event listener de cada enlace al desmontar el componente
          links.forEach((link) => {
            link.removeEventListener('click', handleLinkClick);
          });
        };
      }
    };

    menuLateral();
  }, []);

  return (
    <>
      <nav ref={navBarRef} className='navegacion z-10'>
        <div className='logo'>
          <i className='bx bx-menu menu-icon'></i>
          <span className='logo-name'>TaskMaster</span>
        </div>
        <div className='sidebar'>
          <div className='logo'>
            <i className='bx bx-menu menu-icon'></i>
            <span className='logo-name'>TaskMaster</span>
          </div>

          <div className='sidebar-content'>
            <ul className='lists'>
              <li className='list'>
                <Link className='nav-link' to='/admin'>
                  <i className='bx bx-home-alt icon'></i>
                  <span className='link'>Inicio</span>
                </Link>
              </li>
              <li className='list'>
                <Link className='nav-link' to='/admin/calendario'>
                  <i className='bx bxs-calendar icon'></i>
                  <span className='link'>Calendario</span>
                </Link>
              </li>
            </ul>
            <div className='bottom-cotent'>
              <li className='list'>
                <Link className='nav-link' to='/admin/perfil'>
                  <i className='bx bx-cog icon'></i>
                  <span className='link'>Perfil</span>
                </Link>
              </li>
              <li className='list'>
                <Link className='nav-link' to='' onClick={cerrarSesion}>
                  <i className='bx bx-log-out icon'></i>
                  <span className='link'>Cerrar Sesion</span>
                </Link>
              </li>
            </div>
          </div>
        </div>
      </nav>

      <section className='overlay'></section>
    </>
  );
};

export default Sidebar;
