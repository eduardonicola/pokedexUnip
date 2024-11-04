<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const pokemon = ref<any>(null)
const loading = ref(true)

async function fetchPokemonDetails() {
  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${route.params.id}`)
    pokemon.value = response.data
  } catch (error) {
    console.error('Error fetching pokemon details:', error)
  }
  loading.value = false
}

onMounted(() => {
  fetchPokemonDetails()
})
</script>

<template>
  <div class="min-h-screen bg-gray-100 py-8">
    <div class="max-w-4xl mx-auto px-4">
      <router-link 
        to="/pokemons"
        class="inline-block mb-8 text-red-600 hover:text-red-700"
      >
        ← Back to List
      </router-link>

      <div v-if="loading" class="text-center py-8">
        Loading...
      </div>

      <div v-else-if="pokemon" class="bg-white rounded-lg shadow-lg p-8">
        <div class="text-center mb-8">
          <img 
            :src="pokemon.sprites.front_default"
            :alt="pokemon.name"
            class="mx-auto h-48 w-48"
          >
          <h1 class="text-4xl font-bold capitalize mt-4">{{ pokemon.name }}</h1>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 class="text-2xl font-bold mb-4">Stats</h2>
            <div v-for="stat in pokemon.stats" :key="stat.stat.name" class="mb-2">
              <div class="flex justify-between mb-1">
                <span class="capitalize">{{ stat.stat.name }}</span>
                <span>{{ stat.base_stat }}</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-2">
                <div
                  class="bg-red-600 h-2 rounded-full"
                  :style="{ width: `${(stat.base_stat / 255) * 100}%` }"
                ></div>
              </div>
            </div>
          </div>

          <div>
            <h2 class="text-2xl font-bold mb-4">Details</h2>
            <div class="space-y-4">
              <div>
                <h3 class="font-semibold">Types</h3>
                <div class="flex gap-2 mt-2">
                  <span 
                    v-for="type in pokemon.types" 
                    :key="type.type.name"
                    class="px-3 py-1 rounded-full bg-red-100 text-red-800 capitalize"
                  >
                    {{ type.type.name }}
                  </span>
                </div>
              </div>
              
              <div>
                <h3 class="font-semibold">Abilities</h3>
                <div class="flex gap-2 mt-2">
                  <span 
                    v-for="ability in pokemon.abilities" 
                    :key="ability.ability.name"
                    class="px-3 py-1 rounded-full bg-gray-100 capitalize"
                  >
                    {{ ability.ability.name }}
                  </span>
                </div>
              </div>

              <div class="grid grid-cols-2 gap-4">
                <div>
                  <h3 class="font-semibold">Height</h3>
                  <p>{{ pokemon.height / 10 }} m</p>
                </div>
                <div>
                  <h3 class="font-semibold">Weight</h3>
                  <p>{{ pokemon.weight / 10 }} kg</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>