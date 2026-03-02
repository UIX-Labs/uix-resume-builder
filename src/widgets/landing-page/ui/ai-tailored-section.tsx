'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';
import { companiesLeft, companiesRight } from '../models/constants';

export function AITailorSection() {
  const [highlightColor, setHighlightColor] = useState('rgb(227, 227, 227)');
  const [activeCompany, setActiveCompany] = useState<string | null>(null);

  return (
    <section className="relative w-full flex flex-col select-none">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5 }}
        className="hidden lg:block absolute top-[400px] left-[35%] -translate-x-1/2 w-[234px] h-[334px] -z-10"
      >
        <div
          className="w-full h-full rounded-full blur-[125px]"
          style={{
            background: 'linear-gradient(139deg, rgba(228,187,167,1) 23%, rgba(94,31,29,1) 39%, rgba(23,23,23,1) 67%)',
          }}
        />
      </motion.div>

      <motion.div
        className="mt-6 flex items-center justify-center gap-2 md:gap-3 px-4"
        initial={{ y: 30, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <span className="w-8 sm:w-16 md:w-32 h-[1px] bg-gradient-to-r from-transparent to-gray-950 opacity-40"></span>

        <span className="text-sm sm:text-base md:text-[18px] font-semibold text-[rgb(102,102,102)] whitespace-nowrap">
          Don&apos;t Miss
        </span>

        <span className="w-8 sm:w-16 md:w-32 h-[1px] bg-gradient-to-l from-transparent to-gray-950 opacity-40" />
      </motion.div>

      <motion.div
        initial={{ y: 40, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        className="mt-3 md:mt-8 lg:mt-[50px] text-center flex flex-col items-center px-4"
      >
        <h2 className="text-[40px] md:text-[64px] lg:text-[80px] font-black leading-tight lg:leading-[76px] text-blue-800">
          AI Tailor Your Resume
        </h2>

        <h2 className="text-black text-2xl sm:text-[48px] md:text-[64px] lg:text-[80px] font-semibold leading-tight lg:leading-[76px]">
          for the role you apply
        </h2>
      </motion.div>

      {/* Mobile company badges - visible only on mobile */}
      <div className="lg:hidden flex flex-col gap-3 px-4 py-6">
        {[...companiesLeft, ...companiesRight].slice(0, 3).map((company, idx) => (
          <motion.div
            key={company.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.15, duration: 0.5 }}
            className="flex items-center bg-white/30 backdrop-blur-sm rounded-full p-2 shadow-[0px_10px_10px_rgba(0,0,0,0.1)] glass-card w-full max-w-[350px] mx-auto"
            onTouchStart={() => {
              setHighlightColor(company.bgColor);
              setActiveCompany(company.role);
            }}
            onTouchEnd={() => {
              setTimeout(() => {
                setHighlightColor('rgb(227, 227, 227)');
                setActiveCompany(null);
              }, 2000);
            }}
          >
            <div className="bg-white rounded-full p-2 w-full">
              <div className="flex items-center gap-[9px]">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: company.bgColor }}
                >
                  <div className="relative w-[26px] h-[26px]">
                    <Image src={company.logo} alt={company.name} fill className="object-contain" />
                  </div>
                </div>

                <span className="text-base text-black font-normal tracking-[-0.26px]">{company.name}</span>

                <div className="w-0.5 h-0.5 rounded-full bg-[rgb(23,23,23)]" />

                <span className="text-base text-black font-normal tracking-[-0.26px]">{company.role}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="flex-1 flex flex-col lg:flex-row justify-between items-center lg:items-start py-2 md:py-8 px-4 md:px-8 lg:px-[70px] gap-8 lg:gap-0">
        {/* Left company badges - hidden on mobile */}
        <div className="hidden lg:flex flex-col justify-start w-[410px] h-[260px] relative">
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
                setActiveCompany(company.role);
              }}
              onMouseLeave={() => {
                setHighlightColor('rgb(227, 227, 227)');
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
                      <Image src={company.logo} alt={company.name} fill className="object-contain" />
                    </div>
                  </div>

                  <span className="text-lg text-black font-normal tracking-[-0.26px]">{company.name}</span>

                  <div className="w-0.5 h-0.5 rounded-full bg-[rgb(23,23,23)]" />

                  <span className="text-lg text-black font-normal tracking-[-0.26px]">{company.role}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Center resume card */}
        <div className="flex justify-center flex-1 w-full lg:w-auto">
          <motion.div
            initial={{ y: 50, opacity: 0, scale: 0.9 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="w-full max-w-[350px] sm:max-w-[380px] lg:w-[416px] min-h-[450px] sm:min-h-[500px] lg:h-[521px] bg-white border-[3px] border-white rounded-[20px] lg:rounded-[24px] p-6 sm:p-8 shadow-lg lg:pr-[50px]"
          >
            <div className="flex flex-col gap-8 sm:gap-10 lg:gap-12 w-full lg:w-[334px]">
              <div className="flex flex-col sm:flex-row items-center sm:items-center gap-4 sm:gap-6 lg:gap-8">
                <motion.div
                  className="w-[80px] h-[80px] sm:w-[100px] sm:h-[100px] lg:w-[116px] lg:h-[116px] rounded-full border border-white relative overflow-hidden flex-shrink-0 flex items-center justify-center"
                  style={{
                    backgroundColor: activeCompany
                      ? [...companiesLeft, ...companiesRight].find((c) => c.role === activeCompany)?.bgColor ||
                        'rgb(227, 227, 227)'
                      : 'rgb(227, 227, 227)',
                  }}
                  animate={{
                    scale: activeCompany ? [1, 1.05, 1] : 1,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="relative w-[50px] h-[50px] sm:w-[60px] sm:h-[60px] lg:w-[70px] lg:h-[70px]">
                    <Image
                      src={
                        activeCompany
                          ? [...companiesLeft, ...companiesRight].find((c) => c.role === activeCompany)?.logo ||
                            '/images/Pika-Resume.png'
                          : '/images/Pika-Resume.png'
                      }
                      alt={activeCompany || 'UIX Labs'}
                      fill
                      className="object-contain"
                    />
                  </div>
                </motion.div>

                <div className="flex flex-col justify-center gap-0.5 text-center sm:text-left">
                  <h3 className="text-lg sm:text-xl font-normal text-[rgb(23,23,23)] tracking-[-2%] leading-[1.4em]">
                    Akshat Agrawal
                  </h3>

                  <div className="flex items-center gap-2">
                    <span className="text-base sm:text-lg lg:text-xl font-semibold text-[rgb(102,102,102)] tracking-[-2%] leading-[1.2em]">
                      {activeCompany ? `${activeCompany}` : 'Head Of Product'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-5 sm:gap-6 lg:gap-7 w-full">
                {['Work Description:', 'Keywords:'].map((title) => (
                  <div key={title} className="flex flex-col gap-3 sm:gap-4">
                    <h4 className="text-[18px] sm:text-[20px] lg:text-[24px] font-semibold text-black tracking-[-3%] leading-[1.2em]">
                      {title}
                    </h4>

                    <div className="flex flex-col gap-2 sm:gap-3 mt-2 sm:mt-4">
                      {[320, 286, 334, 196].map((w, i) => {
                        const mobileWidth = (w / 334) * 100; // Convert to percentage for mobile
                        return (
                          <motion.div
                            key={i}
                            initial={{ width: 0 }}
                            animate={{ width: '100%' }}
                            transition={{ delay: 0.3 + i * 0.2, duration: 0.6 }}
                            className="h-1.5 sm:h-2 rounded-full"
                            style={{
                              backgroundColor: highlightColor,
                              maxWidth: `${mobileWidth}%`,
                            }}
                          />
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right company badges - hidden on mobile */}
        <div className="hidden lg:flex flex-col justify-start w-[410px] h-[260px] relative">
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
                setActiveCompany(company.role);
              }}
              onMouseLeave={() => {
                setHighlightColor('rgb(227,227,227)');
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
                      <Image src={company.logo} alt={company.name} fill className="object-contain" />
                    </div>
                  </div>
                  <span className="text-lg text-black font-normal tracking-[-0.26px]">{company.name}</span>

                  <div className="w-0.5 h-0.5 rounded-full bg-[rgb(23,23,23)]" />

                  <span className="text-lg text-black font-normal tracking-[-0.26px]">{company.role}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Feature cards - absolute positioning on desktop, normal flow on mobile */}
      <motion.div
        className="relative lg:absolute lg:top-[760px] lg:left-[280px] w-full max-w-[350px] lg:w-[358px] mx-auto lg:mx-0 backdrop-blur-sm border border-white rounded-[20px] lg:rounded-[36px] p-4 lg:p-5 glass-card2 flex flex-col gap-2 lg:gap-3 mb-4 lg:mb-0"
        initial="hidden"
        animate="visible"
        custom={3}
        whileHover={{ scale: 1.05 }}
      >
        <h3 className="text-lg lg:text-xl font-semibold text-[rgb(23,23,23)]">Company-Specific Focus</h3>
        <p className="text-base lg:text-xl text-[rgb(102,102,102)]">
          Adjust your resume to match each company&apos;s requirements.
        </p>
      </motion.div>

      <motion.div
        className="relative lg:absolute lg:top-[624px] lg:right-[248px] w-full max-w-[350px] mx-auto lg:mx-0 backdrop-blur-sm border border-white rounded-[20px] lg:rounded-[36px] p-4 lg:p-5 glass-card1 flex flex-col gap-2 lg:gap-3 mb-4 lg:mb-0"
        initial="hidden"
        animate="visible"
        custom={4}
        whileHover={{ scale: 1.05 }}
      >
        <h3 className="text-lg lg:text-xl font-semibold text-[rgb(23,23,23)]">Highlight Relevant Skills</h3>
        <p className="text-base lg:text-xl text-[rgb(102,102,102)]">Emphasize what matters most for that job posting</p>
      </motion.div>

      <motion.div
        className="relative lg:absolute lg:top-[825px] lg:right-[426px] w-full max-w-[350px] lg:w-[347px] mx-auto lg:mx-0 backdrop-blur-sm border border-white rounded-[20px] lg:rounded-[36px] p-4 lg:p-5 glass-card2 flex flex-col gap-2 lg:gap-3 mb-4 lg:mb-0"
        initial="hidden"
        animate="visible"
        custom={5}
        whileHover={{ scale: 1.05 }}
      >
        <h3 className="text-lg lg:text-xl font-semibold text-[rgb(23,23,23)]">Smart Keyword Match</h3>
        <p className="text-base lg:text-xl font-normal text-[rgb(102,102,102)]">
          Align with role-specific keywords to beat filters and stand out
        </p>
      </motion.div>
    </section>
  );
}
