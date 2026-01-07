'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Search,
  Bookmark,
  Calendar,
  DollarSign,
  MapPin,
  Building2,
  Filter,
  X,
  BookmarkCheck
} from 'lucide-react'

interface GrantOpportunity {
  id: string
  title: string
  organization: string
  description: string
  sector: string
  amountMin: number | null
  amountMax: number | null
  currency: string
  deadline: string
  geography: string | null
  eligibility: string | null
  link: string | null
  status: string
  saved: boolean
  bookmarked: boolean
}

const mockGrants: GrantOpportunity[] = [
  {
    id: '1',
    title: 'Community Health Initiative',
    organization: 'National Health Foundation',
    description: 'Funding for community-based health programs focusing on preventative care and wellness education.',
    sector: 'Healthcare',
    amountMin: 50000,
    amountMax: 150000,
    currency: 'USD',
    deadline: '2023-12-15',
    geography: 'National',
    eligibility: 'Non-profit organizations with 501(c)(3) status',
    link: 'https://example.com',
    status: 'active',
    saved: false,
    bookmarked: true
  },
  {
    id: '2',
    title: 'STEM Education Innovation Grant',
    organization: 'Department of Education',
    description: 'Support for innovative STEM education programs in K-12 schools and community centers.',
    sector: 'Education',
    amountMin: 100000,
    amountMax: 500000,
    currency: 'USD',
    deadline: '2024-01-20',
    geography: 'National',
    eligibility: 'Public schools and educational nonprofits',
    link: 'https://example.com',
    status: 'active',
    saved: true,
    bookmarked: false
  },
  {
    id: '3',
    title: 'Environmental Conservation Fund',
    organization: 'Environmental Protection Agency',
    description: 'Grants for projects focused on environmental conservation, sustainability, and climate change mitigation.',
    sector: 'Environment',
    amountMin: 75000,
    amountMax: 250000,
    currency: 'USD',
    deadline: '2023-12-30',
    geography: 'National',
    eligibility: 'Environmental organizations and government agencies',
    link: 'https://example.com',
    status: 'active',
    saved: false,
    bookmarked: false
  },
  {
    id: '4',
    title: 'Arts and Culture Preservation',
    organization: 'National Endowment for the Arts',
    description: 'Funding to preserve and promote arts and cultural heritage programs across the nation.',
    sector: 'Arts & Culture',
    amountMin: 25000,
    amountMax: 100000,
    currency: 'USD',
    deadline: '2024-02-15',
    geography: 'National',
    eligibility: 'Arts organizations, museums, cultural institutions',
    link: 'https://example.com',
    status: 'active',
    saved: true,
    bookmarked: true
  },
  {
    id: '5',
    title: 'Technology for Good Initiative',
    organization: 'Tech for Humanity Foundation',
    description: 'Support for projects using technology to address social challenges and improve communities.',
    sector: 'Technology',
    amountMin: 100000,
    amountMax: 300000,
    currency: 'USD',
    deadline: '2024-01-10',
    geography: 'International',
    eligibility: 'Non-profits and social enterprises',
    link: 'https://example.com',
    status: 'active',
    saved: false,
    bookmarked: false
  }
]

