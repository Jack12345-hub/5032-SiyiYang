<template>
  <div class="container mt-4">
    <h2 class="text-center mb-4">User Information Form</h2>

    <form @submit.prevent="handleSubmit" novalidate>
      <div class="row">
        <!-- Username -->
        <div class="col-md-6 col-12 mb-3">
          <label for="username" class="form-label">Username</label>
          <input
            v-model="form.username"
            type="text"
            id="username"
            class="form-control"
            :class="{ 'is-invalid': !!errors.username }"
            @blur="validateName(true)"
            @input="validateName(false)"
            ref="usernameRef"
            aria-describedby="usernameHelp"
          />
          <div v-if="errors.username" id="usernameHelp" class="text-danger small mt-1">
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
            :class="{ 'is-invalid': !!errors.password }"
            @blur="validatePassword(true)"
            @input="validatePassword(false)"
            ref="passwordRef"
            aria-describedby="passwordHelp"
          />
          <div v-if="errors.password" id="passwordHelp" class="text-danger small mt-1">
            {{ errors.password }}
          </div>
        </div>

        <!-- Confirm Password -->
        <div class="col-md-6 col-12 mb-3">
          <label for="confirmPassword" class="form-label">Confirm Password</label>
          <input
            v-model="form.confirmPassword"
            type="password"
            id="confirmPassword"
            class="form-control"
            :class="{ 'is-invalid': !!errors.confirmPassword }"
            @blur="validateConfirmPassword(true)"
            @input="validateConfirmPassword(false)"
            ref="confirmPasswordRef"
            aria-describedby="confirmHelp"
          />
          <div v-if="errors.confirmPassword" id="confirmHelp" class="text-danger small mt-1">
            {{ errors.confirmPassword }}
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
              aria-describedby="residentHelp"
            />
            <label for="isAustralian" class="form-check-label">Australian Resident?</label>
          </div>
          <div v-if="errors.resident" id="residentHelp" class="text-danger small mt-1">
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
            :class="{ 'is-invalid': !!errors.gender }"
            @blur="validateGender(true)"
            @change="validateGender(true)"
            ref="genderRef"
            aria-describedby="genderHelp"
          >
            <option value="">Select...</option>
            <option value="female">Female</option>
            <option value="male">Male</option>
            <option value="other">Other</option>
          </select>
          <div v-if="errors.gender" id="genderHelp" class="text-danger small mt-1">
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
            :class="{ 'is-invalid': !!errors.reason }"
            @blur="validateReason(true)"
            @input="validateReason(false)"
            ref="reasonRef"
            aria-describedby="reasonHelp"
          ></textarea>
          <div v-if="errors.reason" id="reasonHelp" class="text-danger small mt-1">
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
      v-if="users.length"
    >
      <Column field="username" header="Username" sortable />
      <Column header="Password">
        <template #body="{ data }">
          {{ maskPassword(data.password) }}
        </template>
      </Column>
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

/* ---------------- form state ---------------- */
const form = reactive({
  username: '',
  password: '',
  confirmPassword: '',
  isAustralian: false,
  gender: '',
  reason: '',
})

/* ---------------- error state ---------------- */
const errors = reactive({
  username: null,
  password: null,
  confirmPassword: null,
  resident: null,
  gender: null,
  reason: null,
})

/* ---------------- users list ---------------- */
const users = ref([])

/* ---------------- refs for focusing ---------------- */
const usernameRef = ref(null)
const passwordRef = ref(null)
const confirmPasswordRef = ref(null)
const residentRef = ref(null)
const genderRef = ref(null)
const reasonRef = ref(null)

/* ---------------- validation functions ---------------- */
const validateName = (blur) => {
  const value = form.username.trim()
  if (value.length < 3) {
    if (blur) errors.username = 'Name must be at least 3 characters.'
  } else {
    errors.username = null
  }
}

const validatePassword = (blur) => {
  const password = form.password || ''
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

  // also validate confirm password when password changes
  validateConfirmPassword(false)
}

const validateConfirmPassword = (blur) => {
  const p1 = form.password || ''
  const p2 = form.confirmPassword || ''

  if (!p2) {
    if (blur) errors.confirmPassword = 'Please re-enter your password.'
  } else if (p1 !== p2) {
    if (blur) errors.confirmPassword = 'Passwords do not match.'
  } else {
    errors.confirmPassword = null
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

/* ---------------- submit function ---------------- */
const handleSubmit = () => {
  validateName(true)
  validatePassword(true)
  validateConfirmPassword(true)
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
  if (errors.confirmPassword) {
    confirmPasswordRef.value?.focus()
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

/* ---------------- helpers ---------------- */
const clearForm = () => {
  form.username = ''
  form.password = ''
  form.confirmPassword = ''
  form.isAustralian = false
  form.gender = ''
  form.reason = ''
  errors.username =
    errors.password =
    errors.confirmPassword =
    errors.resident =
    errors.gender =
    errors.reason =
      null
}

const clearCards = () => {
  users.value = []
}

const maskPassword = (pwd) => {
  const len = (pwd || '').length
  return '*'.repeat(Math.max(6, len || 6))
}
</script>

<style scoped>
/* Add red border for invalid input fields.
   Bootstrap already provides styles for .is-invalid,
   so this section is optional unless you want custom styling. */
</style>
