import SectionHeader from "@/components/site/shared/section-header";

const HeroSection = () => {
  return (
    <section className="my-16 flex w-full flex-col items-center gap-4" id="hero">
      <SectionHeader
        preTitle="Cookie Policy"
        title="How We Use Cookies"
        markedWord="Cookies"
        desc="This Cookie Policy explains how SYNTAC uses cookies and similar technologies to support website functionality, understand usage, and improve your experience."
      />
    </section>
  );
};

export default HeroSection;
