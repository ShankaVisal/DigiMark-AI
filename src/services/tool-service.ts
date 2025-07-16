import { Tool, tools as defaultTools, getIconForTool } from '@/lib/tools';

// This is a mock service for managing tools.
// In a real application, you would replace this with API calls to your backend/database (e.g., Firestore).

const TOOLS_STORAGE_KEY = 'digimark-tools';

// Function to simulate fetching tools from a data source
export async function fetchTools(): Promise<Tool[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      try {
        const storedTools = localStorage.getItem(TOOLS_STORAGE_KEY);
        if (storedTools) {
          const parsedTools = JSON.parse(storedTools).map((tool: any) => ({
            ...tool,
            icon: getIconForTool(tool.iconName),
          }));
          resolve(parsedTools);
        } else {
          // Initialize with default tools if nothing is in localStorage
          const toolsWithIconNames = defaultTools.map(t => ({...t, iconName: t.icon.displayName}));
          localStorage.setItem(TOOLS_STORAGE_KEY, JSON.stringify(toolsWithIconNames));
          resolve(defaultTools);
        }
      } catch (error) {
        console.error("Failed to fetch tools from localStorage, returning default tools.", error);
        resolve(defaultTools);
      }
    }, 500); // Simulate network delay
  });
}

// Function to simulate adding a new tool
export async function addTool(toolData: Omit<Tool, 'id' | 'icon'> & { iconName: string }): Promise<Tool> {
  return new Promise(async (resolve, reject) => {
    setTimeout(async () => {
      try {
        const currentTools = await fetchTools();
        const newTool: Tool = {
          ...toolData,
          id: `tool-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          icon: getIconForTool(toolData.iconName),
        };
        
        const updatedTools = [...currentTools, newTool];
        
        const toolsToStore = updatedTools.map(t => {
            const { icon, ...rest } = t;
            return { ...rest, iconName: (t.icon as any).displayName || 'PenSquare' };
        });

        localStorage.setItem(TOOLS_STORAGE_KEY, JSON.stringify(toolsToStore));
        resolve(newTool);
      } catch (error) {
        console.error("Failed to add tool to localStorage.", error);
        reject(error);
      }
    }, 500); // Simulate network delay
  });
}
