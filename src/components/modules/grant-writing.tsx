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
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs'
import {
  Save,
  FileText,
  Clock,
  FileEdit,
  Eye,
  Download,
  Plus,
  History
} from 'lucide-react'

interface GrantTemplate {
  id: string
  name: string
  type: string
  description: string
}

interface Version {
  id: string
  versionNumber: number
  author: string
  date: string
  wordCount: number
  charCount: number
  notes: string
  isCurrent: boolean
}

const templates: GrantTemplate[] = [
  {
    id: '1',
    name: 'Letter of Intent (LOI)',
    type: 'loi',
    description: 'Standard LOI template for initial grant applications'
  },
  {
    id: '2',
    name: 'Full Proposal',
    type: 'full_proposal',
    description: 'Comprehensive full proposal template with all required sections'
  },
  {
    id: '3',
    name: 'Concept Paper',
    type: 'concept_paper',
    description: 'Concept paper template for early-stage grant ideas'
  },
  {
    id: '4',
    name: 'Research Grant Application',
    type: 'full_proposal',
    description: 'Specialized template for research-focused grants'
  }
]

const mockVersions: Version[] = [
  {
    id: '1',
    versionNumber: 3,
    author: 'Sarah Johnson',
    date: '2023-12-12',
    wordCount: 2450,
    charCount: 14200,
    notes: 'Added budget narrative section',
    isCurrent: true
  },
  {
    id: '2',
    versionNumber: 2,
    author: 'John Smith',
    date: '2023-12-10',
    wordCount: 2100,
    charCount: 12500,
    notes: 'Revised executive summary',
    isCurrent: false
  },
  {
    id: '3',
    versionNumber: 1,
    author: 'Sarah Johnson',
    date: '2023-12-08',
    wordCount: 1800,
    charCount: 10800,
    notes: 'Initial draft',
    isCurrent: false
  }
]

