#!/bin/env node
/**
 * Can call with multiple args, i.e.
 * 
 *      html-css-autoprefixer [file1, file2, ...]
 */

const htmlAutoprefixer = require('../');
const fs = require('fs/promises');
const files = process.argv.slice(2);

(async () => {
    for (const file of files) {
        /** Load file. */
        const data = await fs.readFile(file, 'utf-8');

        try {
            /** Transform HTML. */
            const result = htmlAutoprefixer.process(data);
            /** Write back to file. */
            await fs.writeFile(file, result);
        } catch (e) {
            console.log(`Failed to transform ${file}: ${e}`);
        }
    }
})();