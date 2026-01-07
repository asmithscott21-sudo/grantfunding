'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Calendar,
  DollarSign,
  Clock,
  AlertCircle,
  MoreVertical,
  Plus,
  Filter
} from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface GrantCard {
  id: string
  title: string
  organization: string
  amount: number
  status: 'idea' | 'draft' | 'internal_review' | 'submitted' | 'awarded' | 'rejected'
  deadline: string
  priority: 'low' | 'medium' | 'high'
  progress: number
}

const mockGrants: GrantCard[] = [
  {
    id: '1',
    title: 'Community Health Initiative',
    organization: 'National Health Foundation',
    amount: 150000,
    status: 'draft',
    deadline: '2024-01-15',
    priority: 'high',
    progress: 45
  },
  {
    id: '2',
    title: 'STEM Education Innovation',
    organization: 'Department of Education',
    amount: 500000,
    status: 'internal_review',
    deadline: '2024-02-20',
    priority: 'high',
    progress: 75
  },
  {
    id: '3',
    title: 'Environmental Conservation Fund',
    organization: 'EPA',
    amount: 250000,
    status: 'submitted',
    deadline: '2023-12-30',
    priority: 'medium',
    progress: 100
  },
  {
    id: '4',
    title: 'Arts Preservation Program',
    organization: 'NEA',
    amount: 100000,
    status: 'idea',
    deadline: '2024-03-01',
    priority: 'low',
    progress: 10
  },
  {
    id: '5',
    title: 'Tech for Good Initiative',
    organization: 'Tech Foundation',
    amount: 300000,
    status: 'awarded',
    deadline: '2024-01-10',
    priority: 'medium',
    progress: 100
  },
  {
    id: '6',
    title: 'Youth Development Grant',
    organization: 'Community First',
    amount: 75000,
    status: 'draft',
    deadline: '2023-12-15',
    priority: 'high',
    progress: 60
  }
]

const columns = [
  { id: 'idea', title: 'Idea', color: 'bg-gray-500' },
  { id: 'draft', title: 'Draft', color: 'bg-blue-500' },
  { id: 'internal_review', title: 'Internal Review', color: 'bg-yellow-500' },
  { id: 'submitted', title: 'Submitted', color: 'bg-purple-500' },
  { id: 'awarded', title: 'Awarded', color: 'bg-green-500' },
  { id: 'rejected', title: 'Rejected', color: 'bg-red-500' },
]

