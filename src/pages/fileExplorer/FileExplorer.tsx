import React, { useState, useEffect } from 'react';
import FileTree from './FileTree';
import { FileNode } from './types';
import './fileExplorer.css';

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
