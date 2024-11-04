import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import PokemonList from '../views/PokemonList.vue'
import PokemonDetail from '../views/PokemonDetail.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/pokemons',
      name: 'pokemon-list',
      component: PokemonList
    },
    {
      path: '/pokemon/:id',
      name: 'pokemon-detail',
      component: PokemonDetail
    }
  ]
})

export default router