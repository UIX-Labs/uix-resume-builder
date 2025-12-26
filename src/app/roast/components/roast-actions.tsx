import { useState } from "react";
import { Button } from "@shared/ui";
import { Download, RotateCcw, Share2, Sparkles, Wand2 } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { cn } from "@shared/lib/utils";
import { useUserProfile } from "@shared/hooks/use-user";
import { useQueryClient } from "@tanstack/react-query";
import { useFormDataStore } from "@widgets/form-page-builder/models/store";
import { runAnalyzerWithProgress } from "@shared/lib/analyzer/run-analyzer-with-progress";
import { useIsMobile } from "@shared/hooks/use-mobile";
import { MobileTextView } from "@widgets/landing-page/ui/mobile-text-view";

interface RoastActionsProps {
  onShare: () => void;
  onDownload: () => void;
  onRoastAnother: () => void;
  isShareAvailable: boolean;
  resumeId: string;
}

export function RoastActions({
  onShare,
  onDownload,
  onRoastAnother,
  isShareAvailable,
  resumeId,
}: RoastActionsProps) {
  const router = useRouter();
  const { data: user } = useUserProfile();
  const isMobile = useIsMobile();
  const [showMobileView, setShowMobileView] = useState(false);
  const queryClient = useQueryClient();
  const setIsAnalyzing = useFormDataStore((state) => state.setIsAnalyzing);
  const setAnalyzerError = useFormDataStore((state) => state.setAnalyzerError);
  const setFormData = useFormDataStore((state) => state.setFormData);

  const handleFixAndDownload = async () => {
    if (isMobile) {
      setShowMobileView(true);
      return;
    }

    if (user?.isLoggedIn) {
      router.push(`/resume/${resumeId}`);

      setTimeout(async () => {
        await runAnalyzerWithProgress({
          resumeId,
          queryClient,
          setFormData,
          setIsAnalyzing,
          setAnalyzerError,
        });
      }, 100);
    } else {
      localStorage.setItem("pending_analyzer_resume_id", resumeId);
      router.push("/auth");
    }
  };

  const handleCreateResume = () => {
    if (isMobile) {
      setShowMobileView(true);
      return;
    }

    router.push("/dashboard");
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-8 w-full max-w-2xl mx-auto"
      >
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-sm border border-slate-100 text-center space-y-8">
          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-[#005FF2]">
              Roast Served! 🍽️
            </h3>
            <p className="text-slate-600 font-medium">
              Now go fix that resume! (We can help with that)
            </p>
          </div>

          <div className="flex flex-col gap-6">
            {/* Primary Actions - Share & Download */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              {isShareAvailable && (
                <Button
                  size="lg"
                  onClick={onShare}
                  className="w-full sm:w-auto min-w-[160px] bg-[#005FF2] hover:bg-[#004dc7] text-white shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 transition-all hover:-translate-y-0.5"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Share Roast
                </Button>
              )}

              <Button
                size="lg"
                onClick={onDownload}
                variant={isShareAvailable ? "outline" : "default"}
                className={cn(
                  "w-full sm:w-auto min-w-[160px] transition-all hover:-translate-y-0.5",
                  !isShareAvailable
                    ? "bg-[#005FF2] hover:bg-[#004dc7] text-white shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30"
                    : "bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                )}
              >
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
            </div>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-slate-100" />
              </div>
              <div className="relative flex justify-center text-xs uppercase tracking-wider">
                <span className="bg-white px-3 text-slate-400 font-semibold">
                  What's Next
                </span>
              </div>
            </div>

            {/* Secondary Actions - Navigation */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 flex-wrap">
              <Button
                variant="outline"
                onClick={handleFixAndDownload}
                className="relative w-full sm:w-auto min-w-[180px] h-11 border-slate-200 text-slate-700 hover:border-[#005FF2] hover:text-[#005FF2] hover:bg-blue-50/50 group"
              >
                <Wand2 className="w-4 h-4 mr-2" />
                <span>Fix & Download</span>
              </Button>

              <Button
                variant="outline"
                onClick={handleCreateResume}
                className="w-full sm:w-auto min-w-[180px] h-11 border-slate-200 text-slate-700 hover:border-[#005FF2] hover:text-[#005FF2] hover:bg-blue-50/50 group"
              >
                <Sparkles className="w-4 h-4 mr-2 text-[#005FF2] transition-transform group-hover:scale-110" />
                Create My Resume
              </Button>

              <Button
                variant="ghost"
                onClick={onRoastAnother}
                className="w-full sm:w-auto text-slate-500 hover:text-slate-800 hover:bg-slate-100"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Roast Another
              </Button>
            </div>
          </div>
        </div>
      </motion.div>

      <MobileTextView
        isOpen={showMobileView}
        onClose={() => setShowMobileView(false)}
      />
    </>
  );
}
