import React from "react";
import {Link, useNavigate} from "react-router-dom";

const LandingPage = () => {

    const navigate = useNavigate();

    const navigationONLogin = () => {
        navigate("/login");
    }

    const navigationONSignup = () => {
        navigate("/signup");
    }

  return (
    <div className="min-h-screen bg-[#0B1020] text-white overflow-hidden">
      
      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-500 via-cyan-400 to-pink-500 bg-clip-text text-transparent">
          Aura AI
        </h1>

        <div className="hidden md:flex gap-8 text-gray-300">
          <Link to="#" className="hover:text-white transition">
            Features
          </Link>
          <Link to="#" className="hover:text-white transition">
            About
          </Link>
          <Link to="#" className="hover:text-white transition">
            Contact
          </Link>
        </div>

        <button onClick={() => navigationONLogin()} className="px-5 py-2 rounded-xl bg-white text-black font-medium hover:scale-105 transition">
          Login
        </button>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-8 py-20 flex flex-col lg:flex-row items-center justify-between gap-16">
        
        {/* Left */}
        <div className="flex-1">
          <div className="inline-block px-4 py-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-300 mb-6">
            ✨ Next Generation AI Assistant
          </div>

          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            Build Faster.
            <br />
            Think Smarter.
            <br />
            <span className="bg-gradient-to-r from-purple-500 via-cyan-400 to-pink-500 bg-clip-text text-transparent">
              Powered by AI.
            </span>
          </h1>

          <p className="text-gray-400 text-lg mt-8 max-w-xl">
            Chat, code, learn, and create with an intelligent AI assistant
            designed to help you work smarter and move faster.
          </p>

          <div className="flex gap-4 mt-10 flex-wrap">
            <button onClick={() => navigationONSignup()} className="px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-600 via-cyan-500 to-pink-500 font-semibold hover:scale-105 transition">
              Start Chatting
            </button>

            <button className="px-8 py-4 rounded-2xl border border-white/20 hover:bg-white/10 transition">
              Learn More
            </button>
          </div>
        </div>

        {/* Right */}
        <div className="flex-1 relative">
          
          {/* Glow Effects */}
          <div className="absolute -top-10 -left-10 w-64 h-64 bg-purple-500 rounded-full blur-[120px] opacity-30"></div>

          <div className="absolute bottom-0 right-0 w-64 h-64 bg-cyan-500 rounded-full blur-[120px] opacity-30"></div>

          {/* AI Chat Card */}
          <div className="relative backdrop-blur-xl bg-white/10 border border-white/10 rounded-3xl p-6 shadow-2xl">
            
            <div className="flex items-center gap-2 mb-6">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>

            <div className="space-y-4">
              
              <div className="bg-white/5 p-4 rounded-2xl">
                <p className="text-sm text-gray-300">
                  User: Create a responsive navbar using React.
                </p>
              </div>

              <div className="bg-gradient-to-r from-purple-500/20 to-cyan-500/20 p-4 rounded-2xl">
                <p className="text-sm text-gray-200">
                  AI: Here's a modern responsive navbar component with
                  mobile support and clean styling.
                </p>
              </div>

              <div className="bg-black/40 rounded-2xl p-4 overflow-x-auto">
                <code className="text-cyan-300 text-sm">
                  const Navbar = () =&gt; {"{"}
                  <br />
                  &nbsp;&nbsp;return &lt;nav&gt;...&lt;/nav&gt;
                  <br />
                  {"}"}
                </code>
              </div>

            </div>
          </div>
        </div>

      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-8 pb-20">
        <div className="grid md:grid-cols-3 gap-6">
          
          <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
            <h3 className="text-xl font-semibold mb-3">
              Smart Conversations
            </h3>
            <p className="text-gray-400">
              Understands natural language and responds intelligently.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
            <h3 className="text-xl font-semibold mb-3">
              Code Assistant
            </h3>
            <p className="text-gray-400">
              Generate, debug and explain code in seconds.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
            <h3 className="text-xl font-semibold mb-3">
              Lightning Fast
            </h3>
            <p className="text-gray-400">
              Instant responses powered by modern AI technology.
            </p>
          </div>

        </div>
      </section>

    </div>
  );
};

export default LandingPage;