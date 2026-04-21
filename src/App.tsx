import { useState, useEffect } from 'react'
import { submitEarlyAccess } from './lib/api'
import { auth0LoginUrl, auth0SignupUrl, demoUrl } from './lib/auth0'

const FEATURES = [
  {
    title: 'Daily KPI Tracking',
    description: 'SEQDIP status boards with real-time roll-ups from workcell to enterprise level.',
    screenshots: ['/dailystatus.PNG'],
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
  {
    title: 'Hour-by-Hour Production',
    description: 'Track actuals vs plan every hour. SPC charts, attainment analytics, and miss reason Pareto.',
    screenshots: ['/SPCHxHattainment.PNG'],
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: 'Workforce Management',
    description: 'Skills matrix, attendance tracking, capacity analysis, and drag-and-drop labor rebalancing.',
    screenshots: ['/xmatrixcrewboard.PNG'],
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    title: 'A3 Problem Solving',
    description: 'Structured A3s with fishbone diagrams, 5-Why analysis, PDCA tracking, and AI-powered insights.',
    screenshots: ['/a31.PNG', '/a32.PNG'],
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
  },
  {
    title: '5S Audits',
    description: 'Scheduled audits with scoring, findings tracking, and department-level trend analysis.',
    screenshots: ['/5s1.PNG', '/5s2.PNG'],
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
  },
  {
    title: 'Accountability',
    description: 'Track actions, RCCAs, and JDIs with ownership, due dates, and escalation. Never lose sight of who owns what.',
    screenshots: ['/accountability.PNG'],
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: 'Connect API',
    description: 'REST API with interactive Swagger docs and a built-in sandbox. Integrate with R, Python, Power BI, or any tool.',
    screenshots: ['/connect1.PNG', '/connect2.PNG'],
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    title: 'XPilot AI Assistant',
    description: 'Ask questions in natural language. Get instant charts, SQL queries, and step-by-step app guidance.',
    screenshots: ['/xpilot.PNG'],
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
]

const BUZZWORDS = [
  ['SEQDIP', 'Lean', 'Six Sigma', 'TPM', '5S'],
  ['OpEx', 'Kaizen', 'Gemba', 'PDCA', 'CI'],
  ['KPI', 'SPC', 'OEE', 'FPY', 'DPMO'],
  ['A3', 'RCCA', '5-Why', 'Fishbone', 'Pareto'],
  ['MDI', 'Tier Boards', 'Andon', 'Poka-Yoke', 'Jidoka'],
]

function BuzzwordBanner() {
  const [idx, setIdx] = useState(0)
  const [fading, setFading] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setFading(true)
      setTimeout(() => {
        setIdx(i => (i + 1) % BUZZWORDS.length)
        setFading(false)
      }, 1200)
    }, 8000)
    return () => clearInterval(interval)
  }, [])

  const words = BUZZWORDS[idx]

  return (
    <section className="py-12 border-y border-gray-100 bg-gray-50/50">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <p className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-6">Built for lean manufacturing teams</p>
        <div className={`flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-gray-300 text-2xl font-bold tracking-tight transition-opacity duration-1000 ${fading ? 'opacity-0' : 'opacity-100'}`}>
          {words.map((w, i) => (
            <span key={w}>
              {i > 0 && <span className="text-gray-200 mr-10">|</span>}
              {w}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

function App() {
  const [form, setForm] = useState({ email: '', name: '', company: '', phone: '', message: '', users: '', sites: '' })
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [previewImage, setPreviewImage] = useState<string | null>(null)

  const handleEarlyAccess = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.email || submitting) return
    setSubmitting(true)
    try {
      await submitEarlyAccess(form)
      setSubmitted(true)
    } catch (err) {
      console.error('Signup failed:', err)
      alert('Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* ── Nav ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-bold text-xl tracking-tight">MDI<span className="text-blue-600">X</span></span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm text-gray-600">
            <a href="#features" className="hover:text-gray-900 transition-colors">Features</a>
            <a href="#pricing" className="hover:text-gray-900 transition-colors">Pricing</a>
            <a href="#early-access" className="hover:text-gray-900 transition-colors">Early Access</a>
          </div>
          <div className="flex items-center gap-3">
            <a href={auth0LoginUrl} className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
              Sign In
            </a>
            <a href={auth0SignupUrl} className="text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 px-4 py-2 rounded-lg transition-all shadow-sm">
              Get Started
            </a>
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-gray-900 leading-[1.1]">
            Manufacturing e<span className="text-blue-600">X</span>cellence,{' '}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">measured.</span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Real-time production tracking, KPI management, and AI-powered insights
            for manufacturing teams. From the shop floor to the boardroom.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href={demoUrl} className="w-full sm:w-auto text-center bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium px-8 py-3.5 rounded-xl text-base transition-all shadow-lg shadow-blue-600/20">
              Try Live Demo
            </a>
            <a href="#early-access" className="w-full sm:w-auto text-center bg-gray-50 hover:bg-gray-100 text-gray-700 font-medium px-8 py-3.5 rounded-xl text-base transition-colors border border-gray-200 animate-pulse">
              Request Early Access
            </a>
          </div>
        </div>
      </section>

      {/* ── Rotating buzzwords ── */}
      <BuzzwordBanner />

      {/* ── Features ── */}
      <section id="features" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Everything you need to run world-class operations</h2>
            <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">One platform for daily management, production tracking, workforce optimization, and continuous improvement.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-x-6 gap-y-0">
            {FEATURES.map((f, idx) => (
              <>{idx > 0 && idx % 2 === 0 && (
                <div className="col-span-full my-4 border-t border-gray-100" />
              )}
              <div
                key={f.title}
                className="group relative rounded-2xl border border-gray-100 hover:border-blue-100 transition-all duration-200 cursor-pointer overflow-hidden"
                onClick={() => setPreviewImage(f.screenshots[0])}
              >
                {/* Screenshot preview — always visible */}
                <div className="bg-gray-50 p-4 h-56 flex items-center justify-center" onClick={e => e.stopPropagation()}>
                  {f.screenshots.length === 1 ? (
                    <img
                      src={f.screenshots[0]}
                      alt={`${f.title} screenshot`}
                      className="max-w-full max-h-full rounded-lg object-contain cursor-pointer hover:scale-[1.02] transition-transform shadow-sm"
                      onClick={() => setPreviewImage(f.screenshots[0])}
                    />
                  ) : (
                    <div className="w-full h-full flex gap-3 items-center justify-center">
                      {f.screenshots.map((src, i) => (
                        <img
                          key={i}
                          src={src}
                          alt={`${f.title} screenshot ${i + 1}`}
                          className="max-h-full flex-1 min-w-0 rounded-lg object-contain cursor-pointer hover:scale-[1.02] hover:ring-2 hover:ring-blue-400 transition-all shadow-sm"
                          onClick={() => setPreviewImage(src)}
                        />
                      ))}
                    </div>
                  )}
                </div>
                {/* Text content */}
                <div className="p-5 flex items-start gap-4">
                  <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-blue-100 transition-colors">
                    {f.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{f.title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">{f.description}</p>
                  </div>
                </div>
              </div>
              </>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pricing ── */}
      <section id="pricing" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Start free. Upgrade when you're ready.</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {/* Free */}
            <div className="rounded-2xl p-8 flex flex-col bg-white border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-500">Free</h3>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-4xl font-bold text-gray-900">$0</span>
                <span className="text-sm text-gray-400">/forever</span>
              </div>
              <p className="mt-3 text-sm text-gray-500">Get started with daily management essentials.</p>
              <ul className="mt-8 space-y-3 flex-1">
                {['Daily KPI status boards', 'Issue & action tracking', 'KPI metric entry & charts', 'Up to 10 users', '1 site'].map(f => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <svg className="w-4 h-4 mt-0.5 flex-shrink-0 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-600">{f}</span>
                  </li>
                ))}
              </ul>
              <a href={auth0SignupUrl} className="mt-8 block text-center font-medium py-3 rounded-xl bg-gray-900 text-white hover:bg-gray-800 transition-colors">
                Start Free
              </a>
            </div>

            {/* Pro */}
            <div className="rounded-2xl p-8 flex flex-col bg-gradient-to-br from-blue-600 to-indigo-700 text-white ring-4 ring-blue-600/20 scale-[1.02]">
              <h3 className="text-lg font-semibold text-blue-100">Pro</h3>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-4xl font-bold text-white">Custom</span>
              </div>
              <p className="mt-3 text-sm text-blue-100">Full platform for operational excellence teams.</p>
              <ul className="mt-8 space-y-3 flex-1">
                {['Everything in Free', 'XPilot AI assistant', 'Hour-by-Hour production tracking', 'XMatrix workforce management', '5S audit scheduling & scoring', 'A3 problem solving', 'Accountability board', 'Connect API (R, Python, Power BI)', 'Bulletin board scheduler', 'Custom branding (logo & favicon)', 'Unlimited users & sites'].map(f => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <svg className="w-4 h-4 mt-0.5 flex-shrink-0 text-blue-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-blue-50">{f}</span>
                  </li>
                ))}
              </ul>
              <a href="#early-access" className="mt-8 block text-center font-medium py-3 rounded-xl bg-white text-blue-600 hover:bg-blue-50 transition-colors">
                Talk to Sales
              </a>
            </div>

            {/* Enterprise */}
            <div className="rounded-2xl p-8 flex flex-col bg-white border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-500">Enterprise</h3>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-4xl font-bold text-gray-900">Custom</span>
              </div>
              <p className="mt-3 text-sm text-gray-500">For multi-site organizations with advanced needs.</p>
              <ul className="mt-8 space-y-3 flex-1">
                {['Everything in Pro', 'SSO / SAML integration', 'On-premise deployment', 'Dedicated support & SLA', 'Custom integrations', 'Advanced analytics', 'Multi-region support'].map(f => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <svg className="w-4 h-4 mt-0.5 flex-shrink-0 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-600">{f}</span>
                  </li>
                ))}
              </ul>
              <a href="#early-access" className="mt-8 block text-center font-medium py-3 rounded-xl bg-gray-900 text-white hover:bg-gray-800 transition-colors">
                Contact Sales
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Early Access Signup ── */}
      <section id="early-access" className="py-24 px-6 bg-gray-50">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Get early access</h2>
            <p className="mt-4 text-lg text-gray-500">Tell us about your operation and we'll set up a personalized demo.</p>
          </div>
          {submitted ? (
            <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
              <svg className="w-12 h-12 text-green-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-xl font-semibold text-green-900">Thanks! We'll be in touch.</h3>
              <p className="mt-2 text-green-700">Our team will reach out within 24 hours to schedule your demo.</p>
            </div>
          ) : (
            <form onSubmit={handleEarlyAccess} className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8 space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    placeholder="Jane Smith"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Work email <span className="text-red-400">*</span></label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    placeholder="jane@company.com"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                  <input
                    type="text"
                    value={form.company}
                    onChange={e => setForm(f => ({ ...f, company: e.target.value }))}
                    placeholder="Acme Manufacturing"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                    placeholder="(555) 123-4567"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Number of users</label>
                  <select
                    value={form.users}
                    onChange={e => setForm(f => ({ ...f, users: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  >
                    <option value="">Select...</option>
                    <option value="1-10">1 – 10</option>
                    <option value="11-50">11 – 50</option>
                    <option value="51-200">51 – 200</option>
                    <option value="200+">200+</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Number of sites</label>
                  <select
                    value={form.sites}
                    onChange={e => setForm(f => ({ ...f, sites: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  >
                    <option value="">Select...</option>
                    <option value="1">1 site</option>
                    <option value="2-5">2 – 5 sites</option>
                    <option value="6-20">6 – 20 sites</option>
                    <option value="20+">20+ sites</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">What are you looking to solve?</label>
                <textarea
                  value={form.message}
                  onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                  placeholder="Tell us about your current challenges, what tools you use today, or what you'd like MDIX to help with..."
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm resize-none"
                />
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold px-8 py-3.5 rounded-xl transition-all disabled:opacity-60 shadow-lg shadow-blue-600/20 text-base"
              >
                {submitting ? 'Submitting...' : 'Request Early Access'}
              </button>
              <p className="text-xs text-gray-400 text-center">We'll respond within 24 hours. No spam, ever.</p>
            </form>
          )}
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="py-12 px-6 border-t border-gray-100">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-sm tracking-tight text-gray-500">MDI<span className="text-blue-600">X</span></span>
            <span className="text-sm text-gray-400">by Prizm BI</span>
          </div>
          <p className="text-sm text-gray-400">&copy; {new Date().getFullYear()} Prizm BI. All rights reserved.</p>
        </div>
      </footer>

      {/* ── Screenshot Preview Modal ── */}
      {previewImage && (
        <div
          className="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center p-4"
          onClick={() => setPreviewImage(null)}
        >
          <div className="max-w-5xl max-h-[90vh] relative">
            <button
              onClick={() => setPreviewImage(null)}
              className="absolute -top-10 right-0 text-white hover:text-gray-300 transition-colors"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <img
              src={previewImage}
              alt="Feature screenshot"
              className="max-w-full max-h-[85vh] object-contain rounded-xl shadow-2xl"
              onClick={e => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default App
