
import type { Advertisement, AdData } from '@/lib/ads';

const ADS_STORAGE_KEY = 'digimark-ads';

const initialAds: Advertisement[] = [
    {
        id: 'ad-1',
        title: 'Boost Your Reach',
        description: 'Upgrade to Pro for exclusive tools and insights.',
        link: '#',
        imageUrl: 'https://placehold.co/600x400.png',
    },
    {
        id: 'ad-2',
        title: 'New AI Features',
        description: 'Discover our latest AI-powered content generation tools.',
        link: '#',
        imageUrl: 'https://placehold.co/600x400.png',
    },
    {
        id: 'ad-3',
        title: 'Summer Sale!',
        description: 'Get 50% off on all annual plans for a limited time.',
        link: '#',
        imageUrl: 'https://placehold.co/600x400.png',
    },
    {
        id: 'ad-4',
        title: 'Join Our Webinar',
        description: 'Learn social media marketing secrets from the experts.',
        link: '#',
        imageUrl: 'https://placehold.co/600x400.png',
    }
];

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

function setInStorage<T>(key: string, value: T) {
    if (typeof window === 'undefined') return;
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.error(`Failed to write to localStorage key "${key}"`, error);
    }
}

export async function fetchAds(): Promise<Advertisement[]> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(getFromStorage(ADS_STORAGE_KEY, initialAds));
        }, 300);
    });
}

export async function addAd(adData: AdData): Promise<Advertisement> {
    return new Promise(async (resolve) => {
        const currentAds = await fetchAds();
        const newAd: Advertisement = {
            ...adData,
            id: `ad-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        };
        const updatedAds = [...currentAds, newAd];
        setInStorage(ADS_STORAGE_KEY, updatedAds);
        resolve(newAd);
    });
}

export async function updateAd(adId: string, adData: AdData): Promise<Advertisement> {
    return new Promise(async (resolve, reject) => {
        const ads = await fetchAds();
        const adIndex = ads.findIndex(ad => ad.id === adId);
        if (adIndex === -1) {
            return reject(new Error("Advertisement not found"));
        }
        
        const updatedAd = { ...ads[adIndex], ...adData };
        const updatedAds = [...ads];
        updatedAds[adIndex] = updatedAd;

        setInStorage(ADS_STORAGE_KEY, updatedAds);
        resolve(updatedAd);
    });
}

export async function deleteAd(adId: string): Promise<void> {
    return new Promise(async (resolve) => {
        let ads = await fetchAds();
        ads = ads.filter(ad => ad.id !== adId);
        setInStorage(ADS_STORAGE_KEY, ads);
        resolve();
    });
}
