<template>
  <div class="d-lg-flex half">
    <img
      class="bg order-1 order-md-2"
      :src="loginBackground"
      alt="Login background"
    />
    <div class="contents order-2 order-md-1">
      <div class="container">
        <div class="row align-items-center justify-content-center">
          <div class="col-md-7">
            <h3>Login to <strong>Inholland SMS service</strong></h3>

            <form action="#" method="post" class="mt-3">
              <div class="form-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Email"
                  v-model="login.email"
                />
              </div>
              <div class="form-group mb-3">
                <input
                  type="password"
                  class="form-control"
                  placeholder="Password"
                  v-model="login.password"
                />
              </div>

              <input
                :disabled="loginDisabled"
                type="submit"
                value="Log In"
                class="btn btn-block btn-primary"
              />
            </form>
            <p class="mt-5 text-muted text-center">
              &copy; 2022 - {{ new Date().getFullYear() }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import loginBackground from "@/assets/images/login-bg.jpg";

export default {
  name: "LoginView",
  components: {},
  data() {
    return {
      login: {
        email: "",
        password: "",
      },
      loginBackground: loginBackground,
    };
  },
  computed: {
    loginDisabled() {
      return this.login.email === "" || this.login.password === "";
    },
  },
  methods: {},
};
</script>

<style scoped>
@import "@/assets/login.css";
</style>
