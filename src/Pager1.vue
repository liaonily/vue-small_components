<template lang="html">
  <div>
    <div>
      <h1>适合页数少的</h1>
    </div>
    <div class="pagination">
      <ul class="list">
        <li><a href="#" @click = "goPrev">上一页</a></li>
        <li :class="{active: page.isActive}" v-for="page in visiblePages" :key="page.key ? page.key : page.value">
          <a href="#" @click="beActive(page)">{{page.value}}</a>
        </li>
        <li><a href="#" @click = "goNext">下一页</a></li>
        <li><a href="#">共 {{total}} 页</a></li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      total: 20,
      isActive: true,
      currentPage: { // 默认显示第一页
        value: 1,
        isActive: true
      },
      invisiblePageBefore: {
        key: 'before',
        value: '...'
      },
      invisiblePageAfter: {
        key: 'after',
        value: '...'
      }
    }
  },
  computed: {
    totalPages: function () { // 所有页码
      let arr = []
      for (let i = 0; i < this.total; i++) { // 第二页到最后一页
        arr.push({
          value: i + 1,
          isActive: false
        })
      }
      return arr
    },
    visiblePages: function () {
      let currentPageValue
      let total = this.total
      currentPageValue = this.currentPage.value
      console.log(currentPageValue)
      let pages = this.totalPages.concat()
      console.log(pages)
      pages.forEach(x => {
        if (x.isActive) {
          x.isActive = false
        }
        if (x.value === currentPageValue) {
          x.isActive = true
        }
      })
      if (total <= 7) { // 小于等于7页时，显示全部页码
        return pages
      } else {
        if (currentPageValue <= 6) { // 显示前 6 页及末页
          pages.splice(6, total - 7, this.invisiblePageAfter)
          return pages
        } else if (currentPageValue > total - 6) { // 显示首页及后6页
          pages.splice(1, total - 7, this.invisiblePageBefore)
          return pages
        } else if (currentPageValue > 6 && currentPageValue <= total - 6) { // 显示首页、末页、中间页
          pages.splice(currentPageValue + 4, total - currentPageValue - 5, this.invisiblePageAfter)
          pages.splice(1, currentPageValue - 2, this.invisiblePageBefore)
          return pages
        }
      }
    },
    middlePages: function () {
      if (this.visiblePages.length === 9 &&
        this.visiblePages[1].key === 'before' &&
        this.visiblePages[7].key === 'after') {
        return this.visiblePages.slice(2, 7).map(x => x.value)
      }
      return []
    }
  },
  methods: {
    beActive (page) {
      if (typeof page.value === 'number') {
        this.currentPage.value = page.value
        return
      }
      let prevIndex, prevPage, nextIndex, nextPage, currentPageValue
      if (page.key === 'after') {
        prevIndex = this.visiblePages.indexOf(page) - 1
        prevPage = this.visiblePages[prevIndex]
        currentPageValue = prevPage.value + 1
      } else if (page.key === 'before') {
        nextIndex = this.visiblePages.indexOf(page) + 1
        nextPage = this.visiblePages[nextIndex]
        currentPageValue = nextPage.value - 5
        if (currentPageValue >= 3) {
          currentPageValue = nextPage.value - 5
        } else {
          currentPageValue = nextPage.value - 1
        }
      }
      this.currentPage = {
        value: currentPageValue
      }
    },
    goPrev () {
      let next = Object.assign({}, this.currentPage)
      let index = this.visiblePages.indexOf(this.currentPage)
      this.visiblePages.splice(index, 1, next)
      if (this.currentPage.value > 1) {
        this.currentPage = {
          value: this.currentPage.value - 1
        }
      }
    },
    goNext () {
      let prev = Object.assign({}, this.currentPage)
      let index = this.visiblePages.indexOf(this.currentPage)
      this.visiblePages.splice(index, 1, prev)
      if (this.currentPage.value < this.total) {
        this.currentPage = {
          value: this.currentPage.value + 1
        }
      }
    }
  }
}
</script>

<style lang="css" scoped>
  .pagination {
    display: flex;
    flex-direction: row;
  }
  li {
    list-style: none;
    border: 1px solid #dddddd;
    border-left: none;
  }
  ul.list {
    padding-left: 0px;
    margin: 0px;
    display: flex;
    flex-wrap: nowrap;
  }
  ul li:first-child {
    border-left: 1px solid #dddddd;
  }
  li a{
    display: inline-block;
    padding: 10px 20px;
    text-decoration: none;
    color: #337AB7;
  }
  ul.list li:hover,
  li.active {
    background-color: #337AB7;
  }
  ul.list li:hover a,
  li.active a{
    color: white;
  }

</style>
