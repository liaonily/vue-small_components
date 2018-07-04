<template lang="html">
  <div>
    <div class="page">
      <ul class="page-number">
        <li><a href="#" @click="goPrev">上一页</a></li>
        <li :class="{active: first.value === currentPageNumber}"><a href="#" @click="beCurrentPage(first)">{{first.value}}</a></li>
        <li v-if="visiblePagesOf5.length <= 0 && total > 1">
          <a href="#" @click = "openPrev">...</a>
        </li>
        <li v-if="visiblePagesOf5.length > 0 && visiblePagesOf5[0].value - 1 > 1">
          <a href="#" @click="openPrev">...</a>
        </li>
        <li :class="{active: page.value === currentPageNumber}" v-if="page.value - first.value > 0 && total - page.value > 0" v-for="(page, index) in continousFivePages" :key="index">
          <a href="#" @click="beCurrentPage(page)">{{page.value}}</a>
        </li>
        <li v-if="visiblePagesOf5.length > 0 && total - visiblePagesOf5[visiblePagesOf5.length - 1].value > 1">
          <a href="#" @click="openNext">...</a>
        </li>
        <li :class="{active: last.value === currentPageNumber}" v-if="total > 1"><a href="#" @click="beCurrentPage(last)">{{total}}</a></li>
        <li><a href="#" @click="goNext">下一页</a></li>
        <!-- 查看连续5页中可见的页码
        <li v-for="page in visiblePagesOf5"><a href="#">{{page.value}}</a></li>
        -->
        <li><a>共{{total}}页</a></li>
      </ul>
      <ul class="page-control">
        <li>跳转到</li>
        <li><input type="number" v-model.number="jumpPageNumber" name="page"></li>
        <li>页</li>
        <button type="button" name="button" @click="jumpPage(jumpPageNumber)">跳转</button>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    total: {
      type: Number
    }
  },
  data () {
    return {
      first: {
        value: 1
      },
      jumpPageNumber: '',
      beginPageOf5: 1, // 连续5页的首页，当它变化，显示页数变化
      currentPageNumber: 1
    }
  },
  watch: {
    currentPageNumber: function () {
      console.log(this.last.value)
      console.log(2, this.currentPageNumber)
      this.$emit('pageChange', this.currentPageNumber)
    }
  },
  computed: {
    last () {
      return {
        value: this.total === 1 ? 1 : this.total
      }
    },
    continousFivePages () {
      let arr = []
      let beginPageOf5 = this.beginPageOf5
      console.log(beginPageOf5)
      for (let i = 0; i < 5; i++) {
        arr.push({
          value: i + beginPageOf5
        })
      }
      console.log(arr)
      return arr
    },
    visiblePagesOf5 () {
      let continousFivePages = this.continousFivePages
      return continousFivePages.filter(x => {
        if (x.value - 1 > 0) {
          return x
        }
      }).filter(y => {
        if (this.total - y.value > 0) {
          return y
        }
      })
    }
  },
  methods: {
    beCurrentPage (page) {
      this.currentPageNumber = page.value
    },
    jumpPage (pageNumber) {
      this.beginPageOf5 = pageNumber - 2
      if (pageNumber < 1) {
        this.currentPageNumber = 1
      } else if (pageNumber > this.total) {
        this.currentPageNumber = this.total
      } else {
        this.currentPageNumber = pageNumber
      }
      this.jumpPageNumber = ''
    },
    goPrev () {
      let currentPageNumber = this.currentPageNumber > 1 ? this.currentPageNumber - 1 : 1
      if (currentPageNumber === 1) {
        this.beCurrentPage(this.first)
      } else {
        this.jumpPage(currentPageNumber)
      }
    },
    goNext () {
      let currentPageNumber = this.currentPageNumber < this.total ? this.currentPageNumber + 1 : this.total
      if (currentPageNumber === this.total) {
        this.beCurrentPage(this.last)
      } else {
        this.jumpPage(currentPageNumber)
      }
    },
    openPrev () {
      if (this.currentPageNumber === 1) {
        this.beginPageOf5 = 2
        this.currentPageNumber = 2
      } else {
        this.beginPageOf5 = this.beginPageOf5 - 5 > this.total ? this.total - 5 : this.beginPageOf5 - 5
        this.currentPageNumber = this.visiblePagesOf5[this.visiblePagesOf5.length - 1].value
      }
    },
    openNext () {
      if (this.currentPageNumber === this.total) {
        this.beginPageOf5 = this.total - 5
        this.currentPageNumber = this.total - 1
      } else {
        this.beginPageOf5 = this.beginPageOf5 + 5
        this.currentPageNumber = this.visiblePagesOf5[0].value
      }
    }
  }
}
</script>

<style lang="css" scoped>
.page {
  display: flex;
}
.page ul {
  display: flex;
  margin: 0px;
}
.page ul li {
  border: 1px solid #ccc;
  list-style: none;
  border-left: none;
}
.page ul li:first-child{
  border-left: 1px solid #ccc;
}
.page ul li a {
  display: inline-block;
  padding: 10px 25px;
  text-decoration: none;
}
.page-control li{
  padding: 10px 10px;
}
.page-control li:nth-child(2){
  padding: 5px 15px 5px 15px;
}
.page-control input {
  width: 50px;
  height: 30px;
  padding: 0px;
  outline: none;
  border: none;
}
.active {
  background-color: #333;
}
.active a {
  color: white;
}
</style>
