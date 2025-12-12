import React from 'react';

const Modal = ({ children, onClose }: { children: React.ReactNode, onClose: () => void }) => {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ background: 'white', padding: '2rem', borderRadius: '5px', position: 'relative' }}>
        <button onClick={onClose} style={{ position: 'absolute', top: '10px', right: '10px' }}>X</button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
