import { Project, ServicePillar, TechArsenalCategory, ExperienceItem, CertificationItem, FAQItem } from "@/types/portfolio";

export const PROFILE_DATA = {
  name: "Engr. Sean Lloyd E. Casalme",
  preferredName: "Engr. Sean Casalme",
  title: "Founder & CEO, ChampZero Esports & Entertainment Production | Computer Engineer",
  tagline: "Bridging modern full-stack web platforms, bare-metal IoT telemetry systems, and premier esports & broadcast entertainment productions.",
  availabilityStatus: "Available for Full-Stack, IoT & Esports Consulting",
  location: "Balete, San Nicolas, Batangas, Philippines",
  phone: "+63 994 770 7833",
  whatsappUrl: "https://api.whatsapp.com/send?phone=639947707833&text=Hi%20Sean,%20I%20would%20like%20to%20inquire%20about%20a%20project!",
  personalFacebookUrl: "https://www.facebook.com/sellocasalme",
  facebookUrl: "https://www.facebook.com/sellocasalme",
  champzeroOrgUrl: "https://www.champzero.org",
  champzeroEntProdFb: "https://www.facebook.com/czentprod",
  champzeroEntProdIg: "https://www.instagram.com/champzero.entprod/",
  email: "casalmeseanlloyd@gmail.com",
  calendarUrl: "https://cal.com/sean-casalme",
  githubUrl: "https://github.com/sello-cmd",
  linkedinUrl: "https://www.linkedin.com/in/sean-casalme/",
  avatarUrl: "/images/sean-casalme.jpg",
  yearsExperience: "3+ Years",
  education: {
    institution: "STI College Batangas",
    degree: "B.S. in Computer Engineering",
    period: "2022 – 2026",
    graduationHonor: "Graduated with Leadership Award",
    honors: [
      "Graduated with Leadership Award",
      "President, Computer Engineering Student Organization (2024–2025)",
      "Vice-President, Computer Engineering Student Organization (2023–2024)",
      "Social Media Manager, Computer Engineering Student Organization (2022–2023)",
      "STI Brand Ambassador Graphic Designer (2022–2023)",
      "Gawad 2024: Most Attentive Leader",
      "Gawad 2024: Most Resilient Leader",
      "Gawad 2024: Change Adept Awardee",
      "Gawad 2024: Best in Teamwork (Organizational Award)",
    ]
  },
  heroStats: [
    { label: "Esports Production", value: "High Quality" },
    { label: "Modern Web Apps", value: "Full-Stack MVP" },
    { label: "Architecture to Launch", value: "End-to-End" },
    { label: "Turnaround Speed", value: "1-2 Weeks" }
  ],
  bioHighlights: [
    "Founder and CEO of ChampZero Esports Organization (www.champzero.org) and ChampZero Entertainment Production (facebook.com/czentprod | instagram.com/champzero.entprod).",
    "Leading executive B2B client negotiations, securing high-value brand sponsorships, and directing cross-functional teams across tournament operations, broadcasting, and marketing.",
    "Lead Hardware & Telemetry Engineer for Floodlock IoT, integrating ESP32 microcontrollers, sensor arrays, and Firebase Realtime Database for sub-second disaster alerts.",
    "Experienced across full-stack Next.js, TypeScript, C++ (Embedded), Assembly (x86), CAD & 3D Design (AutoCAD, Onshape), and Adobe Creative Suite.",
    "Former President of the Computer Engineering Student Organization at STI College Batangas, recognized with 4 Gawad Leadership Awards and graduated as a Leadership Awardee."
  ]
};

