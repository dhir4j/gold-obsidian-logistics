import { BRAND, COMPANY_INFO } from "@/lib/config";
import { Target, Eye, Award, Users } from "lucide-react";

export const metadata = {
  title: `About Us - ${BRAND.name}`,
  description: "Learn about Waynex Logistics - your trusted partner for global shipping and logistics solutions since 2015.",
};

export default function AboutPage() {
  return (
    <main className="pt-20">
      {/* Hero Section */}
      <section className="relative py-32 bg-brand-dark overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-br from-brand-gold/20 to-transparent"></div>
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="max-w-3xl">
            <span className="text-brand-gold font-sans text-xs tracking-[0.2em] uppercase">
              About Waynex Logistics
            </span>
            <h1 className="text-5xl md:text-7xl font-serif font-light text-white mt-4 mb-6">
              Delivering Excellence,{" "}
              <span className="italic text-brand-gold">Every Mile</span>
            </h1>
            <p className="text-gray-300 font-sans font-light text-lg leading-relaxed">
              We revolutionize the logistics industry with
              innovative solutions, unwavering reliability, and a commitment to
              customer success.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 bg-brand-gray">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div data-reveal="left">
            <h2 className="text-4xl md:text-6xl font-serif mb-6 leading-none">
              Who We <br />
              <span className="text-stroke text-6xl md:text-8xl">Are</span>
            </h2>
            <div className="w-20 h-1 bg-brand-gold mb-8"></div>

            <div className="space-y-6 text-gray-400 font-sans font-light leading-relaxed">
              <p>
                Waynex Logistics is a global shipping and logistics provider dedicated to
                making worldwide shipping accessible, reliable, and transparent for
                businesses of all sizes.
              </p>
              <p>
                We operate a comprehensive logistics network spanning over 50 countries,
                driven by innovation, customer-first thinking, and an unwavering
                commitment to excellence.
              </p>
              <p>
                We handle thousands of shipments, maintaining a
                99.2% on-time delivery rate while continuously investing in
                technology and sustainability initiatives to serve you better.
              </p>
            </div>
          </div>

          <div className="relative" data-reveal="right">
            <div className="absolute -top-4 -left-4 w-full h-full border border-brand-gold/30 z-0"></div>

            <div className="img-container showcase-frame relative z-10 h-[500px]">
              <img
                src="https://images.unsplash.com/photo-1553413077-190dd305871c?q=80&w=800&auto=format&fit=crop"
                alt="Waynex Logistics warehouse operations"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 bg-brand-dark">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="glass-panel p-10">
              <Target className="text-brand-gold mb-6" size={48} />
              <h3 className="text-3xl font-serif text-white mb-4">
                Our Mission
              </h3>
              <p className="text-gray-400 font-sans font-light leading-relaxed">
                To connect businesses and individuals across the globe through
                innovative, reliable, and sustainable logistics solutions. We
                strive to be more than just a shipping company—we're your
                strategic partner in growth.
              </p>
            </div>

            <div className="glass-panel p-10">
              <Eye className="text-brand-gold mb-6" size={48} />
              <h3 className="text-3xl font-serif text-white mb-4">
                Our Vision
              </h3>
              <p className="text-gray-400 font-sans font-light leading-relaxed">
                To be the world's most trusted and technologically advanced
                logistics provider, setting new standards for speed, security,
                and sustainability while making global commerce seamless for
                everyone.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-brand-gray">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-brand-gold font-sans text-xs tracking-[0.2em] uppercase">
              What Drives Us
            </span>
            <h2 className="text-4xl md:text-5xl font-serif mt-4">
              Our Core Values
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-brand-dark p-8 border border-white/10">
              <Award className="text-brand-gold mb-4" size={40} />
              <h3 className="text-2xl font-serif text-white mb-4">
                Excellence
              </h3>
              <p className="text-gray-400 font-sans font-light text-sm leading-relaxed">
                We don't settle for good enough. Every shipment is handled with
                the same meticulous care, whether it's a single package or a
                full freight container.
              </p>
            </div>

            <div className="bg-brand-dark p-8 border border-white/10">
              <Users className="text-brand-gold mb-4" size={40} />
              <h3 className="text-2xl font-serif text-white mb-4">
                Customer First
              </h3>
              <p className="text-gray-400 font-sans font-light text-sm leading-relaxed">
                Your success is our success. We listen, adapt, and go the extra
                mile to ensure your logistics needs are not just met, but
                exceeded.
              </p>
            </div>

            <div className="bg-brand-dark p-8 border border-white/10">
              <Target className="text-brand-gold mb-4" size={40} />
              <h3 className="text-2xl font-serif text-white mb-4">
                Innovation
              </h3>
              <p className="text-gray-400 font-sans font-light text-sm leading-relaxed">
                We continuously invest in technology and processes to deliver
                smarter, faster, and more sustainable logistics solutions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Key Stats */}
      <section className="py-24 bg-brand-dark">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-brand-gold font-sans text-xs tracking-[0.2em] uppercase">
              Our Impact
            </span>
            <h2 className="text-4xl md:text-5xl font-serif mt-4">
              By The Numbers
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-5xl font-serif text-brand-gold mb-4">
                50+
              </div>
              <h4 className="text-white font-sans font-semibold mb-2">
                Countries
              </h4>
              <p className="text-gray-400 text-sm font-sans font-light">
                Global network coverage
              </p>
            </div>

            <div className="text-center">
              <div className="text-5xl font-serif text-brand-gold mb-4">
                24/7
              </div>
              <h4 className="text-white font-sans font-semibold mb-2">
                Support
              </h4>
              <p className="text-gray-400 text-sm font-sans font-light">
                Always available for you
              </p>
            </div>

            <div className="text-center">
              <div className="text-5xl font-serif text-brand-gold mb-4">
                99%
              </div>
              <h4 className="text-white font-sans font-semibold mb-2">
                On-Time Rate
              </h4>
              <p className="text-gray-400 text-sm font-sans font-light">
                Reliability you can trust
              </p>
            </div>

            <div className="text-center">
              <div className="text-5xl font-serif text-brand-gold mb-4">
                5K+
              </div>
              <h4 className="text-white font-sans font-semibold mb-2">
                Happy Clients
              </h4>
              <p className="text-gray-400 text-sm font-sans font-light">
                Businesses we serve
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
