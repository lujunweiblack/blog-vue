
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
export default new Vuex.Store({
    state: {
        articles: [],
        article:{},
        userObj:{}
    },
    actions: {
        fillArticles (ctx,articles) {
            ctx.commit('fillArticles',articles)
        },
        fillArticle (ctx,article) {
            ctx.commit('fillArticle',article)
        },
        fillUserObj (ctx,userObj) {
            ctx.commit('fillUserObj',userObj)
        }
    },
    mutations: {
        fillArticles (state,articles) {
            state.articles = articles
        },
        fillArticle (state,article) {
            state.article = article
        },
        fillUserObj (state,userObj) {
            state.userObj = userObj
        }
    }
})