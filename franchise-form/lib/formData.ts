export interface FormData {
  // Basic
  businessName: string;
  ownerName: string;
  email: string;
  phone: string;
  city: string;
  state: string;
  yearsInBusiness: string;
  // Business
  businessType: string;
  productCategories: string[];
  customerSegments: string[];
  monthlyTurnover: string;
  showroomSize: string;
  showroomCount: number;
  // Operations
  hasManufacturing: boolean;
  manufacturingCapacity: string;
  productionScalability: string;
  qualityControl: boolean;
  usesERP: boolean;
  erpSoftware: string;
  teamSize: string;
  // Market
  deliveryRadius: string;
  dealerNetwork: string;
  onlinePresence: string[];
  socialFollowing: string;
  warrantyPolicy: string;
  // Franchise
  franchiseExperience: boolean;
  trainingCapability: boolean;
  investmentRange: string;
  expansionCities: string[];
  brandConsistency: number;
}

export const INITIAL_FORM: FormData = {
  businessName: '', ownerName: '', email: '', phone: '',
  city: '', state: '', yearsInBusiness: '',
  businessType: '', productCategories: [], customerSegments: [],
  monthlyTurnover: '', showroomSize: '', showroomCount: 1,
  hasManufacturing: false, manufacturingCapacity: '',
  productionScalability: '', qualityControl: false,
  usesERP: false, erpSoftware: '',
  teamSize: '', deliveryRadius: '', dealerNetwork: '',
  onlinePresence: [], socialFollowing: '',
  warrantyPolicy: '', franchiseExperience: false,
  trainingCapability: false, investmentRange: '',
  expansionCities: [], brandConsistency: 5,
};

export const STATES = [
  'Andhra Pradesh','Arunachal Pradesh','Assam','Bihar','Chhattisgarh',
  'Delhi','Goa','Gujarat','Haryana','Himachal Pradesh','Jharkhand',
  'Karnataka','Kerala','Madhya Pradesh','Maharashtra','Manipur',
  'Meghalaya','Mizoram','Nagaland','Odisha','Punjab','Rajasthan',
  'Sikkim','Tamil Nadu','Telangana','Tripura','Uttar Pradesh',
  'Uttarakhand','West Bengal',
];

export const YEARS_OPTIONS = ['0–2 years','3–5 years','6–10 years','10+ years'];
export const BUSINESS_TYPES = ['Manufacturer','Retailer','Manufacturer & Retailer'];
export const PRODUCT_CATS = ['Sofas & Seating','Bedroom Furniture','Dining Sets','Office Furniture','Outdoor & Garden','Modular Furniture','Luxury & Designer','Custom & Bespoke'];
export const CUSTOMER_SEGS = ['Budget','Mid-Range','Premium','Luxury','Commercial / B2B'];
export const TURNOVER_OPTS = ['Below ₹10 Lakhs','₹10–25 Lakhs','₹25–50 Lakhs','₹50 Lakhs–1 Crore','₹1–5 Crore','₹5 Crore+'];
export const SHOWROOM_SIZES = ['Below 1,000 sq ft','1,000–2,500 sq ft','2,500–5,000 sq ft','5,000–10,000 sq ft','10,000+ sq ft'];
export const MFG_CAPACITY = ['Small (< 50 pieces/month)','Medium (50–200/month)','Large (200–500/month)','Industrial (500+/month)'];
export const SCALABILITY = ['Limited – near maximum capacity','Moderate – can scale 25–50%','High – can double production','Unlimited – fully flexible'];
export const TEAM_SIZES = ['1–5 employees','6–15 employees','16–50 employees','51–100 employees','100+ employees'];
export const DELIVERY_OPTS = ['Local (within city)','Regional (within state)','National (pan-India)','International'];
export const DEALER_OPTS = ['No dealer network','1–5 dealers','6–15 dealers','16–30 dealers','30+ dealers'];
export const ONLINE_OPTS = ['Website','Instagram','Facebook','YouTube','Google Business','E-Commerce Platform'];
export const SOCIAL_OPTS = ['Below 1,000','1,000–5,000','5,000–25,000','25,000–100,000','100,000+'];
export const WARRANTY_OPTS = ['No warranty','1 Year','2 Years','3 Years','5 Years','Lifetime'];
export const INVESTMENT_OPTS = ['₹10–25 Lakhs','₹25–50 Lakhs','₹50 Lakhs–1 Crore','₹1–2 Crore','₹2 Crore+'];
export const ERP_OPTS = ['Tally','SAP','Zoho','Busy','QuickBooks','Custom-built','Other'];
export const CITIES = [
  'Mumbai','Delhi NCR','Bangalore','Chennai','Hyderabad','Pune',
  'Ahmedabad','Kolkata','Jaipur','Lucknow','Chandigarh','Indore',
  'Surat','Kochi','Coimbatore','Nagpur','Bhopal','Vadodara',
  'Visakhapatnam','Patna',
];

export function calcScore(f: FormData): number {
  let s = 0;
  const yib: Record<string,number> = {'0–2 years':5,'3–5 years':10,'6–10 years':13,'10+ years':15};
  s += yib[f.yearsInBusiness] || 0;
  const to: Record<string,number> = {'Below ₹10 Lakhs':3,'₹10–25 Lakhs':8,'₹25–50 Lakhs':12,'₹50 Lakhs–1 Crore':16,'₹1–5 Crore':18,'₹5 Crore+':20};
  s += to[f.monthlyTurnover] || 0;
  if (f.hasManufacturing) {
    s += 5;
    if (f.qualityControl) s += 5;
    const ms: Record<string,number> = {'Limited – near maximum capacity':1,'Moderate – can scale 25–50%':3,'High – can double production':4,'Unlimited – fully flexible':5};
    s += ms[f.productionScalability] || 0;
  }
  const ts: Record<string,number> = {'1–5 employees':2,'6–15 employees':4,'16–50 employees':6,'51–100 employees':8,'100+ employees':10};
  s += ts[f.teamSize] || 0;
  s += Math.min(f.onlinePresence.length * 2, 10);
  const dn: Record<string,number> = {'No dealer network':0,'1–5 dealers':3,'6–15 dealers':5,'16–30 dealers':8,'30+ dealers':10};
  s += dn[f.dealerNetwork] || 0;
  s += f.brandConsistency;
  if (f.trainingCapability) s += 5;
  const wr: Record<string,number> = {'No warranty':0,'1 Year':2,'2 Years':3,'3 Years':4,'5 Years':5,'Lifetime':5};
  s += wr[f.warrantyPolicy] || 0;
  return Math.min(s, 100);
}

export function getRecommendation(score: number): { label: string; subtitle: string; color: string; bg: string; emoji: string } {
  if (score >= 70) return { label: 'Franchise Ready', subtitle: 'Your business shows strong franchise potential. Our team will fast-track your profile for onboarding.', color: '#15803d', bg: '#f0fdf4', emoji: '🎉' };
  if (score >= 45) return { label: 'Needs Improvement', subtitle: 'You have a solid base, but a few areas need strengthening before franchise expansion.', color: '#92400e', bg: '#fffbeb', emoji: '📈' };
  return { label: 'Not Suitable Yet', subtitle: 'Focus on building a stronger business foundation before exploring franchise opportunities.', color: '#991b1b', bg: '#fef2f2', emoji: '🔧' };
}
