import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ContextMenu from './../ContextMenu';
import { FileNode } from './../types';

describe('ContextMenu', () => {
  const mockFile: FileNode = {
    type: 'file',
    name: 'testFile.js',
    meta: 'js'
  };

  const defaultProps = {
    x: 100,
    y: 100,
    file: mockFile,
    onClose: vi.fn()
  };

  const renderContextMenu = (props = defaultProps) => render(<ContextMenu {...props} />);

  it('renders context menu at the correct position', () => {
    renderContextMenu();

    const menu = screen.getByText('Copy').parentElement;
    expect(menu).toHaveStyle({ top: '100px', left: '100px' });
  });

  it('calls onClose when clicking outside the menu', () => {
    renderContextMenu();

    fireEvent.mouseDown(document);
    expect(defaultProps.onClose).toHaveBeenCalled();
  });

  it('handles menu item clicks', () => {
    const consoleSpy = vi.spyOn(console, 'log');
    renderContextMenu();

    fireEvent.click(screen.getByText('Copy'));
    expect(consoleSpy).toHaveBeenCalledWith('copy: testFile.js');

    fireEvent.click(screen.getByText('Delete'));
    expect(consoleSpy).toHaveBeenCalledWith('delete: testFile.js');

    fireEvent.click(screen.getByText('Rename'));
    expect(consoleSpy).toHaveBeenCalledWith('rename: testFile.js');

    consoleSpy.mockRestore();
  });

  it('closes the menu when an item is clicked', () => {
    renderContextMenu();

    fireEvent.click(screen.getByText('Copy'));
    expect(defaultProps.onClose).toHaveBeenCalled();
  });
});