export const PROJECTS_DATA: Project[] = [
  {
    id: "champzero-org",
    title: "ChampZero Esports Organization",
    tagline: "Competitive Tournament Infrastructure & Digital Esports Community Platform",
    description: "Official digital hub and competitive infrastructure for ChampZero Esports Organization. Features automated tournament brackets, athlete profiles, match schedules, community registration pipelines, and squad management.",
    domain: "web-saas",
    categoryLabel: "Esports Organization Platform",
    featured: true,
    image: "/images/projects/champzero-org.png",
    tags: ["champzero.org", "Tournament Infrastructure", "Next.js", "TypeScript", "Community Management", "Athlete Staging"],
    metrics: [
      { label: "Official Web Portal", value: "champzero.org" },
      { label: "Community & Reach", value: "10,000+ Engagements" },
      { label: "Tournament Scale", value: "Multi-Season Series" },
      { label: "Role", value: "Founder & CEO" }
    ],
    challenges: [
      "Structuring competitive match staging, athlete verification, and real-time community engagement across tournament series.",
      "Building unified digital workflows for athlete registration, team rosters, and rulebook distribution."
    ],
    architectureHighlights: [
      "Official website accessible at www.champzero.org connecting all organizational branches and tournament series.",
      "Automated tournament bracket logic and team ranking workflows.",
      "Community hub connecting players, teams, and tournament organizers."
    ],
    demoUrl: "https://www.champzero.org",
    githubUrl: "https://github.com/sello-cmd/CHAMPZERO"
  },
  {
    id: "champzero-entprod",
    title: "ChampZero Entertainment Production",
    tagline: "Live Multi-Cam Broadcast Engineering, Stage Logistics & Brand Activations",
    description: "Professional live broadcast and entertainment production arm of ChampZero. Directing multi-cam live streams with OBS Studio & vMix, dynamic browser-source lower-thirds scoreboards, audio routing, stage lighting/networking, video highlights in DaVinci Resolve & Premiere Pro, and brand sponsorships across Facebook (facebook.com/czentprod) and Instagram (@champzero.entprod).",
    domain: "web-saas",
    categoryLabel: "Live Broadcast & Entertainment Production",
    featured: true,
    image: "/images/projects/champzero-entprod.jpg",
    tags: ["OBS Studio", "vMix", "Premiere Pro", "DaVinci Resolve", "Dynamic Overlays", "Live Broadcast", "Brand Partnerships"],
    metrics: [
      { label: "Broadcast Quality", value: "1080p60 Multi-Cam" },
      { label: "Facebook Channel", value: "fb.com/czentprod" },
      { label: "Instagram Channel", value: "@champzero.entprod" },
      { label: "Production Role", value: "Executive Director" }
    ],
    challenges: [
      "Operating complex multi-feed camera setups, dynamic sponsor overlays, and live match scoreboards in high-pressure competitive environments.",
      "Coordinating on-site LAN stage arrangements, audio mixers, and multi-platform live streaming with zero downtime."
    ],
    architectureHighlights: [
      "Custom HTML/CSS animated lower-thirds match scoreboards integrated directly into vMix and OBS via browser sources.",
      "End-to-end post-production highlight packages and promotional media in Premiere Pro and DaVinci Resolve.",
      "Official social production channels: facebook.com/czentprod and instagram.com/champzero.entprod."
    ],
    facebookUrl: "https://www.facebook.com/czentprod",
    instagramUrl: "https://www.instagram.com/champzero.entprod/",
    demoUrl: "https://www.facebook.com/czentprod"
  },
  {
    id: "floodlock",
    title: "Floodlock: IoT & Early Flood Disaster Mitigation Telemetry",
    tagline: "Bare-Metal Embedded ESP32 & Real-Time Cloud Telemetry Architecture",
    description: "Lead Hardware & Cloud Telemetry Architect for an IoT-enabled flood monitoring and automated mitigation system. Integrates ultrasonic level sensors, water flow modules, and ESP32 microcontrollers communicating sub-second telemetry to Firebase Realtime Database and a responsive executive dashboard UI.",
    domain: "systems-iot",
    categoryLabel: "IoT & Real-Time Telemetry",
    featured: true,
    image: "/images/projects/floodlock.png",
    tags: ["C++ (Embedded)", "ESP32", "Arduino IDE", "Firebase Realtime DB", "WebSockets", "Circuit Design", "Sensor Integration"],
    metrics: [
      { label: "Telemetry Latency", value: "< 120ms" },
      { label: "Hardware Target", value: "ESP32 Microcontroller" },
      { label: "Cloud Sync", value: "Sub-Second" },
      { label: "Status", value: "Defended & Operational" }
    ],
    challenges: [
      "Ensuring robust fault-tolerant Wi-Fi reconnect and sleep-cycle power optimization on remote ESP32 nodes.",
      "Synchronizing rapid water level and flow telemetry across concurrent mobile and web dashboard views without packet loss."
    ],
    architectureHighlights: [
      "Custom C++ firmware running non-blocking FreeRTOS tasks on dual-core ESP32.",
      "Automated alert dispatch pipeline triggering audio-visual sirens and cloud notification webhooks.",
      "Hardware circuit schematics designed and verified for uninterrupted field operation."
    ]
  },
  {
    id: "radiantactics",
    title: "RadianTactics: Interactive Strategy Board & Utility Lineup Visualizer",
    tagline: "Interactive Web-Based Strategy Board & Utility Lineup Visualizer for Competitive VALORANT",
    description: "An interactive, web-based strategy board and utility lineup visualizer engineered for competitive VALORANT teams, coaches, and players. Features a high-performance 2D canvas with pan/zoom radar maps, a 5v5 agent and utility sandbox, a lineup trajectory studio, a timed execute playback timeline, and instant URL/PNG setup exports.",
    domain: "interactive-tools",
    categoryLabel: "Interactive Canvas & Strategy Engine",
    featured: true,
    image: "/images/projects/radiantactics.jpg",
    tags: ["Next.js", "Konva.js (Canvas)", "Zustand", "Tailwind CSS", "valorant-api.com", "TypeScript", "Geometry Math"],
    metrics: [
      { label: "Rendering Tech", value: "Konva.js 60FPS" },
      { label: "State Management", value: "Zustand Reactive" },
      { label: "Data Pipeline", value: "valorant-api.com" },
      { label: "Export Engine", value: "URL State & High-Res PNG" }
    ],
    challenges: [
      "Synchronizing multi-agent timed execute playbacks across layered canvas objects with precise ability durations and occlusion.",
      "Parsing and optimizing high-resolution radar maps and vector callout boundaries without frame drops during rapid pan/zoom interactions."
    ],
    architectureHighlights: [
      "Interactive Map Canvas: Smooth pan and zoom across high-res radar maps with official callout overlays.",
      "Agent & Utility Sandbox: Place full 5v5 team compositions with scalable smokes, directional walls, flash vision cones, and ability ranges.",
      "Lineup Studio: Attach throw mechanics (stand, jump-throw, run-throw), crosshair guide references, and trajectory paths to placed utility.",
      "Execute Timeline: Scrub through a synchronized timed playback to coordinate multi-agent site executes and ability combos.",
      "Instant Export: Share strategic setups via compressed URL state hashes or high-resolution PNG image downloads.",
      "Powered by Next.js, Konva.js (HTML5 Canvas), Zustand state store, Tailwind CSS, and the valorant-api.com live asset pipeline."
    ],
    deliverables: [
      "Interactive Map Canvas with Pan & Zoom",
      "5v5 Agent & Scalable Utility Sandbox",
      "Lineup Studio with Crosshair & Trajectory Guides",
      "Execute Timeline Playback Scrubber",
      "Compressed URL Link & PNG Exporter"
    ],
    githubUrl: "https://github.com/sello-cmd/RadianTactics",
    demoUrl: "https://github.com/sello-cmd/RadianTactics"
  }
];

