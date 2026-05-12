import { useState, useEffect } from 'react';
import Head from 'next/head';
import { QRCodeSVG } from 'qrcode.react';
import { FormData, INITIAL_FORM, STATES, YEARS_OPTIONS, BUSINESS_TYPES, PRODUCT_CATS, CUSTOMER_SEGS, TURNOVER_OPTS, SHOWROOM_SIZES, MFG_CAPACITY, SCALABILITY, TEAM_SIZES, DELIVERY_OPTS, DEALER_OPTS, ONLINE_OPTS, SOCIAL_OPTS, WARRANTY_OPTS, INVESTMENT_OPTS, ERP_OPTS, CITIES, calcScore, getRecommendation } from '../lib/formData';
import { Card, SectionHeader, Label, Input, Select, ChipGrid, Toggle, NavButtons, FileDropZone } from '../components/UI';

const SECTIONS = [
  { id: 'intro', title: 'Welcome' },
  { id: 'basic', title: 'Basic Info' },
  { id: 'business', title: 'Business Profile' },
  { id: 'operations', title: 'Operations' },
  { id: 'market', title: 'Market Presence' },
  { id: 'franchise', title: 'Franchise Readiness' },
  { id: 'documents', title: 'Documents' },
  { id: 'result', title: 'Result' },
];

