import { expandGlobSync } from "https://deno.land/std@0.147.0/fs/mod.ts";
import { parseFrontmatter } from '../deps.ts';

const default_shop = {
    name: 'Shop',
    description: 'Shop is a minimal ecommerce template, designed to make it easy to launch an online store and minimize operating costs.',
    navbar_links: [
        { url: '/home', label: 'Home' },
        { url: '/products', label: 'Products' }
    ]
}

/**
 * Configures a Shop object from default & user provided values.  
 */
export async function Shop(ROOT_DIR: string, config?: ShopConfig, ): Promise<Shop> {
    const name = config?.name || default_shop.name;
    const description = config?.description || default_shop.description;
    const title = config?.title || `{% page_title %} | ${name}`;
    const manifest = await generateManifest(ROOT_DIR);

    return {
        name,
        description,
        title,
        manifest
    }
}

/**
 * Create a manifest of all defined pages for the shop.
 * The manifest is used for routing.
 * TODO: move to pages.ts
 */
async function generateManifest(ROOT_DIR: string) {
    const pages = await findAllPages(ROOT_DIR);
    console.log('pages found:', pages);

    // TODO: add typing for the manifest
    const manifest: any = {}
    pages.forEach(async page => {
        const contents = await Deno.readTextFile(page.path);
        const { data } = parseFrontmatter(contents);
        const frontmatter: any = data; // TODO: add better typing of frontmatter

        // frontmatter support
        // TODO: organize into a separate fn
        const route = frontmatter?.route || page.path.replace(`${ROOT_DIR}/pages`, '').replace('.md', '');
        const title = frontmatter?.title || route.replace('/', ''); 
        const description = frontmatter?.description; 
        const layout = frontmatter?.layout || 'default'; 

        manifest[route] = {
            contents,
            title,
            description,
            layout
        }
    });

    return manifest
}

async function findAllPages(ROOT_DIR: string) {
    const pages = [];
    for await (const file of expandGlobSync(`${ROOT_DIR}/pages/*.md`)) {
        pages.push(file);
    }
    return pages
}

export default Shop;