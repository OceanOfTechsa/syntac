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
        question: `How can I start a project with ${COMPANY_NAME}?`,
        answer:
            "Start by contacting us with a brief description of your idea, business needs, or current technical challenges. We'll discuss your goals, the scope of work, and the next steps toward defining a suitable solution and project estimate.",
        key: "8",
    },
];

export const CaseFaqs: IFaq[] = [
    {
        question: "What was the goal of this project?",
        answer:
            "The goal was to create a solution tailored to the project's specific requirements, with a focus on usability, functionality, and the needs of its intended users. The approach and priorities were shaped by the project's objectives and scope.",
        key: "1",
    },
    {
        question: "What technologies were used to build this project?",
        answer:
            "The technology stack was selected based on the project's requirements, functionality, and long-term maintainability. Refer to the technologies listed in this case study for the specific tools and frameworks used.",
        key: "2",
    },
    {
        question: "What challenges did the project address?",
        answer:
            "The project focused on addressing the needs and requirements identified during planning. The solution was developed with those priorities in mind, balancing practical functionality, usability, and the project's overall objectives.",
        key: "3",
    },
    {
        question: "Is this project available to use?",
        answer:
            "Availability depends on the project and its current status. Some projects are publicly accessible, while others may be in development or subject to client confidentiality. Contact us if you would like more information about this particular solution.",
        key: "4",
    },
    {
        question: "Can you build a similar solution for my business?",
        answer:
            "Yes. We can use the ideas and approaches demonstrated in this project as a starting point for a solution tailored to your business. We'll discuss your requirements, identify the essential features, and recommend an approach suited to your goals.",
        key: "5",
    },
    {
        question: "Can the features be customised for my requirements?",
        answer:
            "Yes. We tailor solutions to the needs of each project. Features, integrations, user workflows, and the technology stack can be considered during planning to ensure the final solution aligns with your business requirements.",
        key: "6",
    },
    {
        question: "How can I enquire about a similar project?",
        answer:
            `Contact ${COMPANY_NAME} with a brief description of your idea, the problem you want to solve, and any requirements you already have. We'll discuss the scope, possible approach, timeline, and estimated cost based on your needs.`,
        key: "7",
    },
];

