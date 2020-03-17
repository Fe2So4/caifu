import { addOrder, delOrder, updateOrder, queryOrder } from '@/api/order'
export default {
    state: {
        orders: []
    },
    getters: {
        getOrderById: (state) => (id) => {
            return Object.assign(state.orders.find(order => order.id === id))
        }
    },
    mutations: {
        ADD(state, order) {
            if (!order.id) {
                order.id = state.orders.length + 1
            }
            state.orders.push(order)
        },
        DEL(state, id) {
            const index = state.orders.findIndex(order => order.id === id)
            if (index !== -1) {
                state.orders.splice(index, 1)
            }
        },
        UPDATE(state, rorder) {
            const index = state.orders.findIndex(order => order.id === rorder.id)
            if (index !== -1) {
                state.orders[index] = rorder
            }
        },
        QUERY(state, orders) {
            state.orders = orders
        }
    },
    actions: {
        async add({ commit }, order) {
            return addOrder().then((data) => {
                commit('ADD', order)
                return data
            })
        },
        del({ commit }, id) {
            return delOrder().then((data) => {
                commit('DEL', id)
                return data
            })
        },
        update({ commit }, order) {
            return updateOrder().then((data) => {
                commit('UPDATE', order)
                return data
            })
        },
        async query({ commit }, query) {
            commit('QUERY', await queryOrder(query))
        }
    }
}