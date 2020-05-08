import React, { Component } from 'react';
import { connect } from 'react-redux';
import { layThongtinTaiKhoanAction, CapNhatThongTinNguoiDungAction } from '../../Redux/Actions/QuanLyNguoiDungAction';
import { layDanhSachKhoaHocAction, huyGhiDanhAction } from '../../Redux/Actions/QuanLyKhoaHocAction';
import { NavLink } from 'react-router-dom';
import { spaceNumber } from '../../Commons/handleCommons';

class InfoPersonal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: {
                taiKhoan: this.props.match.params.taiKhoan,
                matKhau: '',
                soDT: '',
                email: '',
                hoTen: '',
                maLoaiNguoiDung: ''
            },
            khoaHoc: {
                maKhoaHoc: '',
                tenKhoaHoc: '',
            },

        }
    }


    componentDidMount() {

        this.props.layThongTinTaiKhoan(this.state.user.taiKhoan);
        this.props.layDanhSachKhoaHoc();

    }

    handleInfoChange = (event) => {

        let { name, value } = event.target;
        this.setState({
            user: {
                ...this.state.user, [name]: value
            }
        });
    }
    setStateUser = () => {
        let { email, soDT, hoTen, maLoaiNguoiDung, matKhau, taiKhoan } = this.props.thongTinTaiKhoan;
        this.setState({
            user: {
                soDT: soDT,
                email: email,
                hoTen: hoTen,
                maLoaiNguoiDung: maLoaiNguoiDung,
                matKhau: matKhau,
                taiKhoan: taiKhoan
            }
        });
    }
    updateInfo = () => {
        this.props.CapNhatThongTinNguoiDung(this.state.user)
    }
    renderTabPersonal = () => {
        let { taiKhoan, matKhau, email, soDT, maLoaiNguoiDung, hoTen } = this.props.thongTinTaiKhoan;
        //   let { emailState, soDTState, hoTenState } = this.state.user;
        return (
            <div>
                <div className='w-100'>
                    <p>Họ tên: <span>{hoTen}</span></p>
                    <p>Tài Khoản: <span>{taiKhoan}</span></p>
                    <p>Mật khẩu: <span>{matKhau}</span></p>
                    <p>Email: <span>{email}</span></p>
                    <p>Số điện thoại: <span>{soDT}</span></p>
                    <p>Loại người dùng: {maLoaiNguoiDung === 'HV' ? <span>Học viên</span> : <span>Giảng viên</span>}</p>
                </div>
                <div>
                    <button className='btn btn-primary' data-toggle="modal" data-target="#exampleModalCenter" onClick={() => this.setStateUser()}>Sửa đổi thông tin</button>
                    {/* Modal */}
                    <div className="modal fade" id="exampleModalCenter" tabIndex={-1} role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLongTitle">Cập nhật thông tin cá nhân</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">×</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <div className="form-group">
                                        <span >Tài Khoản: </span>
                                        <input className='form-control' type="text" value={this.state.user.taiKhoan} disabled />

                                        <span >Mật khẩu: </span>
                                        <input className='form-control' type="text" value={this.state.user.matKhau} name='matKhau' onChange={this.handleInfoChange} />

                                        <span >Họ tên: </span>
                                        <input className='form-control' type="text" value={this.state.user.hoTen} name='hoTen' onChange={this.handleInfoChange} />

                                        <span >Email: </span>
                                        <input className='form-control' type="text" value={this.state.user.email} name='email' onChange={this.handleInfoChange} />

                                        <span >Số điện thoại: </span>
                                        <input className='form-control' type="text" value={this.state.user.soDT} name='soDT' onChange={this.handleInfoChange} />

                                        <span >Loại người dùng: </span>
                                        <input className='form-control' type="text" value={this.state.user.maLoaiNguoiDung} disabled />
                                    </div>

                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Đóng</button>
                                    <button type="button" className="btn btn-success" onClick={() => this.updateInfo()}>Cập nhật</button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }

    renderTabCourse = () => {
        return (
            <div className='p-5'>
                <div className="form-inline">
                    <input className="form-control" type="search" placeholder="Search" aria-label="Search" name='tenKhoaHoc'
                        value={this.state.khoaHoc.tenKhoaHoc} onChange={this.handleChange} onKeyDown={this.handleKeyUp} />
                    <button id='btn_personal_search' className='btn btn-danger' onClick={() => this.renderInfoCourse()}>Tìm</button>
                </div>

                {this.props.chiTietKhoaHocGhiDanh.length === 0 ? <div className='p-5'><h4>Bạn chưa đăng ký khóa học nào...</h4></div> : this.renderInfoCourse()}
            </div>
        )
    }



    fillArray = (mangKhoaHocGhiDanh, mangKhoaHoc) => {
        //lấy tất cả thông tin cho các khóa học đã ghi danh.

        return mangKhoaHocGhiDanh.map((element, index) => {
            return mangKhoaHoc.find((item) => {
                return item.maKhoaHoc === element.maKhoaHoc
            })
        })

    }
    fullInfoCourse = () => {

        let { mangKhoaHoc, chiTietKhoaHocGhiDanh } = this.props

        let array = this.fillArray(chiTietKhoaHocGhiDanh, mangKhoaHoc)

        return array;

    }
    searchInfoCourse = (tenKhoaHoc) => {
        let { mangKhoaHoc, chiTietKhoaHocGhiDanh } = this.props

        let fillArray = this.fillArray(chiTietKhoaHocGhiDanh, mangKhoaHoc)
        let keyword = tenKhoaHoc
            .toLowerCase() // Chuyen thanh chu thuong
            .replace(/\s/g, ''); // Xoa bo nhung khoang trang
        return fillArray.filter(function (element) {
            return element.tenKhoaHoc.toLowerCase().replace(/\s/g, '').indexOf(keyword) !== -1
        });

    }
    sortArrayByName = (array) => {
        return array.sort((curentEle, nextEle) => {
            let curentName = curentEle.tenKhoaHoc.toLowerCase();
            let nextName = nextEle.tenKhoaHoc.toLowerCase();
            if (curentName < nextName) return -1
            else if (curentName > nextName) return 1;
            else return 0
        })
    }
    unsubscribe = (maKhoaHoc) => {
        this.props.huyGhiDanh(maKhoaHoc, this.state.user.taiKhoan);

    }
    renderInfoCourse = () => {
        let array = []
        if (this.state.khoaHoc.tenKhoaHoc !== '') {
            array = this.searchInfoCourse(this.state.khoaHoc.tenKhoaHoc)
            if (array.length === 0)
                return (
                    < div className="row bg-dark my-3 py-3" height={200} >
                        <p className='text-white'>Không tìm thấy khóa học "{this.state.khoaHoc.tenKhoaHoc}"</p>
                    </div >
                )
        } else {
            array = this.fullInfoCourse()
        }
        this.sortArrayByName(array)

        return array.map((element, index) => {
            return (
                < div className="row bg-dark my-3 py-3" height={200} key={index} >
                    <div className="col-3">
                        <img src={element.hinhAnh} height='200' width='100%' alt={element.tenKhoaHoc} />
                    </div>
                    <div className="col-6">
                        <h3 className='text-white'>{element.tenKhoaHoc}</h3>
                        {this.handleView(element.moTa, index)}
                        <button className='bnt btn-danger' onClick={() => this.unsubscribe(element.maKhoaHoc)}>Hủy</button>
                    </div>
                    <div className="col-3 text-white">
                        <p>Loại: {element.danhMucKhoaHoc.tenDanhMucKhoaHoc}</p>
                        <p>Người tạo: {element.nguoiTao.hoTen}</p>
                        <p>Số lượng học viên: {element.soLuongHocVien}</p>
                        <p>Lượt xem: {spaceNumber(element.luotXem)}</p>
                        <p>Ngày tạo: {element.ngayTao}</p>
                    </div>
                </div >
            )
        })


    }

    handleView = (mota, id) => {

        if (mota.length >= 200) {
            let moTaPhiaSau = mota.substring(200, mota.length)
            let moTaPhiaTruoc = mota.substring(0, 200)

            return (
                <div>
                    <p className='text-white'>{moTaPhiaTruoc}<span id={`dots_${id}`} >...</span><span className='more' id={`more_${id}`}>{moTaPhiaSau}</span></p>
                    <span className='btn btn-success' id={`btnReadMore_${id}`} onClick={() => this.readMore(id)}>Đọc Thêm</span>
                </div>
            )
        }
        else {
            return (
                <p className='text-white'>{mota}</p>
            )
        }

    }
    readMore = (index) => {

        var dots = document.getElementById(`dots_${index}`);
        var moreText = document.getElementById(`more_${index}`);
        var btnText = document.getElementById(`btnReadMore_${index}`);

        if (dots.style.display === "none") {
            dots.style.display = "inline";
            btnText.innerHTML = "Đọc Thêm";
            moreText.style.display = "none";
        } else {
            dots.style.display = "none";
            btnText.innerHTML = "Thu gọn";
            moreText.style.display = "inline";
        }
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
            document.getElementById('btn_personal_search').click();
        }

    }


    render() {

        return (
            <div className='info_personal'>

                <div className='bg-dark p-5'></div>
                <NavLink to={'/'} className='btn btn-warning'><i className="fa fa-home"></i></NavLink>
                <div className="info_personal_container container">
                    <div className="row py-5">
                        <div>
                            <ul className="nav nav-tabs" id="myTab" role="tablist">
                                <li className="nav-item">
                                    <a className="nav-link active text-danger h-100" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Thông tin cá nhân</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link text-danger h-100" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Thông tin khóa học</a>
                                </li>

                            </ul>
                            <div className="tab-content p-4" id="myTabContent">
                                <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                    {this.renderTabPersonal()}
                                </div>
                                <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                                    {this.renderTabCourse()}

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        );
    }
}
function mapStateToProps(state) {
    return {
        thongTinTaiKhoan: state.QuanLyNguoiDungReducer.thongTinTaiKhoan,
        mangKhoaHoc: state.QuanLyKhoaHocReducer.mangKhoaHoc,
        chiTietKhoaHocGhiDanh: state.QuanLyNguoiDungReducer.chiTietKhoaHocGhiDanh,

    };
}

function mapDispatchToProps(dispatch) {
    return {
        layThongTinTaiKhoan: (taiKhoan) => {
            dispatch(layThongtinTaiKhoanAction(taiKhoan))
        },
        layDanhSachKhoaHoc: () => {
            dispatch(layDanhSachKhoaHocAction())
        },
        huyGhiDanh: (maKhoaHoc, taiKhoan) => {
            dispatch(huyGhiDanhAction(maKhoaHoc, taiKhoan))
        },
        CapNhatThongTinNguoiDung: (user) => {
            dispatch(CapNhatThongTinNguoiDungAction(user))
        }
    };
}
export default connect(
    mapStateToProps, mapDispatchToProps
)(InfoPersonal);