import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Mail, MapPin, Phone, Send, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react'

const socials = [
  { label: 'Facebook', href: 'https://www.facebook.com/2706events', icon: Facebook },
  { label: 'Twitter', href: 'https://www.twitter.com/2706events', icon: Twitter },
  { label: 'Instagram', href: 'https://www.instagram.com/2706events', icon: Instagram },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/2706events', icon: Linkedin },
]

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } }
}

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } }
}

const Footer = () => {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setEmail('')
      setTimeout(() => setSubscribed(false), 3000)
    }
  }

  return (
    <footer className='bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden'>
      {/* Decorative gradient orb */}
      <div className='absolute top-0 left-1/4 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl' />
      <div className='absolute bottom-0 right-1/4 w-64 h-64 bg-rose-500/10 rounded-full blur-3xl' />

      {/* Main footer body */}
      <div className='max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 relative z-10'>

        {/* Brand */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className='lg:col-span-1'
        >
          <h3 className='text-2xl font-bold bg-gradient-to-r from-pink-400 via-rose-400 to-orange-400 bg-clip-text text-transparent mb-3'>
            2706 Events
          </h3>
          <p className='text-slate-300 leading-relaxed mb-4 text-sm'>
            Creating unforgettable experiences, one event at a time.
          </p>
          <div className='flex flex-col gap-2 text-slate-400 text-sm'>
            <div className='flex items-center gap-2'>
              <MapPin size={16} className='text-pink-400' />
              <span>Lagos, Nigeria</span>
            </div>
            <div className='flex items-center gap-2'>
              <Phone size={16} className='text-pink-400' />
              <span>+2348086902551</span>
            </div>
            <div className='flex items-center gap-2'>
              <Mail size={16} className='text-pink-400' />
              <span>info@2706events.com</span>
            </div>
          </div>
        </motion.div>

        {/* Quick links */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h4 className='text-white font-semibold mb-4 uppercase tracking-wider text-sm border-b border-pink-500/30 pb-2'>
            Quick Links
          </h4>
          <ul className='space-y-3'>
            {[
              { label: 'Home', path: '/' },
              { label: 'About Us', path: '/about' },
              { label: 'Contact', path: '/contact' },
              { label: 'Services', path: '/booking/services' },
              { label: 'Dashboard', path: '/booking/dashboard' },
            ].map(({ label, path }) => (
              <li key={label}>
                <motion.div
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                  className='inline-block'
                >
                  <Link
                    to={path}
                    className='text-slate-300 hover:text-pink-400 transition-colors text-sm flex items-center gap-2'
                  >
                    <span className='w-1.5 h-1.5 bg-pink-500 rounded-full' />
                    {label}
                  </Link>
                </motion.div>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Services */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h4 className='text-white font-semibold mb-4 uppercase tracking-wider text-sm border-b border-pink-500/30 pb-2'>
            Our Services
          </h4>
          <ul className='space-y-3'>
            {[
              { label: 'Wedding Planning', path: '/booking/services' },
              { label: 'Corporate Events', path: '/booking/services' },
              { label: 'Birthday Parties', path: '/booking/services' },
              { label: 'Conferences', path: '/booking/services' },
              { label: 'Social Gatherings', path: '/booking/services' },
            ].map(({ label, path }) => (
              <li key={label}>
                <motion.div
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                  className='inline-block'
                >
                  <Link
                    to={path}
                    className='text-slate-300 hover:text-pink-400 transition-colors text-sm flex items-center gap-2'
                  >
                    <span className='w-1.5 h-1.5 bg-rose-500 rounded-full' />
                    {label}
                  </Link>
                </motion.div>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Newsletter */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h4 className='text-white font-semibold mb-4 uppercase tracking-wider text-sm border-b border-pink-500/30 pb-2'>
            Newsletter
          </h4>
          <p className='text-slate-300 text-sm mb-4'>
            Subscribe to get special offers and event planning tips!
          </p>
          <form onSubmit={handleSubscribe} className='relative'>
            <input
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Enter your email'
              className='w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 pr-12 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition-all'
              required
            />
            <button
              type='submit'
              className='absolute right-2 top-1/2 -translate-y-1/2 bg-gradient-to-r from-pink-500 to-rose-500 p-2 rounded-lg text-white hover:scale-110 transition-transform'
            >
              <Send size={16} />
            </button>
          </form>
          {subscribed && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className='text-green-400 text-xs mt-2 flex items-center gap-1'
            >
              ✓ Thanks for subscribing!
            </motion.p>
          )}
          <p className='text-slate-500 text-xs mt-3'>
            We respect your privacy. Unsubscribe at any time.
          </p>
        </motion.div>

      </div>

      {/* Divider */}
      <div className='border-t border-slate-800' />

      {/* Social + copyright */}
      <div className='max-w-6xl mx-auto px-6 py-6 flex flex-col 
      sm:flex-row items-center justify-between gap-4'>

        <motion.div
          variants={containerVariants}
          initial='hidden'
          whileInView='show'
          viewport={{ once: true }}
          className='flex gap-4'
        >
          {socials.map(({ label, href, icon: Icon }) => (
            <motion.a
              key={label}
              href={href}
              target='_blank'
              rel='noopener noreferrer'
              aria-label={label}
              variants={itemVariants}
              whileHover={{ scale: 1.2, y: -2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              className='text-slate-400 hover:text-pink-400 bg-slate-800/50 p-2.5 rounded-full hover:bg-slate-700 transition-colors'
            >
              <Icon size={18} />
              <Icon size={18} />
            </motion.a>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className='text-slate-400 text-sm'
        >
          © {new Date().getFullYear()} 
          <span className='text-pink-400 font-semibold'>2706 Events</span>. All rights reserved.
        </motion.p>

      </div>
    </footer>
  )
}

export default Footer
