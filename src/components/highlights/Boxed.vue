<template>
    <pre><slot></slot></pre>
</template>

<style scoped>
pre {
    display: block;
    border: 1px solid #cccccc;
    border-radius: 2px;
    padding: 8px;
    background-color: #f5f5f5;
    overflow: auto;
    line-height: 1.5;
    margin-bottom: 12px;
    max-height: 350px;
}
</style>
