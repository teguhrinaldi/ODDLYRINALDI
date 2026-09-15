import FaqAccordion from "@/components/FaqAccordion";
import { CUSTOM_WEBSITE_FAQS } from "@/data/customWebsite";

export default function CustomWebsiteFAQ() {
  return (
    <div className="mx-auto max-w-3xl">
      <FaqAccordion items={CUSTOM_WEBSITE_FAQS} />
    </div>
  );
}
