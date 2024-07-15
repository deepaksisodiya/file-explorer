import React, { useRef, useEffect } from 'react';

interface ContextMenuProps {
  x: number;
  y: number;
  file: { type: 'folder' | 'file'; name: string; meta?: string };
  onClose: () => void;
}

const ContextMenu: React.FC<ContextMenuProps> = ({ x, y, file, onClose }) => {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  const handleMenuClick = (action: string) => {
    console.log(`${action}: ${file.name}`);
    onClose();
  };

  return (
    <div className="context-menu" style={{ top: y, left: x }} ref={menuRef}>
      <div onClick={() => handleMenuClick('copy')}>Copy</div>
      <div onClick={() => handleMenuClick('delete')}>Delete</div>
      <div onClick={() => handleMenuClick('rename')}>Rename</div>
    </div>
  );
};

export default ContextMenu;
