<template>
  <div class="container mt-4">
    <h2 class="text-center mb-4">User Information Form</h2>

    <form @submit.prevent="handleSubmit">
      <div class="row">
        <!-- Username -->
        <div class="col-md-6 col-12 mb-3">
          <label for="username" class="form-label">Username</label>
          <input
            v-model="form.username"
            type="text"
            id="username"
            class="form-control"
            @blur="validateName(true)"
            @input="validateName(false)"
            ref="usernameRef"
          />
          <div v-if="errors.username" class="text-danger small mt-1">
            {{ errors.username }}
          </div>
        </div>

        <!-- Password -->
        <div class="col-md-6 col-12 mb-3">
          <label for="password" class="form-label">Password</label>
          <input
            v-model="form.password"
            type="password"
            id="password"
            class="form-control"
            @blur="validatePassword(true)"
            @input="validatePassword(false)"
            ref="passwordRef"
          />
          <div v-if="errors.password" class="text-danger small mt-1">
            {{ errors.password }}
          </div>
        </div>

        <!-- Australian Resident -->
        <div class="col-md-6 col-12 mb-3">
          <div class="form-check">
            <input
              v-model="form.isAustralian"
              type="checkbox"
              id="isAustralian"
              name="isAustralian"
              class="form-check-input"
              @change="validateResident(true)"
              ref="residentRef"
            />
            <label for="isAustralian" class="form-check-label">Australian Resident?</label>
          </div>
          <div v-if="errors.resident" class="text-danger small mt-1">
            {{ errors.resident }}
          </div>
        </div>

        <!-- Gender -->
        <div class="col-md-6 col-12 mb-3">
          <label for="gender" class="form-label">Gender</label>
          <select
            v-model="form.gender"
            id="gender"
            class="form-select"
            @blur="validateGender(true)"
            @change="validateGender(true)"
            ref="genderRef"
          >
            <option value="">Select...</option>
            <option value="female">Female</option>
            <option value="male">Male</option>
            <option value="other">Other</option>
          </select>
          <div v-if="errors.gender" class="text-danger small mt-1">
            {{ errors.gender }}
          </div>
        </div>

        <!-- Reason -->
        <div class="col-12 mb-3">
          <label for="reason" class="form-label">Reason for joining</label>
          <textarea
            v-model="form.reason"
            id="reason"
            rows="3"
            class="form-control"
            @blur="validateReason(true)"
            @input="validateReason(false)"
            ref="reasonRef"
          ></textarea>
          <div v-if="errors.reason" class="text-danger small mt-1">
            {{ errors.reason }}
          </div>
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

    <!-- PrimeVue DataTable -->
    <DataTable
      class="mt-4"
      :value="users"
      dataKey="username"
      stripedRows
      paginator
      :rows="5"
      :rowsPerPageOptions="[5, 10, 20]"
      tableStyle="min-width: 50rem"
    >
      <Column field="username" header="Username" sortable />
      <Column field="password" header="Password" />
      <Column header="Australian Resident" sortable>
        <template #body="{ data }">
          {{ data.isAustralian ? 'true' : 'false' }}
        </template>
      </Column>
      <Column field="gender" header="Gender" sortable />
      <Column field="reason" header="Reason" />
    </DataTable>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'

// form model
const form = reactive({
  username: '',
  password: '',
  isAustralian: false,
  gender: '',
  reason: '',
})

// error store
const errors = reactive({
  username: null,
  password: null,
  resident: null,
  gender: null,
  reason: null,
})

const users = ref([])

// refs for focusing the first invalid field
const usernameRef = ref(null)
const passwordRef = ref(null)
const residentRef = ref(null)
const genderRef = ref(null)
const reasonRef = ref(null)

/* -------- validators ---------- */
const validateName = (blur) => {
  const value = form.username.trim()
  if (value.length < 3) {
    if (blur) errors.username = 'Name must be at least 3 characters.'
  } else {
    errors.username = null
  }
}

const validatePassword = (blur) => {
  const password = form.password
  const minLength = 8
  const hasUppercase = /[A-Z]/.test(password)
  const hasLowercase = /[a-z]/.test(password)
  const hasNumber = /\d/.test(password)
  const hasSpecial = /[!@#$%^&*()_,.?":{}|<>+\-=/\\[\]]/.test(password)

  if (password.length < minLength) {
    if (blur) errors.password = `Password must be at least ${minLength} characters long.`
  } else if (!hasUppercase) {
    if (blur) errors.password = 'Password must contain at least one uppercase letter.'
  } else if (!hasLowercase) {
    if (blur) errors.password = 'Password must contain at least one lowercase letter.'
  } else if (!hasNumber) {
    if (blur) errors.password = 'Password must contain at least one number.'
  } else if (!hasSpecial) {
    if (blur) errors.password = 'Password must contain at least one special character.'
  } else {
    errors.password = null
  }
}

const validateResident = (blur) => {
  if (!form.isAustralian) {
    if (blur) errors.resident = 'Please confirm whether you are an Australian resident.'
  } else {
    errors.resident = null
  }
}

const validateGender = (blur) => {
  if (!form.gender) {
    if (blur) errors.gender = 'Please select a gender.'
  } else {
    errors.gender = null
  }
}

const validateReason = (blur) => {
  const value = form.reason.trim()
  if (!value) {
    if (blur) errors.reason = 'Reason cannot be empty.'
  } else {
    errors.reason = null
  }
}

/* -------- submit ---------- */
const handleSubmit = () => {
  validateName(true)
  validatePassword(true)
  validateResident(true)
  validateGender(true)
  validateReason(true)

  if (errors.username) {
    usernameRef.value?.focus()
    return
  }
  if (errors.password) {
    passwordRef.value?.focus()
    return
  }
  if (errors.resident) {
    residentRef.value?.focus()
    return
  }
  if (errors.gender) {
    genderRef.value?.focus()
    return
  }
  if (errors.reason) {
    reasonRef.value?.focus()
    return
  }

  users.value.push({ ...form })
  clearForm()
}

/* -------- helpers ---------- */
const clearForm = () => {
  form.username = ''
  form.password = ''
  form.isAustralian = false
  form.gender = ''
  form.reason = ''
  errors.username = errors.password = errors.resident = errors.gender = errors.reason = null
}

const clearCards = () => {
  users.value = []
}
</script>
