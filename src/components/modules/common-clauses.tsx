'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import {
  Scale,
  Search,
  Shield,
  AlertTriangle,
  CheckCircle,
  FileText,
  Copy,
  Eye,
  Plus,
  Filter
} from 'lucide-react'

interface Clause {
  id: string
  title: string
  category: string
  text: string
  riskRating: 'low' | 'medium' | 'high' | 'critical'
  isStandard: boolean
  explanation: string
}

interface StandardResponse {
  id: string
  title: string
  category: string
  text: string
}

const mockClauses: Clause[] = [
  {
    id: '1',
    title: 'Indemnification Clause',
    category: 'indemnification',
    text: 'The Grantee shall indemnify and hold harmless the Grantor, its officers, directors, employees, and agents from any and all claims, demands, causes of action, liabilities, costs, and expenses (including attorneys\' fees) arising out of or related to the Grantee\'s performance of this Agreement, except to the extent caused by the Gross Negligence or willful misconduct of the Grantor.',
    riskRating: 'high',
    isStandard: true,
    explanation: 'Protects grantor from legal claims arising from grantee activities. May require careful review.'
  },
  {
    id: '2',
    title: 'Intellectual Property Rights',
    category: 'ip_rights',
    text: 'All intellectual property created under this Grant shall become the sole and exclusive property of the Grantor. The Grantee hereby assigns all right, title, and interest in such intellectual property to the Grantor.',
    riskRating: 'critical',
    isStandard: false,
    explanation: 'Requires full assignment of IP to grantor. This may not be acceptable for many organizations.'
  },
  {
    id: '3',
    title: 'Audit Requirements',
    category: 'audit',
    text: 'The Grantee shall maintain accurate financial records and make such records available for inspection and audit by the Grantor or its designated representatives at any reasonable time during normal business hours.',
    riskRating: 'low',
    isStandard: true,
    explanation: 'Standard audit clause for financial accountability. Generally acceptable.'
  },
  {
    id: '4',
    title: 'Full Cost Recovery',
    category: 'cost_recovery',
    text: 'The Grantee agrees to recover full costs, including direct and indirect costs, in accordance with the Cost Principles established in the applicable OMB Circulars or Uniform Guidance.',
    riskRating: 'medium',
    isStandard: true,
    explanation: 'Compliance with federal cost principles. Requires proper cost allocation systems.'
  },
  {
    id: '5',
    title: 'Reporting Requirements',
    category: 'reporting',
    text: 'The Grantee shall submit quarterly performance reports and annual financial reports to the Grantor within thirty (30) days after the end of each reporting period.',
    riskRating: 'low',
    isStandard: true,
    explanation: 'Standard reporting requirements. Ensure capacity for timely submissions.'
  },
  {
    id: '6',
    title: 'Termination for Convenience',
    category: 'other',
    text: 'The Grantor may terminate this Agreement at any time, for any reason, upon thirty (30) days written notice to the Grantee.',
    riskRating: 'high',
    isStandard: false,
    explanation: 'Allows grantor to terminate without cause. May need negotiation for cost recovery.'
  }
]

const mockStandardResponses: StandardResponse[] = [
  {
    id: '1',
    title: 'IP Rights Counter-Proposal',
    category: 'ip_rights',
    text: 'The Parties agree that IP created under this Grant shall be jointly owned by both Parties. Each Party shall have the right to use such IP for their respective purposes without additional compensation.'
  },
  {
    id: '2',
    title: 'Modified Termination Clause',
    category: 'other',
    text: 'The Grantor may terminate this Agreement upon sixty (60) days written notice to the Grantee. In the event of termination, the Grantor shall reimburse the Grantee for all reasonable costs incurred up to the date of termination.'
  },
  {
    id: '3',
    title: 'Acceptable Indemnification',
    category: 'indemnification',
    text: 'The Grantee shall indemnify and hold harmless the Grantor from claims arising solely out of the Grantee\'s negligence or willful misconduct. The Grantee\'s liability shall be limited to the amount of funding provided under this Agreement.'
  }
]

