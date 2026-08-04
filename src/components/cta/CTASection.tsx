export default function CTASection() {
  return (
    <section className="bg-white px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="rounded-[48px] bg-[#003665] px-8 py-20 md:px-20">
          <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
            <h2 className="font-space-grotesk text-4xl font-bold tracking-[-0.01em] text-white md:text-5xl">
              Ready to simplify family care?
            </h2>

            <p className="mt-8 max-w-2xl text-xl leading-8 text-[#D1D5DB]">
              Join thousands of families using KinGuard to stay connected every
              day. Setup takes less than 5 minutes.
            </p>

            <div className="mt-12 flex flex-col gap-4 sm:flex-row">
              <button className="rounded-2xl bg-[#F7F7F7] px-12 py-5 text-base font-bold text-[#003665] shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-white">
                Get Started for Free
              </button>

              <button className="rounded-2xl border border-white/30 px-12 py-5 text-base font-bold text-white transition-all duration-300 hover:bg-white/10">
                Speak to a Care Expert
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