export const SERVICES_DATA: ServicePillar[] = [
  {
    id: "fullstack-mvp",
    title: "Full-Stack Web Apps & SaaS MVPs",
    badge: "1-2 Weeks Sprint",
    description: "Architecting high-converting Next.js web applications, client acquisition platforms, and SaaS products with responsive Tailwind styling, database integration, and authenticated admin workflows.",
    turnaround: "7 - 14 Business Days",
    typicalStack: ["Next.js (App Router)", "React 19", "TypeScript", "Tailwind CSS", "Firebase / PostgreSQL", "Zod Validation"],
    deliverables: [
      "Full Responsive Web Application with Cyber/Monochrome Dark Mode",
      "Payment Gateway Integration (QR PH, Direct Bank Transfer, PayPal, Wise) & Role-Based Auth",
      "Automated Lead Ingestion, Real-Time Notifications & Email Dispatch",
      "SEO Metadata, OpenGraph Tags & Lighthouse 95+ Performance"
    ],
    iconName: "Globe",
    accentColor: "silver"
  },
  {
    id: "iot-telemetry",
    title: "Bare-Metal Embedded IoT & Cloud Dashboards",
    badge: "Hardware & Cloud",
    description: "Bridging microcontrollers (ESP32, Arduino) with modern cloud databases and live telemetry dashboards for SCADA, environmental sensors, and remote hardware telemetry.",
    turnaround: "10 - 21 Business Days",
    typicalStack: ["C++ (Embedded)", "Assembly (x86)", "ESP32", "Arduino IDE", "Circuit Design", "Firebase Realtime DB"],
    deliverables: [
      "Custom C++ Embedded Firmware with Wi-Fi Failover & Sleep Modes",
      "Hardware Circuit Schematics, Breadboard & Sensor Wiring Guides",
      "Sub-Second Live Cloud Telemetry Streaming & Incident Triggers",
      "Executive Dashboard UI for Historical Metrics & Hardware Controls"
    ],
    iconName: "Cpu",
    accentColor: "silver"
  },
  {
    id: "esports-broadcast",
    title: "Esports Tournament Ops & Entertainment Production",
    badge: "ChampZero Production",
    description: "Professional esports tournament directing, live multi-cam broadcast engineering (OBS Studio & vMix), dynamic lower-thirds scoreboards, and brand activations across Facebook (facebook.com/czentprod) and Instagram (@champzero.entprod).",
    turnaround: "Event Milestone Based",
    typicalStack: ["OBS Studio", "vMix", "Adobe Premiere Pro", "DaVinci Resolve", "Photoshop", "Canva", "Live Overlays"],
    deliverables: [
      "Dynamic Real-Time Browser Source Match Overlays & Lower Thirds",
      "Live Production Multicam Directing, Audio Routing & Stream Pipelines",
      "Tournament Bracket Infrastructure & Athlete Registration Systems",
      "Post-Event Video Highlight Packages & Social Campaign Content"
    ],
    iconName: "Layers",
    accentColor: "silver"
  },
  {
    id: "cad-branding",
    title: "CAD 3D Modeling, Visual Design & Marketing",
    badge: "Design & Media",
    description: "Parametric 3D modeling and mechanical design in AutoCAD & Onshape combined with brand identity, digital marketing ad funnels, and executive presentation materials.",
    turnaround: "3 - 7 Business Days",
    typicalStack: ["AutoCAD", "Onshape (CAD & Sim)", "Adobe Photoshop", "DaVinci Resolve", "Notion", "Google Workspace"],
    deliverables: [
      "Parametric 3D CAD Models, Engineering Drawings & Surface Renders",
      "High-Impact Vector Logos, Brand Guidelines & Social Creative Suites",
      "Social Ad Marketing Funnels (Facebook, TikTok, Discord, YouTube)",
      "Technical Thesis Presentations & Comprehensive Documentation"
    ],
    iconName: "Terminal",
    accentColor: "silver"
  }
];

