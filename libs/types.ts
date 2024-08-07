export type Tag = {
    id: number;
    name: string;
};
  
export type Product = {
    id: number;
    name: string;
    japaneseName: string;
    price: any; // Vous pourriez utiliser `string` si `Decimal` n'est pas reconnu par TypeScript
    image: string;
    ingredients: string[];
    tags: { productId: number; tagsId: number; tags: Tag }[];
};