import React from 'react';

interface ContextMenuProps {
  x: number;
  y: number;
  file: { type: 'folder' | 'file'; name: string; meta?: string };
  onClose: () => void;
}

const ContextMenu: React.FC<ContextMenuProps> = ({ x, y, file, onClose }) => {
  const handleMenuClick = (action: string) => {
    console.log(`${action}: ${file.name}`);
    onClose();
  };

  return (
    <div className="context-menu" style={{ top: y, left: x }}>
      <div onClick={() => handleMenuClick('copy')}>Copy</div>
      <div onClick={() => handleMenuClick('delete')}>Delete</div>
      <div onClick={() => handleMenuClick('rename')}>Rename</div>
    </div>
  );
};

export default ContextMenu;
