import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AIAssistant } from "@/components/ai-assistant";
import { ToolGrid } from "@/components/tool-grid";
import { DigiMarkLogo } from "@/components/icons";

export default function DashboardPage() {
  return (
    <div className="relative flex min-h-screen w-full">
      <Sidebar
        variant="sidebar"
        collapsible="icon"
        className="border-r border-sidebar-border"
      >
        <SidebarHeader className="h-14">
          <div className="flex items-center gap-2.5">
            <DigiMarkLogo className="size-6" />
            <h2 className="text-lg font-semibold text-sidebar-foreground group-data-[collapsible=icon]:hidden">
              DigiMark AI
            </h2>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <AIAssistant />
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <main className="flex flex-1 flex-col">
          <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-sm sm:px-6">
            <SidebarTrigger className="md:hidden" />
            <div>
              <h1 className="text-xl font-bold tracking-tight">
                Digital Marketing Toolkit
              </h1>
              <p className="text-xs text-muted-foreground">
                Your AI-powered hub for top-tier marketing tools.
              </p>
            </div>
          </header>
          <div className="flex-1 overflow-auto p-4 sm:p-6">
            <ToolGrid />
          </div>
        </main>
      </SidebarInset>
    </div>
  );
}
