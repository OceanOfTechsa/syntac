import AppSettings from "@/utils/AppSettings";

const COMPANY_NAME: string = AppSettings.COMPANY_NAME;

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
        question: `What makes ${COMPANY_NAME} different from other software companies?`,
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
        question: `What is ${COMPANY_NAME}?`,
        answer:
            `${COMPANY_NAME} is a software development company that builds websites, custom software, web platforms, and business systems around the needs of each client.`,
    },
    {
        key: "2",
        question: `How did ${COMPANY_NAME} start?`,
        answer:
            `The story began in 2021 while we were at university, with a passion for technology and solving real-world problems. What started as Ocean of Tech has since evolved into ${COMPANY_NAME}.`,
    },
    {
        key: "3",
        question: `Why did you change from Ocean of Tech to ${COMPANY_NAME}?`,
        answer:
            `As the company grew, Ocean of Tech no longer reflected the direction we were heading. ${COMPANY_NAME} represents a broader vision built around synchronising ideas with technology.`,
    },
    {
        key: "4",
        question: `What does ${COMPANY_NAME} mean?`,
        answer:
            `${COMPANY_NAME} is inspired by the idea of synchronising ideas with technology — bringing business goals, creative thinking, and engineering together to build useful solutions.`,
    },
    {
        key: "5",
        question: `Who does ${COMPANY_NAME} work with?`,
        answer:
            "We work with startups, small businesses, growing businesses, established brands, organisations, and enterprises. We build around the needs of each client rather than following a one-size-fits-all approach.",
    },
    {
        key: "6",
        question: `What makes ${COMPANY_NAME} different?`,
        answer:
            "We focus on understanding the problem before deciding on the technology. Our solutions are thoughtfully designed, hand-written, maintainable, and built with the future needs of the business in mind.",
    },
    {
        key: "7",
        question: `Does ${COMPANY_NAME} only build websites?`,
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
        question: `Does ${COMPANY_NAME} provide support after launch?`,
        answer:
            "Yes. We can continue supporting your solution after launch through maintenance, improvements, updates, and further development as your business evolves.",
    },
    {
        key: "10",
        question: `Where does ${COMPANY_NAME} work?`,
        answer:
            `${COMPANY_NAME} is based in South Africa and works with clients locally and internationally. Whether we're working with a growing local business or a larger organisation, our approach remains focused on building technology around their goals.`,
    },
];

export const HowWeWorkFaqs: IFaq[] = [
  {
    key: "1",
    question: `What is the first step when starting a project with ${COMPANY_NAME}?`,
    answer:
      "Every project starts with a discovery conversation. We learn about your business, goals, challenges, requirements, and what you want the solution to achieve before recommending the right approach.",
  },
  {
    key: "2",
    question: `How does ${COMPANY_NAME} plan a project?`,
    answer:
      "After understanding your needs, we define the scope, requirements, features, priorities, technology, and project milestones. This gives everyone a clear understanding of what will be built and how the project will progress.",
  },
  {
    key: "3",
    question: "Will I know what is happening throughout the project?",
    answer:
      "Yes. We keep clients informed throughout the project with clear milestones, progress updates, reviews, and communication. You will have opportunities to provide feedback and make informed decisions as the solution takes shape.",
  },
  {
    key: "4",
    question: "How long does a project take?",
    answer:
      "Project timelines depend on the scope, complexity, features, and level of design and development required. During planning, we break the project into milestones and provide a realistic timeline based on the work involved.",
  },
  {
    key: "5",
    question: "Can I make changes during development?",
    answer:
      "Yes. Feedback is an important part of the process. We encourage reviewing progress at appropriate stages so adjustments can be made while keeping the project scope, priorities, and timeline clear.",
  },
  {
    key: "6",
    question: "What happens during the design and development stage?",
    answer:
      "Once the direction is approved, we turn the requirements into the actual solution. This can include interface design, frontend development, backend development, database work, integrations, and other functionality required by the project.",
  },
  {
    key: "7",
    question: `Does ${COMPANY_NAME} test projects before delivery?`,
    answer:
      "Yes. Before a solution is delivered, we test the functionality, interfaces, integrations, responsiveness, and other important areas to identify and resolve issues before launch.",
  },
  {
    key: "8",
    question: "What happens when the project is completed?",
    answer:
      "Once the agreed solution has been completed and reviewed, we prepare it for delivery or launch. Depending on the project, this can include deployment, configuration, handover, documentation, and guidance on using the solution.",
  },
  {
    key: "9",
    question: `Can ${COMPANY_NAME} help with hosting and deployment?`,
    answer:
      "Yes. Where required, we can assist with deployment and technical configuration. Hosting, domains, business email, and other third-party services can be arranged according to the project's requirements and responsibilities.",
  },
  {
    key: "10",
    question: "What happens after my project launches?",
    answer:
      "Launch is not necessarily the end of the relationship. We can continue supporting your solution through maintenance, fixes, improvements, updates, and further development as your needs change.",
  },
];