export const BusinessWebsiteServiceFaqs: IFaq[] = [
    {
        key: "1",
        question: `What does ${COMPANY_NAME}'s business website development service include?`,
        answer:
            `We design and develop custom business websites that communicate your brand, showcase your services, and help potential customers connect with your business. Depending on your requirements, your website can include service pages, contact forms, calls to action, image galleries, testimonials, maps, analytics, and other features that support your business goals.`,
    },
    {
        key: "2",
        question: `Can ${COMPANY_NAME} build a website tailored to my brand?`,
        answer:
            "Yes. We create websites around your business identity, audience, and objectives rather than relying on generic, one-size-fits-all designs. We consider your brand colours, visual identity, content, services, and customer journey to create a website that represents your business and communicates what makes it different.",
    },
    {
        key: "3",
        question: "What types of business websites can you build?",
        answer:
            "We develop a range of business websites, including company websites, professional service websites, agency websites, corporate websites, landing pages, portfolios, and content-focused websites. The structure and functionality depend on your requirements, whether you need a simple online presence or a more comprehensive website with multiple pages and integrations.",
    },
    {
        key: "4",
        question: "Will my website work on mobile phones, tablets, and desktops?",
        answer:
            "Yes. We build responsive websites that adapt to different screen sizes and devices. We consider navigation, readability, images, interactive elements, and page layouts to help visitors access your content comfortably, whether they are browsing on a smartphone, tablet, laptop, or desktop computer.",
    },
    {
        key: "5",
        question: "Will my website be optimised for search engines (SEO)?",
        answer:
            "We incorporate technical and on-page SEO foundations into the development process. Depending on your project, these may include semantic HTML, descriptive URLs, page titles and meta descriptions, heading structure, internal linking, XML sitemaps, structured data, and performance optimisation. These practices help search engines understand your content, but rankings depend on many factors, including competition, content quality, and ongoing SEO efforts.",
    },
    {
        key: "6",
        question: "Will my website load quickly?",
        answer:
            "Performance is considered throughout design and development. We use appropriate techniques such as image optimisation, efficient code, responsive asset delivery, and caching where applicable to help pages load efficiently. We can also assess performance using tools such as Google PageSpeed Insights and use the findings to identify areas for improvement. Actual results depend on factors such as hosting, third-party scripts, content, and network conditions.",
    },
    {
        key: "7",
        question: "Can you add contact forms, WhatsApp links, maps, and other integrations?",
        answer:
            "Yes. We can incorporate features that help customers interact with your business, such as enquiry forms, email links, WhatsApp contact options, location maps, social media links, newsletter sign-ups, analytics, and suitable third-party integrations. We recommend functionality based on your goals and the requirements of your website.",
    },
    {
        key: "8",
        question: "Can I update my website content after it launches?",
        answer:
            "That depends on how your website is designed and the features included in your project. We can establish an appropriate content management or administration solution when you need to update pages, images, articles, or other content yourself. For websites without a content management interface, changes can be handled through an agreed maintenance or development arrangement.",
    },
    {
        key: "9",
        question: "How long does it take to develop a business website?",
        answer:
            "The timeline depends on the number of pages, design complexity, functionality, integrations, and readiness of your content and brand assets. A straightforward business website generally requires less time than a larger website with custom functionality. After understanding your requirements, we can provide a project-specific estimate and outline the main stages, from planning and design through development, testing, and launch.",
    },
    {
        key: "10",
        question: "How much does a business website cost?",
        answer:
            "The cost depends on the scope of the project, including the number of pages, design requirements, functionality, integrations, content preparation, and any additional services. We assess your requirements before preparing a proposal that outlines the expected work and costs. This helps you understand what is included and choose an approach that fits your business needs and budget.",
    },
    {
        key: "11",
        question: "Do I need to provide the website content, images, and logo?",
        answer:
            "Providing your logo, brand guidelines, business information, service descriptions, contact details, and available images helps us build a website that accurately represents your business. If some materials are not ready, we can discuss what is needed, identify content gaps, and agree on how those requirements will be handled before development progresses.",
    },
    {
        key: "12",
        question: "Do I need to purchase a domain name and hosting separately?",
        answer:
            "Your website needs a domain name and an appropriate hosting or deployment environment to be accessible online. These services can be arranged according to the project's requirements and agreed responsibilities. We can advise you on suitable options and assist with configuration and deployment, while ongoing hosting fees and third-party service charges are handled as agreed.",
    },
    {
        key: "13",
        question: "Will I own my website after the project is completed?",
        answer:
            "Ownership, source code access, design assets, and any applicable third-party licences are defined by the terms agreed for your project. We aim to establish these expectations clearly before development begins so you understand what will be handed over, what access you will receive, and whether any third-party services have separate licensing conditions.",
    },
    {
        key: "14",
        question: "Can you maintain and update my website after launch?",
        answer:
            "Yes. If you choose ongoing support, we can assist with maintenance, content or feature updates, dependency updates, bug fixes, performance improvements, and other agreed technical requirements. The scope of support can be discussed before launch or arranged later, depending on how your business and website evolve.",
    },
    {
        key: "15",
        question: "Can you improve or redesign my existing business website?",
        answer:
            "Yes. We can assess your existing website and help improve its design, usability, responsiveness, performance, content structure, and technical foundations. Depending on its condition and your goals, we may recommend targeted improvements, a redesign, or a rebuild using a more suitable technology stack.",
    },
];

export const TechnologiesFaqs: IFaq[] = [
    {
        key: "1",
        question: `What technologies does ${COMPANY_NAME} use to build digital solutions?`,
        answer:
            "We work with modern technologies across frontend development, backend engineering, databases, cloud platforms, testing, and deployment. Depending on the project, our stack can include React, Next.js, TypeScript, Tailwind CSS, .NET, C#, SQL Server, PostgreSQL, and other suitable tools.",
    },
    {
        key: "2",
        question: `How does ${COMPANY_NAME} choose the right technology for a project?`,
        answer:
            "We select technologies based on your project requirements, business objectives, expected usage, integration needs, budget, and long-term maintenance considerations. Rather than forcing every project into the same stack, we aim to choose tools that are appropriate for the solution being built.",
    },
    {
        key: "3",
        question: "What is the difference between frontend and backend technologies?",
        answer:
            "Frontend technologies power the interface users see and interact with, including layouts, navigation, forms, and interactive features. Backend technologies handle application logic, data processing, authentication, APIs, and communication with databases or external services. Both work together to deliver a complete digital solution.",
    },
    {
        key: "4",
        question: `Does ${COMPANY_NAME} use React and Next.js for website development?`,
        answer:
            "Yes. React and Next.js can be used to build modern, responsive websites and web applications. They support reusable interface components, flexible rendering approaches, and structured application development. We choose the implementation approach according to the website's content, functionality, performance requirements, and overall goals.",
    },
    {
        key: "5",
        question: "Which backend technologies do you use for custom software?",
        answer:
            "Our backend technology options include .NET, C#, Entity Framework Core, and Node.js. These technologies can support application logic, APIs, database operations, authentication, integrations, and business workflows. The appropriate choice depends on your system's requirements and the architecture best suited to the project.",
    },
    {
        key: "6",
        question: "How do you choose the right database for an application?",
        answer:
            "Database selection depends on the structure of your data, relationships between records, query patterns, transaction requirements, expected workload, and hosting environment. Depending on the application, suitable options may include SQL Server, PostgreSQL, MongoDB, Redis, or Supabase. We consider how the database will support the solution both now and as requirements evolve.",
    },
    {
        key: "7",
        question: "Do your technologies support secure and scalable applications?",
        answer:
            "The technologies we select can support secure and scalable solutions when implemented with appropriate architecture and engineering practices. Depending on the project, this may include authentication, access controls, input validation, secure data handling, performance optimisation, monitoring, and infrastructure that can accommodate increased demand.",
    },
    {
        key: "8",
        question: `Can ${COMPANY_NAME} integrate third-party APIs and services?`,
        answer:
            "Yes. We can integrate suitable external services into websites and applications through APIs and other supported integration methods. Depending on your requirements, these may include payment gateways, email delivery services, authentication providers, analytics tools, cloud storage, and existing business systems.",
    },
    {
        key: "9",
        question: "Do you use tools for testing, monitoring, and performance optimisation?",
        answer:
            "Yes. We can use automated testing tools, application monitoring, uptime checks, and performance analysis tools to help identify issues and improve reliability. Technologies such as Jest, Cypress, Sentry, UptimeRobot, and Google PageSpeed Insights can support different parts of this process, depending on the project.",
    },
    {
        key: "10",
        question: "Can my solution be updated or moved to different technologies in the future?",
        answer:
            "Yes, although the effort required depends on the application's architecture, dependencies, and complexity. We aim to build maintainable solutions using clear structures and appropriate development practices so that features can be improved and technologies can be upgraded when needed. Where a migration is necessary, we can assess the existing system and plan a suitable modernisation approach.",
    },
];

