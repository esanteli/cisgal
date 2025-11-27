import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import ContactModal from './components/ContactModal';
import { useContactModal } from './hooks/useContactModal';

// Componente wrapper para React
function ContactModalWrapper() {
  const { showModal, openModal, closeModal } = useContactModal();

  // Reemplazar comportamiento de Bootstrap por React
  useEffect(() => {
    // Buscar todos los elementos que deberían abrir el modal
    const contactTriggers = document.querySelectorAll('[data-bs-toggle="modal"][data-bs-target="#contactModal"]');
    
    const handleTriggerClick = (e) => {
      e.preventDefault();
      e.stopPropagation();
      openModal();
    };

    contactTriggers.forEach(trigger => {
      // Mantener los atributos pero prevenir comportamiento Bootstrap
      trigger.addEventListener('click', handleTriggerClick, true);
    });

    return () => {
      contactTriggers.forEach(trigger => {
        trigger.removeEventListener('click', handleTriggerClick, true);
      });
    };
  }, [openModal]);

  return <ContactModal show={showModal} onHide={closeModal} />;
}

// Función para inicializar el modal de contacto en todas las páginas
function initContactModal() {
  // Crear contenedor para el modal React si no existe
  let modalContainer = document.getElementById('react-contact-modal-root');
  if (!modalContainer) {
    modalContainer = document.createElement('div');
    modalContainer.id = 'react-contact-modal-root';
    document.body.appendChild(modalContainer);
  }

  // Renderizar el componente React
  const root = ReactDOM.createRoot(modalContainer);
  root.render(<ContactModalWrapper />);
}

// Inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initContactModal);
} else {
  initContactModal();
}

