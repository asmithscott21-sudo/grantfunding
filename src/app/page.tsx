'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Search,
  PenTool,
  Scale,
  Calculator,
  BarChart3,
  ArrowRight,
  Shield,
  Calendar,
  BookOpen,
  Award,
  Users,
  HelpCircle,
  Mail,
  CheckCircle2,
  X,
  Menu
} from 'lucide-react'

export default function GFRHomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    grantVolume: '',
    biggestChallenge: ''
  })

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log('Form submitted:', formData)
    setIsModalOpen(false)
  }

  const partnerLogos = [
    { name: 'NIH', label: 'National Institutes of Health' },
    { name: 'NSF', label: 'National Science Foundation' },
    { name: 'ED', label: 'Department of Education' },
    { name: 'EPA', label: 'Environmental Protection Agency' },
    { name: 'NEA', label: 'National Endowment for the Arts' },
    { name: 'CDC', label: 'Centers for Disease Control' }
  ]

  return (
    <div className="min-h-screen flex flex-col bg-white font-heading">
      {/* Header & Navigation */}
      <header className="sticky top-0 z-50" style={{ backgroundColor: '#2C5270' }}>
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-4">
            <h1 className="text-white font-heading text-3xl font-bold tracking-tight">
              GFR
            </h1>
            <p className="text-sm text-gray-200 italic" style={{ fontFamily: 'Baskerville, serif' }}>
              Grant Fulfillment and Research
            </p>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {['Platform', 'Solutions', 'Resources', 'Pricing'].map((item) => (
              <a
                key={item}
                href="#"
                className="text-white font-heading text-sm hover:text-gray-200 transition-colors"
                style={{ fontFamily: 'Baskerville, serif' }}
              >
                {item}
              </a>
            ))}
          </nav>

          {/* Action Button */}
          <div className="flex items-center gap-4">
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
              <DialogTrigger asChild>
                <Button
                  style={{
                    backgroundColor: '#4682B4',
                    color: 'white',
                    border: '1px solid rgba(255,255,255,0.2)'
                  }}
                  className="hover:opacity-90 transition-opacity"
                >
                  Client Portal
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl w-full p-0" style={{ backgroundColor: '#FFFFFF' }}>
                <DialogHeader className="px-8 pb-6 pt-8">
                  <DialogTitle className="text-3xl font-heading" style={{ fontFamily: 'Baskerville, serif' }}>
                    Discover GFR
                  </DialogTitle>
                  <DialogDescription className="text-base mt-2" style={{ color: '#666666' }}>
                    Tell us about your funding goals
                  </DialogDescription>
                </DialogHeader>

                <div className="px-8 pb-8 grid md:grid-cols-2 gap-8">
                  {/* Left Column - Questionnaire */}
                  <div className="space-y-6">
                    <form onSubmit={handleFormSubmit} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2" style={{ color: '#333333', fontFamily: 'Baskerville, serif' }}>
                          Name
                        </label>
                        <input
                          type="text"
                          className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2"
                          style={{ borderColor: '#E0E0E0', fontFamily: 'Baskerville, serif' }}
                          placeholder="Your name"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2" style={{ color: '#333333', fontFamily: 'Baskerville, serif' }}>
                          Company Name
                        </label>
                        <input
                          type="text"
                          className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2"
                          style={{ borderColor: '#E0E0E0', fontFamily: 'Baskerville, serif' }}
                          placeholder="Your organization"
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2" style={{ color: '#333333', fontFamily: 'Baskerville, serif' }}>
                          Current Grant Volume
                        </label>
                        <select
                          className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2"
                          style={{ borderColor: '#E0E0E0', fontFamily: 'Baskerville, serif' }}
                          value={formData.grantVolume}
                          onChange={(e) => setFormData({ ...formData, grantVolume: e.target.value })}
                        >
                          <option value="">Select volume...</option>
                          <option value="low">1-5 per year</option>
                          <option value="medium">6-20 per year</option>
                          <option value="high">20+ per year</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2" style={{ color: '#333333', fontFamily: 'Baskerville, serif' }}>
                          Biggest Challenge
                        </label>
                        <select
                          className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2"
                          style={{ borderColor: '#E0E0E0', fontFamily: 'Baskerville, serif' }}
                          value={formData.biggestChallenge}
                          onChange={(e) => setFormData({ ...formData, biggestChallenge: e.target.value })}
                        >
                          <option value="">Select challenge...</option>
                          <option value="researching">Researching</option>
                          <option value="writing">Writing</option>
                          <option value="compliance">Compliance</option>
                          <option value="tracking">Tracking</option>
                        </select>
                      </div>
                    </form>
                  </div>

                  {/* Right Column - Calendar */}
                  <div className="space-y-4">
                    <div className="mb-4">
                      <h3 className="font-heading text-lg mb-2" style={{ color: '#333333', fontFamily: 'Baskerville, serif' }}>
                        Schedule a personalized walkthrough
                      </h3>
                      <p className="text-sm" style={{ color: '#666666' }}>
                        Book a time to explore our platform with a product specialist
                      </p>
                    </div>

                    {/* Calendar Widget Placeholder */}
                    <div className="border-2 rounded-lg p-6" style={{ borderColor: '#2C5270' }}>
                      <div className="text-center">
                        <Calendar className="h-12 w-12 mx-auto mb-4" style={{ color: '#2C5270' }} />
                        <p className="text-sm font-medium mb-4" style={{ color: '#333333', fontFamily: 'Baskerville, serif' }}>
                          Select a Date & Time
                        </p>
                        <div className="grid grid-cols-7 gap-2 text-xs mb-4">
                          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                            <div key={day} className="text-center p-2 rounded" style={{ color: '#666666', fontFamily: 'Baskerville, serif' }}>
                              {day}
                            </div>
                          ))}
                          {[1,2,3,4,5,6,7,8,9,10,11,12,13,14].map(num => (
                            <div key={num} className="text-center p-2 rounded hover:bg-blue-50 cursor-pointer transition-colors" style={{ fontFamily: 'Baskerville, serif' }}>
                              {num}
                            </div>
                          ))}
                        </div>
                        <Button
                          className="w-full"
                          style={{
                            backgroundColor: '#2C5270',
                            color: 'white'
                          }}
                        >
                          Book Walkthrough
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="border-t px-8 pb-8 pt-6">
                    <Button
                      className="w-full max-w-md mx-auto"
                      style={{
                        backgroundColor: '#2C5270',
                        color: 'white'
                      }}
                      onClick={() => setIsModalOpen(false)}
                    >
                      Confirm & Continue
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        {/* Background with subtle geometric overlay */}
        <div className="absolute inset-0 z-0" style={{ backgroundColor: '#FFFFFF' }}>
          <div className="absolute inset-0 opacity-5" style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, rgba(44, 130, 180, 0.1) 0%, transparent 50%)`,
            backgroundColor: '#F0F2F5'
          }} />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid md:grid-cols-5 gap-12 items-center">
            {/* Left Column - Text (60%) */}
            <div className="md:col-span-3 space-y-6">
              <h1 className="text-5xl md:text-6xl font-heading font-bold leading-tight" style={{ color: '#333333', fontFamily: 'Baskerville, serif' }}>
                Mastering the Art of Grant Fulfillment.
              </h1>
              <p className="text-xl md:text-2xl font-heading italic leading-relaxed" style={{ color: '#666666', fontFamily: 'Baskerville, serif' }}>
                From initial research to financial audit. The only database you need to secure and manage your funding.
              </p>
              <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogTrigger asChild>
                  <Button
                    size="lg"
                    className="hover:scale-105 transition-transform"
                    style={{
                      backgroundColor: '#2C5270',
                      color: 'white',
                      fontFamily: 'Baskerville, serif'
                    }}
                  >
                    Learn More
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl w-full p-0" style={{ backgroundColor: '#FFFFFF' }}>
                  <DialogHeader className="px-8 pb-6 pt-8">
                    <DialogTitle className="text-3xl font-heading" style={{ fontFamily: 'Baskerville, serif' }}>
                      Discover GFR
                    </DialogTitle>
                    <DialogDescription className="text-base mt-2" style={{ color: '#666666' }}>
                      Tell us about your funding goals
                    </DialogDescription>
                  </DialogHeader>

                  <div className="px-8 pb-8 grid md:grid-cols-2 gap-8">
                    {/* Left Column - Questionnaire */}
                    <div className="space-y-6">
                      <form onSubmit={handleFormSubmit} className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium mb-2" style={{ color: '#333333', fontFamily: 'Baskerville, serif' }}>
                            Name
                          </label>
                          <input
                            type="text"
                            className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2"
                            style={{ borderColor: '#E0E0E0', fontFamily: 'Baskerville, serif' }}
                            placeholder="Your name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2" style={{ color: '#333333', fontFamily: 'Baskerville, serif' }}>
                            Company Name
                          </label>
                          <input
                            type="text"
                            className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2"
                            style={{ borderColor: '#E0E0E0', fontFamily: 'Baskerville, serif' }}
                            placeholder="Your organization"
                            value={formData.company}
                            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2" style={{ color: '#333333', fontFamily: 'Baskerville, serif' }}>
                            Current Grant Volume
                          </label>
                          <select
                            className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2"
                            style={{ borderColor: '#E0E0E0', fontFamily: 'Baskerville, serif' }}
                            value={formData.grantVolume}
                            onChange={(e) => setFormData({ ...formData, grantVolume: e.target.value })}
                          >
                            <option value="">Select volume...</option>
                            <option value="low">1-5 per year</option>
                            <option value="medium">6-20 per year</option>
                            <option value="high">20+ per year</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2" style={{ color: '#333333', fontFamily: 'Baskerville, serif' }}>
                            Biggest Challenge
                          </label>
                          <select
                            className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2"
                            style={{ borderColor: '#E0E0E0', fontFamily: 'Baskerville, serif' }}
                            value={formData.biggestChallenge}
                            onChange={(e) => setFormData({ ...formData, biggestChallenge: e.target.value })}
                          >
                            <option value="">Select challenge...</option>
                            <option value="researching">Researching</option>
                            <option value="writing">Writing</option>
                            <option value="compliance">Compliance</option>
                            <option value="tracking">Tracking</option>
                          </select>
                        </div>
                      </form>
                    </div>

                    {/* Right Column - Calendar */}
                    <div className="space-y-4">
                      <div className="mb-4">
                        <h3 className="font-heading text-lg mb-2" style={{ color: '#333333', fontFamily: 'Baskerville, serif' }}>
                          Schedule a personalized walkthrough
                        </h3>
                        <p className="text-sm" style={{ color: '#666666' }}>
                          Book a time to explore our platform with a product specialist
                        </p>
                      </div>

                      {/* Calendar Widget Placeholder */}
                      <div className="border-2 rounded-lg p-6" style={{ borderColor: '#2C5270' }}>
                        <div className="text-center">
                          <Calendar className="h-12 w-12 mx-auto mb-4" style={{ color: '#2C5270' }} />
                          <p className="text-sm font-medium mb-4" style={{ color: '#333333', fontFamily: 'Baskerville, serif' }}>
                            Select a Date & Time
                          </p>
                          <div className="grid grid-cols-7 gap-2 text-xs mb-4">
                            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                              <div key={day} className="text-center p-2 rounded" style={{ color: '#666666', fontFamily: 'Baskerville, serif' }}>
                                {day}
                              </div>
                            ))}
                            {[1,2,3,4,5,6,7,8,9,10,11,12,13,14].map(num => (
                              <div key={num} className="text-center p-2 rounded hover:bg-blue-50 cursor-pointer transition-colors" style={{ fontFamily: 'Baskerville, serif' }}>
                                {num}
                              </div>
                            ))}
                          </div>
                          <Button
                            className="w-full"
                            style={{
                              backgroundColor: '#2C5270',
                              color: 'white'
                            }}
                          >
                            Book Walkthrough
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="border-t px-8 pb-8 pt-6">
                      <Button
                        className="w-full max-w-md mx-auto"
                        style={{
                          backgroundColor: '#2C5270',
                          color: 'white'
                        }}
                        onClick={() => setIsModalOpen(false)}
                      >
                        Confirm & Continue
                      </Button>
                    </div>
                </DialogContent>
              </Dialog>
            </div>

            {/* Right Column - Visual (40%) */}
            <div className="md:col-span-2 hidden md:block">
              <div className="relative h-96 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#F0F2F5' }}>
                <div className="text-center">
                  <div className="w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center" style={{ backgroundColor: '#2C5270' }}>
                    <BarChart3 className="h-12 w-12 text-white" />
                  </div>
                  <p className="font-heading text-lg" style={{ color: '#333333', fontFamily: 'Baskerville, serif' }}>
                    Your Complete Grant Ecosystem
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="py-12" style={{ backgroundColor: '#E0E0E0' }}>
        <div className="container mx-auto px-6">
          <div className="text-center mb-8">
            <p className="text-sm italic" style={{ color: '#666666', fontFamily: 'Baskerville, serif' }}>
              Trusted by industry leaders in research and development
            </p>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-12">
            {partnerLogos.map((partner) => (
              <div
                key={partner.name}
                className="px-6 py-4 rounded-lg border"
                style={{
                  borderColor: '#D3D3D3',
                  backgroundColor: '#FFFFFF'
                }}
              >
                <p className="font-heading font-bold text-lg" style={{ color: '#2C5270', fontFamily: 'Baskerville, serif' }}>
                  {partner.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature & Benefit Section */}
      <section className="py-24" style={{ backgroundColor: '#FFFFFF' }}>
        <div className="container mx-auto px-6">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4" style={{ color: '#2C5270', fontFamily: 'Baskerville, serif' }}>
              A Complete Ecosystem
            </h2>
            <div className="w-24 h-1 mx-auto" style={{ backgroundColor: '#2C5270' }} />
          </div>

          {/* Feature Cards Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Card 1 - Grant Researching */}
            <Card className="hover:shadow-xl transition-all duration-300 border-2" style={{ backgroundColor: '#FFFFFF', borderColor: 'transparent' }}>
              <CardHeader className="pb-4">
                <div className="w-16 h-16 mb-4 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#2C5270' }}>
                  <Search className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl font-heading" style={{ color: '#333333', fontFamily: 'Baskerville, serif' }}>
                  Intelligent Research
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-base leading-relaxed" style={{ color: '#666666', fontFamily: 'Baskerville, serif' }}>
                  Our database filters noise, presenting only opportunities that match your eligibility criteria perfectly.
                </p>
              </CardContent>
            </Card>

            {/* Card 2 - Grant Writing */}
            <Card className="hover:shadow-xl transition-all duration-300 border-2" style={{ backgroundColor: '#FFFFFF', borderColor: 'transparent' }}>
              <CardHeader className="pb-4">
                <div className="w-16 h-16 mb-4 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#2C5270' }}>
                  <PenTool className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl font-heading" style={{ color: '#333333', fontFamily: 'Baskerville, serif' }}>
                  Streamlined Applications
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-base leading-relaxed" style={{ color: '#666666', fontFamily: 'Baskerville, serif' }}>
                  Craft compelling narratives with our distraction-free editor and pre-loaded compliance templates.
                </p>
              </CardContent>
            </Card>

            {/* Card 3 - Common Clauses */}
            <Card className="hover:shadow-xl transition-all duration-300 border-2" style={{ backgroundColor: '#FFFFFF', borderColor: 'transparent' }}>
              <CardHeader className="pb-4">
                <div className="w-16 h-16 mb-4 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#2C5270' }}>
                  <Scale className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl font-heading" style={{ color: '#333333', fontFamily: 'Baskerville, serif' }}>
                  Clause Compliance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-base leading-relaxed" style={{ color: '#666666', fontFamily: 'Baskerville, serif' }}>
                  Mitigate risk with our clause library. Compare terms against your standard requirements instantly.
                </p>
              </CardContent>
            </Card>

            {/* Card 4 - Financials */}
            <Card className="hover:shadow-xl transition-all duration-300 border-2" style={{ backgroundColor: '#FFFFFF', borderColor: 'transparent' }}>
              <CardHeader className="pb-4">
                <div className="w-16 h-16 mb-4 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#2C5270' }}>
                  <Calculator className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl font-heading" style={{ color: '#333333', fontFamily: 'Baskerville, serif' }}>
                  Precision Budgeting
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-base leading-relaxed" style={{ color: '#666666', fontFamily: 'Baskerville, serif' }}>
                  Automate FTE calculations and cost allocation. Generate financial reports that satisfy the strictest auditors.
                </p>
              </CardContent>
            </Card>

            {/* Card 5 - Grant Tracking */}
            <Card className="hover:shadow-xl transition-all duration-300 border-2" style={{ backgroundColor: '#FFFFFF', borderColor: 'transparent' }}>
              <CardHeader className="pb-4">
                <div className="w-16 h-16 mb-4 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#2C5270' }}>
                  <BarChart3 className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl font-heading" style={{ color: '#333333', fontFamily: 'Baskerville, serif' }}>
                  Total Visibility
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-base leading-relaxed" style={{ color: '#666666', fontFamily: 'Baskerville, serif' }}>
                  Kanban dashboards keep your team aligned from draft submission to final award.
                </p>
              </CardContent>
            </Card>

            {/* Card 6 - Additional (placeholder for future) */}
            <Card className="hover:shadow-xl transition-all duration-300 border-2" style={{ backgroundColor: '#FFFFFF', borderColor: 'transparent' }}>
              <CardHeader className="pb-4">
                <div className="w-16 h-16 mb-4 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#2C5270' }}>
                  <CheckCircle2 className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl font-heading" style={{ color: '#333333', fontFamily: 'Baskerville, serif' }}>
                  Proven Results
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-base leading-relaxed" style={{ color: '#666666', fontFamily: 'Baskerville, serif' }}>
                  Join thousands of organizations who've secured millions in funding through our platform.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Deep Dive Section */}
      <section className="py-24" style={{ backgroundColor: '#FFFFFF' }}>
        <div className="container mx-auto px-6">
          {/* Row 1 - Security */}
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div className="space-y-4">
              <h3 className="text-3xl font-heading font-bold" style={{ color: '#333333', fontFamily: 'Baskerville, serif' }}>
                Security in Data
              </h3>
              <p className="text-lg leading-relaxed" style={{ color: '#666666', fontFamily: 'Baskerville, serif' }}>
                Your financial data and compliance clauses are stored with bank-level encryption. Multi-factor authentication ensures only authorized personnel access sensitive information.
              </p>
            </div>
            <div className="flex items-center justify-center">
              <div className="w-48 h-48 rounded-full flex items-center justify-center" style={{ backgroundColor: '#F0F2F5' }}>
                <Shield className="h-24 w-24" style={{ color: '#2C5270' }} />
              </div>
            </div>
          </div>

          {/* Row 2 - Workflow Automation */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="flex items-center justify-center order-2 md:order-1">
              <div className="w-48 h-48 rounded-full flex items-center justify-center" style={{ backgroundColor: '#F0F2F5' }}>
                <Calendar className="h-24 w-24" style={{ color: '#2C5270' }} />
              </div>
            </div>
            <div className="space-y-4 order-1 md:order-2">
              <h3 className="text-3xl font-heading font-bold" style={{ color: '#333333', fontFamily: 'Baskerville, serif' }}>
                Workflow Automation
              </h3>
              <p className="text-lg leading-relaxed" style={{ color: '#666666', fontFamily: 'Baskerville, serif' }}>
                Calendar integration ensures you never miss a deadline. Automated alerts notify your team of upcoming submissions and required actions before they become critical.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="py-24" style={{ backgroundColor: '#4682B4' }}>
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6" style={{ color: '#FFFFFF', fontFamily: 'Baskerville, serif' }}>
            Ready to secure your next grant?
          </h2>
          <p className="text-xl mb-12" style={{ color: '#D3D3D3', fontFamily: 'Baskerville, serif' }}>
            Join the platform that delivers on every promise.
          </p>
          <Button
            size="lg"
            className="hover:scale-105 transition-transform text-lg px-12 py-6"
            style={{
              backgroundColor: '#FFFFFF',
              color: '#2C5270',
              fontFamily: 'Baskerville, serif'
            }}
          >
            Get Started
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 mt-auto" style={{ backgroundColor: '#1A1A1A' }}>
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Column 1 - Logo */}
            <div className="text-center md:text-left">
              <h3 className="text-3xl font-heading font-bold mb-2" style={{ color: '#FFFFFF', fontFamily: 'Baskerville, serif' }}>
                GFR
              </h3>
              <p className="text-sm italic" style={{ color: '#999999', fontFamily: 'Baskerville, serif' }}>
                Grant Fulfillment and Research
              </p>
            </div>

            {/* Column 2 - Sitemap Links */}
            <div className="text-center md:text-left">
              <h4 className="text-lg font-heading font-semibold mb-4" style={{ color: '#FFFFFF', fontFamily: 'Baskerville, serif' }}>
                Platform
              </h4>
              <ul className="space-y-2">
                {['Grant Researching', 'Grant Writing', 'Common Clauses', 'Financials', 'Grant Tracking'].map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-sm hover:text-gray-300 transition-colors"
                      style={{ color: '#CCCCCC', fontFamily: 'Baskerville, serif' }}
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>

              <h4 className="text-lg font-heading font-semibold mb-4 mt-6" style={{ color: '#FFFFFF', fontFamily: 'Baskerville, serif' }}>
                Resources
              </h4>
              <ul className="space-y-2">
                {['Blog', 'Case Studies', 'Help Center', 'FAQ', 'Pricing'].map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-sm hover:text-gray-300 transition-colors"
                      style={{ color: '#CCCCCC', fontFamily: 'Baskerville, serif' }}
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3 - Contact Info */}
            <div className="text-center md:text-left">
              <h4 className="text-lg font-heading font-semibold mb-4" style={{ color: '#FFFFFF', fontFamily: 'Baskerville, serif' }}>
                Contact Us
              </h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5" style={{ color: '#CCCCCC' }} />
                  <a
                    href="mailto:contact@gfr.com"
                    className="text-sm hover:text-gray-300 transition-colors"
                    style={{ color: '#CCCCCC', fontFamily: 'Baskerville, serif' }}
                  >
                    contact@gfr.com
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <HelpCircle className="h-5 w-5" style={{ color: '#CCCCCC' }} />
                  <span className="text-sm" style={{ color: '#CCCCCC', fontFamily: 'Baskerville, serif' }}>
                    1-800-GFR-HELP
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Copyright Line */}
          <div className="border-t mt-8 pt-8 text-center">
            <p className="text-sm" style={{ color: '#666666', fontFamily: 'Baskerville, serif' }}>
              © 2024 GFR - Grant Fulfillment and Research. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
