<template>
  <div class="form">
    <h1>User Information Form / Credentials</h1>

    <form>
      <label for="username">Username:</label><br />
      <input type="text" id="username" name="username" /><br />

      <label for="password">Password:</label><br />
      <input type="password" id="password" name="password" /><br />

      <label for="isAustralian">Australian Resident?</label><br />
      <input type="checkbox" id="isAustralian" name="isAustralian" /><br />

      <label for="reason">Reason For Joining:</label><br />
      <textarea id="reason" name="reason" rows="3"></textarea><br />

      <label for="gender">Gender</label><br />
      <select id="gender" name="gender">
        <option value="female">Female</option>
        <option value="male">Male</option>
        <option value="other">Other</option>
      </select>
    </form>
  </div>
</template>

<script setup>
// Our logic will go here
</script>

<style scoped>
.form {
  max-width: 420px;
  margin: 16px auto;
}

form {
  margin-top: 8px;
}

label {
  display: inline-block;
  margin: 8px 0 4px;
  font-size: 14px;
  color: #444;
}

input[type='text'],
input[type='password'],
textarea,
select {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-sizing: border-box;
}

textarea {
  resize: vertical;
}
</style>
