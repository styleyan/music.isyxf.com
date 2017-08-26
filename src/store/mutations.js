import * as types from './mutation-types'

const matutions = {
  [types.SET_SINGER](state, singer) {
    state.singer = singer
  },
}

export default matutions