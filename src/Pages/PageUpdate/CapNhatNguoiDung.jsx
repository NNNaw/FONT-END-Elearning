import React, { Component } from 'react'
import { connect } from 'react-redux'
import { layThongtinTaiKhoanAction, layDanhSachLoaiNguoiDungAction, CapNhatThongTinNguoiDungAction } from '../../Redux/Actions/QuanLyNguoiDungAction';
import { settings } from '../../Commons/Settings';
import { NavLink } from 'react-router-dom';

class CapNhatNguoiDung extends Component {
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
                <NavLink to={'/Admin'} className='btn btn-warning'>  Admin </NavLink>
                <form onSubmit={this.handleSubmit}>
                    <h3>Thông tin người dùng</h3>
                    <div className="row">
                        <div className="col-md-6">

                            <div className="form-group">
                                <h3>Tài khoản</h3>
                                <input disabled className="form-control" name="taiKhoan" value={this.state.user.taiKhoan} onChange={this.handleChange} />
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
                                <button type="submit" className="btn btn-success" onClick={() => this.props.CapNhatThongTinNguoiDung(this.state.user)}>Cập nhật người dùng</button>
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
        )
    }




    componentDidMount() {
        let { taiKhoan } = this.props.match.params;

        this.props.layThongTinTaiKhoan(taiKhoan);
        this.props.layDanhSachLoaiNguoiDung();
    }


    componentDidUpdate(prevProps, prevState) {
        let { thongTinTaiKhoan } = this.props;
        if (this.props.thongTinTaiKhoan !== prevProps.thongTinTaiKhoan) {

            this.setState({
                user: {
                    taiKhoan: thongTinTaiKhoan.taiKhoan,
                    matKhau: thongTinTaiKhoan.matKhau,
                    hoTen: thongTinTaiKhoan.hoTen,
                    soDT: thongTinTaiKhoan.soDT,
                    maLoaiNguoiDung: thongTinTaiKhoan.maLoaiNguoiDung,
                    maNhom: settings.groupID,
                    email: thongTinTaiKhoan.email
                }
            });
        }
    }

}



const mapStateToProps = (state) => {
    return {
        thongTinTaiKhoan: state.QuanLyNguoiDungReducer.thongTinTaiKhoan,
        mangLoaiNguoiDung: state.QuanLyNguoiDungReducer.mangLoaiNguoiDung,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {

        layThongTinTaiKhoan: (taiKhoan) => {
            dispatch(layThongtinTaiKhoanAction(taiKhoan))
        },
        layDanhSachLoaiNguoiDung: () => {
            dispatch(layDanhSachLoaiNguoiDungAction())
        },
        CapNhatThongTinNguoiDung: (user) => {
            dispatch(CapNhatThongTinNguoiDungAction(user))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CapNhatNguoiDung)



