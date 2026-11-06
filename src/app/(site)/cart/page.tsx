import type { Metadata } from "next";
import CartClient from "@/components/CartClient";

export const metadata: Metadata = { title: "سلة المشتريات | دار الخير هايبر ماركت" };

export default function CartPage() {
  return <CartClient />;
}
