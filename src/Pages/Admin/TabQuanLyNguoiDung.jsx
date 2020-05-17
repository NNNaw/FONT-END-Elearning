import React, { Component } from 'react';
import { connect } from 'react-redux';
import { layDanhSachLoaiNguoiDungAction, layDanhSachNguoiDungAction, themNguoiDungAction, xoaNguoiDungAction, timKiemNguoiDungAction, LayDanhSachKhoaHocChoXetDuyetDuaVaoHocVienAction, LayDanhSachKhoaHocDaXetDuyetDuaVaoHocVienAction, layDanhSachNguoiDungPhanTrangAction } from '../../Redux/Actions/QuanLyNguoiDungAction';
import { settings } from './../../Commons/Settings'
import { NavLink } from 'react-router-dom';
import isEqual from 'lodash/isEqual';
import { huyGhiDanhAction, xacThucGhiDanhKhoaHocDuaVaoKhoaHocAction } from '../../Redux/Actions/QuanLyKhoaHocAction';
import ReactPaginate from 'react-paginate';


class TabQuanLyNguoiDung extends Component {


    constructor(props) {
        super(props);
        this.state = ({

            Search: {
                keySearch: '',
            },
            user: {
                taiKhoan: "",
                matKhau: "",
                hoTen: "",
                soDT: "",
                maLoaiNguoiDung: "",
                maNhom: settings.groupID,
                email: ""
            },
            offset: 0,
            perPage: 8,
            currentPage: 0,
            pageCount: 0,
        })
    }
    //Xử lý phân trang
    set = (count) => {
        this.setState({
            pageCount: count
        });
    }

    handlePageClick = (e) => {

        const selectedPage = e.selected;
        const offset = selectedPage * this.state.perPage;
        this.setState({

            currentPage: selectedPage,
            offset: offset

        }, () => {
            this.props.layDanhSachNguoiDungPhanTrang(this.state.offset, this.state.perPage, this.set)
        });

    };
    renderPageIndex = () => {
        const settings = {
            previousLabel: "Trước",
            nextLabel: "Sau",
            breakLabel: "...",
            breakClassName: "break-me",
            pageCount: this.state.pageCount,
            marginPagesDisplayed: 2,
            pageRangeDisplayed: 5,
            onPageChange: this.handlePageClick,
            containerClassName: "pagination",
            subContainerClassName: "pages pagination",
            activeClassName: "active",
        }
        return (

            <ReactPaginate {...settings} />

        )
    }


    callAPI = (taiKhoan) => {
        this.props.LayDanhSachKhoaHocChoXetDuyetDuaVaoHocVien(taiKhoan)
        this.props.LayDanhSachKhoaHocDaXetDuyetDuaVaoHocVien(taiKhoan)
        this.setState({ user: { taiKhoan: taiKhoan } });
    }
    renderListPersonal = (listPersonal) => {
        return listPersonal.map((element, index) => {
            return (
                <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{element.taiKhoan}</td>
                    <td>{element.email}</td>
                    <td>{element.soDt}</td>

                    <td>{element.maLoaiNguoiDung === 'GV' ? <span>Giảng viên</span> : <span>Học viên</span>}</td>
                    <td>
                        <button onClick={() => this.callAPI(element.taiKhoan)} type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter">
                            Ghi danh
                        </button>
                        <NavLink to={`/CapNhatNguoiDung/${element.taiKhoan}`} className='btn btn-warning' >Sửa</NavLink>
                        <button className='btn btn-danger' onClick={() => this.props.xoaNguoiDung(element.taiKhoan)}>Xóa</button>
                    </td>
                </tr>
            )
        })
    }

    searchCourse = (e) => {
        let { name, value } = e.target;

        this.setState({
            Search: { ...this.state.Search, [name]: value }
        }, () => {
            console.log(this.state.Search.keySearch)
            this.props.timKiemNguoiDung(this.state.Search.keySearch)
        });

    }

    renderTableWait = () => {
        if (this.props.mangKhoaHocChoXetDuyetDuaVaoHocVien.length > 0) {
            return this.props.mangKhoaHocChoXetDuyetDuaVaoHocVien.map((ele, index) => {
                return (
                    <tr key={index}>
                        <td>{index}</td>
                        <td>{ele.maKhoaHoc}</td>
                        <td>{ele.tenKhoaHoc}</td>
                        <td>
                            <button onClick={() => this.props.xacThucGhiDanhKhoaHocDuaVaoKhoaHoc(ele.maKhoaHoc, this.state.user.taiKhoan)} className='btn btn-success'>Xác thực</button>
                            <button onClick={() => this.props.huyGhiDanh(ele.maKhoaHoc, this.state.user.taiKhoan)} className='btn btn-danger'>Hủy</button>
                        </td>
                    </tr>
                )
            })
        } else {
            return (
                <tr>
                    <td></td>
                    <td>Chưa có học viên ghi danh khóa học này.</td>
                    <td></td>
                    <td></td>
                </tr>
            )
        }

    }

