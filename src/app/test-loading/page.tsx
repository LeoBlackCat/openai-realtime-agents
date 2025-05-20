import { Suspense } from 'react';

// Simulated slow component
async function SlowComponent() {
  // Simulate a delay
  await new Promise(resolve => setTimeout(resolve, 3000));
  
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Content Loaded!</h1>
      <p>This content was delayed by 3 seconds to demonstrate the loading state.</p>
    </div>
  );
}

export default function TestLoadingPage() {
  return (
    <Suspense>
      <SlowComponent />
    </Suspense>
  );
} 