export const WORKFLOW_STEPS = [
  {
    step: "01",
    title: "Discovery & Architectural Blueprint",
    description: "Initial 15-min discovery call or async spec review. We align on scope, target users, hardware/cloud constraints, and milestone timelines."
  },
  {
    step: "02",
    title: "Rapid Sprint & Staging Prototype",
    description: "Iterative development sprint. You receive live staging preview links, interactive demos, and daily transparent status updates."
  },
  {
    step: "03",
    title: "Telemetry & Performance Hardening",
    description: "Rigorous load testing, security validation, circuit verification, cross-device responsiveness, and SEO optimization."
  },
  {
    step: "04",
    title: "Production Launch & 30-Day Support",
    description: "Zero-downtime deployment, complete IP & source code handoff, DNS/cloud configurations, and 30-day post-launch bug warranty."
  }
];

export const TECH_ARSENAL: TechArsenalCategory[] = [
  {
    title: "Core Languages & Compilers",
    iconName: "Code2",
    description: "From low-level systems and embedded firmware to modern type-safe web runtimes.",
    skills: [
      { name: "TypeScript / JavaScript", proficiency: "Production Master", category: "languages", description: "Strict typing, async engines, Next.js App Router" },
      { name: "C++ (Embedded)", proficiency: "Production Master", category: "languages", description: "ESP32 firmware, FreeRTOS tasks, hardware register control" },
      { name: "Assembly (x86)", proficiency: "Advanced", category: "languages", description: "Low-level processor instructions, registers, memory structures" },
      { name: "HTML5 / CSS3", proficiency: "Production Master", category: "languages", description: "Semantic markup, modern layout algorithms, animations" },
      { name: "Java", proficiency: "Advanced", category: "languages", description: "Object-oriented design (Oracle Academy Certified)" }
    ]
  },
  {
    title: "Embedded Hardware & IoT Systems",
    iconName: "Cpu",
    description: "Sensor networks, microcontroller firmware, and sub-second cloud telemetry.",
    skills: [
      { name: "ESP32 Microcontrollers", proficiency: "Production Master", category: "iot-systems", description: "Dual-core Wi-Fi/BLE, deep sleep, real-time sensor pipelines" },
      { name: "Arduino & C/C++ IDE", proficiency: "Production Master", category: "iot-systems", description: "Board managers, hardware debugging, sensor drivers" },
      { name: "Sensor Integration", proficiency: "Production Master", category: "iot-systems", description: "Ultrasonic, water flow, telemetry arrays, ADC/I2C/SPI" },
      { name: "Circuit Design & Wiring", proficiency: "Advanced", category: "iot-systems", description: "Power distribution, relay actuation, breadboard prototyping" },
      { name: "Firebase Realtime DB", proficiency: "Production Master", category: "backend-cloud", description: "Sub-100ms WebSocket data sync, document rules, REST APIs" }
    ]
  },
  {
    title: "CAD, 3D Design & Creative Media",
    iconName: "Layout",
    description: "Parametric engineering modeling and multi-cam broadcast post-production.",
    skills: [
      { name: "AutoCAD", proficiency: "Production Master", category: "tools", description: "2D/3D precision drafting, mechanical schematics, layout drawings" },
      { name: "Onshape (CAD & Simulation)", proficiency: "Production Master", category: "tools", description: "Parametric 3D parts, assemblies, surfacing & FEA simulations" },
      { name: "Adobe Photoshop", proficiency: "Production Master", category: "tools", description: "Digital composites, marketing assets, esports visual branding" },
      { name: "Premiere Pro & DaVinci Resolve", proficiency: "Production Master", category: "tools", description: "Multi-track video editing, color grading, tournament highlights" },
      { name: "Canva & Brand Assets", proficiency: "Production Master", category: "tools", description: "Rapid social media ad creatives, pitch decks, infographics" }
    ]
  },
  {
    title: "Esports Ops, Live Broadcast & Social Media",
    iconName: "Tv",
    description: "End-to-end tournament management, live multi-cam broadcast engineering, and organic social media growth funnels.",
    skills: [
      { name: "Esports Event Management", proficiency: "Production Master", category: "tools", description: "Tournament operations, competitive rulebooks, automated brackets, stage logistics, referee marshaling, prize distribution" },
      { name: "Esports Event Broadcasting Production", proficiency: "Production Master", category: "tools", description: "Multi-cam live stream directing, OBS Studio, vMix, dynamic HTML/CSS scoreboards, NDI audio routing, Premiere Pro & DaVinci Resolve post-production" },
      { name: "Social Media Management", proficiency: "Production Master", category: "tools", description: "Multi-channel content strategy, community engagement funnels, audience analytics, brand positioning on Facebook, Instagram, TikTok & Discord" },
      { name: "Brand & Sponsor Activations", proficiency: "Production Master", category: "tools", description: "Commercial deck pitching, on-stream sponsor lower thirds, live commercial transitions, partner deliverables" }
    ]
  },
  {
    title: "Broadcast Systems & Leadership Tools",
    iconName: "Server",
    description: "Live streaming engineering, cloud services, and executive team workflows.",
    skills: [
      { name: "OBS Studio & vMix Engineering", proficiency: "Production Master", category: "tools", description: "Multi-source broadcasting, animated HTML overlays, audio routing" },
      { name: "Red Hat Enterprise Linux (RHEL 9)", proficiency: "Advanced", category: "backend-cloud", description: "RH124 System Administration I, bash, systemd, networking" },
      { name: "AWS Cloud Foundations", proficiency: "Advanced", category: "backend-cloud", description: "AWS Academy Certified (EC2, S3, IAM, Cloud Architecture)" },
      { name: "Notion & Slack Productivity", proficiency: "Production Master", category: "tools", description: "Agile sprints, documentation, organizational project tracking" },
      { name: "Public Speaking & Defense Leadership", proficiency: "Production Master", category: "tools", description: "Technical defense lead, student body leadership, team facilitation" }
    ]
  }
];

