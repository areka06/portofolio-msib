/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Send, Code, Github, Linkedin, Mail, ExternalLink, ChevronDown, ChevronUp, Menu, X, MousePointer2, Sun, Moon, Calendar, ArrowUp, Zap, Globe, Shield, ChevronLeft, ChevronRight, MessageCircle, User } from 'lucide-react'
import dynamic from 'next/dynamic'

const PDFViewer = dynamic(() => import('@react-pdf-viewer/core').then(mod => mod.Viewer), {
  ssr: false,
  loading: () => <div>Loading PDF viewer...</div>
})

import '@react-pdf-viewer/core/lib/styles/index.css'

const MotionLink = motion(Link)

const projects = [
  {
    id: 1,
    title: "Responsive E-commerce UI",
    description: "A modern, responsive e-commerce user interface built with React and Tailwind CSS",
    image: "/placeholder.svg",
    technologies: ['React', 'Tailwind CSS', 'Next.js', 'Framer Motion'],
    codeLink: "#",
    demoLink: "#",
    longDescription: "This project showcases a fully responsive e-commerce user interface, leveraging the power of React for component-based architecture and Tailwind CSS for rapid, utility-first styling. The UI includes features such as a dynamic product grid, responsive navigation, and animated transitions powered by Framer Motion. Next.js is utilized for server-side rendering and optimal performance."
  },
  {
    id: 2,
    title: "Interactive Data Visualization Dashboard",
    description: "A dynamic dashboard for visualizing complex datasets using D3.js and React",
    image: "/placeholder.svg",
    technologies: ['React', 'D3.js', 'CSS Modules', 'Redux'],
    codeLink: "#",
    demoLink: "#",
    longDescription: "This interactive dashboard brings data to life through a variety of customizable charts and graphs. Built with React for the UI and D3.js for powerful data visualization capabilities, it allows users to explore and analyze complex datasets with ease. The project utilizes CSS Modules for scoped styling and Redux for efficient state management across the application."
  },
  {
    id: 3,
    title: "Progressive Web App for Task Management",
    description: "A PWA that offers offline functionality and real-time updates for task management",
    image: "/placeholder.svg",
    technologies: ['React', 'TypeScript', 'Service Workers', 'IndexedDB'],
    codeLink: "#",
    demoLink: "#",
    longDescription: "This Progressive Web App (PWA) provides a seamless task management experience, whether online or offline. Built with React and TypeScript for type safety, it leverages Service Workers for offline functionality and IndexedDB for local data storage. The app features real-time updates when online, smooth animations, and a responsive design that works across all devices."
  },
  {
    id: 4,
    title: "Accessibility-Focused Blog Template",
    description: "A highly accessible and customizable blog template adhering to WCAG guidelines",
    image: "/placeholder.svg",
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'ARIA'],
    codeLink: "#",
    demoLink: "#",
    longDescription: "This project is a testament to inclusive web design, offering a blog template that prioritizes accessibility. Built with semantic HTML5, CSS3, and vanilla JavaScript, it adheres strictly to WCAG guidelines. The template includes proper ARIA labels, keyboard navigation support, high contrast modes, and is screen reader friendly. It serves as both a functional blog template and an educational resource for accessibility best practices in front-end development."
  }
]

const skills = [
  { name: "React & React Ecosystem", icon: <Code size={20} />, progress: 95 },
  { name: "JavaScript / TypeScript", icon: <Code size={20} />, progress: 90 },
  { name: "HTML5 & CSS3", icon: <Code size={20} />, progress: 95 },
  { name: "Responsive Web Design", icon: <Code size={20} />, progress: 92 },
  { name: "UI/UX Design Principles", icon: <Code size={20} />, progress: 85 },
  { name: "Web Performance Optimization", icon: <Code size={20} />, progress: 88 },
  { name: "Version Control (Git)", icon: <Code size={20} />, progress: 90 },
  { name: "Frontend Build Tools", icon: <Code size={20} />, progress: 85 }
]

