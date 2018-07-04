<template lang="html">
  <div class="">
    <h1>豆瓣时间</h1>
    <Spinner v-if="loading" />
    <ul>
      <li v-for="(note,index) in notes" :key="index">
        <img src="note.images[0]" alt="note-images">
        <a>{{note.title}}</a>
      </li>
    </ul>
    <Pager :total="total" ref="pager" @pageChange="loadAnotherPage" />
  </div>
</template>

<script>
import axios from 'axios'
import Spinner from '@/components/Spinner'
import Pager from '@/components/Pager'
export default {
  name: 'NotesList',
  components: {
    Spinner,
    Pager
  },
  data () {
    return {
      loading: true,
      id: this.$route.params.id,
      data: null,
      notes: [],
      start: 0,
      count: 10,
      total: 1,
      currentPageNumber: 1
    }
  },
  mounted () {
    this.fetchData()
  },
  methods: {
    fetchData () {
      this.loading = true
      axios.get(`v2/note/user_created/${this.id}?start=${this.start}&count=${this.count}`).then(response => {
        console.log(response.data)
        this.data = response.data
        this.notes = this.notes.concat(response.data.notes)
        this.total = Math.ceil(this.data.total / 10)
        this.loading = false
      }).catch(error => {
        console.log(error)
      })
    },
    loadAnotherPage () {
      this.$router.push({name: 'NotesList', params: {page: arguments[0]}})
      this.start = arguments[0] - 1
      this.notes = []
      this.fetchData()
    }
    // fecth方法
    // fetchData () {
    //   fetch('v2/note/681247228').then(res => {
    //     return res.json()
    //   }).then(data => {
    //     console.log(data)
    //     this.loading = false
    //   })
    // }
  }
}
</script>

<style lang="css">
</style>
