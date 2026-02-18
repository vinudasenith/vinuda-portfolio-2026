import { ArrowDown } from "lucide-react";
import yourPhoto from "../assets/your-photo.jpg"; // <-- replace with your image path

export const HeroSection = () => {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col md:flex-row items-center justify-center px-4 overflow-hidden bg-white gap-10"
    >
      {/* Your picture */}
      <div className="flex-shrink-0">
        <img
          src={yourPhoto}
          alt="Vinuda Senith"
          className="w-64 h-64 md:w-72 md:h-72 object-cover rounded-full border-4 border-black shadow-lg"
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-3xl text-center md:text-left space-y-6">
        {/* Greeting + Name */}
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-black">
          Hi, I'm <span className="text-black">Vinuda</span>{" "}
          <span
            className="bg-gradient-to-r bg-clip-text text-transparent"
            style={{
              backgroundImage: "linear-gradient(to right, #6366f1, #a78bfa)",
              WebkitBackgroundClip: "text",
            }}
          >
            Senith
          </span>
        </h1>

        {/* Tagline */}
        <p className="text-lg md:text-xl text-gray-600 uppercase tracking-widest mt-2">
          Creating Solutions, Driving Impact
        </p>

        {/* Role / Description */}
        <p className="text-sm md:text-base text-black font-medium uppercase tracking-widest mt-2">
          Undergraduate Software Engineering Student | Innovating with Code | Turning Ideas into Scalable Applications
        </p>

        {/* Optional Subtext */}
        <p className="mt-4 text-gray-600 max-w-xl text-sm md:text-base">
          Passionate about building web and AI-driven solutions that are functional, elegant, and impactful.
        </p>


        {/* CTA buttons */}
        <div className="flex items-center justify-center md:justify-start gap-4 flex-wrap pt-2">
          <a
            href="#projects"
            className="bg-[#6366f1] hover:bg-[#4f46e5] text-white font-medium text-sm px-6 py-3 rounded-full transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(99,102,241,0.35)]"
          >
            View My Work
          </a>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 animate-bounce">
        <span className="text-xs text-black uppercase tracking-widest">Scroll</span>
        <ArrowDown className="h-4 w-4 text-black" />
      </div>
    </section>
  );
};
