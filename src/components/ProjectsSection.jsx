import { ExternalLink, Github } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "VisionAssist Care Hat",
    description:
      "VisionAssist Care Hat is a university project that helps visually impaired people move safely. It uses sensors and a mobile app to detect obstacles, give directions, and send alerts if the user falls. It is designed to be simple, safe, and affordable",
    image: "/projects/vision-assist.jpeg",
    tags: ["ReactNative", "Javascript", "Node.js", "Express.js", "MongoDB", "AI", "ML"],
    demoUrl: "#",
    githubUrl: "#",
  },
  {
    id: 2,
    title: "AI Autonomous Workflow Assistant",
    description:
      "AI Autonomous Workflow Assistant is a web app that uses AI agents to help with tasks like planning, research, and reviewing work. Users can upload files or give links and describe what they need in simple words",
    image: "/projects/ai-workflow.png",
    tags: ["Python", "AI", "Automation", "CrewAI", "Streamlit"],
    demoUrl: "https://github.com/vinudasenith/AI-Autonomous-Workflow-Assistant.git",
    githubUrl: "https://github.com/vinudasenith/AI-Autonomous-Workflow-Assistant.git",
  },
  {
    id: 3,
    title: "AI Research Report Generator",
    description:
      "AI Research Report Generator is an AI project that creates research reports from a topic. It researches, summarizes, and writes the report automatically. Users can download it as a Markdown or PDF.",
    image: "/projects/ai-report.png",
    tags: ["Python", "AI", "Automation", "CrewAI", "Streamlit"],
    demoUrl: "https://ai-research-report-generator-xvscoazp7pm8qcadtks6df.streamlit.app/",
    githubUrl: "https://github.com/vinudasenith/ai-research-report-generator.git",
  },
  {
    id: 4,
    title: "Drive Now – Full Stack Car Rental Service",
    description:
      "Drive-Now is a cab booking web app where users can view cars, book rides, and leave reviews. Admins can manage cars, users, and bookings. It features a responsive design and secure authentication.",
    image: "/projects/drive-now.png",
    tags: ["Javascript", "React", "Node.js", "Express.js", "MongoDB"],
    demoUrl: "https://drive-now-frontend-seven.vercel.app/",
    githubUrl: "https://github.com/vinudasenith/drive-now-frontend.git",
  },
  {
    id: 5,
    title: "Fortress Haven Resort – Hotel Booking Management System",
    description:
      "Fortress Haven Resort is a hotel booking web app where guests can view rooms, make bookings, and explore hotel details and nearby activities. Admins can manage rooms, customers, and bookings.",
    image: "/projects/hotel-booking.png",
    tags: ["Java", "Spring Boot", "Angular", "PostgreSQL", "Tailwind CSS"],
    demoUrl: "#",
    githubUrl: "https://github.com/vinudasenith/hotel-booking-backend.git",
  },
  {
    id: 6,
    title: "Resume Matcher Pro – Full Stack Resume Optimization Platform",
    description:
      "Resume Matcher Pro is a resume builder that helps users create ATS-friendly resumes. It includes login, resume scoring, report downloads, and an AI chatbot for career help, plus admin tools to manage users and resumes.",
    tags: ["Java", "Spring Boot", "Angular", "AI", "MongoDB"],
    image: "/projects/resume-matcher.png",
    demoUrl: "#",
    githubUrl: "https://github.com/vinudasenith/resume-app-backend.git",
  },
];

export default function ProjectsSection() {
  return (
    <section id="projects" className="py-24 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-14">
          <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-blue-500 mb-3">
            My Work
          </span>
          <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight">
            Featured Projects
          </h2>
          <p className="mt-3 text-gray-400 text-sm">
            A few things I've built with focus on design, performance, and usability.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((project) => (
            <div
              key={project.id}
              className="group bg-white text-justify rounded-xl overflow-hidden border border-gray-100 hover:border-gray-200 hover:shadow-md transition-all duration-200"
            >
              {/* Image */}
              <div className="w-full h-50 overflow-hidden bg-gray-100">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Content */}
              <div className="p-5">

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-0.5 text-xs font-medium bg-blue-100 text-blue-500 rounded-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Title */}
                <h3 className="text-base font-bold text-gray-900 mb-1.5">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-gray-500 text-justify text-sm leading-relaxed mb-4">
                  {project.description}
                </p>

                {/* Divider */}
                <div className="border-t border-gray-100 pt-4 flex items-center justify-between">
                  <div className="flex gap-3">
                    {/* Live demo link */}
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-800 transition-colors duration-200"
                    >
                      <ExternalLink size={14} />
                      Live
                    </a>

                    {/* GitHub link */}
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-800 transition-colors duration-200"
                    >
                      <Github size={14} />
                      Code
                    </a>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* GitHub CTA */}
        <div className="text-center mt-14">
          <a
            href="https://github.com/vinudasenith"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-md bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors duration-200"
          >
            <Github size={16} />
            View All on GitHub
          </a>
        </div>

      </div>
    </section>
  );
}
