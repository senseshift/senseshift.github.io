import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

// Default implementation, that you can customize
export default function Root({children}) {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </>
  );
}
