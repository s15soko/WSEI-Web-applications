const path = require("path");

const DIST_JS_OUTPUT_FOLDER = "build";

const MODE_PRODUCTION = "production";
const MODE_DEVELOPMENT = "development";

//

const appConfig = (env, args) => {

    const production = args && args.mode && args.mode == MODE_PRODUCTION;
    const watch = args && args.watch;

    //

    return {
        // watch: watch,
        mode: production ? MODE_PRODUCTION : MODE_DEVELOPMENT,
        entry: {
            index: "./src/index.ts",
        },
        output: {
            path: path.resolve(__dirname, DIST_JS_OUTPUT_FOLDER),
            filename: "[name].js"
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js']
        },
        module: {
            rules: [
                {
                    test: /\.ts?$/, 
                    loader: 'ts-loader'
                },
                {
                    test: /\.s[ac]ss$/i,
                    use: [{
                      loader: "style-loader"
                    }, {
                      loader: "css-loader"
                    }, {
                      loader: "sass-loader"
                    }]
                  }
            ]
        }
    };
};

module.exports = [appConfig];