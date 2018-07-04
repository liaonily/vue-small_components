<template lang="html">
  <div class="">
    <h1>我关注作者的日记</h1>
    <p><a href="javascript:void(0)" @click="goList(id[0])">豆瓣时间</a></p>
    <ul>
      <li></li>
    </ul>
    <p><a href="javascript:void(0)" @click="goList(id[1])">新京报书评周刊</a></p>
    <ul>
      <li></li>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
      id: [157526587, 161147127]
    }
  },
  methods: {
    goList (id) {
      this.$router.push({name: 'NotesList', params: {id: id, page: 1}})
    }
  }
}
</script>

<style lang="css">
</style>
