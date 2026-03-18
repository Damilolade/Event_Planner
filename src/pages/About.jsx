import React from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import setup from '../assets/setup.jpg'
import wed1 from '../assets/wed1.jpg'
import wed2 from '../assets/wed2.jpg'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1], delay }
})

const stats = [
  { value: '500+', label: 'Events Hosted' },
  { value: '8+', label: 'Years Experience' },
  { value: '98%', label: 'Happy Clients' },
  { value: '50+', label: 'Team Members' },
]

const values = [
  {
    title: 'Attention to Detail',
    desc: 'Every element of your event is meticulously planned — from floral arrangements to lighting — nothing is left to chance.',
    icon: '◈'
  },
  {
    title: 'Client-First Approach',
    desc: 'Your vision drives everything we do. We listen, adapt, and deliver experiences that exceed expectations every time.',
    icon: '◉'
  },
  {
    title: 'Creative Excellence',
    desc: 'We blend creativity with execution to craft events that are visually stunning and emotionally unforgettable.',
    icon: '◆'
  },
  {
    title: 'Reliable & Trusted',
    desc: 'With hundreds of events under our belt, you can trust us to deliver flawlessly, every single time.',
    icon: '◎'
  },
]

const team = [
  { name: 'Adaeze Okonkwo', role: 'Founder & Creative Director', initials: 'AO' },
  { name: 'Emeka Nwosu', role: 'Head of Operations', initials: 'EN' },
  { name: 'Fatima Bello', role: 'Lead Event Stylist', initials: 'FB' },
]

