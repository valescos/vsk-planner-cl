import { cn } from "../utilities";

type ProgressBarProps = {
  progress: number;
};

export default function ProgressBar({ progress }: ProgressBarProps) {
  function colorRange(): string | undefined {
    if (0 <= progress && progress < 25) return "bg-rose-500";
    if (25 <= progress && progress < 50) return "bg-orange-500";
    if (50 <= progress && progress < 75) return "bg-green-400";
    if (75 <= progress && progress <= 99) return "bg-green-600";
    if (progress === 100) return "bg-blue-500";
  }

  return (
    <div className="relative h-[1.8rem] w-[3rem] overflow-hidden rounded-md bg-slate-300 lg:w-[16rem]">
      <p className="absolute z-10 w-full text-center text-white">{progress}%</p>
      <div
        style={{ width: `${progress}%` }} //Горький катаклизм с тэйлвиндом :/ Разберись!
        className={cn(
          `absolute left-0 top-0 z-0 h-full transition-all`,
          colorRange(),
        )}
      />
    </div>
  );
}
