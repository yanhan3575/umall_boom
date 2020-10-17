import Vue from "vue"
import Vuex from "vuex"
Vue.use(Vuex)
import {state,mutations,getters} from "./mutations"
import {actions} from "./actions"
import menu from "./modules/menu"
import role from "./modules/role"
import specs from "./modules/specs"
import cate from './modules/cate'
import goods from './modules/goods'
import banner from './modules/banner'
import manage from './modules/manage'
import member from './modules/member'
import seck from './modules/seck'
export default new Vuex.Store({
    state,
    mutations,
    getters,
    actions,
    modules:{
        menu,
        role,
        cate,
        specs,
        goods,
        banner,
        manage,
        member,
        seck
    }
})