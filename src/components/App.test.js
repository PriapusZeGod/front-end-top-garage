import { render, screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import App from './App';

test('renders App component with garage information', async () => {
  const queryClient = new QueryClient();
  render(
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  );

  await waitFor(() => {
    expect(screen.getByText(/Welcome to the Garage/i)).toBeInTheDocument();
  });
});

test('renders loading state when data is loading', async () => {
  const queryClient = new QueryClient();
  render(
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  );

  expect(await screen.findByText(/Loading\.\.\./i)).toBeInTheDocument();
});


