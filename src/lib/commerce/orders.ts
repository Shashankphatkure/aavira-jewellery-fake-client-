import { createClient } from "@/lib/supabase/client";
import type { CartLine } from "@/context/CommerceContext";

export type OrderItem = {
  id: string;
  productId: string | null;
  productName: string;
  variantLabel: string;
  image: string;
  price: number;
  quantity: number;
};

export type PaymentMethod = "upi" | "card" | "cod";

export type Order = {
  id: string;
  orderNumber: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  addressLine1: string;
  addressLine2: string | null;
  city: string;
  state: string;
  pincode: string;
  paymentMethod: PaymentMethod;
  total: number;
  status: string;
  createdAt: string;
  items: OrderItem[];
};

export type NewOrderInput = {
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  pincode: string;
  paymentMethod: PaymentMethod;
  total: number;
  items: CartLine[];
};

function generateOrderNumber() {
  const random = Math.floor(Math.random() * 900000) + 100000;
  return `AAV${random}`;
}

const LAST_ORDER_KEY = "aavira-last-order";

// Session-only handoff from checkout to the confirmation page. The order
// itself is already durably stored in the database by this point — this is
// just so the confirmation page doesn't need a network round trip.
export function saveLastOrderSnapshot(order: Order) {
  try {
    window.sessionStorage.setItem(LAST_ORDER_KEY, JSON.stringify(order));
  } catch {
    // ignore storage errors
  }
}

export function readLastOrderSnapshot(): Order | null {
  try {
    const raw = window.sessionStorage.getItem(LAST_ORDER_KEY);
    return raw ? (JSON.parse(raw) as Order) : null;
  } catch {
    return null;
  }
}

export async function fetchMyOrders(): Promise<Order[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("orders")
    .select("*, order_items(*)")
    .order("created_at", { ascending: false });

  if (error) throw error;

  return (data ?? []).map((order) => ({
    id: order.id,
    orderNumber: order.order_number,
    contactName: order.contact_name,
    contactEmail: order.contact_email,
    contactPhone: order.contact_phone,
    addressLine1: order.address_line1,
    addressLine2: order.address_line2,
    city: order.city,
    state: order.state,
    pincode: order.pincode,
    paymentMethod: order.payment_method as PaymentMethod,
    total: order.total,
    status: order.status,
    createdAt: order.created_at,
    items: (order.order_items ?? []).map((item) => ({
      id: item.id,
      productId: item.product_id,
      productName: item.product_name,
      variantLabel: item.variant_label,
      image: item.image,
      price: item.price,
      quantity: item.quantity,
    })),
  }));
}

export async function createOrder(input: NewOrderInput): Promise<Order> {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("You must be signed in to place an order.");

  const orderNumber = generateOrderNumber();

  const { data: order, error: orderError } = await supabase
    .from("orders")
    .insert({
      user_id: user.id,
      order_number: orderNumber,
      contact_name: input.contactName,
      contact_email: input.contactEmail,
      contact_phone: input.contactPhone,
      address_line1: input.addressLine1,
      address_line2: input.addressLine2 || null,
      city: input.city,
      state: input.state,
      pincode: input.pincode,
      payment_method: input.paymentMethod,
      total: input.total,
    })
    .select()
    .single();

  if (orderError) throw orderError;

  const { error: itemsError } = await supabase.from("order_items").insert(
    input.items.map((line) => ({
      order_id: order.id,
      product_id: line.productId,
      product_name: line.name,
      variant_label: line.variantLabel,
      image: line.image,
      price: line.price,
      quantity: line.quantity,
    }))
  );

  if (itemsError) throw itemsError;

  return {
    id: order.id,
    orderNumber: order.order_number,
    contactName: order.contact_name,
    contactEmail: order.contact_email,
    contactPhone: order.contact_phone,
    addressLine1: order.address_line1,
    addressLine2: order.address_line2,
    city: order.city,
    state: order.state,
    pincode: order.pincode,
    paymentMethod: order.payment_method as PaymentMethod,
    total: order.total,
    status: order.status,
    createdAt: order.created_at,
    items: input.items.map((line, i) => ({
      id: `${order.id}-${i}`,
      productId: line.productId,
      productName: line.name,
      variantLabel: line.variantLabel,
      image: line.image,
      price: line.price,
      quantity: line.quantity,
    })),
  };
}
