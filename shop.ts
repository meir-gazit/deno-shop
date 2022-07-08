/**
 * Shop 
 * A minimal online store. 
 */
import { serve } from "https://deno.land/std@0.147.0/http/server.ts";
import { dirname, fromFileUrl } from "https://deno.land/std@0.147.0/path/mod.ts";
import { callsites } from './deps.ts';
import Shop from './lib/shop.ts';

const shopHandler = (shop: Shop) => {
    return function handler(request: Request) {
        let path = new URL(request.url).pathname;
        path = ['/', ''].includes(path) ? '/home' : path;
        const page = shop.manifest[path];
 
        // Load the 404 page if a page is not found. 
        const pageNotFound = !page;
        const document = pageNotFound 
            ? shop.manifest['/404']  
            : page; 

        // TODO: Add layout support.

        return pageNotFound 
            ? new Response(document.contents, { status: 404, headers: { "Content-Type": 'text/html' } })
            : new Response(document.contents, { headers: { "Content-Type": 'text/html' } });
    }
}

export default async function shop(config?: ShopConfig) {  
    const callsite = callsites()[1].getFileName()!;  
    const directory = fromFileUrl(dirname(callsite)); 
    const shop = await Shop(directory, config);        
    console.log('manifest: ', shop.manifest);
    serve(shopHandler(shop), {port: 4242});
}
