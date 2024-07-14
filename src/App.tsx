// import Logo from './assets/react.svg';
import { useState, useEffect } from 'react';
import './fileExplorer.css';

type FileNode = {
  type: 'folder' | 'file';
  name: string;
  meta?: string;
  data?: FileNode[];
};

function App() {
  const [files, setFiles] = useState<FileNode | null>(null);
  const [loading, setLoading] = useState(true);

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

  const handleRightClick = (event: React.MouseEvent, node: FileNode) => {
    event.preventDefault();
    console.log(`Right-clicked on ${node.name}`);
  };

  const renderFiles = (node: FileNode) => {
    if (node.type === 'folder') {
      return (
        <div className="folder" key={node.name}>
          <div className="folder-name" onContextMenu={event => handleRightClick(event, node)}>
            {node.name}
          </div>
          <div className="folder-contents">{node.data && node.data.map(childNode => renderFiles(childNode))}</div>
        </div>
      );
    } else {
      return (
        <div className="file" key={node.name} onContextMenu={event => handleRightClick(event, node)}>
          {node.name}
        </div>
      );
    }
  };

  return (
    <div className="file-explorer">
      {/* <Logo /> */}
      {loading ? <div>Loading...</div> : files && renderFiles(files)}
    </div>
  );
}

export default App;