export function CommonClausesModule() {
  const [clauses, setClauses] = useState<Clause[]>(mockClauses)
  const [standardResponses] = useState<StandardResponse[]>(mockStandardResponses)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedRisk, setSelectedRisk] = useState('all')
  const [compareClauses, setCompareClauses] = useState<string[]>([])

  const categories = ['all', 'indemnification', 'ip_rights', 'audit', 'reporting', 'cost_recovery', 'other']
  const riskLevels = ['all', 'low', 'medium', 'high', 'critical']

  const filteredClauses = clauses.filter(clause => {
    const matchesSearch =
      clause.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      clause.text.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesCategory = selectedCategory === 'all' || clause.category === selectedCategory
    const matchesRisk = selectedRisk === 'all' || clause.riskRating === selectedRisk

    return matchesSearch && matchesCategory && matchesRisk
  })

  const getRiskBadge = (rating: string) => {
    const config = {
      low: { color: 'bg-green-100 text-green-800', icon: CheckCircle },
      medium: { color: 'bg-yellow-100 text-yellow-800', icon: AlertTriangle },
      high: { color: 'bg-orange-100 text-orange-800', icon: AlertTriangle },
      critical: { color: 'bg-red-100 text-red-800', icon: Shield },
    }
    return config[rating as keyof typeof config] || config.medium
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-heading font-bold text-foreground mb-2">
            Common Clauses
          </h2>
          <p className="text-muted-foreground">
            Review, compare, and manage legal clauses in grant agreements
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add Clause
        </Button>
      </div>

      {/* Statistics */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-heading">Total Clauses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{clauses.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-heading">High Risk</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {clauses.filter(c => c.riskRating === 'high' || c.riskRating === 'critical').length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-heading">Standard Clauses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {clauses.filter(c => c.isStandard).length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-heading">Standard Responses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{standardResponses.length}</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="library" className="space-y-6">
        <TabsList>
          <TabsTrigger value="library">Clause Library</TabsTrigger>
          <TabsTrigger value="responses">Standard Responses</TabsTrigger>
          <TabsTrigger value="comparison">Clause Comparison</TabsTrigger>
        </TabsList>

        {/* Clause Library Tab */}
        <TabsContent value="library" className="space-y-6">
          {/* Search and Filters */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Search clauses by title or text..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.slice(1).map(cat => (
                      <SelectItem key={cat} value={cat}>{cat.replace('_', ' ')}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={selectedRisk} onValueChange={setSelectedRisk}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="All Risk Levels" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Risk Levels</SelectItem>
                    {riskLevels.slice(1).map(risk => (
                      <SelectItem key={risk} value={risk}>{risk}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Clause Cards */}
          <div className="grid gap-4">
            {filteredClauses.map((clause) => {
              const riskConfig = getRiskBadge(clause.riskRating)
              const RiskIcon = riskConfig.icon
              return (
                <Card key={clause.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <CardTitle className="text-xl">{clause.title}</CardTitle>
                          {clause.isStandard && (
                            <Badge variant="secondary">Standard</Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">{clause.category.replace('_', ' ')}</Badge>
                          <Badge className={riskConfig.color}>
                            <RiskIcon className="h-3 w-3 mr-1" />
                            {clause.riskRating} risk
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-4 bg-muted rounded-lg">
                        <p className="text-sm leading-relaxed">{clause.text}</p>
                      </div>

                      {clause.explanation && (
                        <div className="flex items-start gap-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                          <AlertTriangle className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="text-xs font-medium text-blue-900 mb-1">Explanation:</p>
                            <p className="text-sm text-blue-800">{clause.explanation}</p>
                          </div>
                        </div>
                      )}

                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="gap-2">
                          <Copy className="h-4 w-4" />
                          Copy
                        </Button>
                        <Button variant="outline" size="sm" className="gap-2">
                          <Eye className="h-4 w-4" />
                          View
                        </Button>
                        <Button variant="outline" size="sm" className="gap-2">
                          <FileText className="h-4 w-4" />
                          Find Responses
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        {/* Standard Responses Tab */}
        <TabsContent value="responses" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {standardResponses.map((response) => (
              <Card key={response.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="font-heading">{response.title}</CardTitle>
                      <Badge variant="outline" className="mt-2">
                        {response.category.replace('_', ' ')}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-relaxed mb-4">
                    {response.text}
                  </p>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="gap-2" onClick={() => copyToClipboard(response.text)}>
                      <Copy className="h-4 w-4" />
                      Copy to Clipboard
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Clause Comparison Tab */}
        <TabsContent value="comparison">
          <Card>
            <CardContent className="py-12 text-center">
              <Scale className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">Compare Clauses</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Select two or more clauses to compare their text and identify differences
              </p>
              <Button variant="outline" className="gap-2">
                <Filter className="h-4 w-4" />
                Select Clauses to Compare
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
