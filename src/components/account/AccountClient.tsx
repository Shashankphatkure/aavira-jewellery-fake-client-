"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, type FormEvent } from "react";
import { LogOut, Package } from "lucide-react";
import { clearMockUser, getMockUser, setMockUser, type MockUser } from "@/lib/commerce/auth";
import { readOrderHistory, type Order } from "@/lib/commerce/order";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

const inputClasses =
  "w-full border border-line bg-cream px-4 py-3 text-sm outline-none focus:border-charcoal transition-colors";

export function AccountClient() {
  const [user, setUser] = useState<MockUser | null | undefined>(undefined);
  const [orders, setOrders] = useState<Order[]>([]);
  const [mode, setMode] = useState<"signin" | "register">("signin");
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  useEffect(() => {
    // Hydrating client-only localStorage after mount avoids an SSR/client markup mismatch.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setUser(getMockUser());
    setOrders(readOrderHistory());
  }, []);

  if (user === undefined) return null;

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const account = { name: form.name || form.email.split("@")[0], email: form.email };
    setMockUser(account);
    setUser(account);
  }

  function handleLogout() {
    clearMockUser();
    setUser(null);
  }

  if (!user) {
    return (
      <div className="container-aavira py-14 md:py-20 max-w-sm mx-auto">
        <div className="flex border-b border-line mb-8">
          <button
            type="button"
            onClick={() => setMode("signin")}
            className={`flex-1 pb-3 text-xs uppercase tracking-[0.1em] border-b-2 -mb-px ${
              mode === "signin" ? "border-charcoal text-charcoal" : "border-transparent text-charcoal-faint"
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => setMode("register")}
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
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
            className={inputClasses}
          />
          <Button type="submit" className="mt-2">
            {mode === "signin" ? "Sign In" : "Create Account"}
          </Button>
        </form>
      </div>
    );
  }

  return (
    <div className="container-aavira py-10 md:py-14 max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-10 pb-6 border-b border-line">
        <div>
          <p className="text-sm text-charcoal-faint">Welcome back,</p>
          <h2 className="font-display text-2xl">{user.name}</h2>
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
            <div key={order.orderNumber} className="border border-line p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium">Order #{order.orderNumber}</span>
                <span className="text-xs text-charcoal-faint">
                  {new Date(order.placedAt).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              </div>
              <div className="flex gap-2 mb-3">
                {order.items.slice(0, 4).map((line) => (
                  <div
                    key={`${line.productId}-${line.variantLabel}`}
                    className="relative h-12 w-12 overflow-hidden bg-ivory-deep"
                  >
                    <Image src={line.image} alt={line.name} fill sizes="48px" className="object-cover" />
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
