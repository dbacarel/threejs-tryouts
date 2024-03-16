import { resolve } from 'path'

export default {
    root: 'src/',
    publicDir: '../static/',
    base: './',
    server:
    {
        host: true, // Open to local network and display URL
        open: !('SANDBOX_URL' in process.env || 'CODESANDBOX_HOST' in process.env), // Open if it's not a CodeSandbox
        watch: {
            usePolling: true
        }
    },
    build:
    {
        outDir: '../dist', // Output in the dist/ folder
        emptyOutDir: true, // Empty the folder first
        sourcemap: true, // Add sourcemap
        rollupOptions: {
            input: {
              main: resolve(__dirname, 'src/index.html'),
              controls: resolve(__dirname, 'src/controls/demo.html'),
              animations: resolve(__dirname, 'src/animations/demo.html'),
              geometries: resolve(__dirname, 'src/geometries/demo.html'),
              textures: resolve(__dirname, 'src/textures/demo.html'),
            },
          },
    },
}