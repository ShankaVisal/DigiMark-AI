
export interface Advertisement {
    id: string;
    title: string;
    description: string;
    link: string;
    imageUrl: string;
}

export type AdData = Omit<Advertisement, 'id'>;
