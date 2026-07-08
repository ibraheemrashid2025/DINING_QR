import { Link } from 'react-router-dom';

import { SteakhouseLogo } from '../components/brand/SteakhouseLogo';
import { useAuth } from '../contexts/useAuth';
import { getDefaultRouteForRole } from '../routes/auth-routing';

export function UnauthorizedPage() {
  const { user } = useAuth();
  const homeRoute = user ? getDefaultRouteForRole(user.role) : '/login';

  return (
    <div className="grid min-h-screen place-items-center bg-[#0b0908] px-4 text-stone-50">
      <section className="w-full max-w-lg rounded-2xl border border-stone-800 bg-[#17110f] p-8 text-center shadow-xl shadow-black/20">
        <div className="flex justify-center">
          <SteakhouseLogo compact />
        </div>
        <p className="mt-8 text-sm font-semibold uppercase tracking-wide text-orange-300">Unauthorized</p>
        <h1 className="mt-3 text-3xl font-bold">You do not have access to this area</h1>
        <p className="mt-4 text-stone-400">
          Your account is active, but this dashboard is limited to another staff role.
        </p>
        <Link className="mt-6 inline-flex rounded-full bg-orange-600 px-5 py-3 font-semibold text-white" to={homeRoute}>
          Go to your dashboard
        </Link>
      </section>
    </div>
  );
}
