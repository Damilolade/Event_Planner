import React, { useState } from 'react'
import { motion } from 'framer-motion'
import setup from '../assets/setup.jpg'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1], delay }
})

const contactInfo = [
  {
    icon: '✉',
    label: 'Email Us',
    value: 'info@20706events.com',
    href: 'mailto:info@20706events.com'
  },
  {
    icon: '📞',
    label: 'Call Us',
    value: '+234 8086902551',
    href: 'tel:+2348086902551'
  },
  {
    icon: '📍',
    label: 'Find Us',
    value: 'Lagos, Nigeria',
    href: '#'
  },
]

const socials = [
  { label: 'Facebook', href: 'https://www.facebook.com/20706events' },
  { label: 'Instagram', href: 'https://www.instagram.com/20706events' },
  { label: 'Twitter', href: 'https://www.twitter.com/20706events' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/20706events' },
]

const inputClass = `w-full bg-neutral-900 border border-white/10 
rounded-xl px-4 py-3.5 text-white
  text-sm placeholder-neutral-500 focus:outline-none focus:border-yellow-400/60
  transition-colors duration-200`

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
    }, 1500)
  }

  return (
    <div className='min-h-screen bg-neutral-950 text-white'>

      {/* ── Hero ── */}
      <section
        className='relative h-[55vh] flex flex-col items-center 
        justify-center text-center px-6 overflow-hidden'
        style={{ backgroundImage: `url(${setup})`, backgroundSize: 
        'cover', backgroundPosition: 'center' }}
      >
        <div className='absolute inset-0 bg-black/65' />
        <div className='absolute top-0 left-0 right-0 h-[2px] 
        bg-gradient-to-r from-transparent via-yellow-400 to-transparent' />

        <div className='relative z-10 max-w-2xl mx-auto'>
          <motion.p
            {...fadeUp(0.1)}
            className='text-yellow-400 uppercase tracking-[0.3em] text-xs font-semibold mb-4'
          >
            Get In Touch
          </motion.p>
          <motion.h1
            {...fadeUp(0.25)}
            className='text-5xl md:text-6xl font-extrabold leading-tight mb-5'
          >
            Let's Plan Something <span className='text-yellow-400'>Amazing</span>
          </motion.h1>
          <motion.p
            {...fadeUp(0.4)}
            className='text-white/65 text-lg max-w-md mx-auto leading-relaxed'
          >
            Reach out and our team will get back to you within 24 hours.
          </motion.p>
        </div>
      </section>

      {/* ── Contact Info Cards ── */}
      <section className='border-y border-white/5 bg-neutral-900'>
        <motion.div
          className='max-w-5xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-3 gap-6'
          initial='hidden'
          whileInView='show'
          viewport={{ once: true }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
        >
          {contactInfo.map(({ icon, label, value, href }) => (
            <motion.a
              key={label}
              href={href}
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
              }}
              whileHover={{ y: -4, borderColor: 'rgba(250,204,21,0.4)' }}
              transition={{ duration: 0.3 }}
              className='flex flex-col items-center text-center bg-neutral-950 border
              border-white/5 rounded-2xl px-6 py-8 cursor-pointer'
            >
              <span className='text-3xl mb-3'>{icon}</span>
              <p className='text-yellow-400 text-xs uppercase tracking-widest font-semibold mb-1'>
                {label}
              </p>
              <p className='text-neutral-300 text-sm'>{value}</p>
            </motion.a>
          ))}
        </motion.div>
      </section>

      {/* ── Form + Side Info ── */}
      <section className='max-w-6xl mx-auto px-6 py-24 grid grid-cols-1 lg:grid-cols-5 gap-16'>

        {/* Left — form */}
        <motion.div {...fadeUp(0)} className='lg:col-span-3'>
          <p className='text-yellow-400 uppercase tracking-[0.3em] text-xs font-semibold mb-3'>
            Send a Message
          </p>
          <h2 className='text-3xl font-extrabold mb-8'>We'd Love to Hear From You</h2>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className='bg-yellow-400/10 border border-yellow-400/30 rounded-2xl px-8 py-12 text-center'
            >
              <div className='text-4xl mb-4'>🎉</div>
              <h3 className='text-yellow-400 text-xl font-bold mb-2'>Message Sent!</h3>
              <p className='text-neutral-400 text-sm leading-relaxed'>
                Thank you for reaching out. Our team will get back to you within 24 hours.
              </p>
              <button
                onClick={() => { setSubmitted(false); 
                  setForm({ name: '', email: '', phone: '', subject: '', message: '' }) }}
                className='mt-6 text-yellow-400 text-sm 
                underline underline-offset-4 hover:text-yellow-300 transition-colors'
              >
                Send another message
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className='space-y-4'>
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                <div>
                  <label className='text-neutral-400 text-xs uppercase tracking-wider mb-1.5 block'>
                    Full Name
                  </label>
                  <input
                    type='text'
                    name='name'
                    value={form.name}
                    onChange={handleChange}
                    placeholder='Damilola'
                    required
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className='text-neutral-400 text-xs uppercase tracking-wider mb-1.5 block'>
                    Email Address
                  </label>
                  <input
                    type='email'
                    name='email'
                    value={form.email}
                    onChange={handleChange}
                    placeholder='damilolaolawepo441@gmail.com'
                    required
                    className={inputClass}
                  />
                </div>
              </div>

              <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                <div>
                  <label className='text-neutral-400 text-xs uppercase tracking-wider mb-1.5 block'>
                    Phone Number
                  </label>
                  <input
                    type='tel'
                    name='phone'
                    value={form.phone}
                    onChange={handleChange}
                    placeholder='+234 8086902551'
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className='text-neutral-400 text-xs uppercase tracking-wider mb-1.5 block'>
                    Subject
                  </label>
                  <select
                    name='subject'
                    value={form.subject}
                    onChange={handleChange}
                    required
                    className={inputClass}
                  >
                    <option value='' disabled>Select event type</option>
                    <option value='wedding'>Wedding</option>
                    <option value='birthday'>Birthday Party</option>
                    <option value='corporate'>Corporate Event</option>
                    <option value='other'>Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className='text-neutral-400 text-xs uppercase tracking-wider mb-1.5 block'>
                  Message
                </label>
                <textarea
                  name='message'
                  value={form.message}
                  onChange={handleChange}
                  placeholder='Tell us about your event — date, venue, guest count, vision...'
                  required
                  rows={5}
                  className={inputClass + ' resize-none'}
                />
              </div>

              <motion.button
                type='submit'
                initial='rest'
                whileHover='hover'
                whileTap='tap'
                variants={{ rest: { scale: 1 }, hover: { scale: 1.03 }, tap: { scale: 0.97 } }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                disabled={loading}
                className='w-full bg-yellow-400 text-black font-bold py-4 rounded-xl text-sm
                shadow-lg shadow-yellow-400/20 hover:bg-yellow-300 transition-colors
                disabled:opacity-60 disabled:cursor-not-allowed'
              >
                {loading ? 'Sending...' : 'Send Message →'}
              </motion.button>
            </form>
          )}
        </motion.div>

        {/* Right — side info */}
        <motion.div {...fadeUp(0.15)} className='lg:col-span-2 space-y-8'>
          <div>
            <p className='text-yellow-400 uppercase tracking-[0.3em] text-xs font-semibold mb-3'>
              Office Hours
            </p>
            <h3 className='text-xl font-bold mb-4'>When We're Available</h3>
            <ul className='space-y-3 text-sm text-neutral-400'>
              {[
                { day: 'Monday – Friday', hours: '9:00 AM – 6:00 PM' },
                { day: 'Saturday', hours: '10:00 AM – 4:00 PM' },
                { day: 'Sunday', hours: 'By Appointment Only' },
              ].map(({ day, hours }) => (
                <li key={day} className='flex justify-between border-b border-white/5 pb-3'>
                  <span>{day}</span>
                  <span className='text-white'>{hours}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className='text-yellow-400 uppercase tracking-[0.3em] text-xs font-semibold mb-3'>
              Follow Along
            </p>
            <h3 className='text-xl font-bold mb-4'>Stay Connected</h3>
            <div className='flex flex-wrap gap-3'>
              {socials.map(({ label, href }) => (
                <motion.a
                  key={label}
                  href={href}
                  target='_blank'
                  rel='noopener noreferrer'
                  whileHover={{ scale: 1.05, borderColor: 'rgba(250,204,21,0.5)' }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                  className='text-sm text-neutral-300 border border-white/10 rounded-full
                  px-4 py-2 hover:text-yellow-400 transition-colors'
                >
                  {label}
                </motion.a>
              ))}
            </div>
          </div>

          <div className='bg-yellow-400/5 border border-yellow-400/20 rounded-2xl p-6'>
            <p className='text-yellow-400 text-sm font-semibold mb-1'>Quick Response</p>
            <p className='text-neutral-400 text-sm leading-relaxed'>
              For urgent inquiries, WhatsApp us directly at{' '}
              <a
                href='https://wa.me/238086902551'
                className='text-yellow-400 hover:text-yellow-300 transition-colors'
              >
                +2348086902551
              </a>
              {' '}and we'll respond within the hour.
            </p>
          </div>
        </motion.div>

      </section>

      {/* ── Decorative CTA bottom ── */}
      <section className='relative border-t border-white/5 py-20 px-6 text-center overflow-hidden'>
        <div className='absolute inset-0 flex items-center justify-center pointer-events-none'>
          <div className='w-[500px] h-[500px] rounded-full border border-yellow-400/5' />
        </div>
        <div className='relative z-10 max-w-xl mx-auto'>
          <motion.h2
            {...fadeUp(0)}
            className='text-3xl font-extrabold mb-3'
          >
            Ready to Get Started?
          </motion.h2>
          <motion.p
            {...fadeUp(0.1)}
            className='text-neutral-400 text-sm leading-relaxed'
          >
            Join hundreds of happy clients who trusted 20706 Events
            with their most important celebrations.
          </motion.p>
        </div>
      </section>

    </div>
  )
}

export default Contact