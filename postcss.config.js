const autoprefixer = require('autoprefixer')

module.exports = {
    plugins: [
        // postcss用于通过应用一些组件像下面的autoprefixer，优化编译完成的css文件(例如把styl文件编译成css文件)
        // autoprefixer是处理需要加浏览器前缀的css属性(-webkit,-moz等)，这样可自动给需要加浏览器前缀的css属性加上前缀
        autoprefixer()
    ]
}