import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AppShell from './components/layout/AppShell'
import HomePage from './pages/HomePage'
import BundlesPage from './pages/BundlesPage'
import MembershipPage from './pages/MembershipPage'
import ProfilePage from './pages/ProfilePage'
import { AuthProvider } from './contexts/AuthContext'
import { BundleProvider } from './contexts/BundleContext'

function App() {
  return (
    <AuthProvider>
      <BundleProvider>
        <Router>
          <AppShell>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/bundles" element={<BundlesPage />} />
              <Route path="/membership" element={<MembershipPage />} />
              <Route path="/profile" element={<ProfilePage />} />
            </Routes>
          </AppShell>
        </Router>
      </BundleProvider>
    </AuthProvider>
  )
}

export default App