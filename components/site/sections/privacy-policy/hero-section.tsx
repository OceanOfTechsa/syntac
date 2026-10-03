import SectionHeader from "@/components/site/shared/section-header";

const HeroSection = () => {
    return (
        <section className={'my-16 flex w-full flex-col items-center gap-4'}>
            <SectionHeader
                preTitle="Privacy Policy"
                title="How We Handle Your Information"
                markedWord="Information"
                desc="This Privacy Policy explains how SYNTAC collects, uses, stores, and protects personal information when you use our website, contact us, or engage with our services."
            />
        </section>
    )
}
export default HeroSection