const certifications = [
  { title: "React Developer Certification", issuer: "Meta", year: 2023, link: "https://www.coursera.org/account/accomplishments/specialization/XXXXXXXX" },
  { title: "Front-End Web Development with React", issuer: "The Hong Kong University of Science and Technology", year: 2022, link: "https://www.coursera.org/account/accomplishments/verify/XXXXXXXX" },
  { title: "JavaScript Algorithms and Data Structures", issuer: "freeCodeCamp", year: 2022, link: "https://www.freecodecamp.org/certification/fcc_username/javascript-algorithms-and-data-structures" },
  { title: "Responsive Web Design", issuer: "freeCodeCamp", year: 2021, link: "https://www.freecodecamp.org/certification/fcc_username/responsive-web-design" },
  { title: "UI/UX Design Specialization", issuer: "California Institute of the Arts", year: 2021, link: "https://www.coursera.org/account/accomplishments/specialization/XXXXXXXX" },
  { title: "Web Accessibility", issuer: "Google", year: 2020, link: "https://www.udacity.com/course/web-accessibility--ud891" }
]

const galleryItems = [
  { id: 1, src: "/placeholder.svg", alt: "UI Design Screenshot 1" },
  { id: 2, src: "/placeholder.svg", alt: "Responsive Layout Example" },
  { id: 3, src: "/placeholder.svg", alt: "Interactive Component Demo" },
  { id: 4, src: "/placeholder.svg", alt: "Data Visualization Chart" },
  { id: 5, src: "/placeholder.svg", alt: "Mobile App Interface" },
  { id: 6, src: "/placeholder.svg", alt: "Accessibility Features Showcase" },
]

const newFeatures = [
  {
    title: "Advanced React Hooks Usage",
    description: "Implement complex state management and side effects with custom React hooks",
    icon: <Zap className="w-6 h-6" />
  },
  {
    title: "Micro-Frontend Architecture",
    description: "Build scalable applications using micro-frontend techniques",
    icon: <Globe className="w-6 h-6" />
  },
  {
    title: "A11y-Driven Development",
    description: "Prioritize accessibility from the ground up in all projects",
    icon: <Shield className="w-6 h-6" />
  }
]

const pdfPortfolio = "/porto.pdf" // Replace with actual PDF path when available

// Add maxPages constant (adjust the number based on your actual PDF)
const maxPages = 10  // Set this to your PDF's total pages

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
}

