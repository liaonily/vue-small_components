import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/Home'
import Pager from '@/components/Pager'
import NotesList from '@/NotesList'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/noteslist/:id/:page',
      name: 'NotesList',
      component: NotesList
    },
    {
      path: '/pager',
      name: 'Pager',
      component: Pager
    }
  ]
})
