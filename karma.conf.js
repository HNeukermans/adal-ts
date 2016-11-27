module.exports = function (config) {
    'use strict';

    config.set({
        basePath: './',
        frameworks: ["jasmine"],
        // list of files / patterns to load in the browser
        files: [
            //{ pattern: 'dist/*.js', included: true },
            { pattern: '*.spec.ts', watched: true }
        ],

        // list of files / patterns to exclude
        exclude: [],

        preprocessors: {
            '*.spec.ts': ['webpack', 'sourcemap'],
            //'*.ts': ['webpack', 'sourcemap', 'coverage'],
            //'**/!(*.spec)+(.js)': ['coverage']
            //'**/*.js': ['coverage']
        },


        webpackServer: {
            noInfo: true
            //progress:false,
            //stats: false,
            //debug:false
        },

        // web server port
        port: 9876,

        // enable / disable colors in the output (reporters and logs)
        colors: true,

        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,

        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: (process.env.IS_TRAVIS == null) ? true : false,

        browsers: [
            //"Firefox",
            "Chrome",
            //"IE",
            //"PhantomJS"
        ],

        // Continuous Integration mode
        // if true, it capture browsers, run tests and exit
        singleRun: (process.env.IS_TRAVIS == null) ? false : true,

        reporters: ['progress', 'coverage', 'dots'],

        webpack: {
            resolve: {
                extensions: ['', '.ts', '.js']
            },
            module: {
                loaders: [
                    { test: /\.ts$/, loader: 'awesome-typescript-loader' }
                ],
                postLoaders: [
                    // instrument only testing sources with Istanbul
                    {
                        test: /\.(js|ts)$/,
                        //include: helpers.root('src'),
                        loader: 'istanbul-instrumenter-loader',
                        exclude: [
                            /\.(e2e|spec)\.ts$/,
                            /node_modules/
                        ]
                    }
                ]
                // preLoaders: [
                //     // instrument only testing sources with Istanbul
                //     {
                //         test: /\.js$/,
                //         include: path.resolve('src/components/'),
                //         loader: 'istanbul-instrumenter'
                //     }
                // ]
                // postLoaders: [
                //     {
                //         test: /\.js$/,
                //         exclude: /(node_modules|resources\/js\/vendor)/,
                //         loader: 'istanbul-instrumenter'
                //     }
                // ]
            },
            stats: {
                colors: true,
                reasons: true
            },
            debug: true,
            devtool: 'inline-source-map'
        },

        coverageReporter: {
            // specify a common output directory 
            dir: './coverage',
            reporters: [
                { type: 'html', subdir: 'report-html' },
                // generates ./coverage/lcov.info
                {type:'lcovonly', subdir: '.'}
                // generates ./coverage/coverage-final.json
                //{type:'json', subdir: '.'},

            ]
        }
    });
};