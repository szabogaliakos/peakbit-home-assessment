import LottieLoader from "@/src/app/_components/LottieLoader";

export default function Loading() {
  return (
    <div className="flex items-center justify-center h-screen w-screen">
      <LottieLoader style={{ width: "150px", height: "150px" }} />
    </div>
  );
}
