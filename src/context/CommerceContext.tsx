"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { User } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";
import type { Product } from "@/lib/commerce/types";

export type CartLine = {
  productId: string;
  slug: string;
  name: string;
  image: string;
  price: number;
  variantLabel: string;
  quantity: number;
};

type CommerceState = {
  cart: CartLine[];
  wishlist: string[];
  isCartOpen: boolean;
};

const CART_STORAGE_KEY = "aavira-cart";

type CommerceContextValue = CommerceState & {
  user: User | null | undefined;
  addToCart: (product: Product, variantLabel: string, quantity?: number) => void;
  removeFromCart: (productId: string, variantLabel: string) => void;
  updateQuantity: (
    productId: string,
    variantLabel: string,
    quantity: number
  ) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;
  openCart: () => void;
  closeCart: () => void;
  cartCount: number;
  cartSubtotal: number;
};

const CommerceContext = createContext<CommerceContextValue | null>(null);

export function CommerceProvider({ children }: { children: React.ReactNode }) {
  const supabase = useMemo(() => createClient(), []);
  const [user, setUser] = useState<User | null | undefined>(undefined);
  const [state, setState] = useState<CommerceState>({
    cart: [],
    wishlist: [],
    isCartOpen: false,
  });
  const [hydrated, setHydrated] = useState(false);

  // Cart stays client-only (localStorage) — no account needed to shop.
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(CART_STORAGE_KEY);
      if (raw) {
        const cart = JSON.parse(raw) as CartLine[];
        // Hydrating client-only localStorage after mount avoids an SSR/client markup mismatch.
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setState((s) => ({ ...s, cart }));
      }
    } catch {
      // ignore malformed local storage
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state.cart));
  }, [state.cart, hydrated]);

  // Wishlist is backed by the database and scoped to the signed-in user.
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
  }, [supabase]);

  useEffect(() => {
    if (!user) {
      // Syncing to the external auth state change (user signed out), not local state.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setState((s) => ({ ...s, wishlist: [] }));
      return;
    }
    supabase
      .from("wishlists")
      .select("product_id")
      .then(({ data }) => {
        setState((s) => ({ ...s, wishlist: (data ?? []).map((row) => row.product_id) }));
      });
  }, [user, supabase]);

  const addToCart = useCallback<CommerceContextValue["addToCart"]>(
    (product, variantLabel, quantity = 1) => {
      setState((s) => {
        const existing = s.cart.find(
          (line) => line.productId === product.id && line.variantLabel === variantLabel
        );
        const cart = existing
          ? s.cart.map((line) =>
              line.productId === product.id && line.variantLabel === variantLabel
                ? { ...line, quantity: line.quantity + quantity }
                : line
            )
          : [
              ...s.cart,
              {
                productId: product.id,
                slug: product.slug,
                name: product.name,
                image: product.images[0],
                price: product.price,
                variantLabel,
                quantity,
              },
            ];
        return { ...s, cart, isCartOpen: true };
      });
    },
    []
  );

  const removeFromCart = useCallback<CommerceContextValue["removeFromCart"]>(
    (productId, variantLabel) => {
      setState((s) => ({
        ...s,
        cart: s.cart.filter(
          (line) => !(line.productId === productId && line.variantLabel === variantLabel)
        ),
      }));
    },
    []
  );

  const updateQuantity = useCallback<CommerceContextValue["updateQuantity"]>(
    (productId, variantLabel, quantity) => {
      setState((s) => ({
        ...s,
        cart:
          quantity <= 0
            ? s.cart.filter(
                (line) => !(line.productId === productId && line.variantLabel === variantLabel)
              )
            : s.cart.map((line) =>
                line.productId === productId && line.variantLabel === variantLabel
                  ? { ...line, quantity }
                  : line
              ),
      }));
    },
    []
  );

  const clearCart = useCallback(() => {
    setState((s) => ({ ...s, cart: [] }));
  }, []);

  const toggleWishlist = useCallback(
    (productId: string) => {
      if (!user) return;

      setState((s) => {
        const wasWishlisted = s.wishlist.includes(productId);
        const wishlist = wasWishlisted
          ? s.wishlist.filter((id) => id !== productId)
          : [...s.wishlist, productId];

        if (wasWishlisted) {
          supabase
            .from("wishlists")
            .delete()
            .eq("user_id", user.id)
            .eq("product_id", productId)
            .then();
        } else {
          supabase
            .from("wishlists")
            .insert({ user_id: user.id, product_id: productId })
            .then();
        }

        return { ...s, wishlist };
      });
    },
    [user, supabase]
  );

  const isWishlisted = useCallback(
    (productId: string) => state.wishlist.includes(productId),
    [state.wishlist]
  );

  const openCart = useCallback(() => setState((s) => ({ ...s, isCartOpen: true })), []);
  const closeCart = useCallback(() => setState((s) => ({ ...s, isCartOpen: false })), []);

  const cartCount = useMemo(
    () => state.cart.reduce((sum, line) => sum + line.quantity, 0),
    [state.cart]
  );
  const cartSubtotal = useMemo(
    () => state.cart.reduce((sum, line) => sum + line.price * line.quantity, 0),
    [state.cart]
  );

  const value = useMemo<CommerceContextValue>(
    () => ({
      ...state,
      user,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      toggleWishlist,
      isWishlisted,
      openCart,
      closeCart,
      cartCount,
      cartSubtotal,
    }),
    [
      state,
      user,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      toggleWishlist,
      isWishlisted,
      openCart,
      closeCart,
      cartCount,
      cartSubtotal,
    ]
  );

  return (
    <CommerceContext.Provider value={value}>{children}</CommerceContext.Provider>
  );
}

export function useCommerce() {
  const ctx = useContext(CommerceContext);
  if (!ctx) throw new Error("useCommerce must be used within CommerceProvider");
  return ctx;
}
