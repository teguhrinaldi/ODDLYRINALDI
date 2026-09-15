import Navbar from "@/components/Navbar";
import Hero from "@/components/hero/Hero";
import HeroDivider from "@/components/HeroDivider";
import FeaturedTemplates from "@/components/FeaturedTemplates";
import MoreThanTemplates from "@/components/MoreThanTemplates";
import CollectionIndex from "@/components/CollectionIndex";
import CustomWebsitePromo from "@/components/CustomWebsitePromo";
import JournalSupportStrip from "@/components/JournalSupportStrip";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <HeroDivider />
        <FeaturedTemplates />
        <MoreThanTemplates />
        <CollectionIndex />
        <CustomWebsitePromo />
        <JournalSupportStrip />
      </main>
      <Footer />
    </>
  );
}
