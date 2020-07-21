const event = process.env.npm_lifecycle_event;
const path = require('path');
const createStyledComponentsTransformer = require('typescript-plugin-styled-components').default;
const styledComponentsTransformer = createStyledComponentsTransformer();

const mode = event === "build:dev" 
    ? "development" 
    : "production";

module.exports = {
    mode,
    entry: {index: './src/index.tsx' },
    output: {
        path: path.resolve(__dirname, './public/scripts/'),
        filename: '[name].bundle.js'
    },
    devtool: 'source-map',
    resolve: {
        extensions: ['.ts', '.tsx','.js', '.jsx']
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.scss$/,
                use: ["style-loader", "css-loader", "sass-loader"],
            },
            {
                test: /\.(ts|tsx)$/,
                loader: 'ts-loader',
                options: {
                    getCustomTransformers: () => ({ before: [styledComponentsTransformer] })
                },
                exclude: '/node_modules/'
            },
            { 
                enforce: "pre", 
                test: /\.js$/, 
                loader: "source-map-loader",
                exclude: '/node_modules/' 
            }
        ]
    }
}