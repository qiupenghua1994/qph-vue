<template>
  <div>
    <div class="editToolbar">
      <button @click="addImg">加图标</button>
    </div>
    <div class="gfEditor" contenteditable="true" @keyup.enter="onEnter" :style="style.gfEditor"></div>
  </div>
</template>

<script>
  export default {
    name: 'gfEditor',
    data() {
      return {
        style: {
          gfEditor: {
            height: '200px'
          }
        }
      }
    },
    methods: {
      onEnter() {
        event.preventDefault();
      },
      addImg() {

      }
    }
  }
</script>

<style scoped>
  .gfEditor {
    width: 100%;
    background-color: gainsboro;
    overflow-x: auto;
  }
</style>
