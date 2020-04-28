import React, { Component } from 'react';
import { settings } from '../../Commons/Settings'
import './SignUp.css'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { dangKyNguoiDungAction } from '../../Redux/Actions/QuanLyNguoiDungAction'
class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                taiKhoan: "",
                matKhau: "",
                hoTen: "",
                soDT: "",
                maLoaiNguoiDung: "HV",
                maNhom: settings.groupID,
                email: "",
            },
            errors: {
                taiKhoan: "",
                matKhau: "",
                hoTen: "",
                soDT: "",
                email: "",
                matKhauTam: ''
            },
            temp: {
                matKhauTam: ''
            }
        }
    }
    handleClear = () => {
        this.setState({
            user: {
                taiKhoan: "",
                matKhau: "",
                hoTen: "",
                soDT: "",
                maNhom: settings.groupID,
                email: "",
                maLoaiNguoiDung: "HV"
            },
            temp: { matKhauTam: '' },
        })

        //  document.getElementById('matkhau_1').value = 'xx';
    }
    handleChange = (event) => {
        let { name, value } = event.target;

        this.setState({
            user: { ...this.state.user, [name]: value },
            temp: { ...this.state.temp, [name]: value },
        }, () => { console.log(this.state.user) })
    }
    handleError = (event) => {

        let { name, value } = event.target;

        let Errors = ''; // nội dung error
        let nameInput = ''; //ten7 của tag input
        switch (name) {
            case "taiKhoan":
                nameInput = "Tài khoản"
                break;
            case "matKhauTam":
                nameInput = "Mật khẩu"
                break;
            case "matKhau":
                nameInput = "Xác nhận mật khẩu"
                break;
            case "soDT":
                nameInput = "Số điện thoại"
                break;
            case "email":
                nameInput = "Email"
                break;
            case "hoTen":
                nameInput = "Họ tên"
                break;
            default:
                break;
        }
        //xử lý trống
        Errors = value === '' ? '(*)' + nameInput + ' không được bỏ trống!' : '';

        //xử lý định dạng email
        if (name === 'email' && Errors === '') {
            let regex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
            if (!regex.test(value)) {
                Errors = 'Email này không đúng định dạng!'
            }
        }
        //xử lý định dạng số điện thoại
        if (name === 'soDT' && Errors === '') {
            let regex = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s/0-9]*$/;
            if (!regex.test(value)) {
                Errors = 'Số điện thoại không đúng định dạng!'
            }
        }
        this.setState({
            errors: { ...this.state.errors, [name]: Errors }
        })

    }
    handleSubmit = (event) => {
        event.preventDefault();//chặn submit của browser
        //Xử lý mật khẩu

        // let { name, value } = event.target;
        let Error = '';
        if (this.state.user.matKhau !== this.state.temp.matKhauTam) {
            Error = 'Xác nhận mật khẩu không đúng!'
            this.setState({
                errors: { matKhau: Error }
            })
            return
        }
        this.props.dangKyNguoiDung(this.state.user, this.handleClear)
    }
    render() {
        return (
            <div className='SignUp'>

                <div className="test"></div>
                <div className="container">
                    <div className="d-flex justify-content-center h-100">
                        <div className="card">
                            <div className="card-header">
                                <h3>Đăng Ký</h3>
                                <div className="d-flex justify-content-end social_icon">
                                    <span><i className="fab fa-facebook-square" /></span>
                                    <span><i className="fab fa-google-plus-square" /></span>
                                    <span><i className="fab fa-twitter-square" /></span>
                                </div>
                            </div>
                            <div className="card-body">
                                <form method="post" onSubmit={this.handleSubmit}>
                                    <div className="input-group form-group d-flex">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text"><i className="fas fa-user" /></span>
                                        </div>
                                        <input type="text" className="form-control" placeholder="username" id="taiKhoan" name='taiKhoan' value={this.state.user.taiKhoan} onChange={this.handleChange} onBlur={this.handleError} />
                                        {this.state.errors.taiKhoan !== '' ? <div className='text-danger '>{this.state.errors.taiKhoan}</div> : <div className='text-danger'></div>}
                                    </div>

                                    <div className="input-group form-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text"><i className="fas fa-key" /></span>
                                        </div>
                                        <input autoComplete="on" type="password" className="form-control" placeholder="password" id="matKhauTam" name='matKhauTam' value={this.state.temp.matKhauTam} onChange={this.handleChange} onBlur={this.handleError} />
                                        {this.state.errors.matKhauTam !== '' ? <div className='text-danger '>{this.state.errors.matKhauTam}</div> : <div className='text-danger'></div>}
                                    </div>

                                    <div className="input-group form-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text"><i className="fas fa-key" /></span>
                                        </div>
                                        <input autoComplete="on" type="password" className="form-control" placeholder="Nhập lại password" id="matKhau" name='matKhau' value={this.state.user.matKhau} onChange={this.handleChange} onBlur={this.handleError} />
                                        {this.state.errors.matKhau !== '' ? <div className='text-danger '>{this.state.errors.matKhau}</div> : <div className='text-danger'></div>}
                                    </div>

                                    <div className="input-group form-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text"><i className="fas fa-user" /></span>
                                        </div>
                                        <input type="text" className="form-control" placeholder="Họ tên" id="hoTen" name='hoTen' value={this.state.user.hoTen} onChange={this.handleChange} onBlur={this.handleError} />
                                        {this.state.errors.hoTen !== '' ? <div className='text-danger '>{this.state.errors.hoTen}</div> : <div className='text-danger'></div>}
                                    </div>
                                    <div className="input-group form-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text"><i className="fas fa-phone"></i></span>
                                        </div>
                                        <input type="text" className="form-control" placeholder="Số điện thoại" id="soDT" name='soDT' value={this.state.user.soDT} onChange={this.handleChange} onBlur={this.handleError} />
                                        {this.state.errors.soDT !== '' ? <div className='text-danger '>{this.state.errors.soDT}</div> : <div className='text-danger'></div>}
                                    </div>
                                    <div className="input-group form-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text"><i className="fas fa-envelope" /></span>
                                        </div>
                                        <input type="email" className="form-control" placeholder="Email" id="email" name='email' value={this.state.user.email} onChange={this.handleChange} onBlur={this.handleError} />
                                        {this.state.errors.email !== '' ? <div className='text-danger '>{this.state.errors.email}</div> : <div className='text-danger'></div>}
                                    </div>
                                    <div className="form-group">
                                        <div className="float-right pt-2">
                                            <NavLink to="/dangnhap">Đăng nhập <i className="fas fa-arrow-right"></i></NavLink>
                                        </div>
                                        <button className="btn float-left login_btn">
                                            Đăng ký</button>

                                    </div>
                                </form>
                            </div>


                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProp = state => {
    return {
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        dangKyNguoiDung: (user, handleClear) => {
            dispatch(dangKyNguoiDungAction(user, handleClear));
        }
    }
}

export default connect(mapStateToProp, mapDispatchToProps)(SignUp);