import AppSettings from "@/utils/AppSettings";

export interface IFaq
{
    question: string;
    answer: string;
    key: string
}

export const faqs: IFaq[] = [
    {
        question: 'Which software development services do you provide?',
        answer: "Our main services include UI/UX design, graphic design, mobile app development, web development, CTO as a service, business analytics, and DevOps services. Usually, when we begin a project, we work on it from start to finish — conduct a business analysis, design an interface, develop and test it, release the product and support it as long as the client needs. If you need any of the services separately, it’s not a problem.",
        key: "1"
    },
    {
        question: 'What is your software development company’s pricing policy? How much do your services cost?',
        answer: "The cost of software development is influenced by various factors, including the type of application (whether web or mobile), the technologies employed, the number and complexity of features, and the project timeline.\n" +
            "\n" +
            "Our average prices for web development are $30,000-$60,000+, landing pages might cost around $2000-$5000+, while simple websites can cost $5000-$8000+. As for mobile app development, it can be around $25,000-$60,000+. All these prices are very approximate and based on our previous projects. To get an estimate for your project, please contact our manager.",
        key: "2"
    },
    {
        question: 'How long does it take you to develop a digital product?',
        answer: "The software development time depends on the number and complexity of features we need to develop for your project. If we’re talking about creating an MVP (minimum viable product), our dedicated development team can launch it in 1-3 months",
        key: "3"
    },
    {
        question: 'What is your experience with custom software development?',
        answer: "Our software development company has 17+ years of experience in designing and developing products for different industries. You can always check our custom software development cases on our website.",
        key: "4"
    },
    {
        question: 'How do you ensure software quality, scalability, and security?',
        answer: "We follow modern development best practices including clean architecture, code reviews, version control, automated testing, and secure deployment pipelines. Our solutions are built to scale, ensuring long-term reliability for growing businesses in South Africa and global markets.",
        key: "5"
    },
    {
        question: `What makes ${AppSettings.COMPANY_NAME} different from other software companies?`,
        answer: "We focus on building strategic technology solutions not just software. Our team prioritizes performance, scalability, business alignment, and measurable results. We aim to become long-term technology partners, not just service providers.",
        key: "6"
    },
    {
        question: 'Can you sign an NDA?',
        answer: "Sure! Your privacy is our priority — if you’re worried about sensitive details being disclosed during our custom software development process, we can sign an NDA.",
        key: "7"
    }
]