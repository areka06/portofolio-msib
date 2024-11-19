'use client'

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Code, Github, Linkedin, Mail, ExternalLink, Menu, X, Zap, Globe, Shield } from 'lucide-react'

const MotionLink = motion(Link)

const projects = [
  {
    id: 1,
    title: "E-commerce Platform",
    description: "A modern e-commerce solution with real-time inventory and dynamic pricing",
    image: "/placeholder.svg",
    technologies: ['Next.js', 'React', 'Prisma', 'Stripe'],
    codeLink: "#",
    demoLink: "#",
    longDescription: "This e-commerce platform leverages Next.js for server-side rendering, React for a dynamic user interface, Prisma for efficient database management, and Stripe for secure payment processing. It features real-time inventory updates, dynamic pricing based on demand and supply, and a responsive design for optimal user experience across devices."
  },
  {
    id: 2,
    title: "AI Content Generator",
    description: "Content generation platform powered by machine learning",
    image: "/placeholder.svg",
    technologies: ['Python', 'TensorFlow', 'React', 'FastAPI'],
    codeLink: "#",
    demoLink: "#",
    longDescription: "Our AI Content Generator utilizes advanced machine learning algorithms implemented in Python and TensorFlow to create high-quality, context-aware content. The React frontend provides an intuitive interface for users to input parameters and receive generated content, while FastAPI ensures quick and efficient backend operations."
  },
  {
    id: 3,
    title: "Real-time Analytics",
    description: "Dashboard for monitoring and analyzing user behavior",
    image: "/placeholder.svg",
    technologies: ['Next.js', 'D3.js', 'WebSocket', 'PostgreSQL'],
    codeLink: "#",
    demoLink: "#",
    longDescription: "This real-time analytics dashboard offers instant insights into user behavior. Built with Next.js for seamless server-side rendering and client-side navigation, it uses D3.js for creating interactive and responsive data visualizations. WebSocket connections ensure live updates, while PostgreSQL provides robust data storage and querying capabilities."
  },
  {
    id: 4,
    title: "Task Management App",
    description: "Collaborative task manager with real-time updates",
    image: "/placeholder.svg",
    technologies: ['React', 'Firebase', 'Material-UI'],
    codeLink: "#",
    demoLink: "#",
    longDescription: "Our Task Management App streamlines team collaboration with real-time updates. React provides a smooth and responsive user interface, while Firebase handles real-time data synchronization and user authentication. Material-UI ensures a consistent and attractive design across the application, enhancing usability and user experience."
  }
]

const skills = [
  { name: "Frontend Development", icon: <Code size={20} />, progress: 95 },
  { name: "Backend Architecture", icon: <Code size={20} />, progress: 85 },
  { name: "Cloud Infrastructure", icon: <Code size={20} />, progress: 90 },
  { name: "DevOps & CI/CD", icon: <Code size={20} />, progress: 88 },
  { name: "UI/UX Design", icon: <Code size={20} />, progress: 80 },
  { name: "Mobile App Development", icon: <Code size={20} />, progress: 75 },
  { name: "Database Management", icon: <Code size={20} />, progress: 92 },
  { name: "API Design", icon: <Code size={20} />, progress: 87 }
]

const certifications = [
  { title: "AWS Certified Solutions Architect", issuer: "Amazon Web Services", year: 2023, link: "https://www.credly.com/org/amazon-web-services/badge/aws-certified-solutions-architect-associate" },
  { title: "Google Cloud Professional Developer", issuer: "Google Cloud", year: 2022, link: "https://www.credential.net/credential-template?key=google_cloud_professional_developer" },
  { title: "Certified Kubernetes Administrator", issuer: "Cloud Native Computing Foundation", year: 2022, link: "https://www.cncf.io/certification/cka/" },
  { title: "React Native Specialist", issuer: "React Native Academy", year: 2021, link: "https://reactnative.dev/docs/certificate" },
  { title: "Advanced Machine Learning", issuer: "Stanford Online", year: 2021, link: "https://online.stanford.edu/programs/advanced-machine-learning-program" },
  { title: "Full Stack Web Development", issuer: "FreeCodeCamp", year: 2020, link: "https://www.freecodecamp.org/certification/fcc_username/full-stack" }
]

const galleryItems = [
  { id: 1, src: "/placeholder.svg", alt: "Project Screenshot 1" },
  { id: 2, src: "/placeholder.svg", alt: "Project Screenshot 2" },
  { id: 3, src: "/placeholder.svg", alt: "Project Screenshot 3" },
  { id: 4, src: "/placeholder.svg", alt: "Project Screenshot 4" },
  { id: 5, src: "/placeholder.svg", alt: "Project Screenshot 5" },
  { id: 6, src: "/placeholder.svg", alt: "Project Screenshot 6" },
]

