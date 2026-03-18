import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import video1 from '../assets/video1.mp4'
import video2 from '../assets/video2.mp4'
import fcmb from '../assets/fcmb.mp4'
import wedv from '../assets/wedv.mp4'
import setup from '../assets/setup.jpg'
import wed1 from '../assets/wed1.jpg'
import wed2 from '../assets/wed2.jpg'
import wed3 from '../assets/wed3.jpg'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }
})

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } }
}

const cardVariants = {
  hidden: { opacity: 0, y: 36 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
}

const buttonVariants = {
  rest: { scale: 1 },
  hover: { scale: 1.05 },
  tap: { scale: 0.96 }
}

const Home = () => {
  const [activeVideo, setActiveVideo] = useState(null)
  const navigate = useNavigate()

  const eventVideos = [
    { src: video2, type: 'video/mp4', title: 'Birthday Party', description: 'Memorable birthday celebrations' },
    { src: video1, type: 'video/mp4', title: 'Wedding Ceremony', description: 'Elegant wedding ceremonies' },
    { src: fcmb, type: 'video/mp4', title: 'Corporate Events', description: 'Professional corporate gatherings' },
    { src: wedv, type: 'video/webm', title: 'Wedding Reception', description: 'Elegant wedding receptions' },
  ]

  const imglinks = [
    { src: setup, title: 'Event Setup', description: 'Beautiful event setups' },
    { src: wed1, title: 'Classic Entrance', description: 'Classic entrance moments' },
    { src: wed2, title: 'Wedding Ceremony', description: 'Elegant wedding ceremonies' },
    { src: wed3, title: 'Wedding Ceremony', description: 'Elegant wedding ceremonies' },
  ]

  return (
    <div className='min-h-screen bg-neutral-950 text-white font-sans'>

      {/* ── Hero ── */}
      <section
        className='relative h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden'
        style={{ backgroundImage: `url(${setup})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        {/* Dark overlay */}
        <div className='absolute inset-0 bg-black/60' />

        {/* Thin gold top border accent */}
        <div className='absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-yellow-400 to-transparent' />

        <div className='relative z-10 max-w-4xl mx-auto'>
          <motion.p
            {...fadeUp(0.1)}
            className='text-yellow-400 uppercase tracking-[0.3em] text-xs font-semibold mb-6'
          >
            Premium Event Planning
          </motion.p>

          <motion.h1
            {...fadeUp(0.25)}
            className='text-5xl md:text-7xl font-extrabold leading-tight mb-6'
          >
            Your Guests Experience{' '}
            <span className='text-yellow-400'>the Best</span>
          </motion.h1>

          <motion.p
            {...fadeUp(0.4)}
            className='text-lg md:text-xl text-white/70 max-w-xl mx-auto mb-10 leading-relaxed'
          >
            We plan unforgettable events tailored just for you and your loved ones.
          </motion.p>

          <motion.div {...fadeUp(0.55)}>
            <Link
              to='/booking'
              className='inline-block bg-yellow-400 text-black font-bold px-10 py-4 rounded-full
              hover:bg-yellow-300 transition-colors text-base shadow-2xl shadow-yellow-400/20'
            >
              Book an Event
            </Link>
          </motion.div>
        </div>

        {/* Scroll hint */}
        <motion.div
          className='absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1'
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
        >
          <span className='text-white/40 text-xs tracking-widest uppercase'>Scroll</span>
          <motion.div
            className='w-px h-8 bg-white/20'
            animate={{ scaleY: [1, 0.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </motion.div>
      </section>

      {/* ── Event Highlights ── */}
      <section className='px-6 py-24 max-w-6xl mx-auto'>
        <motion.div
          className='text-center mb-14'
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}
        >
          <p className='text-yellow-400 uppercase tracking-[0.3em] text-xs font-semibold mb-3'>
            Showreel
          </p>
          <h2 className='text-4xl md:text-5xl font-bold'>
            Event <span className='text-yellow-400'>Highlights</span>
          </h2>
        </motion.div>

        <motion.div
          className='grid grid-cols-1 sm:grid-cols-2 gap-6'
          variants={containerVariants}
          initial='hidden'
          whileInView='show'
          viewport={{ once: true }}
        >
          {eventVideos.map((video, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ y: -4, boxShadow: '0 24px 48px rgba(0,0,0,0.4)' }}
              onClick={() => setActiveVideo(index === activeVideo ? null : index)}
              className={`relative rounded-2xl overflow-hidden cursor-pointer border transition-colors duration-300
                ${activeVideo === index ? 'border-yellow-400' : 'border-white/10 hover:border-yellow-400/40'}`}
            >
              <video
                src={video.src}
                autoPlay loop muted controls
                className='w-full h-60 object-cover'
              />
              <div className='bg-neutral-900 px-5 py-4 border-t border-white/5'>
                <h4 className='text-base font-semibold text-yellow-300'>{video.title}</h4>
                <p className='text-sm text-neutral-400 mt-0.5'>{video.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── Classic Experiences ── */}
      <section className='bg-white text-neutral-900 py-24 px-6'>
        <motion.div
          className='text-center mb-14'
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}
        >
          <p className='text-yellow-300 uppercase tracking-[0.3em] text-4xs
          font-semibold mb-3'>
          memorable Moments
          </p>
          <h2 className='text-4xl md:text-5xl font-bold text-indigo-900'>
            Classic Experiences
          </h2>
          <p className='text-neutral-500 mt-3 text-base max-w-md mx-auto'>
            Timeless moments, curated for you
          </p>
        </motion.div>

        <motion.div
          className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto'
          variants={containerVariants}
          initial='hidden'
          whileInView='show'
          viewport={{ once: true }}
        >
          {imglinks.map((img, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ y: -6, boxShadow: '0 24px 48px rgba(0,0,0,0.15)' }}
              transition={{ duration: 0.3 }}
              className='group relative rounded-2xl overflow-hidden border border-neutral-100 cursor-pointer'
            >
              <div className='relative h-64 overflow-hidden'>
                <motion.img
                  src={img.src}
                  alt={img.title}
                  className='w-full h-full object-cover'
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.45, ease: [0.34, 1.56, 0.64, 1] }}
                />
                <motion.div
                  className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent'
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.35 }}
                />
                <motion.div
                  className='absolute bottom-0 left-0 right-0 p-4'
                  initial={{ opacity: 0, y: 10 }}
                  whileHover={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35 }}
                >
                  <h4 className='text-base font-semibold text-white'>{img.title}</h4>
                  <p className='text-sm text-white/70 mt-1 leading-snug'>{img.description}</p>
                </motion.div>
              </div>
              <motion.div
                className='bg-neutral-950 px-4 py-3'
                whileHover={{ backgroundColor: '#1e1b4b' }}
                transition={{ duration: 0.3 }}
              >
                <h4 className='text-sm font-medium text-yellow-300 tracking-wide'>{img.title}</h4>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── Who is 20706 ── */}
      <section className='relative bg-neutral-950 py-28 px-6 text-center overflow-hidden'>
        {/* Decorative gold ring */}
        <div className='absolute inset-0 flex items-center justify-center pointer-events-none'>
          <div className='w-[600px] h-[600px] rounded-full border border-yellow-400/5' />
        </div>
        <div className='absolute inset-0 flex items-center justify-center pointer-events-none'>
          <div className='w-[400px] h-[400px] rounded-full border border-yellow-400/10' />
        </div>

        <div className='relative z-10 max-w-2xl mx-auto'>
          <motion.p
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }}
            className='text-yellow-400 uppercase tracking-[0.3em] text-xs font-semibold mb-4'
          >
            About Us
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}
            className='text-4xl md:text-5xl font-extrabold text-white mb-6'
          >
            Who is <span className='text-yellow-400'>2706?</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}
            className='text-neutral-400 text-base leading-relaxed mb-10'
          >
            We are dedicated to making your events unforgettable. From intimate gatherings
            to grand celebrations, we handle every detail so you can enjoy every moment.
            Contact us today to start planning your perfect celebration.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }}
            className='flex flex-wrap justify-center gap-4'
          >
            <motion.button
              variants={buttonVariants}
              initial='rest'
              whileHover='hover'
              whileTap='tap'
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              onClick={() => navigate('/contact')}
              className='bg-yellow-400 text-black font-bold px-8 py-3.5 rounded-full text-sm shadow-lg shadow-yellow-400/20 hover:bg-yellow-300 transition-colors'
            >
              Contact Us
            </motion.button>

            <motion.button
              variants={buttonVariants}
              initial='rest'
              whileHover='hover'
              whileTap='tap'
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              onClick={() => navigate('/booking')}
              className='bg-transparent text-yellow-400 font-bold px-8 py-3.5 rounded-full text-sm border border-yellow-400/50 hover:bg-yellow-400/10 transition-colors'
            >
              Book an Event
            </motion.button>
          </motion.div>
        </div>
      </section>

    </div>
  )
}

export default Home