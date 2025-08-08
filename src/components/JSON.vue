<!-- JSONLab.vue -->
<template>
  <div class="json-lab">
    <h1>🗄️ JSON Data & Vue Directives Lab</h1>

    <!-- ============ Arrays ============ -->
    <section class="lab-section">
      <h2>📚 Working with JSON Arrays</h2>
      <p>Our <code>authors.json</code> contains an array of author objects.</p>

      <p class="subtle">All authors:</p>
      <ul>
        <li
          v-for="author in authors"
          :key="author.id"
          :title="`${author.name} • born ${author.birthYear}`"
          :class="authorClass(author)"
          :style="authorStyle(author)"
          :aria-label="`author ${author.name}`"
        >
          {{ author.name }} ({{ author.birthYear }})
        </li>
      </ul>

      <p class="subtle">Born after 1850:</p>
      <ul>
        <li v-for="author in modernAuthors" :key="author.id">
          {{ author.name }} ({{ author.birthYear }})
        </li>
      </ul>

      <p class="subtle">All famous works (titles):</p>
      <ul>
        <li v-for="(work, index) in allFamousWorks" :key="`work-${index}`">
          {{ work }}
        </li>
      </ul>

      <h3>Finding in Arrays</h3>
      <p>
        Finding by name: <strong>{{ orwell?.name || 'Not found' }}</strong>
      </p>

      <h3>Nested Arrays/Objects</h3>
      <p>{{ austen?.name }}'s works:</p>
      <ul v-if="austenWorks.length">
        <li v-for="work in austenWorks" :key="`austen-${work.title}-${work.year}`">
          {{ work.title }} ({{ work.year }})
        </li>
      </ul>
    </section>

    <!-- ============ Objects ============ -->
    <section class="lab-section">
      <h2>🏢 Working with JSON Objects</h2>
      <p>Our <code>bookstores.json</code> is a JSON object.</p>

      <h3>Accessing Properties</h3>
      <p>
        Company: <strong>{{ companyName }}</strong>
      </p>
      <p>
        Total Stores: <strong>{{ totalStores }}</strong>
      </p>

      <h3>Iterating Object Properties</h3>
      <p>Store Types:</p>
      <ul>
        <li v-for="type in storeTypesArray" :key="type.name">
          {{ type.name }} — {{ type.count }} stores
        </li>
      </ul>

      <h3>Nested Objects</h3>
      <p>Opening Hours:</p>
      <ul>
        <li v-for="slot in openingHoursArray" :key="slot.day">
          {{ slot.day }}: {{ slot.open }} – {{ slot.close }}
        </li>
      </ul>

      <h3>Working with Arrays in Objects</h3>
      <p>
        We operate in: <strong>{{ countries.join(', ') }}</strong>
      </p>
      <p>
        Our #1 seller: <strong>{{ topSeller }}</strong>
      </p>
    </section>

    <!-- ============ v-if / v-else ============ -->
    <section class="lab-section">
      <h2>v-if & v-else</h2>
      <p>Toggle visibility based on a condition.</p>
      <button @click="showMessage = !showMessage">Toggle Message</button>
      <p v-if="showMessage" class="message success">✨ You're a Vue superstar! ✨</p>
      <p v-else class="message">Click the button to see a message.</p>
    </section>

    <!-- ============ Bindings demo ============ -->
    <section class="lab-section">
      <h2>Attribute, Class and Style Binding with <code>v-bind</code></h2>
      <p>
        The list above highlights author
        <strong>"George Orwell"</strong> using class & inline style bindings.
      </p>
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import authors from '../assets/json/authors.json'
import bookstores from '../assets/json/bookstores.json'

/** ------- state ------- */
const showMessage = ref(false)

/** ------- arrays (2.1) ------- */
const modernAuthors = computed(() => authors.filter((a) => a.birthYear > 1850))

const allFamousWorks = computed(() => authors.flatMap((a) => a.famousWorks.map((w) => w.title)))

const orwell = computed(() => authors.find((a) => a.name.toLowerCase() === 'george orwell'))

const austen = computed(
  () => authors.find((a) => a.name === 'Jane Austen'), // 或 a.id === 1
)

const austenWorks = computed(() => austen.value?.famousWorks ?? [])

/** ------- objects (2.1) ------- */
const companyName = bookstores.name
const totalStores = bookstores.totalStores
const countries = bookstores.countries

const storeTypesArray = Object.entries(bookstores.storeTypes).map(([name, count]) => ({
  name,
  count,
}))

const openingHoursArray = Object.entries(bookstores.openingHours).map(([day, val]) => ({
  day,
  open: val.open,
  close: val.close,
}))

const topSeller = bookstores.topSellers?.[0] ?? 'N/A'

/** ------- class/style bindings for 2.2 ------- */
const authorClass = (author) => ({
  highlight: author.name === 'George Orwell',
})
const authorStyle = (author) =>
  author.name === 'George Orwell' ? { color: 'white', fontWeight: '600' } : {}
</script>

<style scoped>
.json-lab {
  font-family:
    system-ui,
    -apple-system,
    Segoe UI,
    Roboto,
    'Helvetica Neue',
    Arial;
  max-width: 80vw;
  margin: 0 auto;
  padding: 20px;
  background-color: #f4f4f4;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
h1,
h2 {
  color: #333;
}
h1 {
  text-align: center;
}
.lab-section {
  background: #fff;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
}
.subtle {
  color: #555;
  margin: 0.5rem 0;
}
.message {
  padding: 10px;
  border-radius: 5px;
  margin-top: 10px;
}
.success {
  background: #e7faf3;
  color: #42b883;
  border: 1px solid #42b883;
}
.highlight {
  background-color: #42b883;
}
code {
  background-color: #e0e0e0;
  padding: 2px 5px;
  border-radius: 4px;
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, 'Liberation Mono', monospace;
}
ul {
  list-style: none;
  padding: 0;
}
li {
  background: #f7f7f7;
  padding: 10px;
  margin: 6px 0;
  border-radius: 6px;
}
</style>
