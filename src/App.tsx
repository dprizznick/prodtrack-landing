import { useState } from 'react'
import { submitEarlyAccess } from './lib/api'

const FEATURES = [
  {
    title: 'Daily KPI Tracking',
    description: 'SEQDIP status boards with real-time roll-ups from workcell to enterprise level.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
  {
    title: 'Hour-by-Hour Production',
    description: 'Track actuals vs plan every hour. SPC charts, attainment analytics, and miss reason Pareto.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: 'Workforce Management',
    description: 'Skills matrix, attendance tracking, capacity analysis, and drag-and-drop labor rebalancing.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    title: 'A3 Problem Solving',
    description: 'Structured A3s with fishbone diagrams, 5-Why analysis, PDCA tracking, and AI-powered insights.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
  },
  {
    title: '5S Audits',
    description: 'Scheduled audits with scoring, findings tracking, and department-level trend analysis.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
  },
  {
    title: 'XPilot AI Assistant',
    description: 'Ask questions in natural language. Get instant charts, SQL queries, and step-by-step app guidance.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
]

const TIERS = [
  {
    name: 'Starter',
    price: 'Free',
    period: '',
    description: 'For small teams getting started with operational excellence.',
    features: ['1 site, up to 5 workcells', 'Daily KPI status boards', 'Issue & action tracking', 'Basic reporting', 'Up to 10 users'],
    cta: 'Start Free',
    highlighted: false,
  },
  {
    name: 'Professional',
    price: '$499',
    period: '/mo',
    description: 'For growing operations that need full visibility.',
    features: ['Unlimited sites & workcells', 'Hour-by-Hour production tracking', 'Workforce management (XMatrix)', '5S audit scheduling', 'A3 problem solving', 'XPilot AI assistant', 'ProdTrack Connect API', 'Up to 50 users'],
    cta: 'Start Trial',
    highlighted: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    description: 'For multi-site organizations with advanced needs.',
    features: ['Everything in Professional', 'SSO / SAML integration', 'Custom KPI configurations', 'Dedicated support', 'On-premise deployment option', 'Unlimited users', 'SLA guarantee'],
    cta: 'Contact Sales',
    highlighted: false,
  },
]

function App() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const handleEarlyAccess = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || submitting) return
    setSubmitting(true)
    try {
      await submitEarlyAccess(email)
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
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">PT</span>
            </div>
            <span className="font-semibold text-lg">ProdTrack</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm text-gray-600">
            <a href="#features" className="hover:text-gray-900 transition-colors">Features</a>
            <a href="#pricing" className="hover:text-gray-900 transition-colors">Pricing</a>
            <a href="#early-access" className="hover:text-gray-900 transition-colors">Early Access</a>
          </div>
          <div className="flex items-center gap-3">
            <a href="#early-access" className="text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors">
              Get Early Access
            </a>
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 bg-blue-50 border border-blue-100 rounded-full px-4 py-1.5 mb-8">
            <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
            Now accepting early access signups
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-gray-900 leading-[1.1]">
            Manufacturing excellence,{' '}
            <span className="text-blue-600">measured.</span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Real-time production tracking, KPI management, and AI-powered insights
            for manufacturing teams. From the shop floor to the boardroom.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#early-access" className="w-full sm:w-auto text-center bg-blue-600 hover:bg-blue-700 text-white font-medium px-8 py-3.5 rounded-xl text-base transition-colors shadow-lg shadow-blue-600/20">
              Request Early Access
            </a>
            <a href="#features" className="w-full sm:w-auto text-center bg-gray-50 hover:bg-gray-100 text-gray-700 font-medium px-8 py-3.5 rounded-xl text-base transition-colors border border-gray-200">
              See Features
            </a>
          </div>
        </div>
      </section>

      {/* ── Logos / Social proof ── */}
      <section className="py-12 border-y border-gray-100 bg-gray-50/50">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <p className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-6">Built for lean manufacturing teams</p>
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-4 text-gray-300 text-2xl font-bold tracking-tight">
            <span>SEQDIP</span>
            <span className="text-gray-200">|</span>
            <span>Lean</span>
            <span className="text-gray-200">|</span>
            <span>Six Sigma</span>
            <span className="text-gray-200">|</span>
            <span>TPM</span>
            <span className="text-gray-200">|</span>
            <span>5S</span>
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section id="features" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Everything you need to run world-class operations</h2>
            <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">One platform for daily management, production tracking, workforce optimization, and continuous improvement.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {FEATURES.map(f => (
              <div key={f.title} className="group p-6 rounded-2xl border border-gray-100 hover:border-blue-100 hover:bg-blue-50/30 transition-all duration-200">
                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-100 transition-colors">
                  {f.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{f.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pricing ── */}
      <section id="pricing" className="py-24 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Simple, transparent pricing</h2>
            <p className="mt-4 text-lg text-gray-500">Start free. Scale as you grow.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {TIERS.map(t => (
              <div key={t.name} className={`rounded-2xl p-8 flex flex-col ${t.highlighted ? 'bg-blue-600 text-white ring-4 ring-blue-600/20 scale-[1.02]' : 'bg-white border border-gray-200'}`}>
                <h3 className={`text-lg font-semibold ${t.highlighted ? 'text-blue-100' : 'text-gray-500'}`}>{t.name}</h3>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className={`text-4xl font-bold ${t.highlighted ? 'text-white' : 'text-gray-900'}`}>{t.price}</span>
                  {t.period && <span className={`text-sm ${t.highlighted ? 'text-blue-200' : 'text-gray-400'}`}>{t.period}</span>}
                </div>
                <p className={`mt-3 text-sm ${t.highlighted ? 'text-blue-100' : 'text-gray-500'}`}>{t.description}</p>
                <ul className="mt-8 space-y-3 flex-1">
                  {t.features.map(f => (
                    <li key={f} className="flex items-start gap-2 text-sm">
                      <svg className={`w-4 h-4 mt-0.5 flex-shrink-0 ${t.highlighted ? 'text-blue-200' : 'text-blue-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className={t.highlighted ? 'text-blue-50' : 'text-gray-600'}>{f}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href="#early-access"
                  className={`mt-8 block text-center font-medium py-3 rounded-xl transition-colors ${
                    t.highlighted
                      ? 'bg-white text-blue-600 hover:bg-blue-50'
                      : 'bg-gray-900 text-white hover:bg-gray-800'
                  }`}
                >
                  {t.cta}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Early Access Signup ── */}
      <section id="early-access" className="py-24 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Get early access</h2>
          <p className="mt-4 text-lg text-gray-500">Join the beta program and help shape the future of manufacturing software. Early adopters get 6 months free on any paid plan.</p>
          {submitted ? (
            <div className="mt-10 bg-green-50 border border-green-200 rounded-2xl p-8">
              <svg className="w-12 h-12 text-green-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-xl font-semibold text-green-900">You're on the list!</h3>
              <p className="mt-2 text-green-700">We'll be in touch soon with your beta access details.</p>
            </div>
          ) : (
            <form onSubmit={handleEarlyAccess} className="mt-10 flex flex-col sm:flex-row items-center gap-3 max-w-md mx-auto">
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full flex-1 px-4 py-3.5 rounded-xl border border-gray-200 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
              />
              <button
                type="submit"
                disabled={submitting}
                className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-medium px-8 py-3.5 rounded-xl transition-colors disabled:opacity-60 whitespace-nowrap"
              >
                {submitting ? 'Submitting...' : 'Request Access'}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="py-12 px-6 border-t border-gray-100">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-blue-600 rounded-md flex items-center justify-center">
              <span className="text-white font-bold text-[10px]">PT</span>
            </div>
            <span className="text-sm text-gray-500">ProdTrack by Prizm BI</span>
          </div>
          <p className="text-sm text-gray-400">&copy; {new Date().getFullYear()} Prizm BI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default App
