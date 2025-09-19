"use client";

type Props = {
  progress: number;
};

export function ProgressBar({ progress }: Props) {
  return (
    <div className="h-3 rounded-xl bg-zinc-700 w-full mt-4">
      <div
        role="progressbar"
        aria-label={`Progresso: ${progress}%`}
        aria-valuenow={progress}
        aria-valuemin={0}
        aria-valuemax={100}
        className="h-3 rounded-xl bg-violet-600 transition-all"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
