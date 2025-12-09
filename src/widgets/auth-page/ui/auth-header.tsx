"use client";

import PikaResume from "@shared/icons/pika-resume";
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
      <div className="flex flex-row gap-2">
        <button
          className="flex items-center gap-2"
          onClick={() => router.push("/")}
          type="button"
        >
          <PikaResume
            stopColor="black"
            offsetColor="black"
            width={50}
            height={50}
          />
          <div className="flex flex-row items-center justify-center">
            <span className="font-bold text-black bg-clip-text text-2xl">
              Pika
            </span>

            <span className="font-normal text-[#21344F] bg-clip-text text-2xl">
              Resume
            </span>
          </div>
        </button>
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