export default function Home() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormData>(INITIAL_FORM);
  const [uploads, setUploads] = useState({ showroom: false, catalogue: false, logo: false, mfg: false });
  const [score, setScore] = useState(0);
  const [pageUrl, setPageUrl] = useState('');
  const [scoreAnim, setScoreAnim] = useState(0);

  useEffect(() => { setPageUrl(window.location.href); }, []);

  const upd = <K extends keyof FormData>(k: K, v: FormData[K]) => setForm(p => ({ ...p, [k]: v }));

  const toggle = (field: keyof FormData, val: string) => {
    const arr = form[field] as string[];
    upd(field, (arr.includes(val) ? arr.filter(x => x !== val) : [...arr, val]) as FormData[typeof field]);
  };

  const toggleLimit = (val: string, limit = 5) => {
    const arr = form.expansionCities;
    if (arr.includes(val)) upd('expansionCities', arr.filter(x => x !== val));
    else if (arr.length < limit) upd('expansionCities', [...arr, val]);
  };

  const go = (n: number) => { setStep(n); window.scrollTo(0, 0); };

  const submit = () => {
    const s = calcScore(form);
    setScore(s);
    go(7);
    let c = 0;
    const iv = setInterval(() => {
      c += Math.ceil(s / 50);
      if (c >= s) { c = s; clearInterval(iv); }
      setScoreAnim(c);
    }, 30);
  };

  const progress = step > 0 && step < 7 ? Math.round((step / 6) * 100) : 0;
  const rec = getRecommendation(score);

  return (
    <>
      <Head>
        <title>Furniture Franchise Evaluation Form</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Premium franchise evaluation for furniture business owners" />
      </Head>

      {/* Sticky header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-stone-200">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-sm font-semibold flex-shrink-0" style={{ background: '#b47a2e' }}>
            FK
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-stone-800 truncate">Franchise Evaluation</p>
            {step > 0 && step < 7 && (
              <div className="mt-1 flex items-center gap-2">
                <div className="flex-1 h-1.5 bg-stone-100 rounded-full overflow-hidden">
                  <div className="h-full rounded-full progress-bar-fill" style={{ width: `${progress}%`, background: '#b47a2e' }} />
                </div>
                <span className="text-xs font-medium" style={{ color: '#b47a2e' }}>{progress}%</span>
              </div>
            )}
          </div>
          {step > 0 && step < 7 && (
            <span className="text-xs text-stone-400 flex-shrink-0">{SECTIONS[step]?.title}</span>
          )}
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-6 pb-28">

        {/* ── STEP 0: Intro ── */}
        {step === 0 && (
          <div className="fade-in-up">
            <Card className="text-center py-8 px-6 mb-4">
              <div className="w-16 h-16 rounded-2xl mx-auto mb-5 flex items-center justify-center text-white text-2xl font-bold" style={{ background: '#b47a2e' }}>
                FK
              </div>
              <h1 className="text-2xl font-semibold text-stone-800 mb-3">Furniture Franchise Evaluation</h1>
              <p className="text-sm text-stone-500 leading-relaxed max-w-md mx-auto mb-6">
                Thank you for showing interest in franchise expansion. This evaluation helps us understand your business strength, scalability, operational systems, and long-term franchise potential. The form will take approximately <strong>5–7 minutes</strong>.
              </p>
              <div className="flex justify-center gap-6 text-xs text-stone-400 mb-8">
                <span>✅ Click-based answers</span>
                <span>🔒 Confidential</span>
                <span>⚡ 5–7 minutes</span>
              </div>
              <button
                onClick={() => go(1)}
                className="px-8 py-3 text-white rounded-xl font-medium text-sm transition-all hover:opacity-90 shadow-md"
                style={{ background: '#b47a2e' }}
              >
                Begin Evaluation →
              </button>
            </Card>

            {/* QR Code */}
            {pageUrl && (
              <Card className="flex flex-col items-center gap-3 py-6">
                <p className="text-xs text-stone-400 font-medium uppercase tracking-wider">Share this form via QR</p>
                <div className="p-3 bg-white rounded-xl border border-stone-100 shadow-sm">
                  <QRCodeSVG value={pageUrl} size={140} fgColor="#b47a2e" bgColor="#ffffff" level="M" />
                </div>
                <p className="text-xs text-stone-400 break-all max-w-xs text-center">{pageUrl}</p>
              </Card>
            )}

            <div className="text-center mt-4">
              <button onClick={() => go(8 as any)} className="text-xs text-stone-400 hover:text-stone-600 transition-colors">
                🔐 Admin Login
              </button>
            </div>
          </div>
        )}

        {/* ── STEP 1: Basic Info ── */}
        {step === 1 && (
          <div className="fade-in-up space-y-4">
            <Card>
              <SectionHeader icon="👤" title="Basic Information" sub="Tell us about your business and how to reach you" />
              <div className="space-y-4">
                <div><Label>Business Name</Label><Input value={form.businessName} onChange={v => upd('businessName', v)} placeholder="Enter your business name" /></div>
                <div><Label>Owner / Director Name</Label><Input value={form.ownerName} onChange={v => upd('ownerName', v)} placeholder="Full name" /></div>
                <div className="grid grid-cols-2 gap-3">
                  <div><Label>Email Address</Label><Input type="email" value={form.email} onChange={v => upd('email', v)} placeholder="name@company.com" /></div>
                  <div><Label>Phone Number</Label><Input type="tel" value={form.phone} onChange={v => upd('phone', v)} placeholder="+91 98765 43210" /></div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div><Label>City</Label><Input value={form.city} onChange={v => upd('city', v)} placeholder="Enter city" /></div>
                  <div><Label>State</Label><Select value={form.state} onChange={v => upd('state', v)} options={STATES} placeholder="Select state" /></div>
                </div>
                <div>
                  <Label>Years in Business</Label>
                  <ChipGrid options={YEARS_OPTIONS} selected={form.yearsInBusiness} onToggle={v => upd('yearsInBusiness', v)} single cols={4} />
                </div>
              </div>
            </Card>
            <NavButtons onBack={() => go(0)} onNext={() => go(2)} />
          </div>
        )}

        {/* ── STEP 2: Business Profile ── */}
        {step === 2 && (
          <div className="fade-in-up space-y-4">
            <Card>
              <SectionHeader icon="🏪" title="Business Profile" sub="Your business model, products, and scale" />
              <div className="space-y-5">
                <div>
                  <Label>Business Type</Label>
                  <ChipGrid options={BUSINESS_TYPES} selected={form.businessType} onToggle={v => upd('businessType', v)} single cols={3} />
                </div>
                <div>
                  <Label hint="(select all that apply)">Product Categories</Label>
                  <ChipGrid options={PRODUCT_CATS} selected={form.productCategories} onToggle={v => toggle('productCategories', v)} cols={4} />
                </div>
                <div>
                  <Label>Target Customer Segments</Label>
                  <ChipGrid options={CUSTOMER_SEGS} selected={form.customerSegments} onToggle={v => toggle('customerSegments', v)} cols={3} />
                </div>
                <div>
                  <Label>Monthly Turnover</Label>
                  <ChipGrid options={TURNOVER_OPTS} selected={form.monthlyTurnover} onToggle={v => upd('monthlyTurnover', v)} single cols={3} />
                </div>
                <div>
                  <Label>Showroom Size</Label>
                  <ChipGrid options={SHOWROOM_SIZES} selected={form.showroomSize} onToggle={v => upd('showroomSize', v)} single cols={3} />
                </div>
                <div>
                  <Label>Number of Showrooms: <span style={{ color: '#b47a2e', fontWeight: 600 }}>{form.showroomCount}</span></Label>
                  <input type="range" min={1} max={20} step={1} value={form.showroomCount}
                    onChange={e => upd('showroomCount', Number(e.target.value))}
                    className="w-full mt-2" />
                </div>
              </div>
            </Card>
            <NavButtons onBack={() => go(1)} onNext={() => go(3)} />
          </div>
        )}

        {/* ── STEP 3: Operations ── */}
        {step === 3 && (
          <div className="fade-in-up space-y-4">
            <Card>
              <SectionHeader icon="🏭" title="Operations & Manufacturing" sub="Production capabilities and team structure" />
              <Toggle
                label="Own Manufacturing Unit"
                sub="Do you manufacture furniture in-house?"
                enabled={form.hasManufacturing}
                onChange={v => upd('hasManufacturing', v)}
              />
              {form.hasManufacturing && (
                <div className="mt-4 pt-4 border-t border-stone-100 space-y-4 fade-in-up">
                  <div>
                    <Label>Manufacturing Capacity</Label>
                    <ChipGrid options={MFG_CAPACITY} selected={form.manufacturingCapacity} onToggle={v => upd('manufacturingCapacity', v)} single cols={2} />
                  </div>
                  <div>
                    <Label>Production Scalability</Label>
                    <ChipGrid options={SCALABILITY} selected={form.productionScalability} onToggle={v => upd('productionScalability', v)} single cols={2} />
                  </div>
                  <Toggle
                    label="Quality Control System"
                    sub="Documented QC processes in place?"
                    enabled={form.qualityControl}
                    onChange={v => upd('qualityControl', v)}
                  />
                </div>
              )}
              <Toggle
                label="ERP / Business Software"
                sub="Do you use any business management software?"
                enabled={form.usesERP}
                onChange={v => upd('usesERP', v)}
              />
              {form.usesERP && (
                <div className="mt-3 fade-in-up">
                  <Label>Software Used</Label>
                  <ChipGrid options={ERP_OPTS} selected={form.erpSoftware} onToggle={v => upd('erpSoftware', v)} single cols={3} />
                </div>
              )}
              <div className="mt-4">
                <Label>Team Size</Label>
                <ChipGrid options={TEAM_SIZES} selected={form.teamSize} onToggle={v => upd('teamSize', v)} single cols={3} />
              </div>
            </Card>
            <NavButtons onBack={() => go(2)} onNext={() => go(4)} />
          </div>
        )}

        {/* ── STEP 4: Market Presence ── */}
        {step === 4 && (
          <div className="fade-in-up space-y-4">
            <Card>
              <SectionHeader icon="🌐" title="Market Presence" sub="Your reach, network, and digital footprint" />
              <div className="space-y-5">
                <div>
                  <Label>Delivery Radius</Label>
                  <ChipGrid options={DELIVERY_OPTS} selected={form.deliveryRadius} onToggle={v => upd('deliveryRadius', v)} single cols={2} />
                </div>
                <div>
                  <Label>Existing Dealer Network</Label>
                  <ChipGrid options={DEALER_OPTS} selected={form.dealerNetwork} onToggle={v => upd('dealerNetwork', v)} single cols={3} />
                </div>
                <div>
                  <Label hint="(select all that apply)">Online Presence</Label>
                  <ChipGrid options={ONLINE_OPTS} selected={form.onlinePresence} onToggle={v => toggle('onlinePresence', v)} cols={3} />
                </div>
                <div>
                  <Label>Combined Social Media Following</Label>
                  <ChipGrid options={SOCIAL_OPTS} selected={form.socialFollowing} onToggle={v => upd('socialFollowing', v)} single cols={3} />
                </div>
                <div>
                  <Label>Warranty Policy</Label>
                  <ChipGrid options={WARRANTY_OPTS} selected={form.warrantyPolicy} onToggle={v => upd('warrantyPolicy', v)} single cols={3} />
                </div>
              </div>
            </Card>
            <NavButtons onBack={() => go(3)} onNext={() => go(5)} />
          </div>
        )}

        {/* ── STEP 5: Franchise Readiness ── */}
        {step === 5 && (
          <div className="fade-in-up space-y-4">
            <Card>
              <SectionHeader icon="🏆" title="Franchise Readiness" sub="Expansion plans and operational capabilities" />
              <Toggle label="Prior Franchise Experience" sub="Have you franchised a business before?" enabled={form.franchiseExperience} onChange={v => upd('franchiseExperience', v)} />
              <Toggle label="Training Capability" sub="Can you train franchisees on operations & brand standards?" enabled={form.trainingCapability} onChange={v => upd('trainingCapability', v)} />
              <div className="mt-4 space-y-5">
                <div>
                  <Label>Expected Franchise Investment Range</Label>
                  <ChipGrid options={INVESTMENT_OPTS} selected={form.investmentRange} onToggle={v => upd('investmentRange', v)} single cols={3} />
                </div>
                <div>
                  <Label hint="(up to 5 cities)">Target Expansion Cities</Label>
                  <div className="flex flex-wrap gap-2">
                    {CITIES.map(c => (
                      <button
                        key={c}
                        type="button"
                        onClick={() => toggleLimit(c)}
                        disabled={!form.expansionCities.includes(c) && form.expansionCities.length >= 5}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all border ${
                          form.expansionCities.includes(c)
                            ? 'text-amber-800 border-amber-500 bg-amber-50'
                            : form.expansionCities.length >= 5
                            ? 'text-stone-300 border-stone-100 cursor-not-allowed bg-stone-50'
                            : 'text-stone-500 border-stone-200 bg-white hover:border-amber-400'
                        }`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <Label>Brand Consistency Score — <span style={{ color: '#b47a2e', fontWeight: 600 }}>{form.brandConsistency}/10</span></Label>
                  <p className="text-xs text-stone-400 mb-2">How consistent is your branding across all customer touchpoints?</p>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-stone-400">Low</span>
                    <input type="range" min={1} max={10} step={1} value={form.brandConsistency}
                      onChange={e => upd('brandConsistency', Number(e.target.value))} className="flex-1" />
                    <span className="text-xs text-stone-400">High</span>
                  </div>
                </div>
              </div>
            </Card>
            <NavButtons onBack={() => go(4)} onNext={() => go(6)} />
          </div>
        )}

        {/* ── STEP 6: Documents ── */}
        {step === 6 && (
          <div className="fade-in-up space-y-4">
            <Card>
              <SectionHeader icon="📁" title="Documents" sub="Optional — upload supporting materials to strengthen your profile" />
              <div className="space-y-4">
                <FileDropZone label="Showroom Photos" accept="JPG, PNG — multiple allowed" uploaded={uploads.showroom} onUpload={() => setUploads(u => ({ ...u, showroom: true }))} />
                <FileDropZone label="Product Catalogue" accept="PDF or images" uploaded={uploads.catalogue} onUpload={() => setUploads(u => ({ ...u, catalogue: true }))} />
                <FileDropZone label="Business Logo" accept="PNG or SVG preferred" uploaded={uploads.logo} onUpload={() => setUploads(u => ({ ...u, logo: true }))} />
                {form.hasManufacturing && (
                  <FileDropZone label="Manufacturing Unit Images" accept="JPG, PNG — multiple allowed" uploaded={uploads.mfg} onUpload={() => setUploads(u => ({ ...u, mfg: true }))} />
                )}
                <div className="bg-amber-50 rounded-xl p-3 text-xs text-amber-800 border border-amber-100">
                  🔒 All uploads are kept strictly confidential and used only for evaluation purposes.
                </div>
              </div>
            </Card>
            <NavButtons onBack={() => go(5)} onNext={submit} nextLabel="Submit Evaluation" isLast />
          </div>
        )}

        {/* ── STEP 7: Result ── */}
        {step === 7 && (
          <div className="fade-in-up">
            <Card className="text-center py-8 px-6 mb-4">
              <p className="text-5xl mb-4">{rec.emoji}</p>
              <h2 className="text-2xl font-semibold mb-2" style={{ color: rec.color }}>{rec.label}</h2>
              <p className="text-sm text-stone-500 mb-6 max-w-sm mx-auto">{rec.subtitle}</p>

              {/* Score ring */}
              <div className="relative w-28 h-28 mx-auto mb-6">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <circle cx="50" cy="50" r="42" fill="none" stroke="#f5f5f4" strokeWidth="8" />
                  <circle cx="50" cy="50" r="42" fill="none" stroke={rec.color} strokeWidth="8"
                    strokeLinecap="round" strokeDasharray="264"
                    strokeDashoffset={264 - (264 * score / 100)}
                    transform="rotate(-90 50 50)"
                    style={{ transition: 'stroke-dashoffset 1s ease' }}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl font-semibold" style={{ color: rec.color }}>{scoreAnim}</span>
                  <span className="text-xs text-stone-400">/100</span>
                </div>
              </div>

              <div className="text-left rounded-xl p-4 mb-6 text-sm text-stone-600 leading-relaxed" style={{ background: rec.bg, border: `1px solid ${rec.color}22` }}>
                Thank you for your valuable time. Our team will carefully review your business profile and connect with you regarding the next steps for franchise expansion.
                <p className="text-xs text-stone-400 mt-2">⏱ Expect a response within 2–3 business days.</p>
              </div>

              <button onClick={() => { setStep(0); setForm(INITIAL_FORM); }}
                className="text-xs text-stone-400 hover:text-stone-600 transition-colors border border-stone-200 px-4 py-2 rounded-lg">
                ← Submit another response
              </button>
            </Card>
          </div>
        )}

        {/* ── Admin Login (step 8) ── */}
        {(step as any) === 8 && <AdminLogin onBack={() => go(0)} onSuccess={() => go(9 as any)} />}

        {/* ── Admin Dashboard (step 9) ── */}
        {(step as any) === 9 && <AdminDashboard onLogout={() => go(0)} formUrl={pageUrl} />}

      </main>

      {/* WhatsApp help button */}
      <a
        href="https://wa.me/919999999999?text=Hi%2C+I+need+help+filling+the+Franchise+Evaluation+Form"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-5 right-5 flex items-center gap-2 px-4 py-2.5 text-white rounded-full text-sm font-medium shadow-lg z-50 hover:opacity-90 transition-opacity"
        style={{ background: '#25D366' }}
      >
        <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
        Need Help?
      </a>
    </>
  );
}

// ── Admin Login Component ──────────────────────────────────────────
function AdminLogin({ onBack, onSuccess }: { onBack: () => void; onSuccess: () => void }) {
  const [uid, setUid] = useState('');
  const [pwd, setPwd] = useState('');
  const [err, setErr] = useState('');

  const login = () => {
    if (uid === 'FK220' && pwd === 'admin') { onSuccess(); }
    else setErr('Invalid credentials. Please try again.');
  };

  return (
    <div className="max-w-sm mx-auto fade-in-up">
      <Card className="p-6">
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-xl mx-auto mb-3 flex items-center justify-center text-white font-semibold" style={{ background: '#b47a2e' }}>FK</div>
          <h2 className="text-lg font-semibold text-stone-800">Admin Login</h2>
          <p className="text-xs text-stone-500">Franchise Evaluation System</p>
        </div>
        {err && <div className="bg-red-50 text-red-700 text-xs p-3 rounded-lg mb-4 border border-red-100">{err}</div>}
        <div className="space-y-3 mb-4">
          <div><Label>User ID</Label><Input value={uid} onChange={setUid} placeholder="Enter User ID" /></div>
          <div><Label>Password</Label><Input type="password" value={pwd} onChange={setPwd} placeholder="Enter Password" /></div>
        </div>
        <button onClick={login} className="w-full py-2.5 text-white text-sm font-medium rounded-xl mb-3 hover:opacity-90" style={{ background: '#b47a2e' }}>
          Login
        </button>
        <button onClick={onBack} className="w-full py-2 text-xs text-stone-400 hover:text-stone-600 transition-colors">
          ← Back to form
        </button>
      </Card>
    </div>
  );
}

// ── Admin Dashboard Component ─────────────────────────────────────
const MOCK_SUBMISSIONS = [
  { id: '1', name: 'Royal Furniture House', owner: 'Rajesh Kumar', city: 'Mumbai', score: 78, rec: 'Franchise Ready', date: '15 Jan 2025' },
  { id: '2', name: 'Modern Living Co.', owner: 'Priya Sharma', city: 'Delhi', score: 52, rec: 'Needs Improvement', date: '14 Jan 2025' },
  { id: '3', name: 'Heritage Woods', owner: 'Arun Patel', city: 'Ahmedabad', score: 35, rec: 'Not Suitable Yet', date: '13 Jan 2025' },
  { id: '4', name: 'Urban Nest Furniture', owner: 'Sneha Iyer', city: 'Bangalore', score: 81, rec: 'Franchise Ready', date: '12 Jan 2025' },
  { id: '5', name: 'Craftwood Studios', owner: 'Mohammed Anwar', city: 'Hyderabad', score: 61, rec: 'Needs Improvement', date: '11 Jan 2025' },
];

function AdminDashboard({ onLogout, formUrl }: { onLogout: () => void; formUrl: string }) {
  const [search, setSearch] = useState('');
  const filtered = MOCK_SUBMISSIONS.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.owner.toLowerCase().includes(search.toLowerCase()) ||
    s.city.toLowerCase().includes(search.toLowerCase())
  );

  const badgeClass = (rec: string) => {
    if (rec === 'Franchise Ready') return 'bg-green-50 text-green-800 border-green-200';
    if (rec === 'Needs Improvement') return 'bg-amber-50 text-amber-800 border-amber-200';
    return 'bg-red-50 text-red-800 border-red-200';
  };

  const avg = Math.round(MOCK_SUBMISSIONS.reduce((a, s) => a + s.score, 0) / MOCK_SUBMISSIONS.length);

  const downloadPDF = async () => {
    const { default: jsPDF } = await import('jspdf');
    const { default: autoTable } = await import('jspdf-autotable');
    const doc = new jsPDF();
    doc.setFont('helvetica');
    doc.setFontSize(18);
    doc.text('Franchise Evaluation Report', 14, 22);
    doc.setFontSize(11);
    doc.setTextColor(120);
    doc.text(`Generated: ${new Date().toLocaleDateString('en-IN')}`, 14, 30);
    doc.setTextColor(0);
    doc.setFontSize(11);
    doc.text(`Total Submissions: ${MOCK_SUBMISSIONS.length}   Average Score: ${avg}/100`, 14, 40);
    autoTable(doc, {
      startY: 48,
      head: [['Business Name', 'Owner', 'City', 'Score', 'Recommendation', 'Date']],
      body: MOCK_SUBMISSIONS.map(s => [s.name, s.owner, s.city, `${s.score}/100`, s.rec, s.date]),
      headStyles: { fillColor: [180, 122, 46] },
      alternateRowStyles: { fillColor: [253, 248, 239] },
      styles: { fontSize: 10, cellPadding: 4 },
    });
    doc.save('franchise-evaluation-report.pdf');
  };

  return (
    <div className="fade-in-up space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-stone-800">Admin Dashboard</h2>
        <button onClick={onLogout} className="text-xs text-stone-400 hover:text-stone-600 border border-stone-200 px-3 py-1.5 rounded-lg">
          Logout →
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: 'Total', value: MOCK_SUBMISSIONS.length },
          { label: 'Franchise Ready', value: MOCK_SUBMISSIONS.filter(s => s.score >= 70).length },
          { label: 'Avg Score', value: `${avg}/100` },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-xl border border-stone-200 p-3 text-center">
            <p className="text-xl font-semibold" style={{ color: '#b47a2e' }}>{s.value}</p>
            <p className="text-xs text-stone-500 mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Search + QR */}
      <Card>
        <Input value={search} onChange={setSearch} placeholder="🔍 Search by name, owner, or city..." />
      </Card>

      {/* Submissions */}
      <Card>
        <div className="divide-y divide-stone-100">
          {filtered.map(s => (
            <div key={s.id} className="py-3 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0" style={{ background: '#fdf3e3', color: '#7a4f10' }}>
                {s.owner.split(' ').map(w => w[0]).join('').slice(0, 2)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-stone-800 truncate">{s.name}</p>
                <p className="text-xs text-stone-400">{s.owner} · {s.city} · {s.date}</p>
              </div>
              <span className={`text-xs px-2 py-1 rounded-lg border font-medium ${badgeClass(s.rec)}`}>{s.rec}</span>
              <span className="text-sm font-semibold w-8 text-right" style={{ color: '#b47a2e' }}>{s.score}</span>
            </div>
          ))}
          {filtered.length === 0 && <p className="text-sm text-stone-400 py-6 text-center">No results found</p>}
        </div>
      </Card>

      {/* Share QR */}
      {formUrl && (
        <Card className="text-center">
          <p className="text-xs text-stone-500 mb-3 font-medium">Form QR Code — Share with business owners</p>
          <div className="inline-block p-3 bg-white rounded-xl border border-stone-100 shadow-sm">
            <QRCodeSVG value={formUrl} size={130} fgColor="#b47a2e" bgColor="#ffffff" level="M" />
          </div>
          <p className="text-xs text-stone-400 mt-2 break-all">{formUrl}</p>
        </Card>
      )}

      {/* Download PDF */}
      <button
        onClick={downloadPDF}
        className="w-full py-3 text-white text-sm font-medium rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
        style={{ background: '#b47a2e' }}
      >
        📥 Download PDF Report
      </button>
    </div>
  );
}
