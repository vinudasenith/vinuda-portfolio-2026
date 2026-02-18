import { useState } from "react";

const skills = [
  { name: "HTML/CSS", level: 95, category: "frontend" },
  { name: "JavaScript", level: 90, category: "frontend" },
  { name: "React.js", level: 90, category: "frontend" },
  { name: "React Native", level: 85, category: "frontend" },
  { name: "Angular", level: 80, category: "frontend" },
  { name: "Next.js", level: 80, category: "frontend" },
  { name: "Tailwind CSS", level: 90, category: "frontend" },
  { name: "Node.js", level: 85, category: "backend" },
  { name: "Express.js", level: 80, category: "backend" },
  { name: "Python", level: 85, category: "backend" },
  { name: "FastAPI", level: 75, category: "backend" },
  { name: "Spring Boot", level: 80, category: "backend" },
  { name: "MongoDB", level: 90, category: "backend" },
  { name: "PostgreSQL", level: 70, category: "backend" },
  { name: "MySQL", level: 65, category: "backend" },
  { name: "SQL", level: 80, category: "backend" },
  { name: "AI/ML", level: 85, category: "ai" },
  { name: "NLP", level: 75, category: "ai" },
  { name: "CrewAI", level: 70, category: "ai" },
  { name: "Prompt Engineering", level: 70, category: "ai" },
  { name: "Git/GitHub", level: 90, category: "tools" },
  { name: "Figma", level: 80, category: "tools" },
  { name: "VS Code", level: 95, category: "tools" },
];

const categories = ["all", "frontend", "backend", "ai", "tools"];

const categoryColor = {
  frontend: "bg-blue-500",
  backend: "bg-emerald-500",
  ai: "bg-violet-500",
  tools: "bg-orange-400",
};

function getWidthClass(level) {
  if (level >= 95) return "w-[95%]";
  if (level >= 90) return "w-[90%]";
  if (level >= 85) return "w-[85%]";
  if (level >= 80) return "w-[80%]";
  if (level >= 75) return "w-[75%]";
  if (level >= 70) return "w-[70%]";
  if (level >= 65) return "w-[65%]";
  return "w-[60%]";
}

export default function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filtered = skills.filter(
    (s) => activeCategory === "all" || s.category === activeCategory
  );

  return (
    <section id="skills" className="py-24 px-4 bg-white">
      <div className="max-w-5xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-14">
          <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-indigo-500 mb-3">
            Technical Skills
          </span>
          <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight">
            What I Work With
          </h2>
          <p className="mt-3 text-gray-400 text-sm">
            A breakdown of my technical stack across all areas
          </p>
        </div>

        {/* Filter tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={
                "px-5 py-2 rounded-md text-sm font-semibold capitalize transition-all duration-200 border cursor-pointer " +
                (activeCategory === cat
                  ? "bg-gray-900 text-white border-gray-900"
                  : "bg-white text-gray-500 border-gray-200 hover:border-gray-400 hover:text-gray-900")
              }
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Skills grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {filtered.map((skill) => (
            <div
              key={skill.name}
              className="group bg-white rounded-lg px-5 py-4 border border-gray-100 hover:border-gray-300 hover:shadow-sm transition-all duration-200"
            >
              {/* Name + percentage */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className={"w-2 h-2 rounded-full shrink-0 " + categoryColor[skill.category]} />
                  <span className="text-gray-800 font-semibold text-sm">{skill.name}</span>
                </div>
                <span className="text-xs font-bold text-gray-400 tabular-nums">{skill.level}%</span>
              </div>

              {/* Progress bar — turns indigo on hover */}
              <div className="w-full h-[3px] bg-gray-100 rounded-full overflow-hidden">
                <div className={
                  "h-full rounded-full bg-gray-800 group-hover:bg-indigo-500 transition-all duration-300 " +
                  getWidthClass(skill.level)
                } />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