const About = () => {
  const navigate = useNavigate()

  return (
    <div className='min-h-screen bg-neutral-950 text-white'>

      {/* ── Hero ── */}
      <section
        className='relative h-[70vh] flex flex-col items-center justify-center text-center px-6 overflow-hidden'
        style={{ backgroundImage: `url(${setup})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <div className='absolute inset-0 bg-black/65' />
        <div className='absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-yellow-400 to-transparent' />

        <div className='relative z-10 max-w-3xl mx-auto'>
          <motion.p
            {...fadeUp(0.1)}
            className='text-yellow-400 uppercase tracking-[0.3em] text-xs font-semibold mb-4'
          >
            Our Story
          </motion.p>
          <motion.h1
            {...fadeUp(0.25)}
            className='text-5xl md:text-6xl font-extrabold leading-tight mb-5'
          >
            Crafting Moments That <span className='text-yellow-400'>Last Forever</span>
          </motion.h1>
          <motion.p
            {...fadeUp(0.4)}
            className='text-white/65 text-lg max-w-xl mx-auto leading-relaxed'
          >
            20706 Events was born from a passion for bringing people together
            through beautifully orchestrated celebrations.
          </motion.p>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className='border-y border-white/5 bg-neutral-900'>
        <motion.div
          className='max-w-5xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-center'
          initial='hidden'
          whileInView='show'
          viewport={{ once: true }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
        >
          {stats.map(({ value, label }) => (
            <motion.div
              key={label}
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
              }}
            >
              <p className='text-4xl font-extrabold text-yellow-400'>{value}</p>
              <p className='text-neutral-400 text-sm mt-1 uppercase tracking-wider'>{label}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── Our Story ── */}
      <section className='max-w-6xl mx-auto px-6 py-24 grid grid-cols-1 md:grid-cols-2 gap-16 items-center'>
        <motion.div {...fadeUp(0)}>
          <p className='text-yellow-400 uppercase tracking-[0.3em] text-xs font-semibold mb-4'>
            Who We Are
          </p>
          <h2 className='text-4xl font-extrabold mb-6 leading-snug'>
            More Than an Event Company
          </h2>
          <p className='text-neutral-400 leading-relaxed mb-4'>
            Founded with a single mission — to make every celebration extraordinary —
            20706 Events has grown into one of the most trusted event planning companies
            in the region. We specialize in weddings, corporate events, birthday parties,
            and every milestone worth celebrating.
          </p>
          <p className='text-neutral-400 leading-relaxed mb-8'>
            Our team of passionate planners, stylists, and coordinators work tirelessly
            behind the scenes so you can be fully present in every moment.
          </p>
          <motion.button
            initial='rest' whileHover='hover' whileTap='tap'
            variants={{ rest: { scale: 1 }, hover: { scale: 1.05 }, tap: { scale: 0.97 } }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            onClick={() => navigate('/contact')}
            className='bg-yellow-400 text-black font-bold px-8 py-3.5 rounded-full text-sm
            shadow-lg shadow-yellow-400/20 hover:bg-yellow-300 transition-colors'
          >
            Work With Us
          </motion.button>
        </motion.div>

        <motion.div
          {...fadeUp(0.15)}
          className='relative'
        >
          <img
            src={wed1}
            alt='Our work'
            className='rounded-2xl w-full h-80 object-cover'
          />
          <img
            src={wed2}
            alt='Our work'
            className='rounded-2xl w-48 h-48 object-cover absolute -bottom-8 -left-8
            border-4 border-neutral-950 shadow-2xl hidden md:block'
          />
        </motion.div>
      </section>

      {/* ── Values ── */}
      <section className='bg-neutral-900 py-24 px-6'>
        <motion.div
          className='text-center mb-14'
          {...fadeUp(0)}
        >
          <p className='text-yellow-400 uppercase tracking-[0.3em] text-xs font-semibold mb-3'>
            What Drives Us
          </p>
          <h2 className='text-4xl font-extrabold'>Our Core Values</h2>
        </motion.div>

        <motion.div
          className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto'
          initial='hidden'
          whileInView='show'
          viewport={{ once: true }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
        >
          {values.map(({ title, desc, icon }) => (
            <motion.div
              key={title}
              variants={{
                hidden: { opacity: 0, y: 24 },
                show: { opacity: 1, y: 0, transition: { duration: 0.55 } }
              }}
              whileHover={{ y: -6, borderColor: 'rgba(250,204,21,0.4)' }}
              transition={{ duration: 0.3 }}
              className='bg-neutral-950 border border-white/5 rounded-2xl p-6 cursor-default'
            >
              <div className='text-yellow-400 text-2xl mb-4'>{icon}</div>
              <h3 className='text-white font-semibold text-base mb-2'>{title}</h3>
              <p className='text-neutral-400 text-sm leading-relaxed'>{desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── Team ── */}
      <section className='py-24 px-6 max-w-5xl mx-auto text-center'>
        <motion.div {...fadeUp(0)} className='mb-14'>
          <p className='text-yellow-400 uppercase tracking-[0.3em] text-xs font-semibold mb-3'>
            The People
          </p>
          <h2 className='text-4xl font-extrabold'>Meet the Team</h2>
        </motion.div>

        <motion.div
          className='flex flex-wrap justify-center gap-8'
          initial='hidden'
          whileInView='show'
          viewport={{ once: true }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
        >
          {team.map(({ name, role, initials }) => (
            <motion.div
              key={name}
              variants={{
                hidden: { opacity: 0, y: 24 },
                show: { opacity: 1, y: 0, transition: { duration: 0.55 } }
              }}
              whileHover={{ y: -4 }}
              className='flex flex-col items-center gap-3 w-44'
            >
              <div className='w-20 h-20 rounded-full bg-yellow-400/10 border border-yellow-400/30
                flex items-center justify-center text-yellow-400 font-bold text-lg'>
                {initials}
              </div>
              <div>
                <p className='text-white font-semibold text-sm'>{name}</p>
                <p className='text-white text-xs mt-0.5'>{role}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── CTA ── */}
      <section className='relative bg-neutral-950 border-t border-white/5 
      py-24 px-6 text-center overflow-hidden'>
        <div className='absolute inset-0 flex items-center justify-center pointer-events-none'>
          <div className='w-[500px] h-[500px] rounded-full border border-yellow-400/5' />
        </div>

        <div className='relative z-10 max-w-xl mx-auto'>
          <motion.h2
            {...fadeUp(0)}
            className='text-4xl font-extrabold mb-4'
          >
            Ready to Create Something <span className='text-yellow-400'>Unforgettable?</span>
          </motion.h2>
          <motion.p
            {...fadeUp(0.1)}
            className='text-white mb-8 leading-relaxed'
          >
            Let's bring your vision to life. Reach out and let's 
            start planning your perfect event today.
          </motion.p>
          <motion.div
            {...fadeUp(0.2)}
            className='flex flex-wrap justify-center gap-4'
          >
            <motion.button
              initial='rest' whileHover='hover' whileTap='tap'
              variants={{ rest: { scale: 1 }, hover: { scale: 1.05 }, tap: { scale: 0.97 } }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              onClick={() => navigate('/contact')}
              className='bg-yellow-400 text-black font-bold px-8 py-3.5 rounded-full text-sm
              shadow-lg shadow-yellow-400/20 hover:bg-yellow-300 transition-colors'
            >
              Contact Us
            </motion.button>
            <motion.button
              initial='rest' whileHover='hover' whileTap='tap'
              variants={{ rest: { scale: 1 }, hover: { scale: 1.05 }, tap: { scale: 0.97 } }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              onClick={() => navigate('/booking')}
              className='bg-transparent text-yellow-400 font-bold px-8 py-3.5 rounded-full text-sm
              border border-yellow-400/50 hover:bg-yellow-400/10 transition-colors'
            >
              Book an Event
            </motion.button>
          </motion.div>
        </div>
      </section>

    </div>
  )
}

export default About