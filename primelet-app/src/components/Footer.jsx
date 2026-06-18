const Footer = () => {
  const currentYear = new Date().getFullYear()

  const links = {
    Company: ['About Us', 'Find House', 'Recent Update'],
    Properties: ['For Sale', 'For Rent', 'New Listings', 'Commercial'],
    Support: [ 'Contact Us', 'Privacy Policy', 'Terms of Service'],
  }

  const socials = [
    {
      label: 'Facebook',
      icon: <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />,
    },
    {
      label: 'Twitter',
      icon: <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />,
    },
    {
      label: 'Instagram',
      icon: (<><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></>),
    },
    {
      label: 'LinkedIn',
      icon: (<><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></>),
    },
  ]

  return (
    <footer className="bg-primary text-white pt-16 pb-6 px-6">
      <div className="max-w-6xl mx-auto">

        {/* Top grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          {/* Brand column */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center">
                <span className="text-white font-black text-sm">P</span>
              </div>
              <h1 className="text-xl font-black tracking-tight text-white">Primelet</h1>
            </div>
            <p className="text-blue-300 text-sm leading-relaxed">
              Your trusted partner in finding the perfect property. Buy, sell, or rent with confidence.
            </p>

            {/* Socials */}
            <div className="flex gap-3 mt-2">
              {socials.map(({ label, icon }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="w-9 h-9 rounded-full border border-blue-700 flex items-center justify-center text-blue-300 hover:bg-orange-500 hover:border-orange-500 hover:text-white transition-all duration-200"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"
                    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    {icon}
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(links).map(([category, items]) => (
            <div key={category} className="flex flex-col gap-4">
              <h3 className="text-sm font-bold uppercase tracking-widest text-orange-400">{category}</h3>
              <ul className="flex flex-col gap-2">
                {items.map((item) => (
                  <li key={item}>
                    <a href="#" className="text-blue-300 text-sm hover:text-white transition-colors duration-150">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div className="bg-blue-900 rounded-2xl px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 mb-10">
          <div>
            <h4 className="text-white font-bold text-base">Stay up to date</h4>
            <p className="text-blue-300 text-sm">Get the latest listings and property news.</p>
          </div>
          <div className="flex w-full sm:w-auto gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 sm:w-64 px-4 py-2.5 rounded-full bg-blue-800 text-white placeholder-blue-400 text-sm border border-blue-700 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
            <button className="px-5 py-2.5 bg-orange-500 hover:bg-orange-600 transition-colors text-white text-sm font-semibold rounded-full shrink-0">
              Subscribe
            </button>
          </div>
        </div>

        {/* Divider + bottom bar */}
        <div className="border-t border-blue-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-blue-400">
          <p>© {currentYear} Primelet. All rights reserved.</p>
          <div className="flex gap-5">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
          </div>
        </div>

      </div>
    </footer>
  )
}

export default Footer