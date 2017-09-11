import storage from 'good-storage'

const SEATCH_KEY = '__search__'
const SERCH_MAX_LENGTH = 15

const PLAY_KEY = '__play__'
const PLAY_MAX_LENGTH = 200

function insertArray(arr, val, compare, maxLen) {
  const index = arr.findIndex(compare)
  if (index === 0) {
    return
  }
  if (index > 0) {
    arr.splice(index, 1)
  }
  arr.unshift(val)
  if (maxLen && arr.length > maxLen) {
    arr.pop()
  }
}

/**
 * 搜索结果保存到storage中去
 */
export function saveSearch(query) {
  let searches = storage.get(SEATCH_KEY, [])
  insertArray(searches, query, (item) => {
    return item === query
  }, SERCH_MAX_LENGTH)
  storage.set(SEATCH_KEY, searches)
  return searches
}

function deleteFromArray(arr, compare) {
  const index = arr.findIndex(compare)
  if (index > -1) {
    arr.splice(index, 1)
  }
}

// 从storage中获取数据
export function loadSearch() {
  return storage.get(SEATCH_KEY, [])
}

// 删除搜索历史
export function deleteSearch(query) {
  let searches = storage.get(SEATCH_KEY, [])
  deleteFromArray(searches, (item) => {
    return item === query
  })
  storage.set(SEATCH_KEY, searches)
  return searches
}

export function clearSearch() {
  storage.remove(SEATCH_KEY)
  return []
}

export function savePlay(song) {
  let songs = storage.get(PLAY_KEY, [])
  insertArray(songs, song, (item) => {
    return item.id === song.id
  }, PLAY_MAX_LENGTH)
  storage.set(PLAY_KEY, songs)
  return songs
}

export function loadPlay() {
  return storage.get(PLAY_KEY, [])
}