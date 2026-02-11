const CONFETTI_COLORS = ['#3B82F6', '#22C55E', '#F59E0B', '#A855F7', '#EF4444', '#10B981'];

const BLOBS = [
  { top: '160px', left: '450px', size: 17, color: CONFETTI_COLORS[0], duration: 14 },
  { top: '421px', left: '20px', size: 17, color: CONFETTI_COLORS[1], duration: 18 },
  { top: '380px', left: '450px', size: 17, color: CONFETTI_COLORS[2], duration: 16 },
  { top: '500px', left: '80%', size: 17, color: CONFETTI_COLORS[3], duration: 20 },

  { top: '111px', left: '257px', size: 17, color: CONFETTI_COLORS[4], duration: 17 },
];

export default function HeroConfetti() {
  return (
    <>
      <div className="absolute inset-y-0 left-0 w-[35%] pointer-events-none overflow-hidden">
        {BLOBS.map((blob, i) => (
          <span
            key={i}
            className="confetti-blob"
            style={{
              width: blob.size,
              height: blob.size,
              top: blob.top,
              left: blob.left,
              backgroundColor: blob.color,
              animationDuration: `${blob.duration}s`,
              // Slight variation per blob
              ['--float-x' as any]: `${Math.random() * 6 - 4}px`,
              ['--float-y' as any]: `${Math.random() * -10 - 5}px`,
            }}
          />
        ))}
      </div>

      <style jsx>{`
        .confetti-blob {
          position: absolute;
          border-radius: 9999px;
          opacity: 0.6;
          filter: blur(0.5px);
          animation: floatBlob linear infinite;
          will-change: transform;
        }

        @keyframes floatBlob {
          0% {
            transform: translate(0px, 0px);
          }
          50% {
            transform: translate(var(--float-x), var(--float-y));
          }
          100% {
            transform: translate(0px, 0px);
          }
        }
      `}</style>
    </>
  );
}
