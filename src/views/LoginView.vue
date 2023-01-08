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

            <form @submit.prevent="login" method="post" class="mt-3">
              <div class="form-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Email"
                  v-model="credentials.email"
                />
              </div>
              <div class="form-group mb-3">
                <input
                  type="password"
                  class="form-control"
                  placeholder="Password"
                  v-model="credentials.password"
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
import { useLecturerStore } from "@/stores/lecturer";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";

export default {
  name: "LoginView",
  components: {},
  setup() {
    const lecturerStore = useLecturerStore();
    const router = useRouter();
    const toast = useToast();

    return { lecturerStore, router, toast };
  },
  data() {
    return {
      credentials: {
        email: "",
        password: ""
      },
      loginBackground: loginBackground,
    };
  },
  computed: {
    loginDisabled() {
      return this.credentials.email === "" || this.credentials.password === "";
    },
  },
  methods: {
    login() {
      this.lecturerStore.login(this.credentials.email, this.credentials.password)
          .then(() => {
            this.router.push({ path: '/' })
          })
          .catch((e) => {
            this.toast.error(e.response?.data || e.message)
          });
    }
  },
};
</script>

<style scoped>
@import "@/assets/login.css";
</style>
