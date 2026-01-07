import { WHY_CHOOSE_US } from "@/lib/config";
import { Shield, Clock, Leaf, MapPin, Lock, Network } from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ className?: string; size?: number }>> = {
  Shield,
  Clock,
  Leaf,
  MapPin,
  Lock,
  Network,
};

export default function WhyChooseSection() {
  return (
    <section className="py-24 bg-brand-dark relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-brand-gold font-sans text-xs tracking-[0.2em] uppercase">
            Our Advantages
          </span>
          <h2 className="text-4xl md:text-5xl font-serif mt-4">
            Why Choose Waynex
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {WHY_CHOOSE_US.map((item, index) => {
            const IconComponent = iconMap[item.icon] || Shield;
            return (
              <div
                key={index}
                className="glass-panel p-8 hover:border-brand-gold/30 transition-all duration-300"
              >
                <IconComponent className="text-brand-gold mb-4" size={36} />
                <h3 className="text-xl font-serif text-white mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-400 font-sans font-light text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
