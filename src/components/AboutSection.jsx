import { Briefcase, Code, User } from "lucide-react";

const cards = [
  {
    icon: Code,
    title: "Full-Stack Development",
    desc: "Building scalable web and mobile apps with React.js, Node.js, Angular, React Native, and Next.js.",
  },
  {
    icon: User,
    title: "AI & Machine Learning",
    desc: "Implementing AI workflows, multi-agent systems, NLP, and ML models to automate tasks intelligently.",
  },
  {
    icon: Briefcase,
    title: "Project Innovation",
    desc: "Leading university and personal projects combining AI, embedded systems, and modern web/mobile tech.",
  },
];

export const AboutSection = () => {
  return (
    <section id="about" className="py-24 px-4 relative">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-black">
          About <span style={{ color: "#6366f1" }}>Me</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left — Bio */}
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-black">
              AI & Full-Stack Developer
            </h3>

            <p className="text-black text-justify">
              I'm a software engineering undergraduate passionate about building
              intelligent full-stack applications that combine AI, web, and
              mobile technologies.
            </p>

            <p className="text-black text-justify">
              I enjoy designing solutions that automate workflows, enhance user
              experiences, and solve real-world problems, constantly
              experimenting with AI/ML, multi-agent systems, and modern
              frameworks.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center">
              <a href="#contact" className="cosmic-button">
                Get In Touch
              </a>

              <a
                href=""
                className="px-6 py-2 rounded-full border border-black text-black hover:bg-black/10 transition-colors duration-300"
              >
                Download CV
              </a>
            </div>
          </div>

          {/* Right — Cards */}
          <div className="grid grid-cols-1 gap-6">
            {cards.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 bg-white"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-full bg-[#6366f1]/10">
                    <Icon className="h-6 w-6 text-[#6366f1]" />
                  </div>
                  <div className="text-justify">
                    <h4 className="font-semibold text-lg text-black">{title}</h4>
                    <p className="text-black">{desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
