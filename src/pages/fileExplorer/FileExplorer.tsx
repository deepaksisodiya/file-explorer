import { useState, useEffect } from 'react';
import FileTree from './FileTree';
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

  return <div className="file-explorer">{loading ? <div>Loading...</div> : files && <FileTree files={files} />}</div>;
};

export default FileExplorer;
