"use client";
import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";

const companiesLeft = [
  {
    name: "Google",
    logo: "images/google-logo.svg",
    bgColor: "rgba(255, 241, 200, 1)",
    position: { x: 0, y: 0 },
  },
  {
    name: "Meta",
    logo: "images/meta-logo.svg",
    bgColor: "rgba(214, 235, 255, 1)",
    position: { x: 44, y: 96 },
  },
  {
    name: "Microsoft",
    logo: "images/microsoft-logo.svg",
    bgColor: "rgba(225, 255, 190, 1)",
    position: { x: 88, y: 192 },
  },
];

const companiesRight = [
  {
    name: "Apple",
    logo: "images/apple-logo.svg",
    bgColor: "rgb(0,0,0)",
    position: { x: 106, y: 0 },
  },
  {
    name: "NVIDIA",
    logo: "images/nvidia-logo.svg",
    bgColor: "rgba(206, 255, 120, 1)",
    position: { x: 53, y: 96 },
  },
  {
    name: "Amazon",
    logo: "images/amazon-logo.svg",
    bgColor: "rgb(255, 227, 190)",
    position: { x: 0, y: 192 },
  },
];

export default function AITailorSection() {
  const [highlightColor, setHighlightColor] = useState("rgb(227, 227, 227)");
  const [activeCompany, setActiveCompany] = useState<string | null>(null);

  return (
    <section className="relative w-full flex flex-col">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5 }}
        className="absolute top-[400px] left-[35%] -translate-x-1/2 w-[234px] h-[334px] -z-10"
      >
        <div
          className="w-full h-full rounded-full blur-[125px]"
          style={{
            background:
              "linear-gradient(139deg, rgba(228,187,167,1) 23%, rgba(94,31,29,1) 39%, rgba(23,23,23,1) 67%)",
          }}
        />
      </motion.div>

      <motion.div
        className="mt-6 flex items-center justify-center gap-3"
        initial={{ y: 30, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <span className="w-32 h-[1px] bg-gradient-to-r from-transparent to-gray-950 opacity-40"></span>

        <span className="text-[18px] font-semibold text-[rgb(102,102,102)] whitespace-nowrap">
          Don&apos;t Miss
        </span>

        <span className="w-32 h-[1px] bg-gradient-to-l from-transparent to-gray-950 opacity-40" />
      </motion.div>

      <motion.div
        initial={{ y: 40, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        className="mt-[50px] text-center flex flex-col items-center"
      >
        <h2 className="text-[80px] font-black leading-[76px] text-blue-800">
          AI Tailor Your Resume
        </h2>

        <h2
          className="text-black text-[80px] font-semibold leading-[76px]
"
        >
          for the role you apply
        </h2>
      </motion.div>

      <div className="flex-1 flex justify-between items-start py-8 px-[70px]">
        <div className="flex flex-col justify-start w-[410px] h-[260px] relative">
          {companiesLeft.map((company, idx) => (
            <motion.div
              key={company.name}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.2, duration: 0.6 }}
              whileHover={{ scale: 1.05 }}
              className="absolute flex items-center bg-white/30 backdrop-blur-sm rounded-full p-2 shadow-[0px_10px_10px_rgba(0,0,0,0.1)] glass-card"
              style={{
                left: `${company.position.x}px`,
                top: `${company.position.y}px`,
              }}
              onMouseEnter={() => {
                setHighlightColor(company.bgColor);
                setActiveCompany(company.name);
              }}
              onMouseLeave={() => {
                setHighlightColor("rgb(227, 227, 227)");
                setActiveCompany(null);
              }}
            >
              <div className="bg-white rounded-full p-2">
                <div className="flex items-center gap-[9px]">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: company.bgColor }}
                  >
                    <div className="relative w-[26px] h-[26px]">
                      <Image
                        src={company.logo}
                        alt={company.name}
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>

                  <span className="text-lg text-black font-normal tracking-[-0.26px]">
                    {company.name}
                  </span>

                  <div className="w-0.5 h-0.5 rounded-full bg-[rgb(23,23,23)]" />

                  <span className="text-lg text-black font-normal tracking-[-0.26px]">
                    Head Of Product
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="flex justify-center flex-1">
          <motion.div
            initial={{ y: 50, opacity: 0, scale: 0.9 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="w-[416px] h-[521px] bg-white border-[3px] border-white rounded-[24px] p-8 shadow-lg pr-[50px]"
          >
            <div className="flex flex-col gap-12 w-[334px]">
              <div className="flex items-center gap-8">
                <div className="w-[116px] h-[116px] bg-[#E5B89C] border border-white rounded-full relative overflow-hidden">
                  <Image
                    src="images/profile.svg"
                    alt="Akshat Agrawal"
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="flex flex-col justify-center gap-0.5">
                  <h3
                    className="text-xl
 font-normal text-[rgb(23,23,23)] tracking-[-2%] leading-[1.4em]"
                  >
                    Akshat Agrawal
                  </h3>

                  <div className="flex items-center gap-2">
                    <span
                      className="text-xl
 font-semibold text-[rgb(102,102,102)] tracking-[-2%] leading-[1.2em]"
                    >
                      {activeCompany
                        ? `Head Of ${activeCompany}`
                        : "Head Of Product"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-7 w-full">
                {["Work Description:", "Keywords:"].map((title) => (
                  <div key={title} className="flex flex-col gap-4">
                    <h4 className="text-[24px] font-semibold text-black tracking-[-3%] leading-[1.2em]">
                      {title}
                    </h4>

                    <div className="flex flex-col gap-3 mt-4">
                      {[320, 286, 334, 196].map((w, i) => (
                        <motion.div
                          key={i}
                          initial={{ width: 0 }}
                          animate={{ width: w }}
                          transition={{ delay: 0.3 + i * 0.2, duration: 0.6 }}
                          className="h-2 rounded-full"
                          style={{ backgroundColor: highlightColor }}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        <div className="flex flex-col justify-start w-[410px] h-[260px] relative">
          {companiesRight.map((company, idx) => (
            <motion.div
              key={company.name}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.2, duration: 0.6 }}
              whileHover={{ scale: 1.05 }}
              className="absolute flex items-center bg-white/5 backdrop-blur-sm rounded-full p-2 shadow-[0px_4px_10px_0_rgba(0,0,0,0.1)] glass-card"
              style={{
                left: `${company.position.x}px`,
                top: `${company.position.y}px`,
              }}
              onMouseEnter={() => {
                setHighlightColor(company.bgColor);
                setActiveCompany(company.name);
              }}
              onMouseLeave={() => {
                setHighlightColor("rgb(227,227,227)");
                setActiveCompany(null);
              }}
            >
              <div className="bg-white rounded-full p-2">
                <div className="flex items-center gap-[9px]">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: company.bgColor }}
                  >
                    <div className="relative w-[26px] h-[26px]">
                      <Image
                        src={company.logo}
                        alt={company.name}
                        fill
                        className="object-contain"
                      />
                    </div>

                  </div>
                  <span className="text-lg text-black font-normal tracking-[-0.26px]">
                    {company.name}
                  </span>

                  <div className="w-0.5 h-0.5 rounded-full bg-[rgb(23,23,23)]" />

                  <span className="text-lg text-black font-normal tracking-[-0.26px]">
                    Head Of Product
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <motion.div
        className="absolute top-[760px] left-[280px] w-[358px] backdrop-blur-sm border border-white rounded-[36px] p-5 glass-card2 flex flex-col gap-3"
        initial="hidden"
        animate="visible"
        custom={3}
        whileHover={{ scale: 1.05 }}
      >
        <h3
          className="text-xl
 font-semibold text-[rgb(23,23,23)]"
        >
          Company-Specific Focus
        </h3>
        <p
          className="text-xl
 text-[rgb(102,102,102)]"
        >
          Adjust your resume to match each
          <br />
          company&apos;s requirements.
        </p>
      </motion.div>

      <motion.div
        className="absolute top-[624px] right-[248px] w-[350px] backdrop-blur-sm border border-white rounded-[36px] p-5 glass-card1 flex flex-col gap-3"
        initial="hidden"
        animate="visible"
        custom={4}
        whileHover={{ scale: 1.05 }}
      >
        <h3 className="text-xl font-semibold text-[rgb(23,23,23)]">
          Highlight Relevant Skills
        </h3>
        <p
          className="text-xl
 text-[rgb(102,102,102)]"
        >
          Emphasize what matters most for that job posting
        </p>
      </motion.div>

      <motion.div
        className="absolute top-[825px] right-[426px] w-[347px] backdrop-blur-sm border border-white rounded-[36px] p-5 glass-card2 flex flex-col gap-3 text-xl"
        initial="hidden"
        animate="visible"
        custom={5}
        whileHover={{ scale: 1.05 }}
      >
        <h3 className="font-semibold text-[rgb(23,23,23)]">
          Smart Keyword Match
        </h3>
        <p className="font-normal text-[rgb(102,102,102)]">
          Align with role-specific keywords to beat filters and stand out
        </p>
      </motion.div>
    </section>
  );
}