export function GrantTrackingModule() {
  const [grants, setGrants] = useState<GrantCard[]>(mockGrants)
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [filterPriority, setFilterPriority] = useState<string>('all')

  const filteredGrants = grants.filter(grant => {
    const matchesStatus = filterStatus === 'all' || grant.status === filterStatus
    const matchesPriority = filterPriority === 'all' || grant.priority === filterPriority
    return matchesStatus && matchesPriority
  })

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-600 bg-red-50 border-red-200'
      case 'medium':
        return 'text-amber-600 bg-amber-50 border-amber-200'
      case 'low':
        return 'text-green-600 bg-green-50 border-green-200'
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200'
    }
  }

  const getDaysUntil = (deadline: string) => {
    const today = new Date()
    const deadlineDate = new Date(deadline)
    const daysUntil = Math.ceil((deadlineDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
    return daysUntil
  }

  const getUrgencyColor = (daysUntil: number) => {
    if (daysUntil <= 7) return 'text-red-600'
    if (daysUntil <= 30) return 'text-amber-600'
    return 'text-green-600'
  }

  const moveGrant = (grantId: string, newStatus: GrantCard['status']) => {
    setGrants(grants.map(grant =>
      grant.id === grantId ? { ...grant, status: newStatus } : grant
    ))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-heading font-bold text-foreground mb-2">
            Grant Tracking
          </h2>
          <p className="text-muted-foreground">
            Track and manage your grant applications through the entire lifecycle
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          New Application
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-4 items-center">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="All Statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                {columns.map(col => (
                  <SelectItem key={col.id} value={col.id}>{col.title}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={filterPriority} onValueChange={setFilterPriority}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="All Priorities" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priorities</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex gap-4 ml-auto">
              <Badge variant="outline">{filteredGrants.length} Total</Badge>
              <Badge variant="secondary">{grants.filter(g => g.status === 'awarded').length} Awarded</Badge>
              <Badge variant="destructive">{grants.filter(g => g.status === 'rejected').length} Rejected</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Kanban Board */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 overflow-x-auto pb-4">
        {columns.map((column) => {
          const columnGrants = filteredGrants.filter(g => g.status === column.id)
          return (
            <div key={column.id} className="flex flex-col min-w-[300px]">
              <div className="flex items-center justify-between mb-4 px-2">
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${column.color}`} />
                  <h3 className="font-heading font-semibold text-sm">
                    {column.title}
                  </h3>
                  <Badge variant="secondary" className="text-xs">
                    {columnGrants.length}
                  </Badge>
                </div>
              </div>

              <div className="space-y-3">
                {columnGrants.map((grant) => {
                  const daysUntil = getDaysUntil(grant.deadline)
                  const isOverdue = daysUntil < 0

                  return (
                    <Card key={grant.id} className="hover:shadow-md transition-shadow cursor-pointer">
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between mb-2">
                          <Badge
                            variant="outline"
                            className={`text-xs ${getPriorityColor(grant.priority)}`}
                          >
                            {grant.priority}
                          </Badge>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-6 w-6">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              {columns.filter(col => col.id !== column.id).map(col => (
                                <DropdownMenuItem
                                  key={col.id}
                                  onClick={() => moveGrant(grant.id, col.id as GrantCard['status'])}
                                >
                                  Move to {col.title}
                                </DropdownMenuItem>
                              ))}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                        <CardTitle className="text-sm font-heading leading-tight">
                          {grant.title}
                        </CardTitle>
                        <p className="text-xs text-muted-foreground mt-1">
                          {grant.organization}
                        </p>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="flex items-center gap-2 mb-3">
                          <DollarSign className="h-3 w-3 text-muted-foreground" />
                          <span className="text-sm font-medium">
                            ${grant.amount.toLocaleString()}
                          </span>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-xs">
                            <Calendar className="h-3 w-3 text-muted-foreground" />
                            <span className={isOverdue ? 'text-red-600 font-medium' : ''}>
                              {new Date(grant.deadline).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric'
                              })}
                            </span>
                            {!isOverdue && (
                              <span className={getUrgencyColor(daysUntil)}>
                                ({daysUntil}d)
                              </span>
                            )}
                            {isOverdue && (
                              <Badge variant="destructive" className="text-xs">
                                Overdue
                              </Badge>
                            )}
                          </div>

                          {grant.status !== 'awarded' && grant.status !== 'rejected' && (
                            <div className="w-full bg-muted rounded-full h-1.5">
                              <div
                                className="bg-primary h-1.5 rounded-full transition-all"
                                style={{ width: `${grant.progress}%` }}
                              />
                            </div>
                          )}
                        </div>

                        {grant.status === 'internal_review' && (
                          <div className="mt-3 flex items-center gap-2 text-xs text-amber-600 bg-amber-50 p-2 rounded">
                            <Clock className="h-3 w-3" />
                            <span>Pending Review</span>
                          </div>
                        )}

                        {isOverdue && grant.status !== 'rejected' && (
                          <div className="mt-3 flex items-center gap-2 text-xs text-red-600 bg-red-50 p-2 rounded">
                            <AlertCircle className="h-3 w-3" />
                            <span>Deadline Missed</span>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  )
                })}

                {columnGrants.length === 0 && (
                  <div className="text-center py-8 text-sm text-muted-foreground">
                    No grants in this column
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Summary Statistics */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-heading">Active Applications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {grants.filter(g => ['idea', 'draft', 'internal_review'].includes(g.status)).length}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              In progress
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-heading">Pending Review</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {grants.filter(g => ['submitted', 'internal_review'].includes(g.status)).length}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Awaiting response
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-heading">Total Awarded</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${grants
                .filter(g => g.status === 'awarded')
                .reduce((sum, g) => sum + g.amount, 0)
                .toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {grants.filter(g => g.status === 'awarded').length} grants
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-heading">Success Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(() => {
                const completed = grants.filter(g => ['awarded', 'rejected'].includes(g.status))
                const awarded = grants.filter(g => g.status === 'awarded')
                return completed.length > 0
                  ? Math.round((awarded.length / completed.length) * 100)
                  : 0
              })()}%
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Awarded vs Rejected
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
