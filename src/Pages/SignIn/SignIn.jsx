import React, { Component } from 'react';
import { connect } from 'react-redux';
import { dangNhapNguoiDungAction } from '../../Redux/Actions/QuanLyNguoiDungAction'
import './SignIn.css'
import { NavLink } from 'react-router-dom'

class SignIn extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: {
                taiKhoan: '',
                matKhau: ''
            },
            checkRemeber: false,

        }
    }
    handleChange = (event) => {
        let { name, value } = event.target;

        this.setState({
            user: { ...this.state.user, [name]: value }
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();//chặn submit của browser

        this.props.dangNhapNguoiDung(this.state.user, this.state.checkRemeber, this.handleLogin)// đưa dữ liệu lên action 

    }
    handleLogin = () => {
        this.props.history.push("/"); // ra trang home

    }
    checked = () => {
        this.setState({
            checkRemeber: !this.state.checkRemeber
        })
    }
    render() {
        return (
            <div className='SignIn'>
                <div className="container">
                    <div className="d-flex justify-content-center h-100">
                        <div className="card">
                            <div className="card-header">
                                <h3>Sign In</h3>
                                <div className="d-flex justify-content-end social_icon">
                                    <span><i className="fab fa-facebook-square" /></span>
                                    <span><i className="fab fa-google-plus-square" /></span>
                                    <span><i className="fab fa-twitter-square" /></span>
                                </div>
                            </div>
                            <div className="card-body">
                                <form method="post" onSubmit={this.handleSubmit}>
                                    <div className="input-group form-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text"><i className="fas fa-user" /></span>
                                        </div>
                                        <input type="text" className="form-control" placeholder="username" id="taiKhoan" name='taiKhoan' value={this.state.user.taiKhoan} onChange={this.handleChange} />
                                    </div>
                                    <div className="input-group form-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text"><i className="fas fa-key" /></span>
                                        </div>
                                        <input autoComplete="on" type="password" className="form-control" placeholder="password" id="matKhau" name='matKhau' value={this.state.user.matKhau} onChange={this.handleChange} />
                                    </div>
                                    <div className="row align-items-center remember">
                                        <input type="checkbox" onClick={this.checked} /> Remember Me
                                    </div>

                                    <div className="form-group">
                                        <input type="submit" className="btn float-right login_btn" />
                                    </div>
                                </form>
                            </div>

                            <div className="card-footer">
                                <div className="d-flex justify-content-center links">
                                    Don't have an account? <NavLink to="/dangky">Sign Up</NavLink>
                                </div>
                                <div className="d-flex justify-content-center">
                                   
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}
const mapDispatchToProps = dispatch => {
    return {
        dangNhapNguoiDung: (user, checkRemeber, handleLogin) => {
            dispatch(dangNhapNguoiDungAction(user, checkRemeber, handleLogin))
        }
    }
}
export default connect(null, mapDispatchToProps)(SignIn)