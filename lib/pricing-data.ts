export interface PricingRate {
  weight_slab: string;
  price_per_kg: string;
}

export interface CountryPricing {
  country: string;
  slug: string;
  rates: PricingRate[];
  image_url: string;
  description: string;
  delivery_time: string;
  features: string[];
}

export const COUNTRY_PRICING: CountryPricing[] = [
  {
    country: "Hong Kong",
    slug: "hongkong",
    rates: [
      { weight_slab: "For 6.0 kg & Above", price_per_kg: "500.0/Kg" },
      { weight_slab: "For 11.0 kg & Above", price_per_kg: "400.0/Kg" },
      { weight_slab: "For 21.0 kg & Above", price_per_kg: "400.0/Kg" },
    ],
    image_url: "https://atlanticcourier.net/static/images/send-courier-to-hongkong.webp",
    description: "Fast and reliable courier services to Hong Kong with competitive rates and express delivery options.",
    delivery_time: "3-5 Business Days",
    features: ["Door-to-Door Delivery", "Real-time Tracking", "Customs Clearance Included", "Insurance Available"],
  },
  {
    country: "Ireland",
    slug: "ireland",
    rates: [
      { weight_slab: "For 6.0 kg & Above", price_per_kg: "550.0/Kg" },
      { weight_slab: "For 11.0 kg & Above", price_per_kg: "600.0/Kg" },
      { weight_slab: "For 21.0 kg & Above", price_per_kg: "600.0/Kg" },
    ],
    image_url: "https://atlanticcourier.net/static/images/send-courier-to-ireland.webp",
    description: "Efficient shipping solutions to Ireland with full tracking and secure handling for all your parcels.",
    delivery_time: "4-6 Business Days",
    features: ["Express Options Available", "Secure Packaging", "Real-time Updates", "Affordable Rates"],
  },
  {
    country: "Germany",
    slug: "germany",
    rates: [
      { weight_slab: "For 6.0 kg & Above", price_per_kg: "650.0/Kg" },
      { weight_slab: "For 11.0 kg & Above", price_per_kg: "565.0/Kg" },
      { weight_slab: "For 21.0 kg & Above", price_per_kg: "500.0/Kg" },
    ],
    image_url: "https://atlanticcourier.net/static/images/send-courier-to-germany.webp",
    description: "Premium courier services to Germany with guaranteed delivery times and comprehensive tracking.",
    delivery_time: "3-5 Business Days",
    features: ["Priority Handling", "Full Insurance", "Customs Support", "Volume Discounts"],
  },
  {
    country: "United Kingdom",
    slug: "uk",
    rates: [
      { weight_slab: "For 6.0 kg & Above", price_per_kg: "550.0/Kg" },
      { weight_slab: "For 11.0 kg & Above", price_per_kg: "500.0/Kg" },
      { weight_slab: "For 21.0 kg & Above", price_per_kg: "450.0/Kg" },
    ],
    image_url: "https://atlanticcourier.net/static/images/send-courier-to-uk.webp",
    description: "Trusted shipping partner for UK deliveries with competitive pricing and exceptional service.",
    delivery_time: "3-4 Business Days",
    features: ["Next-Day Available", "Track & Trace", "Secure Delivery", "Best UK Rates"],
  },
  {
    country: "United States",
    slug: "usa",
    rates: [
      { weight_slab: "For 6.0 kg & Above", price_per_kg: "900.0/Kg" },
      { weight_slab: "For 11.0 kg & Above", price_per_kg: "750.0/Kg" },
      { weight_slab: "For 21.0 kg & Above", price_per_kg: "700.0/Kg" },
    ],
    image_url: "https://atlanticcourier.net/static/images/send-courier-to-usa.webp",
    description: "Comprehensive USA shipping services covering all 50 states with fast delivery and full tracking.",
    delivery_time: "4-6 Business Days",
    features: ["Coast-to-Coast Coverage", "Express Delivery", "Free Tracking", "Customs Assistance"],
  },
  {
    country: "Dubai (UAE)",
    slug: "dubai",
    rates: [
      { weight_slab: "For 6.0 kg & Above", price_per_kg: "425.0/Kg" },
      { weight_slab: "For 11.0 kg & Above", price_per_kg: "350.0/Kg" },
      { weight_slab: "For 21.0 kg & Above", price_per_kg: "325.0/Kg" },
    ],
    image_url: "https://atlanticcourier.net/static/images/send-courier-to-dubai.webp",
    description: "Fastest courier service to Dubai with same-week delivery options and competitive rates.",
    delivery_time: "2-3 Business Days",
    features: ["Express Service", "Same-Week Delivery", "Free Pickup", "24/7 Support"],
  },
  {
    country: "Singapore",
    slug: "singapore",
    rates: [
      { weight_slab: "For 6.0 kg & Above", price_per_kg: "500.0/Kg" },
      { weight_slab: "For 11.0 kg & Above", price_per_kg: "400.0/Kg" },
      { weight_slab: "For 21.0 kg & Above", price_per_kg: "400.0/Kg" },
    ],
    image_url: "https://atlanticcourier.net/static/images/send-courier-to-singapore.webp",
    description: "Reliable courier services to Singapore with quick transit times and competitive pricing.",
    delivery_time: "3-4 Business Days",
    features: ["Fast Delivery", "Secure Handling", "Live Tracking", "Affordable Rates"],
  },
  {
    country: "Malaysia",
    slug: "malaysia",
    rates: [
      { weight_slab: "For 6.0 kg & Above", price_per_kg: "550.0/Kg" },
      { weight_slab: "For 11.0 kg & Above", price_per_kg: "400.0/Kg" },
      { weight_slab: "For 21.0 kg & Above", price_per_kg: "375.0/Kg" },
    ],
    image_url: "https://atlanticcourier.net/static/images/send-courier-to-malaysia.webp",
    description: "Efficient shipping solutions to Malaysia with door-to-door service and real-time tracking.",
    delivery_time: "3-5 Business Days",
    features: ["Door-to-Door", "Track Online", "Volume Discounts", "Safe Delivery"],
  },
  {
    country: "Canada",
    slug: "canada",
    rates: [
      { weight_slab: "For 6.0 kg & Above", price_per_kg: "650.0/Kg" },
      { weight_slab: "For 11.0 kg & Above", price_per_kg: "575.0/Kg" },
      { weight_slab: "For 21.0 kg & Above", price_per_kg: "500.0/Kg" },
    ],
    image_url: "https://atlanticcourier.net/static/images/send-courier-to-canada.webp",
    description: "Complete Canada shipping coverage with express options and transparent pricing for all provinces.",
    delivery_time: "4-6 Business Days",
    features: ["All Provinces Covered", "Express Available", "Customs Support", "Bulk Rates"],
  },
  {
    country: "France",
    slug: "france",
    rates: [
      { weight_slab: "For 6.0 kg & Above", price_per_kg: "650.0/Kg" },
      { weight_slab: "For 11.0 kg & Above", price_per_kg: "575.0/Kg" },
      { weight_slab: "For 21.0 kg & Above", price_per_kg: "500.0/Kg" },
    ],
    image_url: "https://atlanticcourier.net/static/images/send-courier-to-france.webp",
    description: "Professional courier services to France with reliable delivery and competitive rates for all shipments.",
    delivery_time: "3-5 Business Days",
    features: ["Major Cities Covered", "Reliable Service", "Online Tracking", "Competitive Pricing"],
  },
  {
    country: "Australia",
    slug: "australia",
    rates: [
      { weight_slab: "For 6.0 kg & Above", price_per_kg: "900.0/Kg" },
      { weight_slab: "For 11.0 kg & Above", price_per_kg: "770.0/Kg" },
      { weight_slab: "For 21.0 kg & Above", price_per_kg: "725.0/Kg" },
    ],
    image_url: "https://atlanticcourier.net/static/images/send-courier-to-australia.webp",
    description: "Comprehensive Australia shipping services with coverage across all major cities and regional areas.",
    delivery_time: "5-7 Business Days",
    features: ["Nationwide Coverage", "Express Options", "Insurance Included", "Transparent Pricing"],
  },
];

// Helper function to get country by slug
export function getCountryBySlug(slug: string): CountryPricing | undefined {
  return COUNTRY_PRICING.find((country) => country.slug === slug);
}

// Helper function to get all country slugs for routing
export function getAllCountrySlugs(): string[] {
  return COUNTRY_PRICING.map((country) => country.slug);
}
