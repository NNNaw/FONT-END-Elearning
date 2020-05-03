import React, { Component } from 'react'
import { NavLink } from "react-router-dom"
import Logo from './../../Assets/Images/LogoEducation.png'
import { connect } from 'react-redux'
import { layDanhMucKhoaHocAction } from './../../Redux/Actions/QuanLyKhoaHocAction'
class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: {
                taiKhoan: '',
                hoTen: '',
            },
            danhMuc: {
                maDanhMuc: '',
                tenDanhMuc: '',
            },
            khoaHoc: {
                maKhoaHoc: '',
                tenKhoaHoc: '',
            }
        }
    }
    componentDidMount = () => {
        this.props.layDanhMucKhoaHoc();
        this.checkUser();
    }
    checkUser = () => {
        if (this.props.user === null)
            return
        this.setState({
            user: {
                taiKhoan: this.props.user.taiKhoan,
                hoTen: this.props.user.hoTen,
            }
        })
    }
    renderButton = () => {

        if (this.props.logOut) {
            return (
                <div className='btn-group_Sign'>
                    <NavLink className='btn btn_Sign' to='/dangnhap'>Đăng nhập</NavLink>
                    <NavLink className='btn btn_Sign' to='/dangky'>Đăng ký</NavLink>
                </div>
            )
        } else {
            return (
                <div className="btn-group_Sign d-flex align-sefl-center">
                    <NavLink to={`/ThongTinCaNhan/${this.props.user.taiKhoan}`} className='hello-title btn btn_Sign mr-1'>Xin chào, <span>{this.state.user.hoTen}</span></NavLink>
                    <button className="btn btn_Sign" onClick={() => { this.props.dangXuatNguoiDung() }}>
                        Đăng xuất
                    </button>
                </div>
            )
        }

    }
    changeDanhMuc = (maDanhMuc) => {
        this.setState({
            danhMuc: {
                maDanhMuc: maDanhMuc
            }
        }, () => {

        });
    }
    renderDanhMucKhoaHoc = () => {
        return this.props.mangDanhMucKhoaHoc.map((danhMuc, index) => {
            return (
                <NavLink to={`/DanhSachKhoaHocTheoDanhMuc/${danhMuc.maDanhMuc}`}
                    key={index} className="dropdown-item m-0" onClick={() => this.changeDanhMuc(danhMuc.maDanhMuc)}>
                    {danhMuc.tenDanhMuc}
                </NavLink>
            )
        })
    }
    handleChange = (event) => {

        let { name, value } = event.target;
        this.setState({
            khoaHoc: {
                ...this.state.khoaHoc, [name]: value
            }
        });
       
    }
    handleKeyUp = (event) => {
        if (event.key === "Enter") {
            document.getElementById('nav').click();
        }
       
    }
    render() {
        return (
            <div className='header'>
                <nav className="navbar navbar-expand-lg">
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <NavLink className="navbar-brand logo_education" to='/'>
                            <img src={Logo} alt="Error" />
                        </NavLink>
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <NavLink className="nav-link" to='/'>Trang chủ</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to='/about'>Thông tin</NavLink>
                            </li>
                            <li className="nav-item ">
                                <NavLink className="nav-link" to='/contact'>Liên hệ</NavLink>
                            </li>
                            <li className="nav-item dropdown">
                                <button className="btn btn-secondary dropdown-toggle" type="button" id="navbarDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Danh mục khóa học
                                </button>
                                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    {this.renderDanhMucKhoaHoc()}

                                </div>
                            </li>
                        </ul>

                        <form className="form-inline">
                            <input className="form-control" type="search" placeholder="Search" aria-label="Search" 
                            value={this.state.khoaHoc.tenKhoaHoc} name='tenKhoaHoc' id='inputSearch' onChange={this.handleChange} onKeyDown={this.handleKeyUp} />
                            <NavLink id='nav' to={`/TimKiemKhoaHoc/${encodeURIComponent(this.state.khoaHoc.tenKhoaHoc)}`} className="btn btn-search">
                                <i className="fas fa-search"></i>
                            </NavLink>
                        </form>
                        {this.renderButton()}
                    </div>
                </nav>
            </div>

        )
    }
}
const mapStateToProp = state => {
    return {
        user: state.QuanLyNguoiDungReducer.user,
        logOut: state.QuanLyNguoiDungReducer.logOut,
        mangDanhMucKhoaHoc: state.QuanLyKhoaHocReducer.mangDanhMucKhoaHoc
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        dangXuatNguoiDung: () => {
            dispatch({
                type: "DANG_XUAT"
            });
        },
        layDanhMucKhoaHoc: () => {
            dispatch(layDanhMucKhoaHocAction())
        }
    }
}

export default connect(mapStateToProp, mapDispatchToProps)(Header);