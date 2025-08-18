<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card shadow-sm">
          <div class="card-body">
            <h1 class="text-center mb-4">User Information Form / Credentials</h1>

            <!-- 表单 -->
            <form @submit.prevent="submitForm">
              <!-- 用户名 + 密码 -->
              <div class="row mb-3">
                <div class="col-md-6">
                  <label for="username" class="form-label">Username</label>
                  <input
                    type="text"
                    id="username"
                    class="form-control"
                    v-model="formData.username"
                    placeholder="Enter your username"
                  />
                </div>
                <div class="col-md-6">
                  <label for="password" class="form-label">Password</label>
                  <input
                    type="password"
                    id="password"
                    class="form-control"
                    v-model="formData.password"
                    placeholder="Enter your password"
                  />
                </div>
              </div>

              <!-- Checkbox + Gender -->
              <div class="row mb-3">
                <div class="col-md-6 d-flex align-items-center">
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="isAustralian"
                      v-model="formData.isAustralian"
                    />
                    <label class="form-check-label" for="isAustralian">
                      Australian Resident?
                    </label>
                  </div>
                </div>
                <div class="col-md-6">
                  <label for="gender" class="form-label">Gender</label>
                  <select id="gender" class="form-select" v-model="formData.gender">
                    <option value="">Select…</option>
                    <option value="female">Female</option>
                    <option value="male">Male</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <!-- Reason -->
              <div class="mb-3">
                <label for="reason" class="form-label">Reason For Joining</label>
                <textarea
                  id="reason"
                  class="form-control"
                  rows="3"
                  v-model="formData.reason"
                  placeholder="Tell us why you want to join"
                ></textarea>
              </div>

              <!-- 按钮 -->
              <div class="d-flex justify-content-center">
                <button type="submit" class="btn btn-primary me-2">Submit</button>
                <button type="button" class="btn btn-secondary" @click="clearForm">Clear</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- 清空所有卡片按钮 -->
    <div class="text-center mt-4" v-if="submittedCards.length">
      <button type="button" class="btn btn-outline-danger" @click="clearAllCards">
        Clear All Cards
      </button>
    </div>

    <!-- 提交结果卡片 -->
    <div class="row mt-3" v-if="submittedCards.length">
      <div class="d-flex flex-wrap justify-content-start">
        <div
          v-for="(card, index) in submittedCards"
          :key="index"
          class="card m-2"
          style="width: 18rem"
        >
          <div class="card-header">User Information</div>
          <ul class="list-group list-group-flush">
            <li class="list-group-item">Username: {{ card.username }}</li>
            <li class="list-group-item">Password: {{ card.password }}</li>
            <li class="list-group-item">
              Australian Resident: {{ card.isAustralian ? 'Yes' : 'No' }}
            </li>
            <li class="list-group-item">Gender: {{ card.gender }}</li>
            <li class="list-group-item">Reason: {{ card.reason }}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// 初始表单
const makeInitialForm = () => ({
  username: '',
  password: '',
  isAustralian: false,
  reason: '',
  gender: '',
})

const formData = ref(makeInitialForm())
const submittedCards = ref([])

// 提交表单
const submitForm = () => {
  submittedCards.value.push({ ...formData.value })
  clearForm()
}

// 清空表单
const clearForm = () => {
  formData.value = makeInitialForm()
}

// 清空所有卡片
const clearAllCards = () => {
  submittedCards.value = []
}
</script>

<style scoped>
.card {
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.card-header {
  background-color: #275fda;
  color: white;
  padding: 10px;
  border-radius: 10px 10px 0 0;
}
.list-group-item {
  padding: 10px;
}
</style>
