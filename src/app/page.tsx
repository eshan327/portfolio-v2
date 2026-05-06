import AdditionalWork from '@/components/sections/AdditionalWork'
import Contact from '@/components/sections/Contact'
import Experience from '@/components/sections/Experience'
import Hero from '@/components/sections/Hero'
import Projects from '@/components/sections/Projects'
import Skills from '@/components/sections/Skills'

export default function Home() {
  return (
    <main id="content" tabIndex={-1}>
      <Hero />
      <Experience />
      <Projects />
      <AdditionalWork />
      <Skills />
      <Contact />
    </main>
  )
}
