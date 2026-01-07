'use client'

import { AppSidebar } from './app-sidebar'
import { ReactNode } from 'react'

interface AppLayoutProps {
  children: ReactNode
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="min-h-screen flex bg-background">
      <AppSidebar />
      <main className="flex-1 lg:ml-64">
        <div className="min-h-screen flex flex-col">
          {/* Mobile spacer */}
          <div className="h-16 lg:hidden" />

          {/* Main content */}
          <div className="flex-1 p-4 lg:p-8">
            {children}
          </div>
        </div>
      </main>
    </div>
  )
}
