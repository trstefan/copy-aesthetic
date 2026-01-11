import Link from "next/link";

const Footer = () => {
  return (
    <footer className="py-16 px-12 border-t border-white/5 bg-slate-950 relative z-10">
      <div className="container mx-auto px-6">
        <div className="flex justify-between gap-12 mb-12">
          <div className="col-span-2">
            <div className="text-2xl font-bold bg-clip-text text-transparent bg-linear-to-r from-blue-400 to-purple-500 mb-6">
              Copy Aesthetics
            </div>
            <p className="text-slate-400 max-w-sm mb-8 leading-relaxed">
              Preview curated UI themes, see them applied to a live mock
              interface, and instantly copy ready-made aesthetic prompts for
              your design or AI workflow.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-6 text-white uppercase text-xs tracking-widest">
              Resources
            </h4>
            <ul className="space-y-4 text-slate-400 text-sm font-medium">
              <li>
                <Link
                  href="/theme-preview"
                  className="hover:text-white transition-colors flex items-center gap-2"
                >
                  Theme Previewer
                </Link>
              </li>
              <li>
                <Link
                  href="https://github.com/trstefan/copy-aesthetic"
                  className="hover:text-white transition-colors"
                >
                  Github
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-xs font-bold text-slate-500 uppercase tracking-widest">
          <p>© Copy Aesthetics</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
