import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function OrderHistoryPage() {
  return (
    <>
      <Navbar />
      <div className="container mt-5 mb-[300px]">
        <div>You have no order</div>
      </div>
      <Footer />
    </>
  );
}
