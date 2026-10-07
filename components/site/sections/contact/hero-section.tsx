import SectionHeader from "@/components/site/shared/section-header";

const HeroSection = () => {
  return (
    <section
      id="contact-hero"
      className="space-y-8 py-8 sm:space-y-16 sm:py-16 lg:py-24"
      data-divider
    >
      <div className="mx-auto max-w-3xl pb-10">
        <h1 className="hidden">Contact Us</h1>

        <SectionHeader
          preTitle="Contact Us"
          title="Let’s Build Something That Matters"
          markedWord="Something"
          desc="Have a project in mind, a challenge to solve, or simply want to talk? Get in touch and let’s explore how we can turn your ideas into a practical digital solution."
        />
      </div>
    </section>
  );
};

export default HeroSection;
