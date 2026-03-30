import { Outlet } from 'react-router-dom';
import { Header } from './Header';

export function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-[72px]">
        <Outlet />
      </main>
      <footer className="py-8 bg-slate-50 dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700">
        <div className="max-w-[1200px] mx-auto px-6">
          <p className="text-center text-sm text-slate-500">
            &copy; {new Date().getFullYear()} irello. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
