"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, type FormEvent } from "react";
import type { User } from "@supabase/supabase-js";
import { LogOut, Package } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { fetchMyOrders, type Order } from "@/lib/commerce/orders";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { GoogleIcon } from "@/components/icons/GoogleIcon";

const inputClasses =
  "w-full border border-line bg-cream px-4 py-3 text-sm outline-none focus:border-charcoal transition-colors";

export function AccountClient() {
  const supabase = createClient();
  const [user, setUser] = useState<User | null | undefined>(undefined);
  const [orders, setOrders] = useState<Order[]>([]);
  const [mode, setMode] = useState<"signin" | "register">("signin");
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  useEffect(() => {
    if (new URLSearchParams(window.location.search).get("error") === "auth") {
      // Reflecting the OAuth callback's redirect state, not local interaction.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setError("We couldn't sign you in with Google. Please try again.");
      window.history.replaceState(null, "", window.location.pathname);
    }
  }, []);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!user) {
      // Syncing to the external auth state change (user signed out), not local state.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setOrders([]);
      return;
    }
    fetchMyOrders()
      .then(setOrders)
      .catch(() => setOrders([]));
  }, [user]);

  if (user === undefined) return null;

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setNotice(null);
    setSubmitting(true);

    if (mode === "register") {
      const { data, error } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
        options: { data: { full_name: form.name } },
      });
      setSubmitting(false);
      if (error) {
        setError(error.message);
        return;
      }
      if (!data.session) {
        setNotice("Check your inbox to confirm your email, then sign in.");
        setMode("signin");
        return;
      }
      setUser(data.user);
    } else {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: form.email,
        password: form.password,
      });
      setSubmitting(false);
      if (error) {
        setError(error.message);
        return;
      }
      setUser(data.user);
    }
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    setUser(null);
  }

  async function handleGoogleSignIn() {
    setError(null);
    setGoogleLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    });
    if (error) {
      setError(error.message);
      setGoogleLoading(false);
    }
    // On success the browser navigates away to Google, so no further state change here.
  }

  if (!user) {
    return (
      <div className="container-aavira py-14 md:py-20 max-w-sm mx-auto">
        <h1 className="font-display text-2xl text-center mb-8">Welcome to Aavira</h1>

        {notice && (
          <p className="text-sm text-gold-deep mb-4 text-center">{notice}</p>
        )}
        {error && <p className="text-sm text-error mb-4 text-center">{error}</p>}

        <button
          type="button"
          onClick={handleGoogleSignIn}
          disabled={googleLoading}
          className="w-full flex items-center justify-center gap-3 border border-line bg-cream px-4 py-3 text-sm hover:border-charcoal transition-colors disabled:opacity-60"
        >
          <GoogleIcon />
          {googleLoading ? "Redirecting…" : "Continue with Google"}
        </button>

        <div className="flex items-center gap-3 my-6">
          <span className="h-px flex-1 bg-line" />
          <span className="text-xs uppercase tracking-[0.1em] text-charcoal-faint">or</span>
          <span className="h-px flex-1 bg-line" />
        </div>

        <div className="flex border-b border-line mb-8">
          <button
            type="button"
            onClick={() => {
              setMode("signin");
              setError(null);
            }}
            className={`flex-1 pb-3 text-xs uppercase tracking-[0.1em] border-b-2 -mb-px ${
              mode === "signin" ? "border-charcoal text-charcoal" : "border-transparent text-charcoal-faint"
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => {
              setMode("register");
              setError(null);
            }}
            className={`flex-1 pb-3 text-xs uppercase tracking-[0.1em] border-b-2 -mb-px ${
              mode === "register" ? "border-charcoal text-charcoal" : "border-transparent text-charcoal-faint"
            }`}
          >
            Create Account
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {mode === "register" && (
            <input
              required
              placeholder="Full name"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              className={inputClasses}
            />
          )}
          <input
            required
            type="email"
            placeholder="Email address"
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            className={inputClasses}
          />
          <input
            required
            type="password"
            minLength={6}
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
            className={inputClasses}
          />
          <Button type="submit" className="mt-2" disabled={submitting}>
            {submitting ? "Please wait…" : mode === "signin" ? "Sign In" : "Create Account"}
          </Button>
        </form>
      </div>
    );
  }

  const displayName =
    (user.user_metadata?.full_name as string | undefined) || user.email?.split("@")[0] || "there";

  return (
    <div className="container-aavira py-10 md:py-14 max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-10 pb-6 border-b border-line">
        <div>
          <p className="text-sm text-charcoal-faint">Welcome back,</p>
          <h2 className="font-display text-2xl">{displayName}</h2>
          <p className="text-sm text-charcoal-soft mt-0.5">{user.email}</p>
        </div>
        <button
          type="button"
          onClick={handleLogout}
          className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.1em] text-charcoal-soft hover:text-charcoal"
        >
          <LogOut size={14} strokeWidth={1.5} /> Sign Out
        </button>
      </div>

      <div className="flex items-center gap-2 mb-5">
        <Package size={16} strokeWidth={1.5} />
        <h3 className="font-display text-lg">Order History</h3>
      </div>

      {orders.length === 0 ? (
        <p className="text-sm text-charcoal-faint">
          No orders yet.{" "}
          <Link href="/shop" className="underline underline-offset-4">
            Start shopping
          </Link>
          .
        </p>
      ) : (
        <div className="flex flex-col gap-4">
          {orders.map((order) => (
            <div key={order.id} className="border border-line p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium">Order #{order.orderNumber}</span>
                <span className="text-xs text-charcoal-faint">
                  {new Date(order.createdAt).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              </div>
              <div className="flex gap-2 mb-3">
                {order.items.slice(0, 4).map((line) => (
                  <div
                    key={line.id}
                    className="relative h-12 w-12 overflow-hidden bg-ivory-deep"
                  >
                    <Image src={line.image} alt={line.productName} fill sizes="48px" className="object-cover" />
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-charcoal-soft">{order.items.length} item(s)</span>
                <span className="font-medium">{formatPrice(order.total)}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
