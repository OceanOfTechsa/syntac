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
        answer: "The cost of software development is influenced by various factors, including the type of application (whether web or mobile), the technologies employed, the number and complexity of features, and the project story.\n" +
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

export const AboutFaqs: IFaq[] = [
    {
        key: "1",
        question: "What is SYNTAC?",
        answer:
            "SYNTAC is a software development company that builds websites, custom software, web platforms, and business systems around the needs of each client.",
    },
    {
        key: "2",
        question: "How did SYNTAC start?",
        answer:
            "The story began in 2021 while we were at university, with a passion for technology and solving real-world problems. What started as Ocean of Tech has since evolved into SYNTAC.",
    },
    {
        key: "3",
        question: "Why did you change from Ocean of Tech to SYNTAC?",
        answer:
            "As the company grew, Ocean of Tech no longer reflected the direction we were heading. SYNTAC represents a broader vision built around synchronising ideas with technology.",
    },
    {
        key: "4",
        question: "What does SYNTAC mean?",
        answer:
            "SYNTAC is inspired by the idea of synchronising ideas with technology — bringing business goals, creative thinking, and engineering together to build useful solutions.",
    },
    {
        key: "5",
        question: "Who does SYNTAC work with?",
        answer:
            "We work with startups, small businesses, growing businesses, established brands, organisations, and enterprises. We build around the needs of each client rather than following a one-size-fits-all approach.",
    },
    {
        key: "6",
        question: "What makes SYNTAC different?",
        answer:
            "We focus on understanding the problem before deciding on the technology. Our solutions are thoughtfully designed, hand-written, maintainable, and built with the future needs of the business in mind.",
    },
    {
        key: "7",
        question: "Does SYNTAC only build websites?",
        answer:
            "No. Websites are one part of what we do. We also build custom software, web platforms, business systems, integrations, and other digital solutions where a tailored approach is needed.",
    },
    {
        key: "8",
        question: "How involved will I be during a project?",
        answer:
            "We believe the best solutions come from collaboration. Clients are kept involved throughout the project, giving them opportunities to review progress, provide feedback, and help shape the final solution.",
    },
    {
        key: "9",
        question: "Does SYNTAC provide support after launch?",
        answer:
            "Yes. We can continue supporting your solution after launch through maintenance, improvements, updates, and further development as your business evolves.",
    },
    {
        key: "10",
        question: "Where does SYNTAC work?",
        answer:
            "SYNTAC is based in South Africa and works with clients locally and internationally. Whether we're working with a growing local business or a larger organisation, our approach remains focused on building technology around their goals.",
    },
];