    renderTableConfirmed = () => {


        if (this.props.mangKhoaHocDaXetDuyetDuaVaoHocVien.length > 0) {
            return this.props.mangKhoaHocDaXetDuyetDuaVaoHocVien.map((ele, index) => {
                return (
                    <tr key={index}>
                        <td>{index}</td>
                        <td>{ele.maKhoaHoc}</td>
                        <td>{ele.tenKhoaHoc}</td>
                        <td>

                            <button onClick={() => this.props.huyGhiDanh(ele.maKhoaHoc, this.state.user.taiKhoan)} className='btn btn-danger'>Hủy</button>
                        </td>
                    </tr>
                )
            })
        } else {
            return (
                <tr>
                    <td></td>
                    <td>Chưa có học viên ghi danh khóa học này.</td>
                    <td></td>
                    <td></td>
                </tr>
            )
        }

    }
    handleChangeTagSelect = (e) => {
        let { value, name } = e.target;
        this.setState({
            user: { ...this.state.user, [name]: value }
        }, () => {
            //  console.log(this.state.user)
            this.props.LayDanhSachKhoaHocChoXetDuyetDuaVaoHocVien(this.state.user.taiKhoan)
            this.props.LayDanhSachKhoaHocDaXetDuyetDuaVaoHocVien(this.state.user.taiKhoan)
        })

    }
    modalBody = () => {
        let sortMangNguoiDung = this.props.mangNguoiDung.sort((ele, eleNext) => {
            let eleTruoc = ele.taiKhoan.toLowerCase();
            let eleSau = eleNext.taiKhoan.toLowerCase();
            if (eleTruoc < eleSau)
                return -1;
            else if (eleTruoc > eleSau)
                return 1
            else
                return 0
        })
        return (
            <div className="tabCourse">
                <div className="form-inline ">
                    <select className="form-control" name="taiKhoan" value={this.state.user.taiKhoan} onChange={this.handleChangeTagSelect}>
                        {sortMangNguoiDung.map((ele, index) => {
                            return (
                                <option className='form-control' value={ele.taiKhoan} key={index}>{index}-{ele.taiKhoan}</option>
                            )
                        })}
                    </select>
                    <button className='btn btn-success'>Ghi Danh</button>
                </div>
                <hr />
                <div className="waitForConfirm my-5">
                    <div className="top_waitForComfirm">
                        <h3>Học viên chờ xác thực</h3>
                        <input type="search" placeholder='Nhập tên hv hoặc sdt' />
                    </div>
                    <div className="body_waitForComfirm">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>STT</th>
                                    <th>Mã khóa học</th>
                                    <th>Tên khóa học</th>
                                    <th>Thao tác</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.renderTableWait()}
                            </tbody>

                        </table>
                    </div>
                </div>

                <div className="confirmed my-5">
                    <hr />
                    <div className="top_waitForComfirm">
                        <h3>Học viên đã xác thực</h3>
                        <input type="search" placeholder='Nhập tên hv hoặc sdt' />
                    </div>
                    <div className="body_waitForComfirm">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>STT</th>
                                    <th>Mã khóa học</th>
                                    <th>Tên khóa học</th>
                                    <th>Thao tác</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.renderTableConfirmed()}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        )

    }

    render() {
        return (
            <div className='TabQuanLyNguoiDung'>
                <div className="TabQuanLyNguoiDung_Container container">
                    <div className="row">
                        <div className="col-6">
                            <NavLink to={"/ThemNguoiDung"} className='btn btn-success'><i className="fa fa-plus" aria-hidden="true"></i> Thêm người dùng</NavLink>
                        </div>
                        <div className='col-6 TabQuanLyNguoiDung_search py-5'>
                            <div className="form-inline">
                                <input className='form-control' value={this.state.Search.keySearch} name='keySearch' type="text" placeholder='Tìm theo tài khoản' onChange={this.searchCourse} />
                                <input className='form-control btn btn-danger' type="submit" value='Tìm' />
                            </div>
                        </div>

                    </div>

                </div>
                <div className="row">
                    <table className="table text-center">
                        <thead>
                            <tr>
                                <th>STT</th>
                                <th>Tài khoản</th>
                                <th>Email</th>
                                <th>Số điện thoại</th>
                                <th>Loại người dùng</th>
                                <th>Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>

                            {this.props.mangTimKiemNguoiDung.length > 0 ? this.renderListPersonal(this.props.mangTimKiemNguoiDung) : this.renderListPersonal(this.props.mangNguoiDungPhanTrang)}
                        </tbody>
                        <tfoot>
                            <tr>
                                <th>STT</th>
                                <th>Tài khoản</th>
                                <th>Email</th>
                                <th>Số điện thoại</th>
                                <th>Loại người dùng</th>
                                <th>Thao tác</th>
                            </tr>
                        </tfoot>
                    </table>

                </div>

                <div className="row">
                    {this.state.Search.keySearch === '' &&
                        this.renderPageIndex()}
                </div>


                {/* Button trigger modal */}
                {/* Modal */}
                <div className="modal fade" id="exampleModalCenter" tabIndex={-1} role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" style={{ maxWidth: '1000px' }} role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLongTitle">Ghi danh</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                {this.modalBody()}
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Đóng</button>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    componentDidMount() {
        this.props.layDanhSachNguoiDung()
        this.props.layDanhSachLoaiNguoiDung()
        this.props.layDanhSachNguoiDungPhanTrang(this.state.offset, this.state.perPage, this.set)

    }

    componentDidUpdate(prevProps, prevState) {
        if (!isEqual(prevProps.mangLoaiNguoiDung, this.props.mangLoaiNguoiDung)) {
            this.setState({
                user: {
                    mangLoaiNguoiDung: this.props.mangLoaiNguoiDung[0].mangLoaiNguoiDung,
                }
            })

        }
    }
}
function mapStateToProps(state) {
    return {
        mangNguoiDung: state.QuanLyNguoiDungReducer.mangNguoiDung,
        mangNguoiDungPhanTrang: state.QuanLyNguoiDungReducer.mangNguoiDungPhanTrang,
        user: state.QuanLyNguoiDungReducer.user,
        mangLoaiNguoiDung: state.QuanLyNguoiDungReducer.mangLoaiNguoiDung,
        mangTimKiemNguoiDung: state.QuanLyNguoiDungReducer.mangTimKiemNguoiDung,
        mangKhoaHocChoXetDuyetDuaVaoHocVien: state.QuanLyNguoiDungReducer.mangKhoaHocChoXetDuyetDuaVaoHocVien,
        mangKhoaHocDaXetDuyetDuaVaoHocVien: state.QuanLyNguoiDungReducer.mangKhoaHocDaXetDuyetDuaVaoHocVien,

    };
}

function mapDispatchToProps(dispatch) {
    return {
        layDanhSachLoaiNguoiDung: () => {
            dispatch(layDanhSachLoaiNguoiDungAction())
        },
        layDanhSachNguoiDung: () => {
            dispatch(layDanhSachNguoiDungAction())
        },
        layDanhSachNguoiDungPhanTrang: (offset, perPage, set) => {
            dispatch(layDanhSachNguoiDungPhanTrangAction(offset, perPage, set))
        },
        themNguoiDung: (user, clearField) => {
            dispatch(themNguoiDungAction(user, clearField))
        },

        xoaNguoiDung: (taiKhoan) => {
            dispatch(xoaNguoiDungAction(taiKhoan))
        },

        timKiemNguoiDung: (key) => {
            dispatch(timKiemNguoiDungAction(key))
        },

        LayDanhSachKhoaHocChoXetDuyetDuaVaoHocVien: (taiKhoan) => {
            dispatch(LayDanhSachKhoaHocChoXetDuyetDuaVaoHocVienAction(taiKhoan))
        },

        LayDanhSachKhoaHocDaXetDuyetDuaVaoHocVien: (taiKhoan) => {
            dispatch(LayDanhSachKhoaHocDaXetDuyetDuaVaoHocVienAction(taiKhoan))
        },

        huyGhiDanh: (maKhoaHoc, taiKhoan) => {
            dispatch(huyGhiDanhAction(maKhoaHoc, taiKhoan))
        },
        xacThucGhiDanhKhoaHocDuaVaoKhoaHoc: (maKhoaHoc, taiKhoan) => {
            dispatch(xacThucGhiDanhKhoaHocDuaVaoKhoaHocAction(maKhoaHoc, taiKhoan))
        },
    };
}
export default connect(
    mapStateToProps, mapDispatchToProps
)(TabQuanLyNguoiDung);