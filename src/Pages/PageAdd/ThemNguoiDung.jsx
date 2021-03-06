import React, { Component } from 'react';
import { connect } from 'react-redux';
import {settings} from './../../Commons/Settings'
import { themNguoiDungAction ,layDanhSachLoaiNguoiDungAction} from '../../Redux/Actions/QuanLyNguoiDungAction';
import isEqual from 'lodash/isEqual'

class ThemNguoiDung extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: {
                taiKhoan: "",
                matKhau: "",
                hoTen: "",
                soDT: "",
                maLoaiNguoiDung: "",
                maNhom: settings.groupID,
                email: ""
            }
        }
    }

    
    handleSubmit = (e) => {
        e.preventDefault();
        //Gọi action ajax đưa dữ liệu về server 
    }
    clearField = () => {
        this.setState({
            user: {
                taiKhoan: "",
                matKhau: "",
                hoTen: "",
                soDT: "",
                maLoaiNguoiDung: "",
                maNhom: settings.groupID,
                email: ""
            }
        })
    }

    handleChange = (e) => {
        let { value, name } = e.target;

        this.setState({
            user: { ...this.state.user, [name]: value }
        }, () => {
            console.log(this.state.khoaHoc)
        });

    }
    render() {
        return (
            <div className='container py-5'>
                <form onSubmit={this.handleSubmit}>
                    <h3>Thêm người dùng</h3>
                    <div className="row">
                        <div className="col-md-6">

                            <div className="form-group">
                                <h3>Tài khoản</h3>
                                <input className="form-control" name="taiKhoan" value={this.state.user.taiKhoan} onChange={this.handleChange} />
                            </div>
                            <div className="form-group">
                                <h3>Mật khẩu</h3>
                                <input className="form-control" name="matKhau" value={this.state.user.matKhau} onChange={this.handleChange} />
                            </div>
                            <div className="form-group">
                                <h3>Họ tên</h3>
                                <input className="form-control" name="hoTen" value={this.state.user.hoTen} onChange={this.handleChange} />
                            </div>

                            <div className="form-group">
                                <button type="submit" className="btn btn-success" onClick={() => this.props.themNguoiDung(this.state.user,this.clearField)}>Cập nhật người dùng</button>
                            </div>
                        </div>
                        <div className="col-md-6">

                            <div className="form-group">
                                <h3>Số điện thoại</h3>
                                <input className="form-control" name="soDT" value={this.state.user.soDT} onChange={this.handleChange} />
                            </div>
                            <div className="form-group">
                                <h3>Email</h3>
                                <input className="form-control" name="email" value={this.state.user.email} onChange={this.handleChange} />
                            </div>
                            <div className="form-group">
                                <h3>Danh mục người dùng</h3>
                                <select className="form-control" name="maLoaiNguoiDung" value={this.state.user.maLoaiNguoiDung} onChange={this.handleChange}>
                                    {this.props.mangLoaiNguoiDung.map((ele, index) => {
                                        return (
                                            <option className='form-control' value={ele.maLoaiNguoiDung} key={index}>{index}-{ele.tenLoaiNguoiDung}</option>
                                        )
                                    })}
                                </select>
                            </div>

                        </div>

                    </div>

                </form>
            </div>
        );
    }
    componentDidMount() {
      
        this.props.layDanhSachLoaiNguoiDung();
    }

    componentDidUpdate(prevProps, prevState) {

        //chưa sử dụng
        if (!isEqual(prevProps.mangLoaiNguoiDung, this.props.mangLoaiNguoiDung)) {
            this.setState({
                user: {
                    maLoaiNguoiDung: this.props.mangLoaiNguoiDung[0].maLoaiNguoiDung,

                }
            })

        }
        //end

    }

}

function mapStateToProps(state) {
    return {
        mangLoaiNguoiDung: state.QuanLyNguoiDungReducer.mangLoaiNguoiDung,

    };
}

function mapDispatchToProps(dispatch) {
    return {
        layDanhSachLoaiNguoiDung: () => {
            dispatch(layDanhSachLoaiNguoiDungAction())
        },
       themNguoiDung: (user,clearField) => {
            dispatch(themNguoiDungAction(user,clearField))
        }
    };
}
export default connect(
    mapStateToProps, mapDispatchToProps
)(ThemNguoiDung);