export const EXPERIENCE_TIMELINE: ExperienceItem[] = [
  {
    id: "champzero-ceo",
    role: "Founder & CEO",
    company: "ChampZero Esports Organization & Entertainment Production",
    location: "Batangas, Philippines",
    period: "2023 – Present",
    type: "Executive Leadership",
    highlightMetric: "Executive Leadership & Business Development",
    achievements: [
      "Founded and scaled ChampZero Esports Organization (www.champzero.org) and ChampZero Entertainment Production (facebook.com/czentprod | instagram.com/champzero.entprod).",
      "Spearheaded B2B discussions, client acquisition, and sponsor pitching to secure commercial funding, brand activations, and tournament contracts.",
      "Directed and mentored multidisciplinary teams across tournament operations, broadcast engineers (OBS Studio & vMix), creative designers, and marshals on project deliverables.",
      "Drove organizational strategy, business development, client relations, and multi-channel campaign growth across digital platforms."
    ],
    technologies: ["Executive Leadership", "B2B Client Acquisition", "Sponsor Pitching & Negotiations", "Team Leadership & Direction", "champzero.org", "Brand Activations", "Strategic Business Development"]
  },
  {
    id: "floodlock-lead",
    role: "Lead Hardware & Cloud Telemetry Architect",
    company: "Floodlock IoT Platform",
    location: "Batangas, Philippines",
    period: "2024 – 2025",
    type: "Lead Engineering",
    highlightMetric: "Sub-Second Disaster Mitigation Pipeline",
    achievements: [
      "Architected the complete IoT hardware and cloud communication layer for flood monitoring and automated mitigation.",
      "Programmed ESP32 microcontrollers in C++ to capture ultrasonic and flow rate data with sub-120ms transmission latency.",
      "Integrated Firebase Realtime Database and designed intuitive web dashboards for emergency teams.",
      "Successfully led the formal technical engineering thesis defense with distinction."
    ],
    technologies: ["C++ (Embedded)", "ESP32", "Arduino IDE", "Firebase Realtime DB", "Circuit Design", "Sensor Arrays", "Public Defense"]
  },
  {
    id: "cpeso-president",
    role: "President",
    company: "Computer Engineering Student Organization — STI College Batangas",
    location: "Batangas, Philippines",
    period: "February 2024 – January 2025",
    type: "Student Body Leadership",
    highlightMetric: "4x Gawad Leadership Awardee",
    achievements: [
      "Served as President of the Computer Engineering Student Organization, governing departmental initiatives and technical hackathons.",
      "Awarded Gawad 2024 Most Attentive Leader, Most Resilient Leader, and Change Adept Awardee for exemplary executive service.",
      "Led the organization to win the prestigious Gawad 2024 Best in Teamwork Organizational Award.",
      "Represented the computer engineering student body in university administrative councils and academic symposiums."
    ],
    technologies: ["Organizational Leadership", "Strategic Planning", "Project Management", "Team Coordination", "Public Speaking"]
  },
  {
    id: "cpeso-vp",
    role: "Vice-President",
    company: "Computer Engineering Student Organization — STI College Batangas",
    location: "Batangas, Philippines",
    period: "February 2023 – February 2024",
    type: "Leadership",
    highlightMetric: "Executive Coordination",
    achievements: [
      "Assisted in overseeing student body operations, coordinating technical workshops, and managing project taskforces.",
      "Facilitated inter-departmental collaborations and academic support programs for engineering peers."
    ],
    technologies: ["Operations Management", "Event Coordination", "Technical Workshops"]
  },
  {
    id: "brand-ambassador-designer",
    role: "Graphics Designer & Brand Ambassador",
    company: "STI College Batangas",
    location: "Batangas, Philippines",
    period: "October 2022 – July 2023",
    type: "Creative Media",
    highlightMetric: "Official Brand Visuals",
    achievements: [
      "Created high-impact promotional graphics, event banners, and digital marketing materials as official Brand Ambassador.",
      "Designed visual media aligned with institutional branding standards across Adobe Photoshop and Canva."
    ],
    technologies: ["Adobe Photoshop", "Canva", "Visual Design", "Brand Identity", "Digital Media"]
  },
  {
    id: "cpeso-social-media",
    role: "Social Media Manager",
    company: "Computer Engineering Student Organization — STI College Batangas",
    location: "Batangas, Philippines",
    period: "September 2022 – January 2023",
    type: "Digital Marketing",
    highlightMetric: "Community Growth",
    achievements: [
      "Managed departmental social channels, designed informational announcements, and boosted student engagement."
    ],
    technologies: ["Social Media Management", "Content Creation", "Community Engagement"]
  }
];

