export default function RequestCardSkeleton() {
  return (
    <div
      className="relative w-full overflow-hidden rounded-xl border border-gray-200"
      style={{ height: 180, backgroundColor: "#e5e7eb" }} // gray-200
    >
      {/* Shimmer */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          transform: "translateX(-100%)",
          animation: "shimmer 1.4s linear infinite",
          background:
            "linear-gradient(90deg, #e5e7eb 0%, #f3f4f6 50%, #e5e7eb 100%)",
        }}
      />

      {/* Keyframes inline */}
      <style>
        {`
          @keyframes shimmer {
            100% {
              transform: translateX(100%);
            }
          }
        `}
      </style>
    </div>
  );
}