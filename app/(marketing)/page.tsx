import Image from "next/image";
import Link from "next/link";
import { FaFileAlt, FaRoad, FaComments, FaBriefcase } from "react-icons/fa";

const features = [
  { icon: FaFileAlt, title: "Resume Analyzer", text: "Upload a PDF or DOCX and get an honest score, ATS check and rewrite suggestions." },
  { icon: FaRoad, title: "Personal Roadmaps", text: "A phased learning plan built around your level, goal and weekly hours. Track progress as you go." },
  { icon: FaBriefcase, title: "Role Matches", text: "See which roles fit your skills and what's missing to land them." },
  { icon: FaComments, title: "Career Q&A", text: "Chat with a coach that knows your profile: interviews, salary, switching fields." },
];

export default function HomePage() {
  return (
    <div className="flex flex-col items-center p-4 text-center">
      <h1 className="mt-10 max-w-4xl text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl md:text-6xl">
        Your Career, Redefined by <span className="text-indigo-500">AI</span>.
      </h1>
      <p className="mt-6 max-w-2xl text-base text-gray-300 sm:text-lg">
        Unlock your potential with an AI-powered career coach that helps you build resumes, plan your learning and find your
        dream job.
      </p>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row">
        <Link
          href="/register"
          className="rounded-full bg-indigo-500 px-8 py-3 font-semibold text-white shadow-lg transition hover:scale-105 hover:brightness-110"
        >
          Get Started
        </Link>
        <a
          href="#features"
          className="rounded-full border border-indigo-500 px-8 py-3 font-semibold text-indigo-500 transition hover:bg-indigo-500 hover:text-white"
        >
          Learn More
        </a>
      </div>

      <div className="relative mt-16 aspect-[16/9] w-full max-w-5xl overflow-hidden rounded-3xl border border-gray-700 bg-gray-800 shadow-2xl">
        <Image
          src="/hero.png"
          alt="AI Career Coach dashboard preview"
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 1024px"
          className="object-cover"
        />
      </div>

      <section id="features" className="mt-24 grid w-full max-w-5xl scroll-mt-8 gap-6 text-left sm:grid-cols-2">
        {features.map(({ icon: Icon, title, text }) => (
          <div key={title} className="rounded-xl border border-gray-700 bg-gray-800 p-6">
            <Icon className="mb-3 text-indigo-500" size={26} />
            <h3 className="text-lg font-semibold">{title}</h3>
            <p className="mt-1 text-sm text-gray-400">{text}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