export const IndustriesFaqs: IFaq[] = [
    {
        key: "1",
        question: `Which industries does ${COMPANY_NAME} work with?`,
        answer:
            `${COMPANY_NAME} works with businesses across a range of industries, including professional services, retail and e-commerce, education and training, construction and property, logistics and transport, financial and accounting services, healthcare and wellness, tourism and hospitality, and agriculture. We tailor each solution to the client's specific requirements, workflows, and business goals.`,
    },
    {
        key: "2",
        question: `Does ${COMPANY_NAME} build custom software for my industry?`,
        answer:
            "Yes. We develop custom software around your business processes, operational challenges, and objectives. Whether you need an internal management system, a customer portal, an online platform, or workflow automation, we assess your requirements and recommend an appropriate solution.",
    },
    {
        key: "3",
        question: "What types of digital solutions do you provide?",
        answer:
            "Our services include business websites, web applications, e-commerce platforms, custom business systems, minimum viable products (MVPs), API integrations, and ongoing software support and maintenance. The right solution depends on your needs, existing systems, budget, and long-term plans.",
    },
    {
        key: "4",
        question: "Can you build software around our existing business processes?",
        answer:
            "Yes. We can assess your current workflows and identify opportunities to improve them through custom software. Depending on your requirements, this may include digitising manual tasks, centralising information, automating repetitive processes, or connecting systems that currently operate separately.",
    },
    {
        key: "5",
        question: "Do you work with small businesses and startups?",
        answer:
            "Yes. We work with businesses at different stages, from startups validating an idea to established organisations improving existing operations. We consider your priorities, available budget, and growth plans to help define a practical scope that can be developed and expanded over time.",
    },
    {
        key: "6",
        question: "Can you integrate software with our existing systems?",
        answer:
            "Where suitable integration options are available, we can connect your new solution with existing databases, APIs, business applications, and third-party services. We first assess the systems involved, their technical capabilities, and any access or licensing requirements before recommending an integration approach.",
    },
    {
        key: "7",
        question: "Do you develop solutions for businesses in South Africa?",
        answer:
            `Yes. ${COMPANY_NAME} is based in South Africa and builds digital solutions for businesses with local and broader operational needs. We can discuss your requirements remotely and determine the most suitable way to collaborate, regardless of whether your business operates in one location or serves customers across multiple regions.`,
    },
    {
        key: "8",
        question: "How do you approach security and sensitive business information?",
        answer:
            "Security considerations depend on the type of solution and the information it handles. We can incorporate appropriate access controls, authentication, data validation, secure integrations, and other safeguards into the development process. Projects involving personal, financial, or healthcare information require particular attention to applicable privacy, security, and regulatory obligations.",
    },
    {
        key: "9",
        question: "How much does industry-specific software development cost?",
        answer:
            "The cost depends on the scope, complexity, features, integrations, and ongoing support required. A business website generally involves a different level of effort from a custom operational platform. We discuss your goals and requirements first, then establish a suitable project scope and provide an estimate based on the agreed deliverables.",
    },
    {
        key: "10",
        question: `How do we get started with ${COMPANY_NAME}?`,
        answer:
            "Start by contacting us and explaining your business, industry, current challenges, and what you want to achieve. We will discuss your requirements, explore possible approaches, and identify the next steps. You do not need a complete technical specification before starting the conversation.",
    },
];