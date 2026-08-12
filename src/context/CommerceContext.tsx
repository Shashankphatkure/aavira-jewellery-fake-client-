"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
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

const STORAGE_KEY = "aavira-commerce";

type CommerceContextValue = CommerceState & {
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
  const [state, setState] = useState<CommerceState>({
    cart: [],
    wishlist: [],
    isCartOpen: false,
  });
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Pick<CommerceState, "cart" | "wishlist">;
        // Hydrating client-only localStorage after mount avoids an SSR/client markup mismatch.
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setState((s) => ({ ...s, cart: parsed.cart ?? [], wishlist: parsed.wishlist ?? [] }));
      }
    } catch {
      // ignore malformed local storage
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ cart: state.cart, wishlist: state.wishlist })
    );
  }, [state.cart, state.wishlist, hydrated]);

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

  const toggleWishlist = useCallback((productId: string) => {
    setState((s) => ({
      ...s,
      wishlist: s.wishlist.includes(productId)
        ? s.wishlist.filter((id) => id !== productId)
        : [...s.wishlist, productId],
    }));
  }, []);

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
