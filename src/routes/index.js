import React from 'react'
import { Route, IndexRoute, Redirect } from 'react-router'

// NOTE: here we're making use of the `resolve.root` configuration
// option in webpack, which allows us to specify import paths as if
// they were from the root of the ~/src directory. This makes it
// very easy to navigate to files regardless of how deeply nested
// your current file is.
import CoreLayout from 'layouts/CoreLayout/CoreLayout'
import HomeView from 'views/HomeView/HomeView'
import GamesView from 'views/GamesView/GamesView'
import GameView from 'views/GameView/GameView'
import MyGames from 'views/MyGames/MyGames'
import AcceptView from 'views/AcceptView/AcceptView'
import PayInOutView from 'views/PayInOutView/PayInOutView'
import Terms from 'views/Terms/Terms'
import Contact from 'views/Contact/Contact'
import OpenData from 'views/OpenData/OpenData'
import Privacy from 'views/Privacy/Privacy'
import Hello from 'views/Hello/Hello'
import Legal from 'views/Legal/Legal'

export default (store) => (
  <Route path='/' component={CoreLayout}>
    <IndexRoute component={HomeView} />
    <Route path='/contact' component={Contact} />
    <Route path='/data' component={OpenData} />
    <Route path='/games' component={GamesView} />
    <Route path='/games/mine' component={MyGames} />
    <Route path='/games/:id' component={GameView} />
    <Route path='/hello' component={Hello} />
    <Route path='/points' component={PayInOutView} />
    <Route path='/terms' component={Terms} />
    <Route path='/accept' component={AcceptView} />
    <Route path='/privacy' component={Privacy} />
    <Route path='/legal' component={Legal} />
    <Redirect from='*' to='/games' />
  </Route>
)
