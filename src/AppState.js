import { reactive } from 'vue'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
    user: {},
    /**@type {import('./models/Account.js').Account} */
    account: {},

    activeProfile: null,

    profilePosts: [],

    blurbs: [],

    nextPage: null,

    previousPage: null,

    posts: [],

    activePost: null,

    searchedPosts: [],

})
