import React from 'react';

import LogoutBtn from '../components/LogoutBtn.jsx';

export default class AdminWidget extends React.Component {

  render() {

    return (
      <div className="adminPanel">
        <i className="fa fa-user-secret fa-2x iconAlign" aria-hidden="true"></i>
        <div className="adminMenu" >
          <p><LogoutBtn /></p>
          <div>
            <p>
              <a href="/challengeForm" className=" formalFont white-text mainLink">
              <i className="fa fa-plus iconAlign"></i>&nbsp;Add Challenge</a>
            </p>

            <p>
              <a href="/challengesView" className=" formalFont white-text mainLink">
              <i className="fa fa-eye iconAlign"></i>&nbsp;View Challenge</a>
            </p>

          </div>
        </div>
      </div>
    )


  }
}
