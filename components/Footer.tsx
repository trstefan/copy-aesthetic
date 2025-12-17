import { Github, Twitter, MessageSquare, ExternalLink } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-16 border-t border-white/5 bg-slate-950 relative z-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-2">
            <div className="text-2xl font-bold bg-clip-text text-transparent bg-linear-to-r from-blue-400 to-purple-500 mb-6">
              ChromaPrompt
            </div>
            <p className="text-slate-400 max-w-sm mb-8 leading-relaxed">
              The professional playground for exploring user interface
              aesthetics and generating AI-powered design prompts.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors"
              >
                <Twitter size={20} />
              </a>
              <a
                href="#"
                className="p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors"
              >
                <Github size={20} />
              </a>
              <a
                href="#"
                className="p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors"
              >
                <MessageSquare size={20} />
              </a>
            </div>
          </div>
          <div>
            <h4 className="font-bold mb-6 text-white uppercase text-xs tracking-widest">
              Platform
            </h4>
            <ul className="space-y-4 text-slate-400 text-sm font-medium">
              <li>
                <button className="hover:text-white transition-colors">
                  Browse Themes
                </button>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Prompt Engine
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  API Docs
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6 text-white uppercase text-xs tracking-widest">
              Resources
            </h4>
            <ul className="space-y-4 text-slate-400 text-sm font-medium">
              <li>
                <a
                  href="#"
                  className="hover:text-white transition-colors flex items-center gap-2"
                >
                  Design Guide <ExternalLink size={12} />
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Case Studies
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Roadmap
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-xs font-bold text-slate-500 uppercase tracking-widest">
          <p>© 2025 ChromaPrompt. Built with Gemini AI.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