export const ServicesFaqs: IFaq[] = [
    {
        key: "1",
        question: `What software services does ${COMPANY_NAME} provide?`,
        answer:
            "We design and develop custom digital solutions around your business needs. Our services include websites, web applications, custom business systems, internal platforms, integrations, and software improvements or modernisation.",
    },
    {
        key: "2",
        question: `Can ${COMPANY_NAME} build a solution from scratch?`,
        answer:
            "Yes. We can take a project from an initial idea through planning, design, development, testing, and deployment. We first understand your goals and requirements, then recommend an approach that fits the problem you need to solve.",
    },
    {
        key: "3",
        question: "Can you work with an existing website or software system?",
        answer:
            "Yes. We can improve, extend, maintain, or modernise existing solutions. Depending on the system, this may include fixing issues, adding features, improving performance, updating the interface, integrating new services, or restructuring parts of the application.",
    },
    {
        key: "4",
        question: "How do you make sure a solution is secure?",
        answer:
            "Security is considered throughout the development lifecycle rather than added at the end. We apply secure development practices, appropriate access controls, input validation, data protection, dependency management, testing, and deployment practices based on the requirements and risks of each project.",
    },
    {
        key: "5",
        question: "Will the software be designed around my business?",
        answer:
            "Yes. We do not rely on one-size-fits-all solutions. We learn how your business operates, what your users need, and what the product needs to achieve before defining the structure, features, and technology used to build it.",
    },
    {
        key: "6",
        question: `What technologies does ${COMPANY_NAME} use?`,
        answer:
            "We select technologies based on the project's requirements rather than forcing every project into the same stack. Depending on the solution, our development work can involve modern web technologies, backend frameworks, databases, APIs, cloud platforms, and third-party services.",
    },
    {
        key: "7",
        question: "Will my website or application work across different devices?",
        answer:
            "Yes. Where responsive design is required, we build interfaces that adapt to different screen sizes and devices. We also consider usability, accessibility, performance, and browser compatibility as part of delivering a reliable user experience.",
    },
    {
        key: "8",
        question: `Can ${COMPANY_NAME} integrate my software with other services?`,
        answer:
            "Yes. We can connect your solution with suitable third-party platforms and services through APIs or other available integration methods. Integrations can be used for areas such as payments, communication, authentication, business systems, data exchange, and automation.",
    },
    {
        key: "9",
        question: `Can ${COMPANY_NAME} help with deployment and hosting?`,
        answer:
            "Yes. We can assist with deployment, configuration, and getting your solution ready for production. Hosting, domains, business email, and other third-party services can be handled according to the project's requirements and agreed responsibilities.",
    },
    {
        key: "10",
        question: "Will I be able to update and maintain my solution after launch?",
        answer:
            "Yes. We aim to deliver maintainable solutions that can evolve with your business. Depending on the project, we can also provide ongoing maintenance, technical support, improvements, updates, and further development after launch.",
    },
    {
        key: "11",
        question: "How long does it take to build a website or software solution?",
        answer:
            "There is no single timeline because every project is different. The duration depends on the type of solution, scope, number of features, integrations, design requirements, and complexity. We estimate the work based on the actual requirements and define milestones before development begins.",
    },
    {
        key: "12",
        question: "Can I start with a smaller version of my idea?",
        answer:
            "Yes. If a full solution is not required initially, we can help define a focused version with the most important functionality. This allows you to validate the concept, gather feedback, and expand the product over time.",
    },
];

export const CasesFaqs: IFaq[] = [
    {
        question: "What types of projects are featured in your portfolio?",
        answer:
            "Our portfolio showcases selected digital projects, including websites, web applications, and custom software solutions. Each case highlights our approach to solving problems through thoughtful design, practical technology, and solutions built around specific project goals.",
        key: "1",
    },
    {
        question: "Can I see examples of projects similar to mine?",
        answer:
            "Yes. Browse our featured projects to explore the types of solutions we work on. If you have a specific idea or business challenge, contact us to discuss your requirements and whether our experience aligns with your needs.",
        key: "2",
    },
    {
        question: "What technologies do you use in your projects?",
        answer:
            "We select technologies based on each project's requirements, functionality, performance needs, and long-term maintainability. Depending on the solution, our toolkit may include modern web technologies, backend frameworks, databases, APIs, and cloud platforms.",
        key: "3",
    },
    {
        question: "Do you work on projects from scratch or improve existing systems?",
        answer:
            "We can help with new digital products as well as improvements to existing websites, applications, and software systems. The right approach depends on your current setup, business goals, and the changes needed to deliver a useful and maintainable solution.",
        key: "4",
    },
    {
        question: "How do you approach a project from concept to completion?",
        answer:
            "We begin by understanding your goals, requirements, and intended users. From there, we define the scope, plan the solution, design and develop the necessary features, test the result, and prepare it for delivery. The exact process depends on the size and complexity of the project.",
        key: "5",
    },
    {
        question: "Can you explain the process and decisions behind a featured project?",
        answer:
            "Our case studies provide an overview of selected projects and the solutions developed. Where appropriate, we share information about the objectives, approach, technologies, and outcomes while respecting client confidentiality and any applicable agreements.",
        key: "6",
    },
    {
        question: "Can you build a solution inspired by one of your showcased projects?",
        answer:
            "Absolutely. Our showcased work can serve as a starting point for discussing your requirements, but each project is scoped around the client's unique needs. We can adapt relevant ideas and functionality to create a solution that fits your business rather than simply duplicating an existing project.",
        key: "7",
    },
    {
        question: "How can I start a project with SYNTAC?",
        answer:
            "Start by contacting us with a brief description of your idea, business needs, or current technical challenges. We'll discuss your goals, the scope of work, and the next steps toward defining a suitable solution and project estimate.",
        key: "8",
    },
];