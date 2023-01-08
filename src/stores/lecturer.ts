import { defineStore } from "pinia";
import axios from "axios";
import { computed, ref } from "vue";
import type { Ref, ComputedRef } from "vue";
import { useRouter } from "vue-router";

interface Lecturer {
    id: number,
    email: string
}

interface State {
    lecturer: Ref<Lecturer | null>,
    token: Ref<string>,
    isAuthenticated: ComputedRef<boolean>,
    bearerToken: ComputedRef<string>,
    login: (email: string, password: string) => Promise<void>,
    logout: () => void
}

export const useLecturerStore = defineStore("lecturer", (): State => {
    const lecturer = ref<Lecturer | null>(null);
    const token = ref<string>("");
    const isAuthenticated = computed(() => !!token.value);
    const bearerToken = computed(() => `Bearer ${ token.value }`);
    const router = useRouter();

    const login = async (email: string, password: string) => {
        const res = await axios.post("/login", {
            email: email,
            password: password
        });

        console.log(res)

        lecturer.value = res.data.lecturer;
        token.value = res.data.auth_token;
    };

    const logout = () => {
        lecturer.value = null;
        token.value = "";
        router.push({ path: "/login" });
    };

    return {
        lecturer,
        token,
        isAuthenticated,
        bearerToken,
        login,
        logout
    };
});