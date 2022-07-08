/**
 * Generate a Shop 
 * Scaffolds a project with the basic pages & templates to run their online store. 
 * ---
 * After running this script, your directory structure should be:
 *   /pages
 *     - home.md
 *     - products.md
 *   /templates
 *     /product
 *       - archive.liquid
 *       - single.liquid
 *       - detail.liquid
 *     /cart
 *       - cart.liquid
 *       - cart-mini.liquid
 *     - header.liquid
 *     - footer.liquid
 *   shop.ts
 */
import { resolve } from "https://deno.land/std@0.147.0/path/mod.ts";
import { copy } from "https://deno.land/std@0.147.0/fs/copy.ts";

async function init(directory: string) {
    directory = resolve(directory);
    console.log(`Setting up your shop in ${directory}...`);

    // TODO: Warnings about non-empty directories? 

    // copy /base directory contents.
    await copy("./base", directory);

    // TODO: Add run instructions `deno task start`
    console.log("Shop created!");
}

// If import.meta.main is true, this module is being run directly on the CLI. 
if (import.meta.main) {
    // Accept a destination directory argument
    const directory = Deno.args[0];
    if (!directory) {
        // TODO: display help text.
        throw new Error('You must specify a destination directory to create your shop.');
    }
    await init(directory);
} else {  
    throw new Error("Please use the CLI to setup your shop.");
}