import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import ScrollManager from './components/ScrollManager.jsx';
import Spinner from './components/ui/Spinner.jsx';
import Home from './pages/Home.jsx';
import NotFound from './pages/NotFound.jsx';

// The admin portal is only ever used by one logged-in person, so it ships as
// its own chunk. Public visitors never download it.
const Admin = lazy(() => import('./pages/Admin.jsx'));

function RouteFallback() {
  return (
    <div className="gate">
      <Spinner size={28} label="Loading" />
      <p>Loading…</p>
    </div>
  );
}

export default function App() {
  return (
    <>
      <ScrollManager />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/admin"
          element={
            <Suspense fallback={<RouteFallback />}>
              <Admin />
            </Suspense>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
