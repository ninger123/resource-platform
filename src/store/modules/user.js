import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken,setUid,removeUid } from '@/utils/auth'
import router, { resetRouter } from '@/router'

const state = {
  token: getToken(),
  avatar: '',
  roles: [],
  name:'',
  uid: undefined,
  phone: '',
  email:''
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_UID: (state, uid) => {
    state.uid = uid
  },
  SET_PHONE: (state, phone) => {
    state.phone = phone
  },
  SET_EMAIL: (state, email) => {
    state.email = email
  }
}

const actions = {
  // user login 用户登录
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password}).then(response => {
        const { data } = response
        commit('SET_TOKEN', data.token)
        // 把token存到cookie
        setToken(data.token)
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info 获取用户的信息
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response

        if (!data) {
          reject('Verification failed, please Login again.')
        }

        let avatar = 'https://dss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3305298991,2024211813&fm=26&gp=0.jpg'
        const roleType = data.userRole
        let roles
        if(roleType === 1 ) {
          // 申请者
          roles = ['applicant']
        } else if(roleType === 2) {
          // 管理员
          roles = ['controller']
        }

        const uid = data.uid
        // 把uid存储到cookie
        setUid(uid)

        let name = data.name
        const email = data.e_mail
        const phone = data.phone
        if (!roles || roles.length <= 0) {
          reject('getInfo: roles must be a non-null array!')
        }
        commit('SET_ROLES', roles)
        commit('SET_UID', uid)
        commit('SET_NAME',name)
        commit('SET_AVATAR', avatar)
        commit('SET_PHONE',phone)
        commit('SET_EMAIL',email)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout 用户退出登录
  logout({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      logout().then(() => {
        // 把vuex里的token和roles清空
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])

        // 把cookie里的token和uid清空
        removeToken()
        removeUid()

        // 重置路由
        resetRouter()

        // reset visited views and cached views
        // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
        dispatch('tagsView/delAllViews', null, { root: true })

        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token 移除token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resolve()
    })
  },

  // dynamically modify permissions 改变role角色
  changeRoles({ commit, dispatch }, role) {
    return new Promise(async resolve => {
      const token = role + '-token'

      commit('SET_TOKEN', token)
      setToken(token)

      const { roles } = await dispatch('getInfo')

      resetRouter()

      // generate accessible routes map based on roles
      const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })

      // dynamically add accessible routes
      router.addRoutes(accessRoutes)

      // reset visited views and cached views
      dispatch('tagsView/delAllViews', null, { root: true })

      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
