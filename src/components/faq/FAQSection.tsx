import { useState } from "react";
import { Minus, Plus } from "@/components/icons";

const faqs = [
  {
    question: "Does my loved one need to install an app?",
    answer:
      "No. Family members can receive reminders, updates, and alerts through WhatsApp or SMS. Only caregivers who want the full dashboard need to install the app.",
  },
  {
    question: "How secure is my family's health data?",
    answer:
      "All health records are encrypted in transit and at rest. Only authorized members of your care circle can access shared information.",
  },
  {
    question: "Can I add professional nurses to my circle?",
    answer:
      "Yes. You can invite professional nurses, doctors, or caregivers to collaborate within your family's care circle with permission controls.",
  },
  {
    question: "What happens if there's no internet connection?",
    answer:
      "The app continues to work offline where possible and automatically syncs your data once an internet connection becomes available.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className="bg-white px-6 py-24">
      <div className="mx-auto max-w-3xl">
        <h2 className="text-center font-heading text-[32px] font-bold text-[#102A43]">
          Frequently Asked Questions
        </h2>

        <div className="mt-16 divide-y divide-gray-200">
          {faqs.map((faq, index) => {
            const open = openIndex === index;

            return (
              <div key={faq.question}>
                <button
                  onClick={() => toggle(index)}
                  className="flex w-full items-center justify-between py-6 text-left transition-colors hover:text-[#0B3D63]"
                >
                  <span className="font-heading text-lg font-bold text-[#102A43]">
                    {faq.question}
                  </span>

                  <span className="flex h-8 w-8 items-center justify-center text-[#0B3D63]">
                    {open ? (
                      <Minus className="h-5 w-5" strokeWidth={2.5} />
                    ) : (
                      <Plus className="h-5 w-5" strokeWidth={2.5} />
                    )}
                  </span>
                </button>

                <div
                  className={`grid overflow-hidden transition-all duration-300 ${
                    open ? "grid-rows-[1fr] pb-6" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="max-w-2xl pr-10 text-base leading-7 text-[#5C6B7A]">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
