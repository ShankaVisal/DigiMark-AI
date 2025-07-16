
import { Tool, ToolCategory, initialTools, initialCategories, getIconForTool } from '@/lib/tools';

// This is a mock service for managing tools.
// In a real application, you would replace this with API calls to your backend/database (e.g., Firestore).

const TOOLS_STORAGE_KEY = 'digimark-tools';
const CATEGORIES_STORAGE_KEY = 'digimark-categories';


// Helper to get data from local storage
function getFromStorage<T>(key: string, defaultValue: T): T {
    if (typeof window === 'undefined') {
        return defaultValue;
    }
    try {
        const stored = localStorage.getItem(key);
        if (stored) {
            return JSON.parse(stored) as T;
        } else {
            localStorage.setItem(key, JSON.stringify(defaultValue));
            return defaultValue;
        }
    } catch (error) {
        console.error(`Failed to read from localStorage key "${key}"`, error);
        return defaultValue;
    }
}

// Helper to set data to local storage
function setInStorage<T>(key: string, value: T) {
    if (typeof window === 'undefined') return;
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.error(`Failed to write to localStorage key "${key}"`, error);
    }
}


// ====== CATEGORY CRUD ======

export async function fetchCategories(): Promise<ToolCategory[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
        resolve(getFromStorage(CATEGORIES_STORAGE_KEY, initialCategories));
    }, 200);
  });
}

export async function addCategory(name: string): Promise<ToolCategory> {
    return new Promise(async (resolve) => {
        const categories = await fetchCategories();
        const newCategory: ToolCategory = {
            id: name.toLowerCase().replace(/\s+/g, '-'),
            name,
        };
        const updatedCategories = [...categories, newCategory];
        setInStorage(CATEGORIES_STORAGE_KEY, updatedCategories);
        resolve(newCategory);
    });
}

export async function updateCategory(id: string, newName: string): Promise<ToolCategory> {
    return new Promise(async (resolve) => {
        const categories = await fetchCategories();
        const categoryToUpdate = categories.find(c => c.id === id);
        if (!categoryToUpdate) throw new Error("Category not found");
        
        const updatedCategory = { ...categoryToUpdate, name: newName };
        const updatedCategories = categories.map(c => c.id === id ? updatedCategory : c);
        
        setInStorage(CATEGORIES_STORAGE_KEY, updatedCategories);
        resolve(updatedCategory);
    });
}

export async function deleteCategory(id: string): Promise<void> {
    return new Promise(async (resolve) => {
        let categories = await fetchCategories();
        categories = categories.filter(c => c.id !== id);
        setInStorage(CATEGORIES_STORAGE_KEY, categories);

        // Also update tools in that category - set to uncategorized for simplicity
        let tools = await fetchTools();
        tools.forEach(tool => {
            if (tool.category === id) {
                tool.category = 'uncategorized';
            }
        });
        setInStorage(TOOLS_STORAGE_KEY, tools);
        
        resolve();
    });
}


// ====== TOOL CRUD ======

export async function fetchTools(): Promise<Tool[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const toolsFromStorage = getFromStorage(TOOLS_STORAGE_KEY, initialTools);
      const hydratedTools = toolsFromStorage.map(tool => ({
          ...tool,
          icon: getIconForTool(tool.iconName),
      }));
      resolve(hydratedTools);
    }, 500); // Simulate network delay
  });
}

export async function addTool(toolData: Omit<Tool, 'id' | 'icon'>): Promise<Tool> {
  return new Promise(async (resolve) => {
      const currentTools = await fetchTools();
      const newTool: Tool = {
        ...toolData,
        id: `tool-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        icon: getIconForTool(toolData.iconName),
      };
      
      const updatedTools = [...currentTools, newTool];
      setInStorage(TOOLS_STORAGE_KEY, updatedTools.map(({icon, ...t}) => t));
      resolve(newTool);
  });
}

export async function updateTool(toolId: string, toolData: Partial<Omit<Tool, 'id' | 'icon'>>): Promise<Tool> {
    return new Promise(async (resolve, reject) => {
        const tools = await fetchTools();
        const toolIndex = tools.findIndex(t => t.id === toolId);
        if (toolIndex === -1) {
            return reject(new Error("Tool not found"));
        }
        
        const updatedTool = { ...tools[toolIndex], ...toolData };
        const updatedTools = [...tools];
        updatedTools[toolIndex] = updatedTool;

        setInStorage(TOOLS_STORAGE_KEY, updatedTools.map(({icon, ...t}) => t));
        resolve({ ...updatedTool, icon: getIconForTool(updatedTool.iconName) });
    });
}


export async function deleteTool(toolId: string): Promise<void> {
    return new Promise(async (resolve) => {
        let tools = await fetchTools();
        tools = tools.filter(t => t.id !== toolId);
        setInStorage(TOOLS_STORAGE_KEY, tools.map(({icon, ...t}) => t));
        resolve();
    });
}