export function GrantWritingModule() {
  const [selectedTemplate, setSelectedTemplate] = useState<string>('')
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [wordLimit, setWordLimit] = useState<number | null>(null)
  const [charLimit, setCharLimit] = useState<number | null>(null)
  const [versions] = useState<Version[]>(mockVersions)
  const [isEditing, setIsEditing] = useState(true)

  const wordCount = content.trim().split(/\s+/).filter(word => word.length > 0).length
  const charCount = content.length

  const handleSave = () => {
    console.log('Saving draft...')
  }

  const handleExport = () => {
    console.log('Exporting document...')
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-heading font-bold text-foreground mb-2">
            Grant Writing
          </h2>
          <p className="text-muted-foreground">
            Create and manage your grant applications with professional templates
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <History className="h-4 w-4" />
            Versions
          </Button>
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button className="gap-2" onClick={handleSave}>
            <Save className="h-4 w-4" />
            Save Draft
          </Button>
        </div>
      </div>

      <Tabs defaultValue="new" className="space-y-6">
        <TabsList>
          <TabsTrigger value="new">New Application</TabsTrigger>
          <TabsTrigger value="existing">Existing</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
        </TabsList>

        {/* New Application Tab */}
        <TabsContent value="new" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Main Editor */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="font-heading">Grant Application Editor</CardTitle>
                      <CardDescription>
                        Write your grant proposal using the distraction-free editor
                      </CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setIsEditing(!isEditing)}
                        className="gap-2"
                      >
                        {isEditing ? (
                          <>
                            <Eye className="h-4 w-4" />
                            Preview
                          </>
                        ) : (
                          <>
                            <FileEdit className="h-4 w-4" />
                            Edit
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Application Title</Label>
                    <Input
                      id="title"
                      placeholder="Enter grant application title..."
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="template">Template</Label>
                      <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
                        <SelectTrigger id="template">
                          <SelectValue placeholder="Select a template" />
                        </SelectTrigger>
                        <SelectContent>
                          {templates.map(template => (
                            <SelectItem key={template.id} value={template.id}>
                              {template.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="type">Application Type</Label>
                      <Select>
                        <SelectTrigger id="type">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="loi">Letter of Intent</SelectItem>
                          <SelectItem value="full_proposal">Full Proposal</SelectItem>
                          <SelectItem value="concept_paper">Concept Paper</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="wordLimit">Word Limit (Optional)</Label>
                      <Input
                        id="wordLimit"
                        type="number"
                        placeholder="e.g., 2000"
                        value={wordLimit || ''}
                        onChange={(e) => setWordLimit(e.target.value ? parseInt(e.target.value) : null)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="charLimit">Character Limit (Optional)</Label>
                      <Input
                        id="charLimit"
                        type="number"
                        placeholder="e.g., 12000"
                        value={charLimit || ''}
                        onChange={(e) => setCharLimit(e.target.value ? parseInt(e.target.value) : null)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="content">Content</Label>
                    <Textarea
                      id="content"
                      placeholder="Start writing your grant proposal..."
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      className="min-h-[400px] font-heading leading-relaxed"
                    />
                  </div>

                  {/* Word/Character Count */}
                  <div className="flex items-center gap-6 p-4 bg-muted rounded-lg">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Word Count</p>
                        <p className={`text-lg font-bold ${wordLimit && wordCount > wordLimit ? 'text-red-600' : ''}`}>
                          {wordCount.toLocaleString()}
                          {wordLimit && ` / ${wordLimit.toLocaleString()}`}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <FileEdit className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Character Count</p>
                        <p className={`text-lg font-bold ${charLimit && charCount > charLimit ? 'text-red-600' : ''}`}>
                          {charCount.toLocaleString()}
                          {charLimit && ` / ${charLimit.toLocaleString()}`}
                        </p>
                      </div>
                    </div>
                    <div className="ml-auto">
                      <Badge variant={wordLimit && wordCount > wordLimit ? 'destructive' : 'secondary'}>
                        {wordLimit && wordCount > wordLimit ? 'Over limit' : 'Within limit'}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Version History */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="font-heading text-lg">
                    Version History
                  </CardTitle>
                  <CardDescription>
                    Track changes and restore previous versions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 max-h-[500px] overflow-y-auto">
                    {versions.map((version) => (
                      <div
                        key={version.id}
                        className={`p-4 rounded-lg border-2 transition-all ${
                          version.isCurrent
                            ? 'border-primary bg-primary/5'
                            : 'border-border hover:border-primary/50'
                        }`}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <Badge variant={version.isCurrent ? 'default' : 'outline'}>
                              v{version.versionNumber}
                            </Badge>
                            {version.isCurrent && (
                              <Badge variant="secondary">Current</Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            {new Date(version.date).toLocaleDateString()}
                          </div>
                        </div>

                        <div className="space-y-2">
                          <p className="text-sm">
                            <span className="font-medium">By:</span> {version.author}
                          </p>
                          {version.notes && (
                            <p className="text-sm text-muted-foreground line-clamp-2">
                              {version.notes}
                            </p>
                          )}
                          <div className="flex gap-4 text-xs text-muted-foreground">
                            <span>{version.wordCount} words</span>
                            <span>{version.charCount} chars</span>
                          </div>
                        </div>

                        {!version.isCurrent && (
                          <Button variant="ghost" size="sm" className="w-full mt-2">
                            Restore Version
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle className="font-heading text-lg">
                    Quick Actions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button variant="outline" className="w-full justify-start gap-2">
                    <FileEdit className="h-4 w-4" />
                    Create New Version
                  </Button>
                  <Button variant="outline" className="w-full justify-start gap-2">
                    <Eye className="h-4 w-4" />
                    Preview Document
                  </Button>
                  <Button variant="outline" className="w-full justify-start gap-2">
                    <Download className="h-4 w-4" />
                    Export as PDF
                  </Button>
                  <Button variant="outline" className="w-full justify-start gap-2">
                    <Download className="h-4 w-4" />
                    Export as Word
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Existing Applications Tab */}
        <TabsContent value="existing">
          <Card>
            <CardContent className="py-12 text-center">
              <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No Applications Yet</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Start by creating a new grant application
              </p>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Create New Application
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Templates Tab */}
        <TabsContent value="templates" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {templates.map((template) => (
              <Card key={template.id} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="font-heading">{template.name}</CardTitle>
                      <CardDescription className="mt-1">
                        {template.description}
                      </CardDescription>
                    </div>
                    <Badge variant="outline">{template.type}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full gap-2">
                    <Plus className="h-4 w-4" />
                    Use Template
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
