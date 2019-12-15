//自定义配置
module.exports = {
    baseUrl: './',
    outputDir: 'dist',
    assetsDir: 'static',
    css: {
        loaderOptions: {
            sass: {
                // data: `@import "@/assets/sass/index.scss";`
            }
        }
    },

    devServer: {
        open: true,
        port: 8092,
        /*proxy: {
            '/api_coinx': {
                target: 'https://api.coinx.pro',
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/api_coinx': ''
                }
            }
        }*/
    }
};