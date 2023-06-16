import React, {  useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCurrentProfile,deleteAccount } from '../../action/profile';
import { DashboardAction } from './DashboardAction';
import Experience from './Experience';
import Education from './Education';
const Dashboard = ({
  deleteAccount,
  getCurrentProfile,
  auth: { user },
  profile: { profile }
}) => {
  useEffect(() => {
    getCurrentProfile();
  },[getCurrentProfile]);


  return (
    <section className="container">
      {profile !== null ? (
        <>
          welcome page {user  && user.name}
          <DashboardAction/>
          <Experience experience={profile.experience}/>
          <Education education={profile.education}/>

          <div className="my-2">
            <button className="btn btn-danger" onClick={() => deleteAccount()}>
              <i className="fas fa-user-minus" /> Delete My Account
            </button>
          </div>
        </>
      ) : (
        <>
          <p>You have not yet setup a profile, please add some info</p>
          <Link to="/create-profile" className="btn btn-primary my-1">
            Create Profile
          </Link>
        </>
      )}

    </section>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(mapStateToProps, { getCurrentProfile,deleteAccount })(Dashboard);