export function GrantResearchingModule() {
  const [grants, setGrants] = useState<GrantOpportunity[]>(mockGrants)
  const [searchTerm, setSearchTerm] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState({
    sector: 'all',
    minAmount: '',
    maxAmount: '',
    geography: 'all',
    showSaved: false,
    showBookmarked: false
  })

  const sectors = ['all', 'Healthcare', 'Education', 'Environment', 'Arts & Culture', 'Technology', 'Social Services']
  const geographies = ['all', 'National', 'International', 'Regional']

  const filteredGrants = grants.filter(grant => {
    const matchesSearch =
      grant.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      grant.organization.toLowerCase().includes(searchTerm.toLowerCase()) ||
      grant.description.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesSector = filters.sector === 'all' || grant.sector === filters.sector
    const matchesGeography = filters.geography === 'all' || grant.geography === filters.geography
    const matchesMinAmount = !filters.minAmount || (grant.amountMin && grant.amountMin >= parseFloat(filters.minAmount))
    const matchesMaxAmount = !filters.maxAmount || (grant.amountMax && grant.amountMax <= parseFloat(filters.maxAmount))
    const matchesSaved = !filters.showSaved || grant.saved
    const matchesBookmarked = !filters.showBookmarked || grant.bookmarked

    return matchesSearch && matchesSector && matchesGeography && matchesMinAmount && matchesMaxAmount && matchesSaved && matchesBookmarked
  })

  const toggleSaved = (id: string) => {
    setGrants(grants.map(grant =>
      grant.id === id ? { ...grant, saved: !grant.saved } : grant
    ))
  }

  const toggleBookmarked = (id: string) => {
    setGrants(grants.map(grant =>
      grant.id === id ? { ...grant, bookmarked: !grant.bookmarked } : grant
    ))
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
  }

  const getUrgencyColor = (deadline: string) => {
    const today = new Date()
    const deadlineDate = new Date(deadline)
    const daysUntil = Math.ceil((deadlineDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))

    if (daysUntil <= 7) return 'text-red-600 bg-red-50 border-red-200'
    if (daysUntil <= 30) return 'text-amber-600 bg-amber-50 border-amber-200'
    return 'text-green-600 bg-green-50 border-green-200'
  }

  const getDaysUntil = (deadline: string) => {
    const today = new Date()
    const deadlineDate = new Date(deadline)
    const daysUntil = Math.ceil((deadlineDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
    return daysUntil
  }

  const clearFilters = () => {
    setFilters({
      sector: 'all',
      minAmount: '',
      maxAmount: '',
      geography: 'all',
      showSaved: false,
      showBookmarked: false
    })
    setSearchTerm('')
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-heading font-bold text-foreground mb-2">
          Grant Research
        </h2>
        <p className="text-muted-foreground">
          Discover and manage grant opportunities for your organization
        </p>
      </div>

      {/* Search Bar */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search grants by title, organization, or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2"
            >
              <Filter className="h-4 w-4" />
              Filters
              {Object.values(filters).some(v => v && v !== 'all' && v !== '') && (
                <Badge className="ml-1" variant="secondary">
                  Active
                </Badge>
              )}
            </Button>
            {(searchTerm || Object.values(filters).some(v => v && v !== 'all' && v !== '')) && (
              <Button variant="ghost" onClick={clearFilters}>
                <X className="h-4 w-4" />
                Clear
              </Button>
            )}
          </div>

          {/* Filters */}
          {showFilters && (
            <div className="mt-6 p-4 bg-muted rounded-lg space-y-4">
              <div className="grid gap-4 md:grid-cols-4">
                <div className="space-y-2">
                  <Label>Industry/Sector</Label>
                  <Select
                    value={filters.sector}
                    onValueChange={(value) => setFilters({ ...filters, sector: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select sector" />
                    </SelectTrigger>
                    <SelectContent>
                      {sectors.map(sector => (
                        <SelectItem key={sector} value={sector}>
                          {sector === 'all' ? 'All Sectors' : sector}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Geography</Label>
                  <Select
                    value={filters.geography}
                    onValueChange={(value) => setFilters({ ...filters, geography: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select geography" />
                    </SelectTrigger>
                    <SelectContent>
                      {geographies.map(geo => (
                        <SelectItem key={geo} value={geo}>
                          {geo === 'all' ? 'All Locations' : geo}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Minimum Amount (USD)</Label>
                  <Input
                    type="number"
                    placeholder="Min amount"
                    value={filters.minAmount}
                    onChange={(e) => setFilters({ ...filters, minAmount: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Maximum Amount (USD)</Label>
                  <Input
                    type="number"
                    placeholder="Max amount"
                    value={filters.maxAmount}
                    onChange={(e) => setFilters({ ...filters, maxAmount: e.target.value })}
                  />
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="saved"
                    checked={filters.showSaved}
                    onCheckedChange={(checked) =>
                      setFilters({ ...filters, showSaved: checked as boolean })
                    }
                  />
                  <Label htmlFor="saved">Saved Only</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="bookmarked"
                    checked={filters.showBookmarked}
                    onCheckedChange={(checked) =>
                      setFilters({ ...filters, showBookmarked: checked as boolean })
                    }
                  />
                  <Label htmlFor="bookmarked">Bookmarked Only</Label>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing {filteredGrants.length} of {grants.length} grants
        </p>
        <div className="flex gap-2">
          <Badge variant="outline">{filteredGrants.filter(g => g.saved).length} Saved</Badge>
          <Badge variant="outline">{filteredGrants.filter(g => g.bookmarked).length} Bookmarked</Badge>
        </div>
      </div>

      {/* Grant Cards */}
      <div className="grid gap-4">
        {filteredGrants.map((grant) => (
          <Card key={grant.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <CardTitle className="text-xl">{grant.title}</CardTitle>
                    {grant.saved && (
                      <Badge variant="secondary" className="ml-2">
                        <Bookmark className="h-3 w-3 mr-1" />
                        Saved
                      </Badge>
                    )}
                    {grant.bookmarked && (
                      <Badge variant="outline">
                        <BookmarkCheck className="h-3 w-3 mr-1" />
                        Bookmarked
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                    <div className="flex items-center gap-1">
                      <Building2 className="h-4 w-4" />
                      {grant.organization}
                    </div>
                    <div className="flex items-center gap-1">
                      <Badge variant="outline">{grant.sector}</Badge>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => toggleSaved(grant.id)}
                    className={grant.saved ? 'bg-primary text-primary-foreground' : ''}
                  >
                    <Bookmark className={`h-4 w-4 ${grant.saved ? 'fill-current' : ''}`} />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => toggleBookmarked(grant.id)}
                  >
                    <BookmarkCheck className={`h-4 w-4 ${grant.bookmarked ? 'fill-current' : ''}`} />
                  </Button>
                </div>
              </div>
              <CardDescription className="mt-3">
                {grant.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-4">
                <div>
                  <p className="text-sm font-medium mb-1">Funding Amount</p>
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">
                      {grant.amountMin && grant.amountMax
                        ? `${grant.amountMin.toLocaleString()} - ${grant.amountMax.toLocaleString()}`
                        : grant.amountMin
                        ? `${grant.amountMin.toLocaleString()}+`
                        : 'Not specified'}
                    </span>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium mb-1">Deadline</p>
                  <div className={`flex items-center gap-2 px-2 py-1 rounded border ${getUrgencyColor(grant.deadline)}`}>
                    <Calendar className="h-4 w-4" />
                    <span className="text-sm font-medium">
                      {formatDate(grant.deadline)}
                    </span>
                    <span className="text-xs ml-auto">
                      ({getDaysUntil(grant.deadline)} days)
                    </span>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium mb-1">Location</p>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{grant.geography}</span>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium mb-1">Eligibility</p>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {grant.eligibility}
                  </p>
                </div>
              </div>

              {grant.eligibility && (
                <div className="mt-4 p-3 bg-muted rounded-lg">
                  <p className="text-xs font-medium mb-1">Eligibility Requirements:</p>
                  <p className="text-sm text-muted-foreground">{grant.eligibility}</p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredGrants.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No grants found</h3>
            <p className="text-sm text-muted-foreground">
              Try adjusting your filters or search terms
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
