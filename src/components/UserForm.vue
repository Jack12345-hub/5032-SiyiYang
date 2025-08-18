<template>
  <div class="container mt-4">
    <h2 class="text-center mb-4">User Information Form</h2>
    <form @submit.prevent="handleSubmit">
      <div class="row">
        <!-- Username -->
        <div class="col-md-6 col-12 mb-3">
          <label for="username" class="form-label">Username</label>
          <input v-model="form.username" type="text" id="username" class="form-control" />
        </div>

        <!-- Password -->
        <div class="col-md-6 col-12 mb-3">
          <label for="password" class="form-label">Password</label>
          <input v-model="form.password" type="password" id="password" class="form-control" />
        </div>

        <!-- Checkbox -->
        <div class="col-md-6 col-12 mb-3">
          <div class="form-check">
            <input
              v-model="form.isAustralian"
              type="checkbox"
              id="isAustralian"
              class="form-check-input"
            />
            <label for="isAustralian" class="form-check-label">Australian Resident?</label>
          </div>
        </div>

        <!-- Gender -->
        <div class="col-md-6 col-12 mb-3">
          <label for="gender" class="form-label">Gender</label>
          <select v-model="form.gender" id="gender" class="form-select">
            <option disabled value="">Select...</option>
            <option value="female">Female</option>
            <option value="male">Male</option>
            <option value="other">Other</option>
          </select>
        </div>

        <!-- Reason -->
        <div class="col-12 mb-3">
          <label for="reason" class="form-label">Reason for joining</label>
          <textarea v-model="form.reason" id="reason" rows="3" class="form-control"></textarea>
        </div>
      </div>

      <!-- Buttons -->
      <div class="d-flex justify-content-center gap-2">
        <button type="submit" class="btn btn-primary">Submit</button>
        <button type="button" class="btn btn-secondary" @click="clearForm">Clear</button>
        <button type="button" class="btn btn-danger" @click="clearCards">
          Clear all the cards
        </button>
      </div>
    </form>

    <!-- User cards -->
    <div class="row mt-4">
      <div v-for="(user, index) in users" :key="index" class="col-md-3 col-sm-6 col-12 mb-3">
        <div class="card">
          <div class="card-header bg-primary text-white">User Information</div>
          <div class="card-body">
            <p><strong>Username:</strong> {{ user.username }}</p>
            <p><strong>Password:</strong> {{ user.password }}</p>
            <p><strong>Australian Resident:</strong> {{ user.isAustralian ? 'Yes' : 'No' }}</p>
            <p><strong>Gender:</strong> {{ user.gender }}</p>
            <p><strong>Reason:</strong> {{ user.reason }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'

const form = reactive({
  username: '',
  password: '',
  isAustralian: false,
  gender: '',
  reason: '',
})

const users = ref([])

const handleSubmit = () => {
  users.value.push({ ...form })
  clearForm()
}

const clearForm = () => {
  form.username = ''
  form.password = ''
  form.isAustralian = false
  form.gender = ''
  form.reason = ''
}

const clearCards = () => {
  users.value = []
}
</script>
