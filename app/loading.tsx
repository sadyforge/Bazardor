export default function Loading() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-5">
      <div className="relative flex h-16 w-16 items-center justify-center">
        <div className="absolute inset-0 rounded-full border-4 border-primary/15" />
        <div className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-primary" />
        <div className="h-3 w-3 animate-pulse rounded-full bg-primary" />
      </div>

      <div className="text-center">
        <h2 className="text-lg font-semibold tracking-wide">
          Loading
        </h2>
        <p className="mt-1 text-sm text-base-content/50">
          Please wait a moment...
        </p>
      </div>

      <div className="flex gap-1.5">
        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-primary [animation-delay:-0.3s]" />
        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-primary [animation-delay:-0.15s]" />
        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-primary" />
      </div>
    </div>
  );
}