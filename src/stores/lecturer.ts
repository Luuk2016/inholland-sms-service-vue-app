import { defineStore } from "pinia";
import axios from "axios";
import { computed, ref } from "vue";
import type { Ref, ComputedRef } from "vue";

interface Lecturer {
  id: number;
  email: string;
}

interface State {
  lecturer: Ref<Lecturer | null>;
  token: Ref<string>;
  isAuthenticated: ComputedRef<boolean>;
  authHeader: ComputedRef<{ headers: any }>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useLecturerStore = defineStore("lecturer", (): State => {
  const lecturer = ref<Lecturer | null>(null);
  const token = ref<string>("");
  const isAuthenticated = computed(() => !!token.value);
  const authHeader = computed(() => {
    return {
      headers: { Authorization: token.value },
    };
  });

  const login = async (email: string, password: string) => {
    const res = await axios.post("/login", {
      email: email,
      password: password,
    });

    lecturer.value = res.data.lecturer;
    token.value = res.data.auth_token;
  };

  const logout = () => {
    lecturer.value = null;
    token.value = "";
  };

  return {
    lecturer,
    token,
    isAuthenticated,
    authHeader,
    login,
    logout,
  };
});
