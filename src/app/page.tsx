'use client'

import { useState } from 'react'
import Link from "next/link"
import Image from "next/image"
import { Github, Mail, Linkedin, ChevronDown, ChevronUp } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const underlinedHeading = "relative inline-block after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[3px] after:w-12 after:bg-red-500 after:rounded-full pb-2"

export default function Component() {
  const [showAllProjects, setShowAllProjects] = useState(false)
  const [showAllExperience, setShowAllExperience] = useState(false)

  // Function to handle smooth scrolling with TypeScript type
  const scrollToSection = (elementId: string): void => {
    const element = document.getElementById(elementId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const projects = [
    {
      title: "BeliJasa.com",
      description: "marketplace ",
      tech: ["Next.js", "Node.js", "PostgreSQL"],
      github: "https://github.com/yourusername/ecommerce",
      demo: "https://ecommerce-demo.example.com"
    },
    {
      title: "Task Management System",
      description: "Collaborative project management tool with real-time updates and team features",
      tech: ["React", "Express", "MongoDB"],
      github: "https://github.com/yourusername/task-manager",
      demo: "https://task-manager-demo.example.com"
    },
    {
      title: "Weather App",
      description: "Real-time weather forecasting application with location-based services",
      tech: ["React Native", "OpenWeatherMap API", "Geolocation"],
      github: "https://github.com/yourusername/weather-app",
      demo: "https://weather-app-demo.example.com"
    },
    {
      title: "Blog Platform",
      description: "A full-stack blogging platform with user authentication and markdown support",
      tech: ["Vue.js", "Django", "PostgreSQL"],
      github: "https://github.com/yourusername/blog-platform",
      demo: "https://blog-platform-demo.example.com"
    }
  ]

  const experiences = [
    {
      year: "2023 - Present",
      role: "Senior Software Engineer",
      company: "Tech Corp",
      description: "Leading development of microservices architecture and cloud infrastructure.",
      companyUrl: "https://techcorp.example.com"
    },
    {
      year: "2021 - 2023",
      role: "Full Stack Developer",
      company: "Digital Solutions Inc",
      description: "Developed and maintained multiple client projects using modern web technologies.",
      companyUrl: "https://digitalsolutions.example.com"
    },
    {
      year: "2019 - 2021",
      role: "Junior Web Developer",
      company: "StartUp Innovations",
      description: "Contributed to the development of innovative web applications and gained experience in agile methodologies.",
      companyUrl: "https://startupinnovations.example.com"
    },
    {
      year: "2018 - 2019",
      role: "Intern",
      company: "CodeCraft Academy",
      description: "Assisted in the development of educational coding platforms and participated in code reviews.",
      companyUrl: "https://codecraft.example.com"
    }
  ]

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="fixed top-0 w-full border-b border-white/10 bg-black/50 backdrop-blur-md z-50">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link className="text-xl font-bold flex items-center gap-2" href="/">
            <Image
              src="/img/logo.png"
              alt="Logo"
              width={40}
              height={40}
              className=""
            />
          </Link>
          <nav className="flex gap-6">
            <Link className="hover:text-primary transition-colors" href="#projects">
              Projects
            </Link>
            <Link className="hover:text-primary transition-colors" href="#experience">
              Experience
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content Container */}
      <div className="max-w-5xl mx-auto px-4">
        {/* Hero Section */}
        <section className="pt-24 pb-8">
          <div className="max-w-2xl">
            <h1 className="text-3xl sm:text-4xl font-bold mb-2">Luqman Aldi P</h1>
            <h2 className="text-lg sm:text-xl text-muted-foreground mb-3">Cloud Engineer & Backend Developer</h2>
            <p className="text-base sm:text-lg text-muted-foreground mb-4">
              Passionate developer crafting elegant solutions with modern technologies. Specialized in building scalable web
              applications with React, Node.js, and cloud technologies.
            </p>
            <div className="flex gap-3">
              <Button onClick={() => scrollToSection('projects')}>View Projects</Button>
              <Button variant="secondary" onClick={() => scrollToSection('contact')}>Contact Me</Button>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section className="py-8 border-t border-white/10">
          <h2 className={`text-xl sm:text-2xl font-bold mb-4 ${underlinedHeading}`}>Technical Skills</h2>
          <div className="flex flex-wrap gap-2">
            {["React", "Next.js", "TypeScript", "Tailwind CSS", "Redux", "Node.js", "Express", "PostgreSQL", "MongoDB", "Redis", "Git", "Docker", "AWS", "Linux", "CI/CD"].map((skill) => (
              <div
                key={skill}
                className="bg-white/10 text-white px-3 py-1 text-sm rounded-md hover:bg-white hover:text-black transition-colors"
              >
                {skill}
              </div>
            ))}
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-8 border-t border-white/10">
          <h2 className={`text-xl sm:text-2xl font-bold mb-4 ${underlinedHeading}`}>Featured Projects</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {projects.slice(0, showAllProjects ? projects.length : 2).map((project, index) => (
              <Card key={index} className="bg-white/5 border-white/10">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base sm:text-lg font-bold text-white mb-1">{project.title}</CardTitle>
                  <CardDescription className="text-sm text-muted-foreground">{project.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {project.tech.map((tech) => (
                      <Badge key={tech} variant="outline" className="text-xs text-white">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Link href={project.github} target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" size="sm">
                        <Github className="w-4 h-4 mr-1" />
                        Code
                      </Button>
                    </Link>
                    <Link href={project.demo} target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" size="sm">
                        Live Demo
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          {projects.length > 2 && (
            <div className="mt-4">
              <Button
                variant="outline"
                onClick={() => setShowAllProjects(!showAllProjects)}
                className="w-full bg-white/10 text-white px-3 py-1 text-sm rounded-md hover:bg-white hover:text-black transition-colors"
              >
                {showAllProjects ? (
                  <>
                    Show Less <ChevronUp className="ml-2 h-4 w-4" />
                  </>
                ) : (
                  <>
                    Show More Projects <ChevronDown className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          )}
        </section>

        {/* Experience Section */}
        <section id="experience" className="py-8 border-t border-white/10">
          <h2 className={`text-xl sm:text-2xl font-bold mb-4 ${underlinedHeading}`}>Professional Experience</h2>
          <div className="grid gap-6">
            {experiences.slice(0, showAllExperience ? experiences.length : 2).map((exp, index) => (
              <div key={index} className="grid sm:grid-cols-[140px,1fr] gap-2">
                <div className="text-sm text-muted-foreground">{exp.year}</div>
                <div>
                  <h3 className="text-base sm:text-lg font-semibold mb-1">{exp.role}</h3>
                  <Link href={exp.companyUrl} target="_blank" rel="noopener noreferrer" 
                    className="text-sm text-muted-foreground hover:text-white transition-colors mb-1 inline-block">
                    {exp.company}
                  </Link>
                  <p className="text-sm text-muted-foreground">{exp.description}</p>
                </div>
              </div>
            ))}
          </div>
          {experiences.length > 2 && (
            <div className="mt-4">
              <Button
                variant="outline"
                onClick={() => setShowAllExperience(!showAllExperience)}
                className="w-full bg-white/10 text-white px-3 py-1 text-sm rounded-md hover:bg-white hover:text-black transition-colors"
              >
                {showAllExperience ? (
                  <>
                    Show Less <ChevronUp className="ml-2 h-4 w-4" />
                  </>
                ) : (
                  <>
                    Show More Experience <ChevronDown className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          )}
        </section>

        {/* Get in Touch Section */}
        <section id="contact" className="py-8 border-t border-white/10">
          <h2 className={`text-xl sm:text-2xl font-bold mb-4 ${underlinedHeading}`}>Get In Touch</h2>
          <div className="flex flex-col items-center gap-4">
            <p className="text-base text-white text-center max-w-xl">
              I&apos;m always interested in hearing about new projects and opportunities. Feel free to reach out!
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="mailto:your.email@example.com">
                <Button variant="outline" size="sm" className="bg-white/10 hover:bg-white hover:text-black transition-colors">
                  <Mail className="w-4 h-4 mr-2" />
                  Email Me
                </Button>
              </Link>
              <Link href="https://linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="sm" className="bg-white/10 hover:bg-white hover:text-black transition-colors">
                  <Linkedin className="w-4 h-4 mr-2" />
                  LinkedIn
                </Button>
              </Link>
              <Link href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="sm" className="bg-white/10 hover:bg-white hover:text-black transition-colors">
                  <Github className="w-4 h-4 mr-2" />
                  GitHub
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-6 border-t border-white/10 text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} John Developer. All rights reserved.
          </p>
          <nav className="mt-3">
            <ul className="flex justify-center space-x-4">
              <li>
                <Link href="/privacy-policy" className="text-sm text-muted-foreground hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-of-service" className="text-sm text-muted-foreground hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </nav>
        </footer>
      </div>
    </div>
  )
}