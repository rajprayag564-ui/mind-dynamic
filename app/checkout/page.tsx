import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Navbar } from "@/components/landing/navbar";
import { SiteFooter } from "@/components/landing/site-footer";
import CheckoutForm from "@/components/checkout/CheckoutForm";
import { flagshipCourse } from "@/lib/course-data";

type Props = {
  searchParams?: { productId?: string };
};

export default function CheckoutPage({ searchParams }: Props) {
  const productId = searchParams?.productId;

  // Simple session check: require dfm_session cookie (uid)
  const dfm = cookies().get("dfm_session")?.value;
  if (!dfm) {
    const next = encodeURIComponent(`/checkout?productId=${productId || ""}`);
    redirect(`/login?next=${next}`);
  }

  if (!productId) {
    redirect("/courses");
  }

  const product = flagshipCourse.courseOffers.find((c) => c.id === productId);
  if (!product) {
    redirect("/courses");
  }

  return (
    <div className="min-h-screen bg-[#0A0F2C] text-white">
      <Navbar />
      <main className="mx-auto w-full max-w-6xl px-4 py-12">
        <h1 className="text-2xl font-bold">Checkout</h1>
        <p className="mt-2 text-sm text-blue-100">Pay via UPI and submit your transaction ID for manual verification.</p>

        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
          <CheckoutForm productId={productId} title={product!.title} amount={product!.priceInr} />
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
