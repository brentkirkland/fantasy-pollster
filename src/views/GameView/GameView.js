import React from 'react'
import Header from '../../components/Header/Header.js'
import Footer from '../../components/Footer/Footer.js'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { actions as gamesActions } from '../../redux/modules/games'
import { actions as candidatesActions } from '../../redux/modules/candidates'
import { actions as mygamesActions } from '../../redux/modules/mygames'
import { actions as profileActions } from '../../redux/modules/profile'
import { bindActionCreators } from 'redux'
import ReactDOM from 'react-dom'
import s from './GameView.scss'
import Dimensions from 'react-dimensions'

const mapStateToProps = (state) => ({
  games: state.games,
  mygames: state.mygames,
  profile: state.profile,
  candidates: state.candidates
})

const mapDispatchToProps = (dispatch) => ({
  gamesActions: bindActionCreators(gamesActions, dispatch),
  mygamesActions: bindActionCreators(mygamesActions, dispatch),
  profileActions: bindActionCreators(profileActions, dispatch),
  candidatesActions: bindActionCreators(candidatesActions, dispatch)
})

export class GameView extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      candidate: '',
      candidateid: '',
      submit: false,
      time: Date.now()
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.actuallySubmit = this.actuallySubmit.bind(this)
  }

  static contextTypes = {
    router: React.PropTypes.object
  };

  static propTypes = {
    containerWidth: React.PropTypes.number.isRequired,
    games: React.PropTypes.object.isRequired,
    mygames: React.PropTypes.object.isRequired,
    profile: React.PropTypes.object.isRequired,
    gamesActions: React.PropTypes.object.isRequired,
    mygamesActions: React.PropTypes.object.isRequired,
    profileActions: React.PropTypes.object.isRequired,
    route: React.PropTypes.object.isRequired,
    routeParams: React.PropTypes.object.isRequired,
    candidates: React.PropTypes.object.isRequired,
    candidatesActions: React.PropTypes.object.isRequired
  };

  componentWillMount () {
    // if (Object.keys(this.props.profile.profile).length === 0) {
    //   this.context.router.push('/games')
    // }
      // this.props.profile.lock.show({
      //   icon: 'https://s3-us-west-2.amazonaws.com/static-assets-fanpol/sadcyclops.png',
      //   primaryColor: '#5c666f',
      //   socialBigButtons: true,
      //   callbackURL: 'https://fantasypollster.com/games',
      //   responseType: 'token'})
    this.props.gamesActions.fetchGamesIfNeeded()
    this.props.candidatesActions.fetchCandidatesIfNeeded()
    // this.props.gamesActions.getStats(this.props.routeParams.id)
  }

  componentDidMount () {
    // this.props.gamesActions.getStats(this.props.routeParams.id)
    ReactDOM.findDOMNode(this).scrollIntoView()
    this.timer = setInterval(() => {
      this.setState({time: Date.now()})
    }, 1000)
    this.timer2 = setInterval(() => {
      this.props.gamesActions.getStats(this.props.routeParams.id)
    }, 1000)
  }

  componentWillUnmount () {
    this.props.gamesActions.clearStats()
    clearTimeout(this.timer)
    clearTimeout(this.timer2)
  }

  componentDidUpdate () {
    if (!this.props.games.mappedItems.has('bk123') && !this.props.games.mappedItems.has(this.props.routeParams.id)) {
      this.context.router.push('/games')
    }
    if (!this.props.profile.verified) {
      this.context.router.push('/accept#state=' + this.props.routeParams.id)
    }
  }

  render () {
    if (this.props.games.mappedItems.has('bk123')) {
      return (
        <div className={s.root}>
          <Header fixed={false} route={this.props.route}/>
          <Header fixed route={this.props.route}/>
          <div className={s.container}>
            <h1>Loading</h1>
          </div>
          <Footer/>
        </div>
      )
    } else if (!this.props.games.mappedItems.has(this.props.routeParams.id)) {
      return (
        <div className={s.root}>
          <div className={s.container}>
            <h3>Sorry, wrong url or game reached capacity</h3>
            <h1>Game not Found</h1>
          </div>
        </div>
      )
    } else {
      return (
        <div className={s.root}>
          <Header fixed={false} home route={this.props.route}/>
          <div className={s.fakeunder}></div>
          {this.renderSelectedGame()}
          <div className={s.container}>
            <div className={s.game}>
              {this.renderGame()}
            </div>
          </div>
          {this.renderSelectComponent()}
          <div className={s.container}>
            <div>
              <div className={s.games}>
                {this.renderProfileTab()}
                {this.mapGames()}
              </div>
            </div>
          </div>
          <Footer/>
        </div>
      )
    }
  }

  renderSelectComponent () {
    if (this.props.route.path !== '/games') {
      return (
        <div className={s.root3}>
          <div className={s.container3}>
            {this.mapCandidates()}
          </div>
          <div className={s.container4}>
            <span className={s.gameOutcome}>{'The outcome is determined by the accumulated results of the polls taken in each individual precinct of ' + this.props.games.mappedItems.get(this.props.routeParams.id).statename + '. Results will be posted after each precint of ' + this.props.games.mappedItems.get(this.props.routeParams.id).statename + ' has accounted every vote.'}</span>
          </div>
        </div>
      )
    }
    return
  }

  mapCandidates () {
    var game = this.props.games.mappedItems.get(this.props.routeParams.id)
    if (this.props.candidates.mappedItems.size > 0) {
      return game.candidates.map(function (candidate, i) {
        var c = this.props.candidates.mappedItems.get(candidate)
        var name
        var id
        if (i === game.candidates.length - 1) {
          name = c.name
          id = c._id
          if (this.state.candidate === name) {
            return (
              <div key={c.name + 'dark'} className={s.candidateBoxBottomDark} onClick={this.handleChoice.bind(this, name, id)}>
                <img src={c.img} className={s.candidateImage}/>
                <span className={s.candidateBoxTitle}>{c.name}</span>
                <span className={s.candidateScore}>{this.handleStats(id)}</span>
              </div>
            )
          }
          return (
            <div key={c.name} className={s.candidateBoxBottom} onClick={this.handleChoice.bind(this, name, id)}>
              <img src={c.img} className={s.candidateImage}/>
              <span className={s.candidateBoxTitle}>{c.name}</span>
              <span className={s.candidateScore}>{this.handleStats(id)}</span>
            </div>
          )
        }
        name = c.name
        id = c._id
        if (this.state.candidate === name) {
          return (
            <div key={c.name + 'dark'} className={s.candidateBoxDark} onClick={this.handleChoice.bind(this, name, id)}>
              <img src={c.img} className={s.candidateImage}/>
              <span className={s.candidateBoxTitle}>{c.name}</span>
              <span className={s.candidateScore}>{this.handleStats(id)}</span>
            </div>
          )
        }
        return (
          <div key={c.name} className={s.candidateBox} onClick={this.handleChoice.bind(this, name, id)}>
            <img src={c.img} className={s.candidateImage}/>
            <span className={s.candidateBoxTitle}>{c.name}</span>
            <span className={s.candidateScore}>{this.handleStats(id)}</span>
          </div>
        )
      }.bind(this))
    }
  }

  handleStats (id) {
    if (this.props.games.stats.total === 0) {
      return 0
    } else {
      if (this.props.games.immutablestats.has(id)) {
        return this.props.games.immutablestats.get(id)
      }
    }
    return 0
  }

  handleChoice = function (name, id) {
    var game = this.props.games.mappedItems.get(this.props.routeParams.id)
    if (this.props.profile.idToken === null || this.props.profile.idToken === '') {
      this.props.profile.lock.show({
        icon: 'https://s3-us-west-2.amazonaws.com/static-assets-fanpol/sadcyclops.png',
        primaryColor: '#5c666f',
        socialBigButtons: true,
        authParams: {
          state: this.props.routeParams.id
        },
        callbackURL: 'http://localhost:3000/games',
        responseType: 'token'})
    } else if (game.entry > this.props.profile.balance) {
      this.context.router.push('/points#state=' + this.props.routeParams.id)
    } else {
      this.setState({candidate: name, candidateid: id, submit: false})
    }
  }

  renderSelectedGame () {
    function n (n) {
      return n > 9 ? '' + n: '0' + n
    }
    if (this.props.route.path !== '/games') {
      var game = this.props.games.mappedItems.get(this.props.routeParams.id)
      if (game) {
        var to = this.convertMS(Date.parse(game.closedate) - this.state.time)
        if (this.props.containerWidth < 580) {
          return (
            <div className={s.gameRowColor2}>
              <div className={s.container2}>
                <div className={s.partyDiv}>
                  <span className={s.gameUnderText}>PARTY</span>
                  <span className={s.gameName}>{game.party.charAt(0)}</span>
                </div>
                <div className={s.gameStuff}>
                  <span className={s.gameUnderText}>STATE</span>
                  <span className={s.gameName}>{game.statename}</span>
                </div>
                <div className={s.gameMoney2}>
                  <span className={s.gameUnderText}>WINNINGS</span>
                  <span className={s.gameName}>{'$' + game.reward}</span>
                </div>
                <div className={s.gameMoney}>
                  <span className={s.gameUnderText}>ENTRY</span>
                  <span className={s.gameName}>{'$' + game.entry}</span>
                </div>
              </div>
            </div>
          )
        }
        return (
          <div className={s.gameRowColor2}>
            <div className={s.container2}>
              <div className={s.partyDiv}>
                <span className={s.gameUnderText}>PARTY</span>
                <span className={s.gameName}>{game.party.charAt(0)}</span>
              </div>
              <div className={s.gameStuff}>
                <span className={s.gameUnderText}>STATE</span>
                <span className={s.gameName}>{game.name}</span>
              </div>
              <div className={s.timeDiv}>
                <span className={s.gameUnderText}>TIME REMAINING</span>
                <span className={s.gameName}>{n(to.d) + ':' + n(to.h) + ':' + n(to.m) + ':' + n(to.s)}</span>
              </div>
              <div className={s.gameSize}>
                <span className={s.gameUnderText}>GAME SIZE</span>
                <span className={s.gameName}>{game.entries + ' / ' + game.maxsize}</span>
              </div>
              <div className={s.gameMoney2}>
                <span className={s.gameUnderText}>TOTAL WINNINGS</span>
                <span className={s.gameName}>{'$' + game.reward}</span>
              </div>
              <div className={s.gameMoney}>
                <span className={s.gameUnderText}>ENTRY</span>
                <span className={s.gameName}>{'$' + game.entry}</span>
              </div>
            </div>
          </div>
        )
      }
    }
  }

  renderProfileTab () {
    if (this.props.route.path === '/games') {
      return (
        <div className={s.title}>
          <div className={s.gameStuff}>
            <span className={s.gameName2}>Available Games</span>
          </div>
        </div>
      )
    } else {
      return (
        <div className={s.title}>
          <div className={s.gameStuff}>
            <span className={s.gameName2}>Other Available Games</span>
          </div>
        </div>
      )
    }
  }

  renderGame () {
    // no game selected
    if (this.props.route.path === '/games') {
      return
    } else {
      if (this.state.candidate === '') {
        return (
          <div className={s.gameDiv}>
            <div className={s.top3}>
              <span className={s.gameTitle}>{'Who will win ' + this.props.games.mappedItems.get(this.props.routeParams.id).statename + '?'}</span>
              <div className={s.submitOpac}>
                <span className={s.submitText}>{'SUBMIT'}</span>
              </div>
            </div>
          </div>
        )
      }
      if (this.state.submit) {
        return (
          <div className={s.gameDiv}>
            <div className={s.top3}>
              <span className={s.gameTitle}><b>{this.state.candidate}</b>{' will win ' + this.props.games.mappedItems.get(this.props.routeParams.id).statename + '.'}</span>
              <div>
                <div className={s.submitConfirm} onClick={this.actuallySubmit}>
                  <span className={s.submitText}>{'CONFIRM'}</span>
                </div>
              </div>
            </div>
          </div>
        )
      }
      return (
        <div className={s.gameDiv}>
          <div className={s.top3}>
            <span className={s.gameTitle}><b>{this.state.candidate}</b>{' will win ' + this.props.games.mappedItems.get(this.props.routeParams.id).statename + '.'}</span>
            <div className={s.submit} onClick={this.handleSubmit}>
              <span className={s.submitText}>{'SUBMIT'}</span>
            </div>
          </div>
        </div>
      )
    }
  }

  actuallySubmit () {
    this.props.gamesActions.submitGame(this.state.candidateid, this.props.routeParams.id)
    this.context.router.push('/games')
  }

  handleSubmit () {
    var game = this.props.games.mappedItems.get(this.props.routeParams.id)
    if (this.props.profile.idToken === null || this.props.profile.idToken === '') {
      this.props.profile.lock.show({
        icon: 'https://s3-us-west-2.amazonaws.com/static-assets-fanpol/sadcyclops.png',
        primaryColor: '#5c666f',
        socialBigButtons: true,
        authParams: {
          state: this.props.routeParams.id
        },
        callbackURL: 'http://localhost:3000/games',
        responseType: 'token'})
    } else if (game.entry > this.props.profile.balance) {
      this.context.router.push('/points#state=' + this.props.routeParams.id)
    } else {
      this.setState({submit: true})
    }
  }

  renderCandidateBoxes () {
    return (
      <div className={s.candidateBox}>
        <span className={s.candidateBoxTitle}>{'Bernie Sanders'}</span>
      </div>
    )
  }

  abr (text) {
    if (text === 'Democratic') {
      return 'D'
    }
    return 'R'
  }

  convertMS (ms) {
    var d, h, m, s
    s = Math.floor(ms / 1000)
    m = Math.floor(s / 60)
    s = s % 60
    h = Math.floor(m / 60)
    m = m % 60
    d = Math.floor(h / 24)
    h = h % 24
    return { d: d, h: h, m: m, s: s }
  }

  mapGames () {
    function n (n) {
      return n > 9 ? '' + n: '0' + n
    }
    return this.props.games.items.map(function (game, i, a) {
      var to = this.convertMS(Date.parse(game.closedate) - this.state.time)
      if (this.props.routeParams.id === game._id) {
        return
      } else if (i > 3) {
        return
      } else if (i === 3) {
        if (this.props.containerWidth < 580) {
          return (
            <Link key={'himom' + i} to={'/games/' + game._id}>
              <div key={'hidad' + i} className={s.gameRowBottom}>
                <div className={s.partyDiv}>
                  <span className={s.gameName}>{this.abr(game.party)}</span>
                </div>
                <div className={s.gameStuff}>
                  <span className={s.gameName}>{game.statename}</span>
                </div>
                <div className={s.gameMoney2}>
                  <span className={s.gameName}>{'$' + game.reward}</span>
                </div>
                <div className={s.gameMoney}>
                  <span className={s.gameName}>{'$' + game.entry}</span>
                </div>
              </div>
            </Link>
          )
        }
        return (
          <Link key={'himom' + i} to={'/games/' + game._id} onClick={this.handleOtherGame.bind(this)}>
            <div key={'hidad' + i} className={s.gameRowBottom}>
              <div className={s.partyDiv}>
                <span className={s.gameName}>{this.abr(game.party)}</span>
              </div>
              <div className={s.gameStuff}>
                <span className={s.gameName}>{game.statename}</span>
              </div>
              <div className={s.timeDiv}>
                <span className={s.gameName}>{n(to.d) + ':' + n(to.h) + ':' + n(to.m) + ':' + n(to.s)}</span>
              </div>
              <div className={s.gameSize}>
                <span className={s.gameName}>{game.entries + '/' + game.maxsize}</span>
              </div>
              <div className={s.gameMoney2}>
                <span className={s.gameName}>{'$' + game.reward}</span>
              </div>
              <div className={s.gameMoney}>
                <span className={s.gameName}>{'$' + game.entry}</span>
              </div>
            </div>
          </Link>
        )
      } else {
        if (this.props.containerWidth < 580) {
          return (
            <Link key={'himom' + i} to={'/games/' + game._id}>
              <div key={'hidad' + i} className={s.gameRow}>
                <div className={s.partyDiv}>
                  <span className={s.gameName}>{this.abr(game.party)}</span>
                </div>
                <div className={s.gameStuff}>
                  <span className={s.gameName}>{game.statename}</span>
                </div>
                <div className={s.gameMoney2}>
                  <span className={s.gameName}>{'$' + game.reward}</span>
                </div>
                <div className={s.gameMoney}>
                  <span className={s.gameName}>{'$' + game.entry}</span>
                </div>
              </div>
            </Link>
          )
        }
        return (
          <Link key={'himom' + i} to={'/games/' + game._id} onClick={this.handleOtherGame.bind(this)}>
            <div key={'hidad' + i} className={s.gameRow}>
              <div className={s.partyDiv}>
                <span className={s.gameName}>{this.abr(game.party)}</span>
              </div>
              <div className={s.gameStuff}>
                <span className={s.gameName}>{game.statename}</span>
              </div>
              <div className={s.timeDiv}>
                <span className={s.gameName}>{n(to.d) + ':' + n(to.h) + ':' + n(to.m) + ':' + n(to.s)}</span>
              </div>
              <div className={s.gameSize}>
                <span className={s.gameName}>{game.entries + '/' + game.maxsize}</span>
              </div>
              <div className={s.gameMoney2}>
                <span className={s.gameName}>{'$' + game.reward}</span>
              </div>
              <div className={s.gameMoney}>
                <span className={s.gameName}>{'$' + game.entry}</span>
              </div>
            </div>
          </Link>
        )
      }
    }.bind(this))
  }

  handleOtherGame () {
    this.setState({candidate: ''})
  }
}

export default Dimensions()(connect(mapStateToProps, mapDispatchToProps)(GameView))
