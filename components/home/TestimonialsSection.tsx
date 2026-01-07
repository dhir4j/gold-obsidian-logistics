import { TESTIMONIALS } from "@/lib/config";
import { Star } from "lucide-react";

export default function TestimonialsSection() {
  return (
    <section className="py-24 bg-brand-gray">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-brand-gold font-sans text-xs tracking-[0.2em] uppercase">
            Client Feedback
          </span>
          <h2 className="text-4xl md:text-5xl font-serif mt-4">
            What Our Clients Say
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((testimonial, index) => (
            <div
              key={index}
              className="bg-brand-dark p-8 border border-white/10 hover:border-brand-gold/30 transition-all duration-300"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="text-brand-gold fill-brand-gold"
                    size={16}
                  />
                ))}
              </div>
              <p className="text-gray-300 font-sans font-light italic text-sm leading-relaxed mb-6">
                "{testimonial.content}"
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-brand-gold/20 flex items-center justify-center">
                  <span className="text-brand-gold font-serif font-bold text-xl">
                    {testimonial.name.split(" ").map((n) => n[0]).join("")}
                  </span>
                </div>
                <div>
                  <p className="text-white font-sans font-semibold text-sm">
                    {testimonial.name}
                  </p>
                  <p className="text-gray-500 font-sans text-xs">
                    {testimonial.role}, {testimonial.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
