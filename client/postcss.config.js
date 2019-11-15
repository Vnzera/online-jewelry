// postcss.config.js
const purgecss = require('@fullhuman/postcss-purgecss')({

    // Specify the paths to all of the template files in your project 
    content: [
        './src/**/*.js',
        './public/index.html',
    ],

    // Include any special characters you're using in this regular expression
    defaultExtractor: content => content.match(/[A-Za-z0-9-_:/]+/g) || []
})

module.exports = {
    plugins: [
        require('tailwindcss'),
        require('autoprefixer'),
        // the following adds purgecss only for production mode since we don't need to purge css for development mode
        ...process.env.NODE_ENV === 'production'
            ? [purgecss]
            : []
    ]
}