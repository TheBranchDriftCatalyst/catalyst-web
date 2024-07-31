"use client";
import {
  Navbar,
  Hero,
  About,
  Experience,
  // Contact,
  StarsCanvas,
} from "./_components";
// import NQueensBoard from "./_components/Board";
// import { BoardProvider } from "./_components/BoardContext";
// import SolverStats from "./_components/SolverStats";

import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div className="relative z-0 bg-primary">
      <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
        <Navbar />
        <Hero />
      </div>
      {/* <About />
      <Experience /> */}
      {/*<Tech />*/}
      {/*<Works />*/}
      {/*<Feedbacks />*/}
      <div className="relative z-0">
        {/* <Contact /> */}
        <StarsCanvas />
      </div>
    </div>
  );
}