const newFeatures = [
  {
    title: "AI-Powered Code Generation",
    description: "Utilize cutting-edge AI to assist in code generation and problem-solving",
    icon: <Zap className="w-6 h-6" />
  },
  {
    title: "Global Remote Collaboration",
    description: "Seamlessly work with teams across different time zones and cultures",
    icon: <Globe className="w-6 h-6" />
  },
  {
    title: "Advanced Security Implementation",
    description: "Implement state-of-the-art security measures in all projects",
    icon: <Shield className="w-6 h-6" />
  }
]

export default function EnhancedModernPortfolio() {
  const [darkMode, setDarkMode] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [showAllCertificates, setShowAllCertificates] = useState(false)
  const [showAllProjects, setShowAllProjects] = useState(false)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(true)
  const [selectedProject, setSelectedProject] = useState<null | typeof projects[0]>(null)

  const galleryRef = useRef<HTMLDivElement>(null)
  const [galleryWidth, setGalleryWidth] = useState(0)

  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8])

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'projects', 'skills', 'certifications', 'gallery', 'contact']
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element && scrollPosition >= element.offsetTop && scrollPosition < element.offsetTop + element.offsetHeight) {
          setActiveSection(section)
          break
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (galleryRef.current) {
      setGalleryWidth(galleryRef.current.scrollWidth - galleryRef.current.offsetWidth)
    }
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", { name, email, message })
    alert("Thank you for your message! I'll get back to you soon.")
    setName("")
    setEmail("")
    setMessage("")
  }

  const navItems = ['Home', 'Projects', 'Skills', 'Certifications', 'Gallery', 'Contact']

  return (
    <div className={`min-h-screen bg-black text-white`}>
      {/* Loading Animation */}
      <AnimatePresence>
        {loading && (
          <motion.div
            className="fixed inset-0 z-50 bg-black flex items-center justify-center"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <motion.h1
                className="text-6xl font-bold mb-4"
                layout
              >
                Full-Stack Developer
              </motion.h1>
              <motion.p
                className="text-xl text-gray-400"
                layout
              >
                Building high-quality web applications with modern technologies and best practices.
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 backdrop-blur-sm bg-black/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="text-xl font-bold">
              Portfolio
            </Link>
            <div className="hidden md:flex space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className={`text-sm hover:text-white transition-colors ${
                    activeSection === item.toLowerCase() ? 'text-white' : 'text-gray-300'
                  }`}
                >
                  {item}
                </Link>
              ))}
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-black bg-opacity-90 flex flex-col items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {navItems.map((item) => (
              <Link
                key={item}
                href={`#${item.toLowerCase()}`}
                className={`text-2xl py-2 ${
                  activeSection === item.toLowerCase() ? 'text-white' : 'text-gray-400'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <motion.section
        id="home"
        className="pt-32 pb-16 px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1 
            className="text-5xl sm:text-6xl font-bold tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.5 }}
          >
            Full-Stack Developer
          </motion.h1>
          <motion.p 
            className="mt-6 text-lg text-gray-400 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.7 }}
          >
            Building high-quality web applications with modern technologies and best practices.
          </motion.p>
          <motion.div 
            className="mt-10 flex justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.9 }}
          >
            <Button className="bg-white text-black hover:bg-gray-200 px-8 py-3 text-lg">
              View Projects
            </Button>
            <Button variant="outline" className="bg-black/50 border-white/20 hover:bg-white/10 px-8 py-3 text-lg">
              Contact Me
            </Button>
          </motion.div>
        </div>
      </motion.section>

      {/* New Features Section */}
      <section className="py-20 px-4 bg-white/5">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">New Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {newFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="p-6 rounded-lg border border-white/10 bg-black"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="flex items-center mb-4">
                  {feature.icon}
                  <h3 className="text-xl font-semibold ml-2">{feature.title}</h3>
                </div>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Featured Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.slice(0, showAllProjects ? projects.length : 3).map((project, index) => (
              <motion.div
                key={project.id}
                className="group rounded-lg border border-white/10 bg-white/5 overflow-hidden hover:bg-white/10 transition-colors cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => setSelectedProject(project)}
              >
                <div className="aspect-video relative">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2">{project.title}</h3>
                  <p className="text-gray-400 text-sm mb-3">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs px-2 py-1 rounded-full bg-white/10 text-gray-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          {projects.length > 3 && (
            <div className="mt-12 text-center">
              <Button
                onClick={() => setShowAllProjects(!showAllProjects)}
                className="bg-white/10 hover:bg-white/20 text-white text-lg px-8 py-3"
              >
                {showAllProjects ? 'Show Less' : 'Show More'}
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
            />
            <motion.div
              className="bg-black border border-white/10 rounded-lg p-6 max-w-2xl w-full relative z-10"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <h2 className="text-2xl font-bold mb-4">{selectedProject.title}</h2>
              <Image
                src={selectedProject.image}
                alt={selectedProject.title}
                width={600}
                height={400}
                className="rounded-lg mb-4 object-cover w-full"
              />
              <p className="text-gray-300 mb-4">{selectedProject.longDescription}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {selectedProject.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs px-2 py-1 rounded-full bg-white/10 text-gray-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex justify-between">
                <Link
                  href={selectedProject.demoLink}
                  className="text-sm bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-md inline-flex items-center gap-1"
                >
                  <ExternalLink className="w-4 h-4" /> View Demo
                </Link>
                <Link
                  href={selectedProject.codeLink}
                  className="text-sm bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-md inline-flex items-center gap-1"
                >
                  <Code className="w-4 h-4" /> View Code
                </Link>
              </div>
              <Button
                className="absolute top-2 right-2 text-gray-400 hover:text-white"
                variant="ghost"
                size="icon"
                onClick={() => setSelectedProject(null)}
              >
                <X className="w-6 h-6" />
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-4 bg-white/5">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Skills & Expertise</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                className="p-6 rounded-lg border border-white/10 bg-black"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold flex items-center gap-2 text-lg">
                    {skill.icon} {skill.name}
                  </h3>
                  <span className="text-gray-400">{skill.progress}%</span>
                </div>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${skill.progress}%` }}
                  transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                  className="h-2 bg-white/50 rounded-full"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section id="certifications" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Certifications</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {certifications.slice(0, showAllCertificates ? certifications.length : 3).map((cert, index) => (
              <motion.div
                key={cert.title}
                className="p-6 rounded-lg border border-white/10 bg-white/5"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <h3 className="font-bold text-xl mb-2">{cert.title}</h3>
                <p className="text-base text-gray-400">{cert.issuer}</p>
                <p className="text-sm text-gray-500 mb-4">{cert.year}</p>
                <Link
                  href={cert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-md inline-flex items-center gap-1"
                >
                  <ExternalLink className="w-4 h-4" /> View Certificate
                </Link>
              </motion.div>
            ))}
          </div>
          {certifications.length > 3 && (
            <div className="mt-12 text-center">
              <Button
                onClick={() => setShowAllCertificates(!showAllCertificates)}
                className="bg-white/10 hover:bg-white/20 text-white text-lg px-8 py-3"
              >
                {showAllCertificates ? 'Show Less' : 'Show More'}
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-20 px-4 overflow-hidden bg-white/5">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Project Gallery</h2>
          <motion.div 
            ref={galleryRef}
            className="cursor-grab active:cursor-grabbing"
            whileTap={{ cursor: "grabbing" }}
          >
            <motion.div 
              className="flex"
              drag="x"
              dragConstraints={{ right: 0, left: -galleryWidth }}
              initial={{ x: 0 }}
              animate={{ x: -galleryWidth }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 20,
                  ease: "linear",
                },
              }}
            >
              {[...galleryItems, ...galleryItems].map((item, index) => (
                <motion.div
                  key={`${item.id}-${index}`}
                  className="min-w-[300px] h-[200px] p-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    width={300}
                    height={200}
                    className="rounded-lg object-cover w-full h-full"
                  />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4">
        <div className="max-w-xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Get in Touch</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="bg-white/5 border-white/10 text-white placeholder:text-gray-500"
            />
            <Input
              type="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-white/5 border-white/10 text-white placeholder:text-gray-500"
            />
            <Textarea
              placeholder="Your Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 min-h-[150px]"
            />
            <Button type="submit" className="w-full bg-white text-black hover:bg-gray-200 text-lg py-3">
              Send Message
            </Button>
          </form>
          <div className="mt-12 flex justify-center space-x-6">
            {[
              { href: "mailto:example@email.com", icon: <Mail className="w-6 h-6" /> },
              { href: "https://github.com", icon: <Github className="w-6 h-6" /> },
              { href: "https://linkedin.com", icon: <Linkedin className="w-6 h-6" /> }
            ].map((social, index) => (
              <Link
                key={index}
                href={social.href}
                className="text-gray-400 hover:text-white transition-colors"
              >
                {social.icon}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-400">
          <p>© 2024 Your Name. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}