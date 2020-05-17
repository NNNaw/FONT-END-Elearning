import React, { Component } from 'react';
import { connect } from 'react-redux';
import { layDanhSachKhoaHocAction, layDanhMucKhoaHocAction, themKhoaHocAction, xoaKhoaHocAction, capNhatKhoaHocAction, timKiemThongTinKhoaHocAction, huyGhiDanhAction, xacThucGhiDanhKhoaHocDuaVaoKhoaHocAction, layDanhSachKhoaHocPhanTrangAction } from '../../Redux/Actions/QuanLyKhoaHocAction';
import { settings } from './../../Commons/Settings'
import { NavLink } from 'react-router-dom';
import { layDanhSachHocVienChoXetDuyetDuaVaoKhoaHocAction, LayDanhSachHocVienDaXetDuyetDuaVaoKhoaHocAction } from '../../Redux/Actions/QuanLyNguoiDungAction';
import ReactPaginate from 'react-paginate';

class TabQuanLyKhoaHoc extends Component {

    constructor(props) {
        super(props);
        this.state = ({

            Search: {
                keySearch: '',
            },
            khoaHoc: {
                maKhoaHoc: "",
                biDanh: "",
                tenKhoaHoc: "",
                moTa: "",
                hinhAnh: "",
                luotXem: 0,
                danhGia: 0,
                maNhom: settings.groupID,
                ngayTao: "",
                maDanhMucKhoaHoc: "",
                taiKhoanNguoiTao: "",
            },
            page: {
                offset: 0,
                perPage: 8,
                currentPage: 0,
                pageCount: 0,
            },

            offset: 0,
            perPage: 8,
            currentPage: 0,
            pageCount: 0,
        })
    }
    //Phân trang

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
            this.props.layDanhSachKhoaHocPhanTrang(this.state.offset, this.state.perPage, this.set)
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

