import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const quickLinks = [
    { name: "Project", path: "/about" },
    { name: "Team", path: "/team" },
    { name: "Dashboard", path: "/dashboard" },
    { name: "Event Logs", path: "/events" },
    { name: "Cameras", path: "/cameras" },
    { name: "Identity Database", path: "/people" },
  ];

  return (
    <footer className="bg-slate-950 border-t border-slate-800 py-16 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {/* Brand & Mission */}
        <div className="flex flex-col">
          <div className="flex items-center gap-3 mb-6">
            <span className="font-black tracking-tighter text-2xl text-white uppercase">
              Lobby<span className="text-blue-500">Vision</span>
            </span>
          </div>
          <p className="text-slate-500 text-sm leading-relaxed max-w-sm">
            An Information System project to count Manpower in a Lobby developed
            by students of the department of Industrial & Systems Engineering at
            IIT Kharagpur. Focus on real-time security and flow optimization.
          </p>
        </div>

        {/* Navigation Grid */}
        <div>
          <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-xs">
            Quick Links
          </h4>
          <ul className="grid grid-cols-2 gap-y-4 gap-x-2">
            {quickLinks.map((link) => (
              <li key={link.name}>
                <Link
                  to={link.path}
                  className="inline-block text-slate-500 hover:text-blue-400 hover:translate-x-2 transition-all duration-300 text-sm"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Institutional Trust */}
        <div>
          <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-xs">
            Affiliation
          </h4>
          <div className="space-y-3">
            <p className="text-slate-500 text-sm">
              Department of Industrial & Systems Engineering
            </p>
            <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800/50">
              <p className="text-slate-400 font-medium text-xs leading-relaxed uppercase tracking-widest">
                IIT Kharagpur, West Bengal <br />
                India - 721302
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Final Bottom Bar */}
      <div className="max-w-7xl mx-auto mt-14 pt-6 border-t border-slate-900 flex flex-col md:flex-row justify-center items-center gap-4">
        <p className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-700 text-center md:text-left">
          © {currentYear} IIT KGP | LobbyVision
        </p>
      </div>
    </footer>
  );
};

export default Footer;