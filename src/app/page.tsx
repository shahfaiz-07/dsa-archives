"use client"
import { Button } from "@heroui/react";
import {Link} from "@heroui/react";
import { CiSearch } from "react-icons/ci";
import { FaFolderOpen, FaGithub, FaGlobe } from "react-icons/fa";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col justify-center items-center px-6 font-mono">
      <div className="max-w-xl text-center space-y-6">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          🧠 DSA Archives
        </h1>
        <p className="text-lg text-muted-foreground">
          My personal collection of LeetCode, GFG, and other coding platform solutions, searchable and organized by topic, difficulty, and platform.
        </p>

        <div className="flex flex-col md:flex-row justify-center items-center gap-4 pt-4">
          <Link href="/search">
            <Button color="primary" size="lg" variant="shadow" startContent={<CiSearch />}>
              Search Problems
            </Button>
          </Link>
          <Link href="/dsa">
            <Button color="secondary" size="lg" variant="shadow" startContent={<FaFolderOpen />}>
              Browse All Solutions
            </Button>
          </Link>
        </div>

        <div className="flex justify-center gap-6 pt-6 text-muted-foreground">
          <Link href="https://github.com/shahfaiz-07" className="text-3xl" isExternal>
            <FaGithub className="hover:text-foreground transition" />
          </Link>
          <Link href="https://portfolio-nine-cyan-awvxdg979r.vercel.app/" className="text-3xl" isExternal>
            <FaGlobe className="hover:text-foreground transition" />
          </Link>
        </div>
      </div>
    </main>
  );
}
