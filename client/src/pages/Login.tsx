// client/src/pages/Login.tsx
import React from "react";

const Login: React.FC = () => {
  return (
    <div className="min-h-screen flex">
      {/* LEFT: marketing with SVG background */}
      <div
        className="hidden md:flex w-1/2 bg-no-repeat bg-cover bg-center p-12 text-white relative"
        style={{ backgroundImage: "url('/assets/waves.svg')" }}
      >
        {/* optional semi-transparent overlay for better text contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/10 to-black/25 pointer-events-none"></div>

        <div className="relative z-10 max-w-lg self-center">
          <div className="mb-6">
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="h-10 w-10 rounded-lg bg-white/10 flex items-center justify-center">💱</div>
              <span className="text-xl font-semibold">FinPilot</span>
            </div>

            <h1 className="text-4xl font-extrabold leading-snug mb-4">
              Streamline your <br/> expense management
            </h1>
            <p className="text-lg text-white/80">
              Modern, secure, and efficient expense tracking and approval workflows for enterprise teams.
            </p>
          </div>

          <ul className="mt-12 space-y-3 text-sm text-white/70">
            <li>📱 Trusted by 500+ companies worldwide</li>
            <li>🔒 Transparency comes first</li>
          </ul>
        </div>
      </div>

      {/* RIGHT: login form */}
      <div className="flex-1 flex items-center justify-center bg-[#0b0b0f] p-8">
        <div className="w-full max-w-md">
          <h2 className="text-2xl font-bold text-white mb-2">Welcome back</h2>
          <p className="text-sm text-white/60 mb-6">Sign in to your FinPilot account</p>

          {/* tabs */}
          <div className="flex gap-4 mb-6">
            <button className="px-6 py-2 rounded-lg bg-[#15141a] text-white">Sign In</button>
            <button className="px-6 py-2 rounded-lg bg-transparent text-white/70">Sign Up</button>
          </div>

          <div className="bg-[#0f0f14] p-6 rounded-xl shadow-xl border border-white/5">
            <label className="text-sm text-white/70 block mb-1">Email address</label>
            <input type="email" placeholder="alex@company.com"
              className="w-full px-4 py-3 rounded-md bg-[#1b1b22] text-white mb-4 focus:outline-none focus:ring-2 focus:ring-purple-500" />

            <label className="text-sm text-white/70 block mb-1">Password</label>
            <input type="password" placeholder="••••••"
              className="w-full px-4 py-3 rounded-md bg-[#1b1b22] text-white mb-6 focus:outline-none focus:ring-2 focus:ring-purple-500" />

            <button className="w-full py-3 rounded-md bg-gradient-to-r from-purple-500 to-indigo-500 font-semibold text-white">
              Sign In →
            </button>
          </div>

          <p className="text-sm text-white/60 mt-6">Need help? Contact <a href="mailto:support@finpilot.com" className="text-indigo-300">support@finpilot.com</a></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
