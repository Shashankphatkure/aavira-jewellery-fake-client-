import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { AccountClient } from "@/components/account/AccountClient";

export const metadata: Metadata = { title: "Account" };

export default function AccountPage() {
  return (
    <div>
      <PageHeader eyebrow="Account" title="Your Account" />
      <AccountClient />
    </div>
  );
}
