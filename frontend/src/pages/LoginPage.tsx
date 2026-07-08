import { FormEvent, useMemo, useState } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';

import { SteakhouseLogo } from '../components/brand/SteakhouseLogo';
import { useAuth } from '../contexts/useAuth';
import { getDefaultRouteForRole } from '../routes/auth-routing';

type LocationState = {
  from?: {
    pathname?: string;
  };
};

export function LoginPage() {
  const { isAuthenticated, isLoading, login, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fallbackRoute = user ? getDefaultRouteForRole(user.role) : '/admin/dashboard';
  const returnTo = useMemo(() => {
    const state = location.state as LocationState | null;
    return state?.from?.pathname && state.from.pathname !== '/login' ? state.from.pathname : fallbackRoute;
  }, [fallbackRoute, location.state]);

  if (!isLoading && isAuthenticated && user) {
    return <Navigate replace to={getDefaultRouteForRole(user.role)} />;
  }

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const nextUser = await login(email, password);
      navigate(returnTo || getDefaultRouteForRole(nextUser.role), { replace: true });
    } catch {
      setError('Invalid email or password.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="grid min-h-screen place-items-center bg-[#0b0908] px-4 py-10 text-stone-50">
      <section className="w-full max-w-md rounded-2xl border border-orange-900/40 bg-[#17110f] p-6 shadow-2xl shadow-black/30 sm:p-8">
        <Link className="inline-flex" to="/">
          <SteakhouseLogo compact />
        </Link>
        <p className="mt-8 text-sm font-semibold uppercase tracking-wide text-orange-300">Staff access</p>
        <h1 className="mt-2 text-3xl font-black tracking-tight text-stone-50">Sign in</h1>
        <p className="mt-3 text-sm leading-6 text-stone-400">
          Use your restaurant staff credentials to continue.
        </p>

        <form className="mt-6 grid gap-4" onSubmit={submit}>
          <label className="block text-sm font-semibold text-stone-300">
            Email
            <input
              autoComplete="email"
              className="mt-2 w-full rounded-xl border border-stone-700 bg-black/30 px-4 py-3 text-stone-100 outline-none placeholder:text-stone-500 focus:border-orange-500"
              onChange={(event) => setEmail(event.target.value)}
              placeholder="admin@casalumiere.test"
              required
              type="email"
              value={email}
            />
          </label>
          <label className="block text-sm font-semibold text-stone-300">
            Password
            <input
              autoComplete="current-password"
              className="mt-2 w-full rounded-xl border border-stone-700 bg-black/30 px-4 py-3 text-stone-100 outline-none placeholder:text-stone-500 focus:border-orange-500"
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Password"
              required
              type="password"
              value={password}
            />
          </label>

          {error ? (
            <p className="rounded-xl border border-red-900/50 bg-red-500/10 px-4 py-3 text-sm font-semibold text-red-200">
              {error}
            </p>
          ) : null}

          <button
            className="mt-2 rounded-full bg-orange-600 px-5 py-3 font-bold text-white shadow-lg shadow-orange-950/40 hover:bg-orange-500 disabled:cursor-not-allowed disabled:bg-stone-700"
            disabled={isSubmitting}
            type="submit"
          >
            {isSubmitting ? 'Signing in...' : 'Sign in'}
          </button>
        </form>
      </section>
    </div>
  );
}
