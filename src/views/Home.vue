<template>
  <div class="min-h-screen bg-gray-100">
    <div class="max-w-7xl mx-auto py-12 px-4">
      <h1 class="text-4xl font-bold text-center mb-8">Welcome to PokéDex</h1>
      <div class="text-center">
        <router-link 
          to="/pokemons"
          class="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors"
        >
          View All Pokémon
        </router-link>
      </div>
      <div class="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div class="bg-white p-6 rounded-lg shadow">
          <h2 class="text-2xl font-bold mb-4">Explore Pokémon</h2>
          <p>Discover hundreds of Pokémon and learn about their abilities, types, and stats.</p>
        </div>
        <div class="bg-white p-6 rounded-lg shadow">
          <h2 class="text-2xl font-bold mb-4">Detailed Information</h2>
          <p>Get detailed information about each Pokémon including their evolution chain and moves.</p>
        </div>
      </div>
    </div>
  </div>
</template>