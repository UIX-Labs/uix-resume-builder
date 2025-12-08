"use client";

import { Button } from "@shared/ui";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export function AuthHeader() {
  const router = useRouter();
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="flex justify-between mr-[28px]"
    >
      <div className="flex items-center gap-2">
        <h1 className="text-xl font-bold text-slate-800">Resume Builder</h1>

        <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full font-medium">
          AI Powered ✨
        </span>
      </div>

      <nav className="hidden md:flex items-center gap-6 text-base text-slate-600">
        <Button
          className="hover:text-slate-800 transition-colors bg-transparent text-black hover:bg-transparent text-base cursor-pointer"
          onClick={() => router.push("/about-us")}
        >
          {" "}
          About Us
        </Button>
        {/* <Link href="/explore" className="hover:text-slate-800 transition-colors">
          Explore
        </Link>

        <Link href="/faqs" className="hover:text-slate-800 transition-colors">
          FAQs
        </Link> */}
      </nav>
    </motion.header>
  );
}
