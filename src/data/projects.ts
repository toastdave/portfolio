import toasty from "../assets/toasty.png";
import tower from "../assets/tower.png";

export interface Project {
  title: string;
  description: string;
  image: string;
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
}

export const projects: Project[] = [
  {
    title: "Toasty",
    description: "A Next.js application for finding trending movies and TV shows",
    image: toasty.src,
    tags: ["React", "Next.js", "Tailwind CSS", "TMDB"],
    githubUrl: "https://github.com/toastdave/toasty",
    liveUrl: "https://toasty-one.vercel.app/"
  },
  {
    title: "Tower",
    description: "A cli tool for creating any project",
    image: tower.src,
    tags: ["TypeScript", "Clack", "Commander"],
    githubUrl: "https://github.com/toastdave/tower",
  },
  {
    title: "ELM",
    description: "A Next.js application for career reviews and entry level job listings",
    image: "https://via.placeholder.com/600x400",
    tags: ["Next.js", "React", "Tailwind CSS", "Supabase"],
    githubUrl: "https://github.com/toastdave/elm",
    liveUrl: "https://toasty-one.vercel.app/"
  },
];