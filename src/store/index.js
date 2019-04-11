
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
export default new Vuex.Store({
    state: {
        articles: [],
        article:{}
    },
    actions: {
        fillArticles (ctx,articles) {
            ctx.commit('fillArticles',articles)
        },
        fillArticle (ctx,article) {
            ctx.commit('fillArticle',article)
        }
    },
    mutations: {
        fillArticles (state,articles) {
            state.articles = articles
        },
        fillArticle (state,article) {
            state.article = article
        }
    }
})