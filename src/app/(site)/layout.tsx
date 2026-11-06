import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BranchPicker from "@/components/BranchPicker";
import MobileCartBar from "@/components/MobileCartBar";
import { StoreProvider } from "@/components/store";
import { publicDB } from "@/lib/db";
import { WhatsAppIcon } from "@/components/icons";

export const dynamic = "force-dynamic";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const data = await publicDB();
  const main = data.branches[0];
  return (
    <StoreProvider branches={data.branches}>
      <Header />
      <main className="flex-1 w-full max-w-full min-w-0">{children}</main>
      <Footer data={data} />
      <BranchPicker />
      <MobileCartBar />
      {main && (
        <a
          href={`https://wa.me/${main.whatsapp}`}
          target="_blank"
          rel="noreferrer"
          aria-label="واتساب دار الخير هايبر ماركت"
          title="تواصل أو اطلب عبر واتساب"
          className="hidden md:grid fixed bottom-6 left-6 z-30 w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#1ea952] text-white place-items-center shadow-xl transition-transform hover:scale-105"
        >
          <WhatsAppIcon className="w-7 h-7" />
        </a>
      )}
    </StoreProvider>
  );
}