    callAPI = (maKhoaHoc) => {
        this.props.layDanhSachHocVienDaXetDuyetDuaVaoKhoaHoc(maKhoaHoc);
        this.props.layDanhSachHocVienChoXetDuyetDuaVaoKhoaHoc(maKhoaHoc);
        this.setState({
            khoaHoc: {
                maKhoaHoc: maKhoaHoc
            }
        });
    }
    renderListCourse = (listCourse) => {
        return listCourse.map((element, index) => {
            return (
                <tr key={index}>
                    <td >{index + 1}</td>
                    <td>{element.maKhoaHoc}</td>
                    <td>{element.tenKhoaHoc}</td>
                    <td>
                        <img src={element.hinhAnh} width={80} height={80} alt="error" />
                    </td>

                    <td>{element.nguoiTao.hoTen}</td>
                    <td>
                        <button onClick={() => this.callAPI(element.maKhoaHoc)} type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter">
                            Ghi danh
                        </button>
                        <NavLink to={`/CapNhatKhoaHoc/${encodeURIComponent(element.maKhoaHoc)}`} type="button" className="btn btn-warning"  >
                            Sửa
                        </NavLink>

                        <button className='btn btn-danger' onClick={() => this.props.xoaKhoaHoc(element.maKhoaHoc, this.state.offset, this.state.perPage, this.set)}>Xóa</button>

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
            if (!this.state.btnAdd)
                this.props.timKiemThongTinKhoaHoc(this.state.Search.keySearch)
            else {
                this.props.timKiemNguoiDung(this.state.Search.keySearch)
            }

        });
    }
    renderTableWait = () => {
        if (this.props.mangHocVienChoXetDuyetDuaVaoKhoaHoc.length > 0) {
            return this.props.mangHocVienChoXetDuyetDuaVaoKhoaHoc.map((ele, index) => {
                return (
                    <tr key={index}>
                        <td>{index}</td>
                        <td>{ele.taiKhoan}</td>
                        <td>{ele.hoTen}</td>
                        <td>
                            <button className='btn btn-success' onClick={() => this.props.xacThucGhiDanhKhoaHocDuaVaoKhoaHoc(this.state.khoaHoc.maKhoaHoc, ele.taiKhoan)}>Xác thực</button>
                            <button className='btn btn-danger' onClick={() => this.props.huyGhiDanh(this.state.khoaHoc.maKhoaHoc, ele.taiKhoan)}>Hủy</button>
                        </td>
                    </tr>
                )
            })
        }
        else {
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
        if (this.props.mangHocVienDaXetDuyetDuaVaoKhoaHoc.length > 0) {
            return this.props.mangHocVienDaXetDuyetDuaVaoKhoaHoc.map((ele, index) => {
                return (
                    <tr key={index}>
                        <td>{index}</td>
                        <td>{ele.taiKhoan}</td>
                        <td>{ele.hoTen}</td>
                        <td>
                            <button onClick={() => this.props.huyGhiDanh(this.state.khoaHoc.maKhoaHoc, ele.taiKhoan)} className='btn btn-danger'>Hủy</button>
                        </td>
                    </tr>
                )
            })
        }
        else {
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
            khoaHoc: { ...this.state.khoaHoc, [name]: value }
        }, () => {
            
            this.props.layDanhSachHocVienChoXetDuyetDuaVaoKhoaHoc(this.state.khoaHoc.maKhoaHoc)
            this.props.layDanhSachHocVienDaXetDuyetDuaVaoKhoaHoc(this.state.khoaHoc.maKhoaHoc)
        })

    }
    modalBody = () => {
        let sortMangKhoaHoc = this.props.mangKhoaHoc.sort((ele, eleNext) => {
            let eleTruoc = ele.tenKhoaHoc.toLowerCase();
            let eleSau = eleNext.tenKhoaHoc.toLowerCase();
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
                    <select className="form-control" name="taiKhoan" value={this.state.khoaHoc.maKhoaHoc} onChange={this.handleChangeTagSelect}>
                        {sortMangKhoaHoc.map((ele, index) => {
                            return (
                                <option className='form-control' value={ele.maKhoaHoc} key={index}>{index}-{ele.tenKhoaHoc}</option>
                            )
                        })}
                    </select>

                    <button className='btn btn-success'>Ghi Danh</button>
                </div>
                <hr />
                <div className="waitForConfirm">
                    <div className="top_waitForComfirm">
                        <h3>Học viên chờ xác thực</h3>
                        <input type="search" placeholder='Nhập tên hv hoặc sdt' />
                    </div>
                    <div className="body_waitForComfirm">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>STT</th>
                                    <th>Tài khoản</th>
                                    <th>Họ tên</th>
                                    <th>Thao tác</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.renderTableWait()}
                            </tbody>

                        </table>
                        {/* <div> {this.renderPageIndex()}</div> */}
                    </div>
                </div>
                <hr />
                <div className="confirmed my-3">

                    <div className="top_waitForComfirm">
                        <h3>Học viên đã xác thực</h3>
                        <input type="search" placeholder='Nhập tên hv hoặc sdt' />
                    </div>
                    <div className="body_waitForComfirm">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>STT</th>
                                    <th>Tài khoản</th>
                                    <th>Họ tên</th>
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
            <div className='TabQuanLyKhoaHoc'>
                <div className="TabQuanLyKhoaHoc_Container container">
                    <div className="row">
                        <div className="col-6">
                            <NavLink to={"/ThemKhoaHoc"} className='btn btn-success'><i className="fa fa-plus" aria-hidden="true"></i> Thêm khóa học</NavLink>

                        </div>
                        <div className='col-6 TabQuanLyNguoiDung_search py-5'>
                            <div className="form-inline">
                                <input className='form-control' value={this.state.Search.keySearch} name='keySearch' type="text" placeholder='Tìm theo tên khóa học' onChange={this.searchCourse} />
                                <input className='form-control btn btn-danger' type="submit" value='Tìm' />
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <table className="table text-center">
                            <thead>
                                <tr>
                                    <th>STT</th>
                                    <th>Mã khóa học</th>

                                    <th>Tên khóa học</th>

                                    <th>Hình ảnh</th>
                                    <th>Người tạo</th>
                                    <th>Thao tác</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.props.mangKhoaHocTimKiem.length > 0 ? this.renderListCourse(this.props.mangKhoaHocTimKiem) : this.renderListCourse(this.props.mangKhoaHocPhanTrang)}
                            </tbody>
                            <tfoot>
                                <tr>
                                    <th>STT</th>
                                    <th>Mã khóa học</th>

                                    <th>Tên khóa học</th>

                                    <th>Hình ảnh</th>
                                    <th>Người tạo</th>
                                    <th>Thao tác</th>
                                </tr>
                            </tfoot>
                        </table>
                    </div>

                    <div className="row">
                        {this.state.Search.keySearch === '' &&
                            this.renderPageIndex()}
                    </div>
                    {/* Button trigger modal
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
            </div>
        );
    }

    componentDidMount() {
        this.props.layDanhSachKhoaHoc()
        this.props.layDanhMucKhoaHoc()
        this.props.layDanhSachKhoaHocPhanTrang(this.state.page.offset, this.state.page.perPage, this.set)
    }

}
function mapStateToProps(state) {
    return {
        mangKhoaHoc: state.QuanLyKhoaHocReducer.mangKhoaHoc,
        mangKhoaHocPhanTrang: state.QuanLyKhoaHocReducer.mangKhoaHocPhanTrang,
        mangDanhMucKhoaHoc: state.QuanLyKhoaHocReducer.mangDanhMucKhoaHoc,
        mangKhoaHocTimKiem: state.QuanLyKhoaHocReducer.mangKhoaHocTimKiem,
        mangHocVienChoXetDuyetDuaVaoKhoaHoc: state.QuanLyNguoiDungReducer.mangHocVienChoXetDuyetDuaVaoKhoaHoc,
        mangHocVienDaXetDuyetDuaVaoKhoaHoc: state.QuanLyNguoiDungReducer.mangHocVienDaXetDuyetDuaVaoKhoaHoc,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        layDanhSachKhoaHoc: () => {
            dispatch(layDanhSachKhoaHocAction())
        },
        layDanhSachKhoaHocPhanTrang: (offset, perPage, set) => {
            dispatch(layDanhSachKhoaHocPhanTrangAction(offset, perPage, set))
        },
        layDanhMucKhoaHoc: () => {
            dispatch(layDanhMucKhoaHocAction())
        },
        themKhoaHoc: (khoaHoc, clearField) => {
            dispatch(themKhoaHocAction(khoaHoc, clearField))
        },
        xoaKhoaHoc: (maKhoaHoc,offset, perPage, set) => {
            dispatch(xoaKhoaHocAction(maKhoaHoc,offset, perPage, set))
        },
        capNhatKhoaHoc: (khoaHoc) => {
            dispatch(capNhatKhoaHocAction(khoaHoc))
        },
        timKiemThongTinKhoaHoc: (tenKhoaHoc) => {
            dispatch(timKiemThongTinKhoaHocAction(tenKhoaHoc))
        },
        huyGhiDanh: (maKhoaHoc, taiKhoan) => {
            dispatch(huyGhiDanhAction(maKhoaHoc, taiKhoan))
        },
        xacThucGhiDanhKhoaHocDuaVaoKhoaHoc: (maKhoaHoc, taiKhoan) => {
            dispatch(xacThucGhiDanhKhoaHocDuaVaoKhoaHocAction(maKhoaHoc, taiKhoan))
        },
        layDanhSachHocVienChoXetDuyetDuaVaoKhoaHoc: (maKhoaHoc) => {
            dispatch(layDanhSachHocVienChoXetDuyetDuaVaoKhoaHocAction(maKhoaHoc))
        },
        layDanhSachHocVienDaXetDuyetDuaVaoKhoaHoc: (maKhoaHoc) => {
            dispatch(LayDanhSachHocVienDaXetDuyetDuaVaoKhoaHocAction(maKhoaHoc))
        }
    };
}
export default connect(
    mapStateToProps, mapDispatchToProps
)(TabQuanLyKhoaHoc);