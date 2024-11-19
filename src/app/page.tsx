'use client'

/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Send, Code, Github, Linkedin, Mail, ExternalLink, ChevronDown, ChevronUp, Menu, X, MousePointer2, Sun, Moon, Calendar, ArrowUp, Zap, Globe, Shield, ChevronLeft, ChevronRight } from 'lucide-react'
import { Document, Page, pdfjs } from 'react-pdf'

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`

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

const pdfPortfolio = "/placeholder.pdf" // Replace with actual PDF path when available

export default function Component() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [showAllCertificates, setShowAllCertificates] = useState(false)
  const [showAllProjects, setShowAllProjects] = useState(false)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(true)
  const [selectedProject, setSelectedProject] = useState<null | typeof projects[0]>(null)
  const [numPages, setNumPages] = useState<number | null>(null)
  const [pageNumber, setPageNumber] = useState(1)

  const galleryRef = useRef<HTMLDivElement>(null)
  const [galleryWidth, setGalleryWidth] = useState(0)

  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8])

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
    }, 2000)

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

  const navItems = ['Home', 'Projects', 'Skills', 'Certifications', 'Gallery', 'PDF Portfolio', 'Contact']

  const loadingText = "Front-End Developer Crafting Engaging Experiences"
  const loadingWords = loadingText.split(" ")
  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Loading Animation */}
      <AnimatePresence>
        {loading && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-md flex items-center justify-center"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center relative">
              <motion.h1
                className="text-6xl font-bold text-white/10 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.1 }}
                transition={{ duration: 0.5 }}
              >
                {loadingText}
              </motion.h1>
              <motion.h1 className="text-6xl font-bold relative">
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
            </div>
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
                  href={`#${item.toLowerCase().replace(' ', '-')}`}
                  className={`text-sm hover:text-white transition-colors ${
                    activeSection === item.toLowerCase().replace(' ', '-') ? 'text-white' : 'text-gray-300'
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
                href={`#${item.toLowerCase().replace(' ', '-')}`}
                className={`text-2xl py-2 ${
                  activeSection === item.toLowerCase().replace(' ', '-') ? 'text-white' : 'text-gray-400'
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
        className="py-20 px-4 bg-white/5"
        initial={{ opacity: 0 }}
        animate={{ opacity: loading ? 0 : 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">PDF Portfolio</h2>
          <div className="bg-white/10 rounded-lg p-4">
            <Document
              file={pdfPortfolio}
              onLoadSuccess={onDocumentLoadSuccess}
              className="mx-auto"
              error={
                <div className="text-center text-white py-10">
                  <p>No PDF content available.</p>
                  <p>Please check back later for updates.</p>
                </div>
              }
            >
              {numPages && numPages > 0 ? (
                <Page pageNumber={pageNumber} />
              ) : (
                <div className="text-center text-white py-10">
                  <p>Example PDF content would be displayed here.</p>
                </div>
              )}
            </Document>
            <div className="flex justify-between items-center mt-4">
              <Button
                onClick={() => setPageNumber(Math.max(1, pageNumber - 1))}
                disabled={pageNumber <= 1 || numPages === 0}
                className="bg-white/10 hover:bg-white/20 text-white"
              >
                Previous
              </Button>
              <p className="text-white">
                Page {numPages ? pageNumber : 1} of {numPages ?? 0}
              </p>
              <Button
                onClick={() => setPageNumber(Math.min(numPages ?? 0, pageNumber + 1))}
                disabled={pageNumber >= (numPages ?? 0) || numPages === 0}
                className="bg-white/10 hover:bg-white/20 text-white"
              >
                Next
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
                className="text-gray-400 hover:text-white transition-colors"
              >
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
    </div>
  )
}