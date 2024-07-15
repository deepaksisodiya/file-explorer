import React, { useState, useCallback } from 'react';
import ContextMenuC from './ContextMenu';
import { FileNode } from './types';

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

  const handleRightClick = useCallback((event: React.MouseEvent, file: FileNode) => {
    event.preventDefault();
    setContextMenu({ visible: true, x: event.clientX, y: event.clientY, file });
  }, []);

  const handleCloseContextMenu = useCallback(() => {
    setContextMenu({ visible: false, x: 0, y: 0, file: null });
  }, []);

  const toggleExpand = useCallback(() => {
    setExpanded(prevExpanded => !prevExpanded);
  }, []);

  return (
    <div>
      <div onContextMenu={e => handleRightClick(e, files)}>
        <span onClick={toggleExpand}>
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
      {contextMenu.visible && contextMenu.file && (
        <ContextMenuC x={contextMenu.x} y={contextMenu.y} file={contextMenu.file} onClose={handleCloseContextMenu} />
      )}
    </div>
  );
};

export default FileTree;
