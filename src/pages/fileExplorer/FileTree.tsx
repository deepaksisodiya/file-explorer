import { useState } from 'react';
import ContextMenuC from './ContextMenu';

type FileNode = {
  type: 'folder' | 'file';
  name: string;
  meta?: string;
  data?: FileNode[];
};

interface FileTreeProps {
  files: FileNode;
}

const FileTree: React.FC<FileTreeProps> = ({ files }) => {
  const [expanded, setExpanded] = useState<boolean>(false);
  const [contextMenu, setContextMenu] = useState<{ visible: boolean; x: number; y: number; file: FileNode | null }>({
    visible: false,
    x: 0,
    y: 0,
    file: null
  });

  const handleRightClick = (event: React.MouseEvent, file: FileNode) => {
    event.preventDefault();
    setContextMenu({ visible: true, x: event.clientX, y: event.clientY, file });
  };

  const handleCloseContextMenu = () => {
    setContextMenu({ ...contextMenu, visible: false, file: null });
  };

  return (
    <div>
      <div onContextMenu={e => handleRightClick(e, files)}>
        <span onClick={() => setExpanded(!expanded)}>
          {files.type === 'folder' ? '📁' : '📄'} {files.name}
        </span>
      </div>
      {expanded && files.data && (
        <div style={{ paddingLeft: '20px', cursor: 'pointer' }}>
          {files.data.map((file, index) => (
            <FileTree key={index} files={file} />
          ))}
        </div>
      )}
      {contextMenu.visible && (
        <ContextMenuC x={contextMenu.x} y={contextMenu.y} file={contextMenu.file} onClose={handleCloseContextMenu} />
      )}
    </div>
  );
};

export default FileTree;
