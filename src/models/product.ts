export interface Product {
    id: number;
    name: string;
    description?: string;
    price: number;
    category: string;
    variants?: { [key: string]: string };
    stock: number;
}

export const products: Product[] = [];
export const categories: string[] = [];