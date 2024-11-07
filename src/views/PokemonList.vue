<script setup lang="ts">
import { ref, onMounted,computed } from 'vue'
import axios from 'axios'

interface Pokemon {
  name: string
  url: string
}

const pokemons = ref<Pokemon[]>([])
const currentPage = ref(1)
const totalPages = ref(0)
const loading = ref(false)
const limit = 20

async function fetchPokemons(page: number) {
  loading.value = true
  try {
    const offset = (page - 1) * limit
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`)
    pokemons.value = response.data.results
    totalPages.value = Math.ceil(response.data.count / limit)
  } catch (error) {
    console.error('Error fetching pokemons:', error)
  }
  loading.value = false
}
// Computed properties para as 5 primeiras e 5 últimas páginas
const firstPages = computed(() => {
  return Array.from({ length: Math.min(5, totalPages.value) }, (_, i) => i + 1);
});

const lastPages = computed(() => {
  const start = Math.max(totalPages.value - 5, 6);
  return Array.from({ length: Math.min(5, totalPages.value) }, (_, i) => start + i);
});

// Computed properties para mostrar os "..."
const showEllipsisBeforeCurrentPage = computed(() => {
  return currentPage.value > 6 && !firstPages.value.includes(currentPage.value);
});


// Método para alterar a página
const changePage = (page: number) => {
  currentPage.value = page;
  fetchPokemons(page)

};

const vaiSerMenor = () =>{
  return currentPage.value - 5 < 1 ? 1 : currentPage.value - 5
}
onMounted(() => {
  fetchPokemons(1)
})
</script>

<template>
  <div class="min-h-screen bg-gray-100 py-8">
    <div class="max-w-7xl mx-auto px-4">
      <h1 class="text-3xl font-bold mb-8">Pokémon List</h1>

      <div v-if="loading" class="text-center py-8">
        Loading...
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <router-link v-for="pokemon in pokemons" :key="pokemon.name"
          :to="'/pokemon/' + pokemon.url.split('/').slice(-2, -1)[0]"
          class="bg-white rounded-lg shadow p-4 hover:shadow-lg transition-shadow">
          <img
            :src="'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' + pokemon.url.split('/').slice(-2, -1)[0] + '.png'"
            :alt="pokemon.name" class="mx-auto h-32 w-32">
          <h2 class="text-xl font-semibold text-center mt-2 capitalize">
            {{ pokemon.name }}
          </h2>
        </router-link>
      </div>

      <div class="flex justify-center mt-8 gap-2">
        <!-- Botão para ir para a primeira página -->
        <button v-if="currentPage > 1" @click="changePage(vaiSerMenor())" class="px-4 py-2 rounded bg-white hover:bg-gray-100">
          &laquo;
        </button>

        <!-- Botão para ir para a página anterior -->
        <button v-if="currentPage > 1" @click="changePage(currentPage - 1)"
          class="px-4 py-2 rounded bg-white hover:bg-gray-100">
          &lt;
        </button>

        <!-- Exibe as 5 primeiras páginas -->
        <button v-for="page in firstPages" :key="'first-' + page" @click="changePage(page)" :class="[
          'px-4 py-2 rounded',
          currentPage === page
            ? 'bg-red-600 text-white'
            : 'bg-white hover:bg-gray-100'
        ]">
          {{ page }}
        </button>

        <!-- Exibe a página atual e a "..." se necessário -->
        <span v-if="showEllipsisBeforeCurrentPage">...</span>
        <button v-if="!firstPages.includes(currentPage) && !lastPages.includes(currentPage)"
          @click="changePage(currentPage)" class="px-4 py-2 rounded bg-red-600 text-white">
          {{ currentPage }}
        </button>

        <!-- Exibe as últimas 5 páginas -->
        <button v-for="page in lastPages" :key="'last-' + page" @click="changePage(page)" :class="[
          'px-4 py-2 rounded',
          currentPage === page
            ? 'bg-red-600 text-white'
            : 'bg-white hover:bg-gray-100'
        ]">
          {{ page }}
        </button>

        <!-- Botão para ir para a próxima página -->
        <button v-if="currentPage < totalPages" @click="changePage(currentPage + 1)"
          class="px-4 py-2 rounded bg-white hover:bg-gray-100">
          &gt;
        </button>

        <!-- Botão para ir para a última página -->
        <button v-if="currentPage < totalPages" @click="changePage(currentPage + 5)"
          class="px-4 py-2 rounded bg-white hover:bg-gray-100">
          &raquo;
        </button>
      </div>

    </div>
  </div>
</template>