export const CERTIFICATIONS_LIST: CertificationItem[] = [
  {
    title: "Red Hat System Administration I (RH124 – RHA Ver. 9.3)",
    issuer: "Red Hat Training Program",
    year: "September 2025",
    badge: "Red Hat Enterprise Linux"
  },
  {
    title: "Skills to Succeed Academy (11 Modules)",
    issuer: "Accenture",
    year: "November 2025",
    badge: "Accenture Academy"
  },
  {
    title: "Batangas AI & Cybersecurity Congress",
    issuer: "Congress Seminar",
    year: "November 2025",
    badge: "AI & Cybersecurity"
  },
  {
    title: "FusionNode Bootcamp Info Session",
    issuer: "Seminar",
    year: "October 2025",
    badge: "Tech Bootcamp"
  },
  {
    title: "Internet of Things (IoT) Conference 2025",
    issuer: "Conference",
    year: "October 2025",
    badge: "IoT Conference"
  },
  {
    title: "Introduction to Drawings, Simulation & Surfacing",
    issuer: "Onshape",
    year: "Oct – Dec 2024",
    badge: "3D CAD & Simulation"
  },
  {
    title: "Java Fundamentals",
    issuer: "Oracle Academy",
    year: "June 2023",
    badge: "Oracle Certified"
  },
  {
    title: "AWS Academy Foundation Course",
    issuer: "AWS Academy",
    year: "Completed",
    badge: "Cloud Computing"
  }
];

