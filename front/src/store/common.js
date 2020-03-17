export default {
    state: {
        userId: 0,
        userCode: 0,
        userName: 0,
        orgId : 0,
    },
    mutations: {
        REFRESHQUERYINFO(state, query) {
            // if (query.user != null) {
                state.userId = query.userId
                state.userCode = query.userCode
                state.userName = query.userName
                state.orgId = query.orgId
            // }
        },
        GETORGID(state) {
          return state.orgId
        },
    },
    actions: {
        refreshQueryInfo({ commit }, query) {
            commit('REFRESHQUERYINFO', query)
        }
    }
}
