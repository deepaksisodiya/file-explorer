import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import FileExplorer from './../FileExplorer';

const renderFileExplorer = () => {
  return render(<FileExplorer />);
};

const mockFiles = {
  type: 'folder',
  name: 'parent',
  data: [
    {
      type: 'folder',
      name: 'root',
      data: [
        {
          type: 'file',
          name: 'index.js',
          meta: 'js'
        }
      ]
    }
  ]
};

vi.mock('./../files.json', () => ({
  default: mockFiles
}));

describe('App', () => {
  it('should display the navigation', async () => {
    await renderFileExplorer();
    expect(screen.getByText(/loading.../i)).toBeInTheDocument();
    await waitFor(() => expect(screen.queryByText('parent')).not.toBeInTheDocument());
  });
});
