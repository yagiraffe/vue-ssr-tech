<template>
    <header :class="$style.mainHeader">
        <h1>JTodo</h1>
    </header>
</template>
<style lang="stylus" module>
// 在style里加module会用cssModules方式编译这块的代码，上面的class=main-header就可以用:class="$style.mainHeader" 替换
// <header :class="$style.mainHeader">是用:class来引用js中的对象
    .main-header{
        text-align center
        h1{
            font-size 100px
            color: rgba(175, 47, 47, 0.4)
            font-weight 100
            margin 20px
        }
    }
</style>

