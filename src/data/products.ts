export type Product = {
    id: number;
    name: string;
    price: number;
    category: string[];
    type: "Decor" | "Tabletop" | "Wall" | "Accessory" | "Paper";
    variants?: string[];
    textOptions?: string[];
    description?: string; // Added description for product details
    image?: string; // Placeholder for image path
};

export const products: Product[] = [
    // Wreaths
    {
        id: 1,
        name: "Metal Wreath",
        price: 30,
        category: ["Ramadan", "Eid"],
        type: "Decor",
        variants: ["Gold", "Silver", "Black"],
        description: "Elegant metal wreath perfect for Ramadan and Eid celebrations. Available in multiple finishes."
    },
    {
        id: 2,
        name: "Wooden Wreath - Large",
        price: 25,
        category: ["Ramadan", "Eid"],
        type: "Decor",
        textOptions: ["Ramadan", "Eid", "Salam"],
        description: "Large wooden wreath with customizable text options. Adds a warm, natural touch to your decor."
    },
    {
        id: 3,
        name: "Wooden Wreath - Medium",
        price: 20,
        category: ["Ramadan", "Eid"],
        type: "Decor",
        textOptions: ["Ramadan", "Eid", "Salam"],
        description: "Medium-sized wooden wreath, perfect for doors or wall accents."
    },
    {
        id: 4,
        name: "Wooden Wreath - Small",
        price: 15,
        category: ["Ramadan", "Eid"],
        type: "Decor",
        textOptions: ["Ramadan", "Eid", "Salam"],
        description: "Small wooden wreath, ideal for smaller spaces or as part of a gallery wall."
    },
    {
        id: 5,
        name: "Wooden Wreath - XSmall",
        price: 10,
        category: ["Ramadan", "Eid"],
        type: "Decor",
        textOptions: ["Ramadan", "Eid", "Salam"],
        description: "Extra small wooden wreath, great for distinct accents."
    },

    // Stands & Centerpieces
    {
        id: 6,
        name: "Acrylic Stand",
        price: 15,
        category: ["Ramadan", "Eid"],
        type: "Tabletop",
        description: "Modern acrylic stand for a sleek, contemporary look."
    },
    {
        id: 7,
        name: "Floral Centerpiece",
        price: 20,
        category: ["General", "Gifts"],
        type: "Tabletop",
        description: "Beautiful floral centerpiece to brighten up any table setting."
    },
    {
        id: 8,
        name: "Watercolor Wooden Stand",
        price: 5,
        category: ["Islamic"],
        type: "Tabletop",
        textOptions: ["Bismillah", "Alhamdulillah", "Allahu Akbar"],
        description: "Artistic watercolor wooden stand with Islamic phrases."
    },

    // Hangings & Misc
    {
        id: 9,
        name: "Two-tier Hanging",
        price: 10,
        category: ["Islamic"],
        type: "Wall",
        textOptions: ["Bismillah", "Alhamdulillah"],
        description: "Two-tier wall hanging featuring Islamic calligraphy."
    },
    {
        id: 10,
        name: "Rectangle Dua Hanging",
        price: 15,
        category: ["Islamic"],
        type: "Wall",
        description: "Rectangular hanging with a powerful Dua, perfect for daily reminders."
    },
    {
        id: 11,
        name: "Keychains",
        price: 3,
        category: ["Gifts"],
        type: "Accessory",
        description: "Stylish keychains, great for personal use or as small gifts."
    },
    {
        id: 12,
        name: "Bookmarks",
        price: 2,
        category: ["Gifts"],
        type: "Accessory",
        description: "Elegant bookmarks for your daily reading."
    },
    {
        id: 13,
        name: "Ramadan/Eid Cards",
        price: 5,
        category: ["Ramadan", "Eid", "Gifts"],
        type: "Paper",
        description: "Beautifully designed cards to share the joy of Ramadan and Eid."
    },
    {
        id: 14,
        name: "Tote Bags",
        price: 10,
        category: ["General", "Gifts"],
        type: "Accessory",
        description: "Eco-friendly tote bags, practical and stylish."
    },
    {
        id: 15,
        name: "Pouches",
        price: 5,
        category: ["General", "Gifts"],
        type: "Accessory",
        description: "Versatile pouches for organizing small items."
    }
];
