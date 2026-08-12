import type { CartLine } from "@/context/CommerceContext";

export type Order = {
  orderNumber: string;
  contact: { name: string; email: string; phone: string };
  address: { line1: string; line2: string; city: string; state: string; pincode: string };
  payment: "upi" | "card" | "cod";
  items: CartLine[];
  total: number;
  placedAt: string;
};

const LAST_ORDER_KEY = "aavira-last-order";
const HISTORY_KEY = "aavira-order-history";

export function saveLastOrder(order: Order) {
  try {
    window.sessionStorage.setItem(LAST_ORDER_KEY, JSON.stringify(order));
    const history = readOrderHistory();
    window.localStorage.setItem(
      HISTORY_KEY,
      JSON.stringify([order, ...history].slice(0, 20))
    );
  } catch {
    // ignore storage errors
  }
}

export function readLastOrder(): Order | null {
  try {
    const raw = window.sessionStorage.getItem(LAST_ORDER_KEY);
    return raw ? (JSON.parse(raw) as Order) : null;
  } catch {
    return null;
  }
}

export function readOrderHistory(): Order[] {
  try {
    const raw = window.localStorage.getItem(HISTORY_KEY);
    return raw ? (JSON.parse(raw) as Order[]) : [];
  } catch {
    return [];
  }
}
