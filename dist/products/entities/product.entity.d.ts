export declare enum ProductCategory {
    GROUND_SPICES = "Ground Spices",
    WHOLE_SPICES = "Whole Spices",
    OIL_SEEDS = "Oil Seeds",
    GRAINS_PULSES = "Grains & Pulses",
    BLENDED_SPICES = "Blended Spices",
    OTHER = "Other"
}
export declare class Product {
    id: number;
    name: string;
    description: string;
    shortDesc: string;
    price: number;
    image: string;
    categories: ProductCategory[];
    specs: any;
    packaging: string[];
    createdAt: Date;
}