export const CLIENT_FAQS: FAQItem[] = [
  {
    category: "Contracts & IP",
    question: "Do I own the full intellectual property and source code?",
    answer: "Yes, 100%. Upon completion and final milestone settlement, all repository rights, source code, database architectures, CAD models, and design assets are transferred entirely to your organization with zero licensing locks or recurring agency fees."
  },
  {
    category: "Turnaround",
    question: "What is your typical turnaround timeline for web and IoT projects?",
    answer: "Most web MVPs and client acquisition platforms are delivered in 7 to 14 business days. IoT telemetry systems and custom firmware typically range from 10 to 21 business days with continuous daily updates and live staging preview links throughout the sprint."
  },
  {
    category: "Payments",
    question: "How are project milestones and payments structured?",
    answer: "We typically operate on a transparent 50/50 or 33/33/34 milestone model: 50% upon project kickoff & architecture blueprint, and 50% upon final acceptance, staging sign-off, and deployment. We accept Direct Bank Transfer, QR PH, Wise, and PayPal."
  },
  {
    category: "Support & Warranty",
    question: "What happens after the project launches?",
    answer: "Every project includes a comprehensive 30-day post-launch bug warranty at zero extra charge to ensure smooth operation. For ongoing feature development or broadcast operations, monthly retainer agreements are available."
  },
  {
    category: "Esports & Entertainment",
    question: "What services do ChampZero Esports & Entertainment Production provide?",
    answer: "Through ChampZero Esports Organization (www.champzero.org), we manage competitive tournament leagues and athlete rosters. Through ChampZero Entertainment Production (facebook.com/czentprod | instagram.com/champzero.entprod), we provide multi-cam live broadcast engineering (OBS/vMix), dynamic HTML scoreboard overlays, stage production, and brand activations."
  }
];
