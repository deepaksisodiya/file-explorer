// import Logo from './assets/react.svg';
import { useState, useEffect } from 'react';
import './fileExplorer.css';

type FileNode = {
  type: 'folder' | 'file';
  name: string;
  meta?: string;
  data?: FileNode[];
};

const FileExplorer: React.FC = () => {
  const [files, setFiles] = useState<FileNode | null>(null);
  const [loading, setLoading] = useState(true);
  const [contextMenu, setContextMenu] = useState<{ visible: boolean; x: number; y: number; file: FileNode | null }>({
    visible: false,
    x: 0,
    y: 0,
    file: null
  });

  useEffect(() => {
    const loadFiles = async () => {
      try {
        const initialFiles = await import('./files.json');
        setFiles(initialFiles.default);
      } catch (error) {
        console.error('Error loading files:', error);
      } finally {
        setLoading(false);
      }
    };
    loadFiles();
  }, []);

  const handleRightClick = (event: React.MouseEvent, file: FileNode) => {
    event.preventDefault();
    setContextMenu({ visible: true, x: event.clientX, y: event.clientY, file });
  };

  const handleMenuClick = (action: string) => {
    if (contextMenu.file) {
      console.log(`${action} ${contextMenu.file.name}`);
    }
    setContextMenu({ ...contextMenu, visible: false, file: null });
  };

  const renderFiles = (node: FileNode) => {
    if (node.type === 'folder') {
      return (
        <div className="folder">
          <div className="folder-name" onContextMenu={event => handleRightClick(event, node)}>
            {node.name}
          </div>
          <div className="folder-contents">
            {node.data && node.data.map((childNode, index) => <div key={index}>{renderFiles(childNode)}</div>)}
          </div>
        </div>
      );
    } else {
      return (
        <div className="file" onContextMenu={event => handleRightClick(event, node)}>
          {node.name}
        </div>
      );
    }
  };

  return (
    <div className="file-explorer">
      {/* <Logo /> */}
      {loading ? <div>Loading...</div> : files && renderFiles(files)}
      {contextMenu.visible && (
        <div className="context-menu" style={{ top: contextMenu.y, left: contextMenu.x }}>
          <div onClick={() => handleMenuClick('copy')}>Copy</div>
          <div onClick={() => handleMenuClick('delete')}>Delete</div>
          <div onClick={() => handleMenuClick('rename')}>Rename</div>
        </div>
      )}
    </div>
  );
};

export default FileExplorer;
