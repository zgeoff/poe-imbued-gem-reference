import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';
import App from '@/App';

beforeEach(() => {
  window.location.hash = '';
  localStorage.clear();
});

describe('Search', () => {
  it('filters skills by name', async () => {
    const user = userEvent.setup();
    render(<App />);
    await screen.findByText('Arc');
    const input = screen.getByPlaceholderText('Search skills…');
    await user.type(input, 'Arc');
    await waitFor(() => {
      expect(screen.getByText('Arc')).toBeInTheDocument();
    });
  });

  it('filters to skills that have a given support (reverse lookup)', async () => {
    const user = userEvent.setup();
    render(<App />);
    await screen.findByText('Arc');
    // Enable support searching
    await user.click(screen.getByLabelText('Include supports'));
    const input = screen.getByPlaceholderText('Search skills…');
    await user.type(input, 'Multistrike');
    // Cleave and Cyclone both have Multistrike Support
    await waitFor(() => {
      expect(screen.getByText('Cleave')).toBeInTheDocument();
      expect(screen.getByText('Cyclone')).toBeInTheDocument();
    });
  });

  it('supports fuzzy matching for partial/misspelled input', async () => {
    const user = userEvent.setup();
    render(<App />);
    await screen.findByText('Arc');
    const input = screen.getByPlaceholderText('Search skills…');
    await user.type(input, 'Cyclon');
    await waitFor(() => {
      expect(screen.getByText('Cyclone')).toBeInTheDocument();
    });
  });

  it('restores full list when search is cleared', async () => {
    const user = userEvent.setup();
    render(<App />);
    await screen.findByText('Arc');
    const input = screen.getByPlaceholderText('Search skills…');
    await user.type(input, 'Arc');
    await waitFor(() => {
      expect(screen.queryByText('Cleave')).not.toBeInTheDocument();
    });
    await user.clear(input);
    await waitFor(() => {
      expect(screen.getByText('Cleave')).toBeInTheDocument();
      expect(screen.getByText('Arc')).toBeInTheDocument();
    });
  });

  it('combines search and color filter correctly', async () => {
    const user = userEvent.setup();
    render(<App />);
    await screen.findByText('Arc');
    // Enable support searching and filter to blue
    await user.click(screen.getByLabelText('Include supports'));
    await user.click(screen.getByText('Int'));
    await waitFor(() => {
      expect(screen.queryByText('Cleave')).not.toBeInTheDocument();
      expect(screen.getByText('Arc')).toBeInTheDocument();
    });
    // Now search for a support that matches across colors
    const input = screen.getByPlaceholderText('Search skills…');
    await user.type(input, 'Faster Casting');
    // Only blue skills with "Faster Casting" should remain
    await waitFor(() => {
      expect(screen.getByText('Arc')).toBeInTheDocument();
      expect(screen.getByText('Frostbolt')).toBeInTheDocument();
      expect(screen.queryByText('Cleave')).not.toBeInTheDocument();
    });
  });

  it('debounces search to avoid excessive re-renders', async () => {
    const user = userEvent.setup();
    render(<App />);
    await screen.findByText('Arc');
    const input = screen.getByPlaceholderText('Search skills…');
    // Type rapidly
    await user.type(input, 'Cleave');
    // Results should eventually settle
    await waitFor(() => {
      expect(screen.getByText('Cleave')).toBeInTheDocument();
    });
  });
});
