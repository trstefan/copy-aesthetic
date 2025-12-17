import React from "react";
import { Theme } from "../types";
import {
  BarChart2,
  Bell,
  Home,
  Mail,
  Settings,
  User,
  Search,
  Plus,
} from "lucide-react";

interface MockUIProps {
  theme: Theme;
  isMobile?: boolean;
}

const MockUI: React.FC<MockUIProps> = ({ theme, isMobile }) => {
  // We apply the theme as inline CSS variables to the container
  // This allows for instant switching without re-rendering logic
  const styleVars = {
    "--bg-primary": theme.colors.bgPrimary,
    "--bg-secondary": theme.colors.bgSecondary,
    "--text-primary": theme.colors.textPrimary,
    "--text-secondary": theme.colors.textSecondary,
    "--accent": theme.colors.accent,
    "--border": theme.colors.border,
    "--font-family": theme.styles.fontFamily,
    "--border-radius": theme.styles.borderRadius,
    "--box-shadow": theme.styles.boxShadow,
    "--border-width": theme.styles.borderWidth,
  } as React.CSSProperties;

  const isGradient = theme.colors.bgPrimary.includes("gradient");

  // Specific override for glassmorphism backdrop filter
  const containerStyle: React.CSSProperties = {
    ...styleVars,
    background: isGradient ? theme.colors.bgPrimary : "var(--bg-primary)",
    color: "var(--text-primary)",
    fontFamily: "var(--font-family)",
    transition: "all 0.3s ease",
  };

  const cardStyle: React.CSSProperties = {
    backgroundColor: "var(--bg-secondary)",
    border: "var(--border-width) solid var(--border)",
    borderRadius: "var(--border-radius)",
    boxShadow: "var(--box-shadow)",
    backdropFilter: isGradient ? "blur(10px)" : "none", // Glassmorphism effect
  };

  const buttonStyle: React.CSSProperties = {
    backgroundColor: "var(--accent)",
    color:
      theme.id === "minimalist" || theme.id === "neobrutalism"
        ? "#fff"
        : "var(--bg-primary)", // Contrast hack
    border: "var(--border-width) solid transparent", // Keep border width for sizing consistency
    borderRadius: "var(--border-radius)",
    fontWeight: "bold",
  };

  if (isMobile) {
    return (
      <div
        className="w-[320px] h-[640px] overflow-hidden relative flex flex-col shadow-2xl mx-auto border-12 border-gray-900 rounded-[3rem]"
        style={containerStyle}
      >
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-gray-900 rounded-b-3xl z-30" />

        {/* Mobile Header */}
        <div className="px-5 pt-8 pb-3 flex justify-between items-center z-10">
          <div className="flex flex-col">
            <span
              className="text-[10px] font-semibold uppercase opacity-50 tracking-wide"
              style={{ color: "var(--text-secondary)" }}
            >
              Welcome back
            </span>
            <span className="text-lg font-bold mt-0.5">Alex Doe</span>
          </div>
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center"
            style={cardStyle}
          >
            <Bell size={16} style={{ color: "var(--text-primary)" }} />
          </div>
        </div>

        {/* Mobile Content */}
        <div className="flex-1 px-5 space-y-3 overflow-y-auto no-scrollbar z-10 pb-20">
          {/* Stat Card */}
          <div className="p-4" style={cardStyle}>
            <div className="flex justify-between items-start mb-1.5">
              <span
                className="text-xs"
                style={{ color: "var(--text-secondary)" }}
              >
                Total Balance
              </span>
              <span className="text-green-500 text-[10px] font-mono">
                +2.4%
              </span>
            </div>
            <div className="text-2xl font-bold mb-3">$12,450</div>
            <div className="h-1.5 w-full bg-gray-200/20 rounded-full overflow-hidden">
              <div
                className="h-full w-2/3"
                style={{ backgroundColor: "var(--accent)" }}
              ></div>
            </div>
          </div>

          {/* Action Row */}
          <div className="flex gap-2.5">
            {["Send", "Request", "More"].map((action, i) => (
              <button
                key={action}
                className="flex-1 py-2.5 text-xs font-bold whitespace-nowrap"
                style={{
                  ...cardStyle,
                  backgroundColor:
                    i === 0 ? "var(--accent)" : "var(--bg-secondary)",
                  color:
                    i === 0
                      ? theme.id === "minimalist"
                        ? "#fff"
                        : "var(--bg-primary)"
                      : "var(--text-primary)",
                  border: i === 0 ? "none" : cardStyle.border,
                }}
              >
                {action}
              </button>
            ))}
          </div>

          {/* List */}
          <div className="space-y-2.5">
            <h3 className="text-[11px] font-bold uppercase tracking-wide opacity-60 mt-1">
              Recent Activity
            </h3>
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="p-2.5 flex items-center gap-2.5"
                style={cardStyle}
              >
                <div className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-500/10 shrink-0">
                  <User size={14} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-bold truncate">
                    Design Subscription
                  </div>
                  <div className="text-[10px] opacity-50">Today, 10:00 AM</div>
                </div>
                <div className="text-xs font-bold">-$24.00</div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Nav */}
        <div
          className="absolute bottom-0 left-0 right-0 h-14 flex items-center justify-around z-20 px-4"
          style={{
            backgroundColor: "var(--bg-secondary)",
            borderTop: "var(--border-width) solid var(--border)",
            backdropFilter: isGradient ? "blur(20px)" : "none",
          }}
        >
          <Home size={20} style={{ color: "var(--accent)" }} />
          <Search size={20} style={{ color: "var(--text-secondary)" }} />
          <div
            className="w-11 h-11 -mt-6 rounded-full flex items-center justify-center shadow-lg"
            style={{
              backgroundColor: "var(--accent)",
              color: theme.id === "minimalist" ? "#fff" : "var(--bg-primary)",
            }}
          >
            <Plus size={22} />
          </div>
          <Mail size={20} style={{ color: "var(--text-secondary)" }} />
          <Settings size={20} style={{ color: "var(--text-secondary)" }} />
        </div>

        {/* Home Indicator */}
        <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-20 h-1 bg-gray-400 rounded-full opacity-40 z-30" />
      </div>
    );
  }

  // Desktop Mock
  return (
    <div
      className="w-full h-full rounded-xl overflow-hidden flex shadow-xl border"
      style={{ ...containerStyle, borderColor: "var(--border)" }}
    >
      {/* Sidebar */}
      <div
        className="w-64 flex flex-col p-6 border-r"
        style={{
          borderColor: "var(--border)",
          backgroundColor: isGradient
            ? "rgba(0,0,0,0.1)"
            : "var(--bg-secondary)",
        }}
      >
        <div className="flex items-center gap-2 mb-10">
          <div
            className="w-8 h-8 rounded"
            style={{ backgroundColor: "var(--accent)" }}
          ></div>
          <span className="font-bold text-lg">Acme Corp</span>
        </div>
        <nav className="flex-1 space-y-2">
          {["Dashboard", "Analytics", "Team", "Projects", "Documents"].map(
            (item, i) => (
              <div
                key={item}
                className={`p-3 rounded cursor-pointer flex items-center gap-3 ${
                  i === 0 ? "opacity-100" : "opacity-60 hover:opacity-100"
                }`}
                style={{
                  backgroundColor:
                    i === 0 ? "var(--bg-primary)" : "transparent",
                  fontWeight: i === 0 ? "bold" : "normal",
                  boxShadow: i === 0 ? "var(--box-shadow)" : "none",
                }}
              >
                <div
                  className="w-2 h-2 rounded-full"
                  style={{
                    backgroundColor: i === 0 ? "var(--accent)" : "transparent",
                  }}
                ></div>
                {item}
              </div>
            )
          )}
        </nav>
        <div className="p-4 rounded mt-auto" style={cardStyle}>
          <div className="text-xs mb-2">Pro Plan</div>
          <div className="text-sm font-bold mb-2">85% Used</div>
          <div className="h-1 w-full bg-gray-200/20 rounded-full overflow-hidden">
            <div
              className="h-full w-4/5"
              style={{ backgroundColor: "var(--accent)" }}
            ></div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-y-auto">
        <header className="flex justify-between items-center mb-10">
          <h1 className="text-2xl font-bold">Dashboard Overview</h1>
          <div className="flex gap-4">
            <button
              className="px-4 py-2 rounded text-sm font-medium"
              style={cardStyle}
            >
              Filter
            </button>
            <button
              className="px-4 py-2 rounded text-sm font-medium shadow-lg"
              style={buttonStyle}
            >
              New Project
            </button>
          </div>
        </header>

        {/* Analytics Grid */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          {[
            { title: "Total Revenue", val: "$54,230", change: "+12%" },
            { title: "Active Users", val: "2,453", change: "+5%" },
            { title: "Bounce Rate", val: "24.5%", change: "-2%" },
          ].map((stat, i) => (
            <div key={i} className="p-6 flex flex-col gap-4" style={cardStyle}>
              <div className="flex justify-between">
                <span className="text-sm opacity-70">{stat.title}</span>
                <BarChart2 size={16} style={{ color: "var(--accent)" }} />
              </div>
              <div className="text-3xl font-bold">{stat.val}</div>
              <div className="text-xs text-green-500 font-mono">
                {stat.change} vs last month
              </div>
            </div>
          ))}
        </div>

        {/* Large Chart Area Placeholder */}
        <div
          className="w-full h-64 rounded p-6 flex items-center justify-center relative overflow-hidden"
          style={cardStyle}
        >
          <div className="absolute inset-0 opacity-5 pointer-events-none">
            <svg width="100%" height="100%">
              <pattern
                id="grid"
                width="40"
                height="40"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 40 0 L 0 0 0 40"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                />
              </pattern>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>
          <div className="text-center opacity-50">
            <BarChart2 size={48} className="mx-auto mb-2 opacity-30" />
            <p>Chart Data Visualization Area</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MockUI;