export default function Component() {
  const [isDark, setIsDark] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [showAllCertificates, setShowAllCertificates] = useState(false)
  const [showAllProjects, setShowAllProjects] = useState(false)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(true)
  const [selectedProject, setSelectedProject] = useState<null | typeof projects[0]>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [loadingProgress, setLoadingProgress] = useState(0)
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [currentMessage, setCurrentMessage] = useState('')
  const chatRef = useRef<HTMLDivElement>(null)

  const galleryRef = useRef<HTMLDivElement>(null)
  const [galleryWidth, setGalleryWidth] = useState(0)

  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8])

  const [showChatButton, setShowChatButton] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'projects', 'skills', 'certifications', 'gallery', 'pdf-portfolio', 'contact']
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element && scrollPosition >= element.offsetTop && scrollPosition < element.offsetTop + element.offsetHeight) {
          setActiveSection(section)
          break
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (galleryRef.current) {
      setGalleryWidth(galleryRef.current.scrollWidth - galleryRef.current.offsetWidth)
    }
  }, [])

  useEffect(() => {
    let progress = 0
    const interval = setInterval(() => {
      progress += 1
      setLoadingProgress(Math.min(progress, 100))
      
      if (progress >= 100) {
        clearInterval(interval)
        setTimeout(() => setLoading(false), 500)
      }
    }, 25)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight
    }
  }, [messages])

  useEffect(() => {
    // Check if user prefers dark mode
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    setIsDark(prefersDark)
  }, [])

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const handleScroll = () => {
      clearTimeout(timeoutId);
      
      timeoutId = setTimeout(() => {
        const shouldShow = window.scrollY > 100;
        setShowChatButton(shouldShow);
      }, 150); // Meningkatkan delay debounce
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timeoutId);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      setIsScrolled(scrollPosition > 20)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", { name, email, message })
    alert("Thank you for your message! I'll get back to you soon.")
    setName("")
    setEmail("")
    setMessage("")
  }

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!currentMessage.trim()) return

    const userMessage: Message = {
      id: Date.now(),
      text: currentMessage,
      sender: 'user'
    }
    setMessages(prev => [...prev, userMessage])
    setCurrentMessage('')

    setTimeout(() => {
      const botMessage: Message = {
        id: Date.now(),
        text: "Thanks for your message! This is a demo response.",
        sender: 'bot'
      }
      setMessages(prev => [...prev, botMessage])
    }, 1000)
  }

  const navItems = ['Home', 'Projects', 'Skills', 'Certifications', 'Gallery', 'PDF Portfolio', 'Contact']

  const loadingText = "Front-End Developer Crafting Engaging Experiences"
  const loadingWords = loadingText.split(" ")

  // Theme styles object
  const themeStyles = {
    background: isDark ? 'bg-black text-white' : 'bg-white text-black',
    card: isDark ? 'bg-white/5 border-white/10' : 'bg-gray-50 border-gray-200',
    button: isDark ? 'bg-white/10 hover:bg-white/20 text-white' : 'bg-gray-100 hover:bg-gray-200 text-black',
    input: isDark ? 'bg-white/5 border-white/10' : 'bg-white border-gray-200',
    nav: isDark ? 'bg-black/50 border-white/10' : 'bg-white/50 border-gray-200',
    text: {
      primary: isDark ? 'text-white' : 'text-black',
      secondary: isDark ? 'text-gray-400' : 'text-gray-600',
      muted: isDark ? 'text-gray-500' : 'text-gray-400'
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <AnimatePresence>
        {loading && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-md flex items-center justify-center"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center relative max-w-2xl w-full px-4">
              <motion.h1 className="text-6xl font-bold relative mb-6">
                {loadingWords.map((word, index) => (
                  <motion.span
                    key={index}
                    className="inline-block mr-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.15,
                      ease: "easeInOut"
                    }}
                  >
                    {word}
                  </motion.span>
                ))}
              </motion.h1>
              
              {/* Smaller Animated Dots */}
              <div className="flex justify-center items-center gap-1 mt-4">
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-1 h-1 bg-white rounded-full"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.5, 1, 0.5]
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      delay: i * 0.2,
                      ease: "easeInOut"
                    }}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation */}
      <motion.nav
        initial={false}
        animate={{
          backgroundColor: isScrolled ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0, 0, 0, 0.4)',
          backdropFilter: isScrolled ? 'blur(12px)' : 'blur(8px)',
          width: isScrolled ? '100%' : '90%',
          x: '-50%',
          left: isScrolled ? '50%' : '50%',
          top: isScrolled ? '0' : '20px',
          borderRadius: isScrolled ? '0px' : '16px',
        }}
        transition={{
          duration: 0.3,
          ease: "easeInOut"
        }}
        className={`fixed z-50 transition-all duration-300
          ${isScrolled 
            ? 'border-b border-white/10' 
            : 'border border-white/10 shadow-lg'}`}
      >
        <motion.div 
          className="mx-auto px-4 sm:px-6 lg:px-8"
          animate={{
            padding: isScrolled ? "0 2rem" : "0 1.5rem",
          }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="text-xl font-bold text-white">
              Portfolio
            </Link>
            <div className={`hidden md:flex space-x-8 ${
              isScrolled ? 'py-4' : 'py-2'
            } transition-all duration-300`}>
              {navItems.map((item) => (
                <motion.div
                  key={item}
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <Link
                    href={`#${item.toLowerCase().replace(' ', '-')}`}
                    className={`text-sm hover:text-white transition-colors relative px-3 py-2
                      ${activeSection === item.toLowerCase().replace(' ', '-') 
                        ? 'text-white' 
                        : 'text-gray-300'}`}
                  >
                    {item}
                    <motion.div
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-white"
                      initial={false}
                      animate={{
                        opacity: activeSection === item.toLowerCase().replace(' ', '-') ? 1 : 0
                      }}
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  </Link>
                </motion.div>
              ))}
              <button
                onClick={() => setIsDark(!isDark)}
                className={`p-2 rounded-lg transition-colors ${
                  isDark 
                    ? 'bg-white/10 hover:bg-white/20' 
                    : 'bg-black/10 hover:bg-black/20'
                }`}
              >
                {isDark ? (
                  <Sun className="w-5 h-5 text-white" />
                ) : (
                  <Moon className="w-5 h-5 text-black" />
                )}
              </button>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="text-white" /> : <Menu className="text-white" />}
            </Button>
          </div>
        </motion.div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-sm flex flex-col items-center justify-center"
          >
            {navItems.map((item) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <Link
                  href={`#${item.toLowerCase().replace(' ', '-')}`}
                  className={`text-2xl py-2 ${
                    activeSection === item.toLowerCase().replace(' ', '-') 
                      ? 'text-white' 
                      : 'text-gray-400'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <motion.section
        id="home"
        className="pt-32 pb-16 px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: loading ? 0 : 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1 
            className="text-5xl sm:text-6xl font-bold tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: loading ? 0 : 1, y: loading ? 20 : 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            Front-End Developer
          </motion.h1>
          <motion.p 
            className="mt-6 text-lg text-gray-400 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: loading ? 0 : 1, y: loading ? 20 : 0 }}
            transition={{ duration: 0.5, delay: 0.9 }}
          >
            Crafting engaging user experiences with modern web technologies
          </motion.p>
          <motion.div 
            className="mt-10 flex justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: loading ? 0 : 1, y: loading ? 20 : 0 }}
            transition={{ duration: 0.5, delay: 1.1 }}
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
      <motion.section 
        className="py-20 px-4 bg-white/5"
        initial={{ opacity: 0 }}
        animate={{ opacity: loading ? 0 : 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Specialized Skills</h2>
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
      </motion.section>

      {/* Projects Section */}
      <motion.section 
        id="projects" 
        className="py-20 px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: loading ? 0 : 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
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
      </motion.section>

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
              className="bg-black border border-white/10 rounded-lg p-6 max-w-4xl w-full relative z-10"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/2">
                  <Image
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    width={600}
                    height={400}
                    className="rounded-lg object-cover w-full h-64 md:h-full"
                  />
                </div>
                <div className="md:w-1/2">
                  <h2 className="text-2xl font-bold mb-4">{selectedProject.title}</h2>
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
                </div>
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
      <motion.section 
        id="skills" 
        className="py-20 px-4 bg-white/5"
        initial={{ opacity: 0 }}
        animate={{ opacity: loading ? 0 : 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
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
      </motion.section>

      {/* Certifications Section */}
      <motion.section 
        id="certifications" 
        className="py-20 px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: loading ? 0 : 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
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
      </motion.section>

      {/* Gallery Section */}
      <motion.section 
        id="gallery" 
        className="py-20 px-4 overflow-hidden bg-white/5"
        initial={{ opacity: 0 }}
        animate={{ opacity: loading ? 0 : 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Project Gallery</h2>
          <motion.div 
            ref={galleryRef}
            className="cursor-default"
          >
            <motion.div 
              className="flex"
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
      </motion.section>

      {/* PDF Portfolio Section */}
      <motion.section 
        id="pdf-portfolio" 
        className="py-12 sm:py-16 md:py-20 px-4 bg-white/5"
        initial={{ opacity: 0 }}
        animate={{ opacity: loading ? 0 : 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <div className="max-w-[280px] sm:max-w-md md:max-w-xl lg:max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 md:mb-12 text-center">PDF Portfolio</h2>
          <div className="bg-white/10 rounded-lg p-2 sm:p-3 md:p-4">
            <div className="w-full h-[40vh] sm:h-[50vh] md:h-[60vh] max-h-[600px] relative">
              <object
                data={`${pdfPortfolio}#page=${currentPage}&view=FitH&zoom=page-fit&scrollbar=0`}
                type="application/pdf"
                className="absolute inset-0 w-full h-full"
              >
                <iframe 
                  src={`${pdfPortfolio}#page=${currentPage}&view=FitH&zoom=page-fit&scrollbar=0`}
                  className="absolute inset-0 w-full h-full"
                  title="PDF Portfolio"
                  style={{ 
                    width: '100%',
                    height: '100%',
                    border: 'none',
                    overflow: 'hidden'
                  }}
                />
              </object>
            </div>
            <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4 mt-3 sm:mt-4">
              <Button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white text-sm sm:text-base"
                disabled={currentPage <= 1}
              >
                <ChevronLeft className="w-4 h-4 mr-1 sm:mr-2" />
                Previous
              </Button>
              <span className="text-white text-sm sm:text-base order-first sm:order-none">
                Page {currentPage} of {maxPages}
              </span>
              <Button
                onClick={() => setCurrentPage(Math.min(maxPages, currentPage + 1))}
                className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white text-sm sm:text-base"
                disabled={currentPage >= maxPages}
              >
                Next
                <ChevronRight className="w-4 h-4 ml-1 sm:ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Contact Section */}
      <motion.section 
        id="contact" 
        className="py-20 px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: loading ? 0 : 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
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
                className="text-gray-400 hover:text-white transition-colors">
                {social.icon}
              </Link>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="py-8 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-400">
          <p>© 2024 Your Name. All rights reserved.</p>
        </div>
      </footer>

      {/* Chatbot Button - Minimal Dark Style */}
      <AnimatePresence mode="wait">
        {showChatButton && (
          <motion.button
            onClick={() => setIsChatOpen(true)}
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: 1,
              transition: {
                duration: 0.3,
                ease: "easeOut"
              }
            }}
            exit={{ 
              opacity: 0,
              y: 20,
              scale: 0.95,
              transition: {
                duration: 0.2,
                ease: "easeInOut"
              }
            }}
            whileHover={{ 
              scale: 1.1,
              transition: {
                type: "spring",
                stiffness: 400,
                damping: 10
              }
            }}
            whileTap={{ scale: 0.9 }}
            className="fixed bottom-6 right-6 p-4 rounded-lg shadow-lg 
              bg-black border border-white/10 hover:bg-white/10
              transition-all duration-300 group z-50"
          >
            <div className="relative">
              <MessageCircle className="w-6 h-6 text-white transition-transform duration-500 group-hover:rotate-12" />
              <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-white animate-pulse" />
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chatbot Modal - Dark Theme */}
      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 w-80 sm:w-96 rounded-lg shadow-lg z-40 
              bg-black border border-white/10"
          >
            {/* Chat Header */}
            <div className="p-4 border-b border-white/10 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <div className="w-2 h-2 rounded-full bg-white absolute -right-1 -top-1" />
                  <MessageCircle className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-medium text-white">Chat with me</h3>
              </div>
              <button
                onClick={() => setIsChatOpen(false)}
                className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
              >
                <X className="w-4 h-4 text-white" />
              </button>
            </div>

            {/* Chat Messages */}
            <div 
              ref={chatRef}
              className="p-0 h-96 overflow-y-auto scroll-smooth bg-black"
            >
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`w-full ${
                    message.sender === 'user' ? 'bg-black' : 'bg-[#0c0c0c]'
                  }`}
                >
                  <div className="max-w-3xl mx-auto p-4 flex gap-6 text-base md:gap-8 md:py-6 lg:px-8">
                    <div className="flex-shrink-0 w-[30px]">
                      {message.sender === 'bot' ? (
                        <div className="w-[30px] h-[30px] rounded-sm bg-[#1a1a1a] border border-[#333333] flex items-center justify-center">
                          <MessageCircle className="w-5 h-5 text-[#888888]" />
                        </div>
                      ) : (
                        <div className="w-[30px] h-[30px] rounded-sm bg-[#1a1a1a] border border-[#333333] flex items-center justify-center">
                          <User className="w-5 h-5 text-[#888888]" />
                        </div>
                      )}
                    </div>
                    <div className="min-h-[20px] flex flex-1 flex-col items-start gap-3 overflow-x-auto whitespace-pre-wrap break-words">
                      <div className="prose prose-invert w-full text-[#d1d1d1]">
                        {message.text}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Chat Input */}
            <div className="border-t border-[#333333] bg-black">
              <form 
                onSubmit={handleSendMessage}
                className="stretch mx-2 flex flex-row gap-3 last:mb-2 md:mx-4 md:last:mb-6 lg:mx-auto lg:max-w-3xl"
              >
                <div className="relative flex h-full flex-1 items-stretch md:flex-col">
                  <div className="relative flex flex-col w-full flex-grow p-4">
                    <Input
                      value={currentMessage}
                      onChange={(e) => setCurrentMessage(e.target.value)}
                      placeholder="Send a message..."
                      className="w-full resize-none bg-[#1a1a1a] border-[#333333] focus-visible:ring-0 focus-visible:ring-offset-0 text-[#d1d1d1] placeholder:text-[#888888] py-6 pr-12"
                    />
                    <Button 
                      type="submit"
                      size="icon"
                      className="absolute right-6 bottom-6 bg-transparent hover:bg-transparent text-[#888888] hover:text-[#d1d1d1]"
                      disabled={!currentMessage.trim()}
                    >
                      <Send className="w-5 h-5" />
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}