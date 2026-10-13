import { useEffect } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import Footer from './components/Footer.jsx'
import Header from './components/Header.jsx'
import WhatsAppFab from './components/WhatsAppFab.jsx'
import { useScrollProgress } from './lib/useScrollProgress.js'
import Home from './pages/Home.jsx'
import MyVoterDesk from './pages/MyVoterDesk.jsx'

// Scrolls to the #section in the URL, or to the top when moving to a new page
function ScrollManager() {
  const location = useLocation()

  useEffect(() => {
    const target = location.hash && document.getElementById(location.hash.slice(1))
    if (target) {
      target.scrollIntoView()
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' })
    }
  }, [location])

  return null
}

// Thin line across the top of the page that fills as you scroll
function ScrollProgressBar() {
  const progress = useScrollProgress()

  return (
    <div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-50 h-0.5 origin-left bg-saffron"
      style={{ transform: `scaleX(${progress})` }}
    />
  )
}

export default function App() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-saffron focus:px-4 focus:py-2 focus:text-navy"
      >
        Skip to content
      </a>
      <ScrollManager />
      <ScrollProgressBar />
      <Header />
      <main id="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects/myvoterdesk" element={<MyVoterDesk />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
      <WhatsAppFab />
    </>
  )
}
