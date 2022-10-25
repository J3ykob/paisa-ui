import React, { Component } from "react";
import "./PasswordReset.css";
import Logo from "../img/logo.png";
import { css } from "@emotion/core";
// First way to import
import { ScaleLoader } from "react-spinners";
import axios from 'axios';

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

class PasswordReset extends Component {
  constructor(){
    super();
    this.state = {
        loading: false,
        err: false,
        suc: false
    }
  }

handlePasswordReset = async(e) => {
    try {
        e.preventDefault();
        if(e.target[0].value !== e.target[1].value) {
          this.setState({err: "Passwords do not match!"});
          return;
        }
        const pass = e.target[0].value;
        this.setState({loading: true, suc: false, err: null})
        const resetLink = window.location.href.split('=')[1]
        const req = await axios
        .post(process.env.REACT_APP_API_URL + `/api/resetPassword?resetLink=${resetLink}`, {newPassword: pass})
        if(req.status !== 200) throw new Error('Something went wrong')
        this.setState({suc: true, loading: false})
    }catch(err){
        this.setState({err: "There was an error while resseting your password, please contact our support", loading: false, suc: false})
    }
  }

  render() {
    // let value=(this.props.pass) ? undefined : "";
    return (
      <div>
        <div className="container">
          <div id="main-outer-div">
            <div id="logo-div">
               
              <img id="logo-img" src={Logo} alt="" />
            </div>
            <div id="title-div">
              <h4 className="title">Reset Your Password</h4>
            </div>

            <div id="outer-login-form-div">
              <form action="" method="" onSubmit={this.handlePasswordReset}>
                {/* <div className="form-group"> */}
                  <input className="login-form-input"
                    type="password"
                    // className="form-control"
                    placeholder="New Password"
                    required="required"
                    name="newPass"
                  />
                  <input className="login-form-input"
                    type="password"
                    // className="form-control"
                    placeholder="Confirm New Password"
                    required="required"
                    name="confNewPass"
                  />
                {/* </div> */}
                {/* <div className="form-group"> */}
                  <input className="login-form-input"
                    type="submit"
                    // className="btn btn-primary btn-block btn-lg btn-mystyle"
                    value="Reset your password"
                    id="submitBtn"
                  />
                {/* </div> */}
                {this.state.err ? (
                  <p className="alert">{this.state.err}</p>
                ) : null}
                {this.state.suc ? (
                    <p className="reset-suc">All done! You can now log in with your new password</p>
                  ) : null}
              </form>
            </div>

            <div className="loading">
              <ScaleLoader
                css={override}
                sizeUnit={"px"}
                size={150}
                color={"#123abc"}
                loading={this.state.loading}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  shouldComponentUpdate(){
    return true;
  }
}

export default PasswordReset;
