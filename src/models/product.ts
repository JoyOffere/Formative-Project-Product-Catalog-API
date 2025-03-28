export interface Variant {
    id: string;
    size?: string;
    color?: string;
    stock: number;
}

export interface Product {
    id: number;
    name: string;
    description?: string;
    price: number;
    discount: number;
    category: string;
    variants: Variant[];
}