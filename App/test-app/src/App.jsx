import React from 'react';

function App() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-6 text-center">
      <header className="max-w-md space-y-4">
        <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-tr from-cyan-500 to-indigo-500 flex items-center justify-center text-2xl shadow-xl shadow-indigo-500/20">
          ⚡
        </div>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Vite + Tailwind v4
        </h1>
        <p className="text-zinc-400 text-sm">
          Your sleek developer workspace is running on the ultra-fast Rust-powered engine. No broken prompts, no hassle!
        </p>
        <div className="pt-2">
          <code className="px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-xs font-mono text-cyan-400">
            src/App.jsx
          </code>
        </div>
      </header>
    </div>
  );
}

export default App;