interface Link {
    url: string;
    label: string;
}

interface ShopConfig {
    name?: string;
    title?: string;
    description?: string;
    navbar_links?: Link[];   
}

interface Shop {
    name: string;
    title: string;
    description: string;
    manifest: any;
    navbar_links?: Link[];
}