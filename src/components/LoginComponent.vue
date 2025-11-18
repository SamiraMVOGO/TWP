<template>
    <div class="min-h-screen flex items-center bg-[url('../assets/images/planning.jpg')] bg-cover bg-center bg-no-repeat relative justify-center ">
        <div class="w-full max-w-md bg-white opacity-95 p-8 rounded-2xl shadow-lg">
            <h2 class="text-2xl font-bold text-center text-gray-800 mb-6">Login</h2>
        
            <form class="space-y-4">
                <div>
                    <label class="block text-gray-600 mb-1">Email</label>
                    <input 
                        type="email" 
                        placeholder="Enter your mail"
                        class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label class="block text-gray-600 mb-1">Password</label>
                    <input 
                        type="password" 
                        placeholder="Enter your password"
                        class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <button 
                    type="submit"
                    class="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
                    Sign in
                </button>
            </form>

            <p class="text-center text-gray-600 mt-4">
                You do not have an account
                <router-link to="/register" class="text-blue-600 hover:underline">Sign up</router-link>
            </p>
        </div>
    </div>
</template>


