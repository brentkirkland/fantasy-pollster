import { createAction, handleActions } from 'redux-actions'
import Immutable from 'immutable'
require('es6-promise').polyfill()
require('isomorphic-fetch')
// ------------------------------------
// Constants
// ------------------------------------
export const REQUEST_GAMES = 'REQUEST_GAMES'
export const RECIEVE_GAMES = 'RECIEVE_GAMES'
export const ADD_IMMUTABILITY_GAMES = 'ADD_IMMUTABILITY_GAMES'
export const INVALIDATE_GAMES = 'INVALIDATE_GAMES'
export const ADD_STATS = 'ADD_STATS'
export const ADD_IMMUTABLE_STATS = 'ADD_IMMUTABLE_STATS'
export const CLEAR_STATS = 'CLEAR_STATS'
export const GET_MINE = 'GET_MINE'
// ------------------------------------
// Actions
// ------------------------------------

export const invalidateGames = createAction(INVALIDATE_GAMES)
const recieveGames = createAction(RECIEVE_GAMES, (json = []) => json)
const addImmutabilityGames = createAction(ADD_IMMUTABILITY_GAMES, (x = []) => x)
const requestGames = createAction(REQUEST_GAMES)
const addStats = createAction(ADD_STATS, (x = {}) => x)
const addImmutableStats = createAction(ADD_IMMUTABLE_STATS, (x = {}) => x)
const clearStatsKid = createAction(CLEAR_STATS)
const myGames = createAction(GET_MINE, (x = {}) => x)

function fetchGames () {
  return (dispatch) => {
    dispatch(requestGames())
    return fetch('https://api.fantasypollster.com/api/matches/flash')
      .then((response) => response.json())
      .then((json) => dispatch(makeImmutable(json)))
  }
}

function makeImmutable (json) {
  return (dispatch) => {
    json.sort(function (a, b) {
      var aa = Date.parse(a.closedate)
      var bb = Date.parse(b.closedate)

      if (aa === bb) {
        return a.statename - b.statename
      }

      return aa - bb
    })
    dispatch(recieveGames(json))
    var y = {}
    for (var i = 0; i < json.length; i++) {
      y[json[i]._id] = json[i]
    }
    var x = Immutable.Map(y)
    dispatch(addImmutabilityGames(x))
  }
}

function alsoMakeImmutable (json) {
  return (dispatch) => {
    dispatch(addStats(json))
    var x = Immutable.Map(json.stats)
    dispatch(addImmutableStats(x))
  }
}

function shouldFetchGames (state) {
  const games = state.games
  if (!games) {
    return true
  }
  if (games.isFetching) {
    return false
  }

  if (games.didInvalidate) {
    return true
  }

  if (games.items.length < 1) {
    return true
  }

  return false
}

export const fetchGamesIfNeeded = () => {
  return (dispatch, getState) => {
    if (shouldFetchGames(getState())) {
      return dispatch(fetchGames())
    }
  }
}

export const forceFetchGames = () => {
  return (dispatch) => {
    return dispatch(fetchGames())
  }
}

export const getStats = (current) => {
  return (dispatch, getState) => {
    var url = 'https://api.fantasypollster.com/api/matches/flash/stats/' + current
    var getFoos = fetch(url, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('userToken'),
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'GET',
      cache: false
    })
    getFoos.then((response) => response.json()).then((json) => dispatch(alsoMakeImmutable(json)))
  }
}

export const clearStats = () => {
  return (dispatch) => {
    return dispatch(clearStatsKid())
  }
}

export const submitGame = (candidate, match) => {
  return (dispatch) => {
    // console.log('hi')
    // var x = JSON.stringify({
    //   prediction: candidate,
    //   match: match
    // })
    // console.log('token: ', localStorage.getItem('userToken'), 'body: ', x)
    fetch('https://api.fantasypollster.com/api/matches/flash/positions', {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('userToken'),
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({
        prediction: candidate,
        match: match
      })
    })
  }
}
function handleMe (json) {
  return (dispatch) => {
    json.sort(function (a, b) {
      var aa = Date.parse(a.created)
      var bb = Date.parse(b.created)

      return bb - aa
    })
    return dispatch(myGames(json))
  }
}

// /api/matches/flash/positions/mine
export const getMine = () => {
  return (dispatch) => {
    fetch('https://api.fantasypollster.com/api/matches/flash/positions/mine', {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('userToken'),
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'GET',
      cache: false
    }).then((response) => response.json()).then((json) => dispatch(handleMe(json)))
  }
}

export const actions = {
  fetchGamesIfNeeded,
  forceFetchGames,
  getStats,
  clearStats,
  submitGame,
  getMine
}

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions({
  [INVALIDATE_GAMES]: (state, action) => (Object.assign({}, state, {
    didInvalidate: true
  })),
  [RECIEVE_GAMES]: (state, action) => (Object.assign({}, state, {
    items: action.payload,
    isFetching: false,
    didInvalidate: false
  })),
  [REQUEST_GAMES]: (state, action) => (Object.assign({}, state, {
    isFetching: true,
    didInvalidate: false
  })),
  [ADD_STATS]: (state, action) => (Object.assign({}, state, {
    stats: action.payload
  })),
  [ADD_IMMUTABLE_STATS]: (state, action) => (Object.assign({}, state, {
    immutablestats: action.payload
  })),
  [CLEAR_STATS]: (state, action) => (Object.assign({}, state, {
    stats: {}
  })),
  [GET_MINE]: (state, action) => (Object.assign({}, state, {
    mine: action.payload
  })),
  [ADD_IMMUTABILITY_GAMES]: (state, action) => (Object.assign({}, state, {
    mappedItems: action.payload
  }))
}, {didInvalidate: false, isFetching: false, items: [], stats: {}, immutablestats: {}, mine: [], mappedItems: Immutable.Map({bk123: 'hi'})})
