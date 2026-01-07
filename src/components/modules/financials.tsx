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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  DollarSign,
  Calculator,
  Plus,
  Trash2,
  Download,
  Save,
  Users
} from 'lucide-react'

interface BudgetLineItem {
  id: string
  category: string
  description: string
  quantity: number
  unit: string
  unitCost: number
  totalCost: number
  period: string
}

interface FTEPosition {
  id: string
  position: string
  hourlyRate: number
  annualSalary: number
  fringeRate: number
}

const mockBudgetItems: BudgetLineItem[] = [
  {
    id: '1',
    category: 'personnel',
    description: 'Project Manager',
    quantity: 1,
    unit: 'year',
    unitCost: 85000,
    totalCost: 85000,
    period: 'year1'
  },
  {
    id: '2',
    category: 'personnel',
    description: 'Research Analyst',
    quantity: 2,
    unit: 'year',
    unitCost: 65000,
    totalCost: 130000,
    period: 'year1'
  },
  {
    id: '3',
    category: 'travel',
    description: 'Conference Travel',
    quantity: 4,
    unit: 'each',
    unitCost: 1500,
    totalCost: 6000,
    period: 'year1'
  },
  {
    id: '4',
    category: 'supplies',
    description: 'Office Supplies',
    quantity: 12,
    unit: 'month',
    unitCost: 500,
    totalCost: 6000,
    period: 'year1'
  },
  {
    id: '5',
    category: 'equipment',
    description: 'Computers & Software',
    quantity: 3,
    unit: 'each',
    unitCost: 2500,
    totalCost: 7500,
    period: 'year1'
  }
]

const mockFTEPositions: FTEPosition[] = [
  {
    id: '1',
    position: 'Project Manager',
    hourlyRate: 42.50,
    annualSalary: 85000,
    fringeRate: 25
  },
  {
    id: '2',
    position: 'Research Analyst',
    hourlyRate: 32.50,
    annualSalary: 65000,
    fringeRate: 25
  },
  {
    id: '3',
    position: 'Program Coordinator',
    hourlyRate: 27.50,
    annualSalary: 55000,
    fringeRate: 25
  }
]

