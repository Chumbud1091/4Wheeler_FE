import { Link } from "react-router-dom";
import UserNavBar from "../UI/NavBar/UserNavBar";
import Footer from "../UI/Footer/Footer";

import cofounder1 from "../../assets/cofounder1.png";
import cofounder2 from "../../assets/cofounder2.png";

const About = () => {
  return (
    <>
      <UserNavBar />

      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
        <div className="max-w-6xl mx-auto px-4 py-16 space-y-16">
          {/* Hero */}
          <section className="flex flex-col md:flex-row items-start md:items-center gap-10">
            <div className="flex-1 space-y-6">
              <p className="text-xs sm:text-sm uppercase tracking-[0.25em] text-orange-400">
                ABOUT 4WHEELER · PREMIUMDRIVE
              </p>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
                A curated showroom for{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400">
                  premium automotive experiences
                </span>
              </h1>
              <p className="text-sm sm:text-base text-gray-300 max-w-xl">
                4Wheeler · PremiumDrive is designed as a{" "}
                <span className="text-orange-300 font-medium">
                  digital luxury showroom
                </span>{" "}
                where enthusiasts can explore carefully selected cars in a
                modern, immersive interface. From refined sedans and premium
                SUVs to high–performance sports cars, every model in our
                collection is chosen to deliver both emotion and engineering
                excellence.
              </p>
              <p className="text-sm sm:text-base text-gray-300 max-w-xl">
                Instead of browsing endless lists, you can discover each car
                through rich visuals, clear specifications, and meaningful
                highlights – just like stepping into a physical showroom, but
                from the comfort of your screen.
              </p>

              <div className="flex flex-wrap gap-4 pt-2">
                <Link
                  to="/cars"
                  className="px-5 py-3 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 text-sm font-semibold hover:opacity-90 transition shadow-lg shadow-orange-500/30"
                >
                  Explore Our Collection
                </Link>
                <Link
                  to="/contact"
                  className="px-5 py-3 rounded-full border border-orange-400/60 text-sm font-semibold text-orange-300 hover:bg-orange-500/10 transition"
                >
                  Talk to Our Team
                </Link>
              </div>
            </div>

            <div className="flex-1 hidden md:flex justify-end">
              <div className="relative w-full max-w-sm">
                <div className="absolute -inset-1 rounded-3xl bg-gradient-to-tr from-orange-500/40 via-pink-500/40 to-yellow-400/40 blur-2xl opacity-60" />
                <div className="relative bg-slate-900/80 border border-white/10 rounded-3xl p-6 space-y-4 shadow-[0_20px_60px_rgba(0,0,0,0.7)]">
                  <p className="text-xs uppercase tracking-[0.2em] text-gray-400">
                    PREMIUM CAR COLLECTION
                  </p>
                  <p className="text-lg font-semibold">
                    “Luxury driving experience awaits.”
                  </p>
                  <p className="text-sm text-gray-300">
                    Our showroom focuses on a balanced curation of performance,
                    comfort, and design – from executive sedans and versatile
                    SUVs to emotional supercars that leave a lasting impression.
                  </p>
                  <p className="text-xs text-gray-400">
                    Start by exploring our{" "}
                    <span className="text-orange-300 font-medium">
                      Premium Car Collection
                    </span>{" "}
                    and find the model that truly reflects your personality and
                    lifestyle.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="pt-16 md:pt-24 space-y-10">
            <div className="bg-slate-900/60 border border-white/5 rounded-3xl px-5 sm:px-8 py-8 flex flex-col md:flex-row items-center md:items-center justify-between gap-8">
              <div className="space-y-3 text-center md:text-left">
                <p className="text-xs sm:text-sm uppercase tracking-[0.25em] text-orange-400">
                  THE PEOPLE BEHIND 4WHEELER
                </p>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold">
                  Meet our co-founders
                </h2>
                <p className="text-sm sm:text-base text-gray-300 max-w-xl">
                  4Wheeler · PremiumDrive was built by enthusiasts who believe that a
                  modern showroom should be both highly visual and deeply informative.
                  Our co-founders combine a passion for automotive design with a focus on
                  creating a seamless digital experience.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                {/* Co-founder 1 */}
                <div className="flex flex-col items-center gap-2">
                  <div className="relative w-32 h-32 sm:w-40 sm:h-40 lg:w-56 lg:h-56 rounded-full bg-gradient-to-tr from-orange-500 to-yellow-400 p-[4px] shadow-[0_18px_60px_rgba(249,115,22,0.5)]">
                    <div className="w-full h-full rounded-full overflow-hidden bg-slate-900 flex items-center justify-center">
                      <img
                        src={cofounder1}
                        alt="Co-founder 1"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-semibold text-white">Co-founder</p>
                    <p className="text-xs text-gray-400 mt-1">Big Bear</p>
                  </div>
                </div>

                {/* Co-founder 2 */}
                <div className="flex flex-col items-center gap-2">
                  <div className="relative w-32 h-32 sm:w-40 sm:h-40 lg:w-56 lg:h-56 rounded-full bg-gradient-to-tr from-yellow-400 to-orange-500 p-[4px] shadow-[0_18px_60px_rgba(250,204,21,0.45)]">
                    <div className="w-full h-full rounded-full overflow-hidden bg-slate-900 flex items-center justify-center">
                      <img
                        src={cofounder2}
                        alt="Co-founder 2"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-semibold text-white">Co-founder</p>
                    <p className="text-xs text-gray-400 mt-1">Small Bear</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Our story & philosophy */}
            <div className="grid md:grid-cols-2 gap-10 items-start bg-slate-900/40 border border-white/5 rounded-3xl px-5 sm:px-8 pt-10 pb-10">
              <div className="space-y-4">
                <h2 className="text-2xl sm:text-3xl font-semibold">
                  Our story & philosophy
                </h2>
                <p className="text-sm sm:text-base text-gray-300">
                  4Wheeler · PremiumDrive started with a simple idea:{" "}
                  <span className="text-orange-300 font-medium">
                    make discovering luxury cars feel effortless, intuitive, and inspiring
                  </span>
                  . Instead of forcing visitors to jump between multiple showrooms, we
                  bring a curated selection into one consistent, beautifully designed
                  digital space.
                </p>
                <p className="text-sm sm:text-base text-gray-300">
                  Every car detail page is crafted to help you truly understand the model
                  you are looking at: seats, fuel type, engine, transmission, performance
                  highlights and more – presented clearly so you can compare and decide
                  with confidence.
                </p>
                <p className="text-sm sm:text-base text-gray-300">
                  Alongside the experience, our team is always ready to support you via
                  the{" "}
                  <Link
                    to="/contact"
                    className="text-orange-300 underline underline-offset-4"
                  >
                    Contact
                  </Link>{" "}
                  page – whether you want to schedule a visit, ask technical questions, or
                  get guidance on which model best fits your needs.
                </p>
              </div>

              <div className="space-y-5">
                <div className="bg-slate-900/80 border border-white/5 rounded-2xl p-5">
                  <h3 className="text-sm font-semibold text-orange-300 mb-2">
                    What you can do in our showroom
                  </h3>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li>• Browse a curated collection of premium cars.</li>
                    <li>
                      • View rich visuals, key specifications, and design highlights for
                      each model.
                    </li>
                    <li>
                      • Quickly compare body styles, segments, and performance profiles.
                    </li>
                    <li>
                      • Reach out to our team for tailored recommendations and next steps.
                    </li>
                  </ul>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="bg-slate-900/80 border border-white/5 rounded-xl p-4">
                    <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">
                      Experience-first
                    </p>
                    <p className="font-semibold text-white">
                      Immersive digital showroom
                    </p>
                    <p className="text-xs mt-1 text-gray-400">
                      The interface is built so you can feel the character of each car,
                      not just scan technical data.
                    </p>
                  </div>
                  <div className="bg-slate-900/80 border border-white/5 rounded-xl p-4">
                    <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">
                      Curated collection
                    </p>
                    <p className="font-semibold text-white">
                      Carefully selected models
                    </p>
                    <p className="text-xs mt-1 text-gray-400">
                      Instead of showing everything, we emphasize standout cars in each
                      segment, so you can focus on what truly matters.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>


          {/* Values / Highlights */}
          <section className="space-y-8">
            <h2 className="text-2xl sm:text-3xl font-semibold">
              What makes our showroom different
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-slate-900/80 border border-white/5 rounded-2xl p-5 space-y-3">
                <p className="text-sm font-semibold text-orange-300">
                  Premium Collection
                </p>
                <p className="text-sm text-gray-300">
                  From sedans and SUVs to coupes and supercars, our collection
                  is built to satisfy both first–time buyers and passionate
                  enthusiasts.
                </p>
              </div>
              <div className="bg-slate-900/80 border border-white/5 rounded-2xl p-5 space-y-3">
                <p className="text-sm font-semibold text-orange-300">
                  Detail-driven Experience
                </p>
                <p className="text-sm text-gray-300">
                  Every car has its own dedicated page with images,
                  specifications, and key highlights, so you can understand it
                  at a glance.
                </p>
              </div>
              <div className="bg-slate-900/80 border border-white/5 rounded-2xl p-5 space-y-3">
                <p className="text-sm font-semibold text-orange-300">
                  Human Support
                </p>
                <p className="text-sm text-gray-300">
                  Our team is available through the contact page to answer
                  questions, discuss options, and help you move from browsing to
                  decision with confidence.
                </p>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="border border-orange-500/40 rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-orange-500/10 via-slate-900/80 to-yellow-500/10">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-xl sm:text-2xl font-semibold mb-2">
                  Ready to explore our premium showroom?
                </h3>
                <p className="text-sm sm:text-base text-gray-200 max-w-xl">
                  Start with our curated car collection or connect with our
                  team to find the model that best matches your taste, daily
                  needs, and driving style.
                </p>
              </div>
              <div className="flex gap-3">
                <Link
                  to="/cars"
                  className="px-5 py-3 rounded-full bg-orange-500 text-sm font-semibold hover:bg-orange-400 transition shadow-lg shadow-orange-500/30"
                >
                  View Collection
                </Link>
                <Link
                  to="/contact"
                  className="px-5 py-3 rounded-full border border-orange-400/70 text-sm font-semibold text-orange-200 hover:bg-orange-500/10 transition"
                >
                  Contact Our Team
                </Link>
              </div>
            </div>
          </section>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default About;
