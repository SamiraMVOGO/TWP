<template>
    <div class="min-h-screen flex items-center bg-[url('../assets/images/planning.jpg')] bg-cover bg-center bg-no-repeat relative justify-center ">
        <form @submit.prevent="handleSubmit()">
        <div class="w-full max-w-md bg-white opacity-95 p-8 rounded-2xl shadow-lg">
            <h2 class="text-2xl font-bold text-center text-gray-800 mb-6">Inscription</h2>
            
            <form class="space-y-4">
                <div>
                    <label class="block text-gray-600 mb-1">Username</label>
                    <input 
                        type="text" 
                        v-model="name"
                        placeholder="Enter your name"
                        class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                </div>

                <div>
                    <label class="block text-gray-600 mb-1">Email</label>
                    <input 
                        type="email" 
                        placeholder="Enter your mail"
                         v-model="email"
                        class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                </div>

                <div>
                    <label class="block text-gray-600 mb-1">Password</label>
                    <input 
                        type="password" 
                         v-model="password"
                        placeholder="Create your password"
                        class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                </div>

                <div>
                    <label class="block text-gray-600 mb-1">Confirmation Password</label>
                    <input 
                        type="password" 
                         v-model="passwordconfirm"
                        placeholder=""
                        class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                </div>

                <button 
                    type="submit"
                    class="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition">
                    Sign up
                </button>
            </form>

            <p class="text-center text-gray-600 mt-4">
            Already have an account?
                <router-link to="/login" class="text-green-600 hover:underline">Sign in</router-link>
            </p>
        </div>
        </form>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const name =ref('')
const email=ref('')
const password=ref('')
const passwordconfirm=ref('')

function handleSubmit(){
    // console.log("Information",name, email, password, passwordconfirm)
}
</script>