export function FinancialsModule() {
  const [budgetItems, setBudgetItems] = useState<BudgetLineItem[]>(mockBudgetItems)
  const [ftePositions, setFTEPositions] = useState<FTEPosition[]>(mockFTEPositions)
  const [totalBudget, setTotalBudget] = useState(250000)
  const [matchRequired, setMatchRequired] = useState(true)
  const [matchAmount, setMatchAmount] = useState(50000)
  const [inKindContribution, setInKindContribution] = useState(15000)

  const categoryColors: Record<string, string> = {
    personnel: 'bg-blue-100 text-blue-800',
    fringe: 'bg-green-100 text-green-800',
    travel: 'bg-yellow-100 text-yellow-800',
    supplies: 'bg-purple-100 text-purple-800',
    equipment: 'bg-red-100 text-red-800',
    indirect_cost: 'bg-orange-100 text-orange-800',
    other: 'bg-gray-100 text-gray-800'
  }

  const totalDirectCosts = budgetItems.reduce((sum, item) => sum + item.totalCost, 0)
  const totalWithMatch = totalDirectCosts + matchAmount + inKindContribution
  const budgetUtilization = (totalDirectCosts / totalBudget) * 100

  const calculateFTECost = (hours: number, positionId: string) => {
    const position = fTEPositions.find(p => p.id === positionId)
    if (!position) return 0
    const baseCost = hours * position.hourlyRate
    const fringeCost = baseCost * (position.fringeRate / 100)
    return baseCost + fringeCost
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-heading font-bold text-foreground mb-2">
            Financials
          </h2>
          <p className="text-muted-foreground">
            Manage budgets, calculate FTE costs, and generate financial reports
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export Report
          </Button>
          <Button className="gap-2">
            <Save className="h-4 w-4" />
            Save Budget
          </Button>
        </div>
      </div>

      {/* Budget Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-heading">Total Budget</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${totalBudget.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Aligned amount
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-heading">Direct Costs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${totalDirectCosts.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {budgetUtilization.toFixed(1)}% utilized
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-heading">Match Required</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${matchAmount.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {matchRequired ? 'Yes' : 'No'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-heading">In-Kind Contribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${inKindContribution.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Non-cash support
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="budget-builder" className="space-y-6">
        <TabsList>
          <TabsTrigger value="budget-builder">Budget Builder</TabsTrigger>
          <TabsTrigger value="fte-calculator">FTE Calculator</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        {/* Budget Builder Tab */}
        <TabsContent value="budget-builder" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Budget Table */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="font-heading">Budget Builder</CardTitle>
                      <CardDescription>
                        Build your grant budget line-by-line
                      </CardDescription>
                    </div>
                    <Button size="sm" className="gap-2">
                      <Plus className="h-4 w-4" />
                      Add Line Item
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Category</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead className="text-right">Qty</TableHead>
                        <TableHead className="text-right">Unit Cost</TableHead>
                        <TableHead className="text-right">Total</TableHead>
                        <TableHead></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {budgetItems.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell>
                            <Badge className={categoryColors[item.category] || categoryColors.other}>
                              {item.category}
                            </Badge>
                          </TableCell>
                          <TableCell>{item.description}</TableCell>
                          <TableCell className="text-right">
                            {item.quantity} {item.unit}
                          </TableCell>
                          <TableCell className="text-right">
                            ${item.unitCost.toLocaleString()}
                          </TableCell>
                          <TableCell className="text-right font-medium">
                            ${item.totalCost.toLocaleString()}
                          </TableCell>
                          <TableCell>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Trash2 className="h-4 w-4 text-muted-foreground" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                      <TableRow className="font-bold bg-muted">
                        <TableCell colSpan={4}>Total Direct Costs</TableCell>
                        <TableCell className="text-right">
                          ${totalDirectCosts.toLocaleString()}
                        </TableCell>
                        <TableCell></TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>

            {/* Budget Settings */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="font-heading text-lg">
                    Budget Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="totalBudget">Total Budget Amount</Label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                      <Input
                        id="totalBudget"
                        type="number"
                        value={totalBudget}
                        onChange={(e) => setTotalBudget(parseFloat(e.target.value) || 0)}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="matchRequired">Match Required</Label>
                    <Select value={matchRequired.toString()} onValueChange={(v) => setMatchRequired(v === 'true')}>
                      <SelectTrigger id="matchRequired">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="true">Yes</SelectItem>
                        <SelectItem value="false">No</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {matchRequired && (
                    <div className="space-y-2">
                      <Label htmlFor="matchAmount">Match Amount</Label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                        <Input
                          id="matchAmount"
                          type="number"
                          value={matchAmount}
                          onChange={(e) => setMatchAmount(parseFloat(e.target.value) || 0)}
                          className="pl-10"
                        />
                      </div>
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="inKind">In-Kind Contribution</Label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                      <Input
                        id="inKind"
                        type="number"
                        value={inKindContribution}
                        onChange={(e) => setInKindContribution(parseFloat(e.target.value) || 0)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="font-heading text-lg">
                    Budget Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">Direct Costs</span>
                    <span className="text-sm font-medium">
                      ${totalDirectCosts.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Match Required</span>
                    <span className="text-sm font-medium">
                      ${matchAmount.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">In-Kind</span>
                    <span className="text-sm font-medium">
                      ${inKindContribution.toLocaleString()}
                    </span>
                  </div>
                  <div className="border-t pt-3 flex justify-between font-bold">
                    <span>Total</span>
                    <span>${totalWithMatch.toLocaleString()}</span>
                  </div>
                  <div className="mt-4">
                    <div className="flex justify-between text-xs mb-1">
                      <span>Budget Utilization</span>
                      <span>{budgetUtilization.toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all ${
                          budgetUtilization > 100 ? 'bg-red-500' : 'bg-primary'
                        }`}
                        style={{ width: `${Math.min(budgetUtilization, 100)}%` }}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* FTE Calculator Tab */}
        <TabsContent value="fte-calculator">
          <Card>
            <CardHeader>
              <CardTitle className="font-heading">FTE Calculator</CardTitle>
              <CardDescription>
                Calculate personnel costs with fringe benefits for your budget
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <Card className="border-2 border-primary/20">
                    <CardHeader className="pb-3">
                      <div className="flex items-center gap-2">
                        <Calculator className="h-5 w-5 text-primary" />
                        <CardTitle className="text-lg">Quick Calculator</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label>Select Position</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Choose a position" />
                          </SelectTrigger>
                          <SelectContent>
                            {ftePositions.map(pos => (
                              <SelectItem key={pos.id} value={pos.id}>
                                {pos.position}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label>Hours Required</Label>
                        <Input type="number" placeholder="e.g., 2080" />
                      </div>

                      <Button className="w-full gap-2">
                        <Calculator className="h-4 w-4" />
                        Calculate Cost
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-3">
                      <div className="flex items-center gap-2">
                        <Users className="h-5 w-5 text-primary" />
                        <CardTitle className="text-lg">FTE Positions</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {ftePositions.map((position) => (
                          <div key={position.id} className="p-3 border rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-medium">{position.position}</span>
                              <Badge variant="outline">{position.fringeRate}% fringe</Badge>
                            </div>
                            <div className="grid grid-cols-2 gap-2 text-sm">
                              <div>
                                <p className="text-muted-foreground">Hourly</p>
                                <p className="font-medium">${position.hourlyRate.toFixed(2)}/hr</p>
                              </div>
                              <div>
                                <p className="text-muted-foreground">Annual</p>
                                <p className="font-medium">${position.annualSalary.toLocaleString()}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                        <Button variant="outline" className="w-full gap-2">
                          <Plus className="h-4 w-4" />
                          Add Position
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* FTE Cost Table */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Position Cost Breakdown</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Position</TableHead>
                          <TableHead className="text-right">Base Salary</TableHead>
                          <TableHead className="text-right">Fringe Rate</TableHead>
                          <TableHead className="text-right">Fringe Amount</TableHead>
                          <TableHead className="text-right">Total Cost</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {ftePositions.map((position) => {
                          const fringeAmount = position.annualSalary * (position.fringeRate / 100)
                          const totalCost = position.annualSalary + fringeAmount
                          return (
                            <TableRow key={position.id}>
                              <TableCell className="font-medium">{position.position}</TableCell>
                              <TableCell className="text-right">${position.annualSalary.toLocaleString()}</TableCell>
                              <TableCell className="text-right">{position.fringeRate}%</TableCell>
                              <TableCell className="text-right">${fringeAmount.toLocaleString()}</TableCell>
                              <TableCell className="text-right font-bold">${totalCost.toLocaleString()}</TableCell>
                            </TableRow>
                          )
                        })}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Reports Tab */}
        <TabsContent value="reports">
          <Card>
            <CardContent className="py-12 text-center">
              <Download className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">Financial Reports</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Generate and export standard financial reports including SF-425
              </p>
              <div className="flex gap-2 justify-center">
                <Button variant="outline" className="gap-2">
                  <Download className="h-4 w-4" />
                  SF-425 Report
                </Button>
                <Button variant="outline" className="gap-2">
                  <Download className="h-4 w-4" />
                  Budget Narrative
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
