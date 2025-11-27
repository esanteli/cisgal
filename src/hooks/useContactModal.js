import { useState } from 'react';

export const useContactModal = () => {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  return {
    showModal,
    openModal,
    closeModal
  };
};



