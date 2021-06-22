import React,{Component}  from 'react'
import { connect } from 'react-redux'
import WalletInfo from 'components/WalletInfo'
import UploadTest from 'components/UploadTest'
import DownloadTest from 'components/DownloadTest'
import ui from 'utils/ui'
import cx from 'classnames'
import {isNull} from 'lodash'
import networks from 'constants/networks'

import * as loginActions from 'redux/actions/login'

import './Nav.scss'

class Nav extends Component {
  state={
    network:null,
  }
  componentDidMount(){
    this.setNetworkInfo()
  }

  setNetworkInfo = () => {
    const { klaytn } = window
    if (klaytn === undefined) return

    this.setState({ network: klaytn.networkVersion })
    klaytn.on('networkChanged', () => this.setNetworkInfo(klaytn.networkVersion))
  }

  render(){
    const { address, logout } = this.props
    const { network } = this.state
    console.log(this.props)
    return(
      <header className="Nav">
        <div className="Nav__inner">
          <h1 className="Nav__logo">
            Storage
          </h1>
          <div className="Nav__menus">

            {/* <button
              className="Nav__uploadTEST"
              onClick={() => ui.showModal({
                header: 'Upload Content',
                content: (
                  <UploadTest />
                ),
              })}
            >
              TEST UPLOAD
            </button>

            <button
              className="Nav__downloadTEST"
              alt="Wallet info"
              onClick={() => ui.showModal({
                header: 'Download Cert',
                content: (
                  <DownloadTest
                    cName="1mb1.txt"
                    cSize="1MB"
                    cHash="d8fa53a2e441af418b843faf161dfd589c3daf5458bdb3fb5637a9d8c49684a6"
                    cType="TEST"
                    cDesc="DOWNLOAD TEST 1 MB"
                    accessLocation="cassandra"
                    createdTime="2021-04-01 15:22:50"
                    endPoint="http://203.250.77.140:8000/ReqDownload"                
                  />
                ),
              })}
            >
              TEST DOWNLOAD
            </button> */}

            <button
              className="Nav__wallet"
              alt="Wallet info"
              onClick={() => ui.showModal({
                header: 'Wallet Info',
                content: (
                  <WalletInfo address={address}/>
                ),
              })}
            >
              Wallet
            </button>

            <button
              className="Nav__logout"
              alt="Logout"
              onClick={logout}
            >
              Logout
            </button>

            <div className={cx('Nav__network', {
              'Nav__network--error': isNull(network),
              'Nav__network--loading': network === 'loading',
            })}>
            <span>&#9679;</span>
            {isNull(network) ? 'No connection' : networks[network]}
            </div>
          </div>
        </div>
      </header>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(loginActions.logout()),
})

export default connect(null, mapDispatchToProps)(Nav)
