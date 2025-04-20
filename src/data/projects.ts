import toasty from "../assets/toasty.png";

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
    description: "A fNext.js application for finding trending movies and TV shows",
    image: toasty.src,
    tags: ["React", "Next.js", "Tailwind CSS", "TMDB"],
    githubUrl: "https://github.com/",
    liveUrl: "https://example.com"
  },
  {
    title: "3D Portfolio Visualizer",
    description: "Interactive 3D visualization tool for displaying portfolio projects using Three.js and React Three Fiber.",
    image: "https://via.placeholder.com/600x400",
    tags: ["Three.js", "React", "GLSL", "TypeScript"],
    githubUrl: "https://github.com/",
    liveUrl: "https://example.com"
  },
  {
    title: "Real-time Chat Application",
    description: "Real-time messaging application with socket connections, user presence, and message history.",
    image: "https://via.placeholder.com/600x400",
    tags: ["Socket.io", "React", "Express", "Redis"],
    githubUrl: "https://github.com/"
  },
];