export default function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative w-full bg-slate-950 text-white selection:bg-pink-500/30">
      {children}
    </div>
  );
}
