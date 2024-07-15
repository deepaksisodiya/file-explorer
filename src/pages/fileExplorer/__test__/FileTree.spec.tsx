import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import FileTree from '../FileTree';
import { FileNode } from '../types';

describe('FileTree', () => {
  const mockFiles: FileNode = {
    type: 'folder',
    name: 'parent',
    data: [
      {
        type: 'folder',
        name: 'childFolder',
        data: [{ type: 'file', name: 'childFile.js', meta: 'js' }]
      },
      { type: 'file', name: 'parentFile.js', meta: 'js' }
    ]
  };

  const renderFileTree = (files = mockFiles) => render(<FileTree files={files} />);

  it('renders the file tree', () => {
    renderFileTree();
    expect(screen.getByText('📁 parent')).toBeInTheDocument();
  });

  it('toggles folder expansion on click', () => {
    renderFileTree();
    const folder = screen.getByText('📁 parent');
    fireEvent.click(folder);
    expect(screen.getByText('📁 childFolder')).toBeInTheDocument();
    fireEvent.click(folder);
    expect(screen.queryByText('📁 childFolder')).toBeNull();
  });

  it('shows context menu on right-click', () => {
    renderFileTree();
    const folder = screen.getByText('📁 parent');
    fireEvent.contextMenu(folder);
    expect(screen.getByText('Copy')).toBeInTheDocument();
    expect(screen.getByText('Delete')).toBeInTheDocument();
    expect(screen.getByText('Rename')).toBeInTheDocument();
  });

  it('closes context menu on outside click', () => {
    renderFileTree();
    const folder = screen.getByText('📁 parent');
    fireEvent.contextMenu(folder);
    expect(screen.getByText('Copy')).toBeInTheDocument();
    fireEvent.mouseDown(document);
    expect(screen.queryByText('Copy')).toBeNull();
  });

  it('handles context menu actions', () => {
    const consoleSpy = vi.spyOn(console, 'log');
    renderFileTree();
    const folder = screen.getByText('📁 parent');
    fireEvent.contextMenu(folder);
    fireEvent.click(screen.getByText('Copy'));
    expect(consoleSpy).toHaveBeenCalledWith('copy: parent');
    consoleSpy.mockRestore();
  });
});
