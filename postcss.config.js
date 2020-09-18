module.exports={
  plugins:[
    require('tailwindcss'),
    require('autoprefixer'),
    process.env.NODE_ENV === 'production' && require('@fullhuman/postcss-purgecss')({
      content: [
        `./public/**/*.html`,
         `./src/**/*.vue`,
         `./src/**/jsx`
      ],
      defaultExtractor: content => content.match(/[A-Za-z0-9-_/:]*[A-Za-z0-9-_/]+/g) || []
    })
  ]
}
