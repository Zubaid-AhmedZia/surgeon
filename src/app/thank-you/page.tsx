export const metadata = {
  title: "Thank You | Dr. Sobia Yasmeen",
  description: "Appointment request received.",
};

export default function ThankYouPage() {
  return (
    <main className="min-h-[70vh] grid place-items-center px-6">
      <div className="max-w-xl text-center">
        <h1 className="font-display text-4xl md:text-5xl">Appointment Request Received</h1>
        <p className="mt-4 text-porcelain/80">
          Your appointment request was sent successfully. A representative will contact you soon.
        </p>
        <div className="mt-8 flex items-center justify-center gap-4">
          <a href="/" className="rounded-xl px-6 py-3 border border-white/15 hover:bg-white/5">Back to Home</a>
          <a href="#book" className="rounded-xl px-6 py-3 bg-surgical hover:brightness-110">Book Another</a>
        </div>
      </div>
    </main>
  );
}

