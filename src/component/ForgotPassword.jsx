import React, { Component } from "react";
import "./ForgotPassword.css";
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

class ForgotPassword extends Component {
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
        const email = e.target[0].value
        this.setState({loading: true, err: false, suc: false})
        const req = await axios
          .post(process.env.REACT_APP_API_URL + "/api/forgotPassword", {email})
        if(req.status !== 200) throw new Error('Something went wrong')
        this.setState({suc: true, loading: false})
    }catch(err){
        this.setState({err: true, loading: false})
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
                    type="text"
                    // className="form-control"
                    placeholder="Email"
                    required="required"
                    name="Username"
                  />
                {/* </div> */}
                {/* <div className="form-group"> */}
                  <input className="login-form-input"
                    type="submit"
                    // className="btn btn-primary btn-block btn-lg btn-mystyle"
                    value="Send me the link"
                    id="submitBtn"
                  />
                {/* </div> */}
                {this.state.err ? (
                  <p className="alert">Invalid Email</p>
                ) : null}
                {this.state.suc ? (
                    <p className="reset-suc">Nice! Now go check your email for a reset link</p>
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

export default ForgotPassword;
