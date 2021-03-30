import React from "react";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import s from "./Profile.module.css";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import Profile from "./Profile";
import * as axios from "axios";
import { connect } from "react-redux";
import { setUserProfile } from "../../redux/profileReducer";

class ProfileContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    axios
      .get(
        `https://social-network.samuraijs.com/api/1.0/profile/2`)
      .then((response) => {
        this.props.setUserProfile(response.data);
      });
  }
  render() {
    return <Profile {...this.props} profile={this.props.profile}/>;
  }
}

let mapStateToProps =(state) => ({
    profile: state.profilePage.profile
})

export default connect(mapStateToProps,{setUserProfile})(ProfileContainer);
