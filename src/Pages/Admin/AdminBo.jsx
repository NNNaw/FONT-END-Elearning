import React, { Component } from 'react'
import './startbootstrap-simple-sidebar-gh-pages/css/simple-sidebar.css'
import { connect } from 'react-redux';
import { layDanhSachKhoaHocAction, layDanhMucKhoaHocAction, themKhoaHocAction, xoaKhoaHocAction, capNhatKhoaHocAction, timKiemThongTinKhoaHocAction } from '../../Redux/Actions/QuanLyKhoaHocAction';
import { layDanhSachNguoiDungAction, layDanhSachLoaiNguoiDungAction, themNguoiDungAction, xoaNguoiDungAction, timKiemNguoiDungAction } from '../../Redux/Actions/QuanLyNguoiDungAction';
import { settings } from '../../Commons/Settings';
import isEqual from 'lodash/isEqual'
import './Admin.css'
import { NavLink } from 'react-router-dom';


class Admin extends Component {


    constructor(props) {
        super(props);
        this.state = ({
            btnAdd: false,
            btnUpdate: {
                bool: false,
                index: null,
            },
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

            user: {
                taiKhoan: this.props.match.params.taiKhoan,
                matKhau: "",
                hoTen: "",
                soDT: "",
                maLoaiNguoiDung: "",
                maNhom: settings.groupID,
                email: ""
            }

        })
    }
    changeSideBar = (bool) => {
        this.setState({
            btnAdd: bool
        });

    }
    renderListCourse = (listCourse) => {
        return listCourse.map((element, index) => {
            return (
                <tr key={index}>
                    <td >{index}</td>
                    <td><input className={`input_${index}`} type="text" defaultValue={element.maKhoaHoc} disabled /></td>
                    <td><input className={`input_${index}`} type="text" defaultValue={element.tenKhoaHoc} disabled /></td>
                    <td>
                        {this.state.btnUpdate.bool && this.state.btnUpdate.index === index ?
                            <input className={`input_${index}`} type="text" defaultValue={element.hinhAnh} disabled /> :
                            <img src={element.hinhAnh} width={80} height={80} alt="Error" />

                        }
                    </td>

                    <td><input className={`input_${index}`} type="text" defaultValue={element.nguoiTao.hoTen} disabled /></td>
                    <td>
                        {/* {this.state.btnUpdate.bool && this.state.btnUpdate.index === index ?
                            // <button className='btn btn-warning m-3' onClick={() => this.changeButton(true, index, element)}>Cập nhật</button> :
                            // <button className='btn btn-warning m-3' onClick={() => this.changeButton(false, index, element)}>Sửa</button>
                        
                        } */}
                        <NavLink to={`/CapNhatKhoaHoc/${encodeURIComponent(element.maKhoaHoc)}`} type="button" className="btn btn-warning"  >
                            Sửa
                        </NavLink>

                        <button className='btn btn-danger' onClick={() => this.props.xoaKhoaHoc(element.maKhoaHoc)}>Xóa</button>
                        <button className='btn btn-primary'>Ghi danh</button>
                    </td>
                </tr>
            )
        })

    }



    //chưa sử dụng
    handleUpdate = (ele) => {
        // console.log(ele.danhMucKhoaHoc.)
        // this.GetFormattedInfo();
        // this.setState({
        //     btnUpdate: {
        //         bool: true,
        //     },
        //     khoaHoc: {
        //         maKhoaHoc: ele.maKhoaHoc,
        //         biDanh: ele.biDanh,
        //         tenKhoaHoc: ele.tenKhoaHoc,
        //         moTa: ele.moTa,
        //         hinhAnh: ele.hinhAnh,
        //         luotXem: 0,
        //         danhGia: 0,
        //         maNhom: settings.groupID,
        //         maDanhMucKhoaHoc: ele.danhMucKhoaHoc.maDanhMucKhoahoc,
        //     },
        // })
        //this.GetFormattedInfo();
    }
    changeButton = (bool, index, element) => {

        this.setState({
            btnUpdate: {
                bool: !this.state.btnUpdate.bool,
                index: index,
            },
            // khoaHoc: {
            //     maKhoaHoc: element.maKhoaHoc,
            //     biDanh: element.biDanh,
            //     tenKhoaHoc: element.tenKhoaHoc,
            //     moTa: element.moTa,
            //     hinhAnh: element.hinhAnh,

            // luotXem: 0,
            // danhGia: 0,
            // maNhom: settings.groupID,
            // ngayTao: "",
            // maDanhMucKhoaHoc: "",
            // taiKhoanNguoiTao: "",

            // },
        }, () => {
            let seclectRow = document.getElementsByClassName(`input_${index}`);
            for (let i = 0; i < seclectRow.length - 1; i++) {
                seclectRow[i].disabled = bool;
            }
        })
    }
    ///end




    renderListPersonal = (listPersonal) => {
        return listPersonal.map((element, index) => {
            return (
                <tr key={index}>
                    <td>{index}</td>
                    {/* <td><input type="text" defaultValue={element.taiKhoan} disabled /></td>
                    <td><input type="text" defaultValue={element.email} disabled /></td> */}
                    <td>{element.taiKhoan}</td>
                    <td>{element.email}</td>
                    <td><input type="text" defaultValue={element.soDt} disabled /></td>

                    <td>{element.maLoaiNguoiDung === 'GV' ? <span>Giảng viên</span> : <span>Học viên</span>}</td>
                    <td>
                        <button className='btn btn-primary'>Ghi danh</button>
                        <NavLink to={`/CapNhatNguoiDung/${element.taiKhoan}`} className='btn btn-warning' >Sửa</NavLink>
                        <button className='btn btn-danger' onClick={() => this.props.xoaNguoiDung(element.taiKhoan)}>Xóa</button>
                    </td>
                </tr>
            )
        })

    }

    decidedTable = () => {
        if (this.state.btnAdd) {
            return (
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
                        
                        {this.props.mangTimKiemNguoiDung.length > 0 ? this.renderListPersonal(this.props.mangTimKiemNguoiDung) : this.renderListPersonal(this.props.mangNguoiDung)}
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
            )
        }
        else {
            return (
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
                        {this.props.mangKhoaHocTimKiem.length > 0 ? this.renderListCourse(this.props.mangKhoaHocTimKiem) : this.renderListCourse(this.props.mangKhoaHoc)}

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
            )

        }
    }

    GetFormattedInfo() {
        var today = new Date();
        var dd = today.getDate();

        var mm = today.getMonth() + 1;
        var yyyy = today.getFullYear();
        if (dd < 10) {
            dd = '0' + dd;
        }

        if (mm < 10) {
            mm = '0' + mm;
        }
        let ngayTao = dd + "/" + mm + "/" + yyyy;

        this.setState({
            khoaHoc: {
                ngayTao: ngayTao,
                taiKhoanNguoiTao: this.props.user.taiKhoan,
                maDanhMucKhoaHoc: this.props.mangDanhMucKhoaHoc[0].maDanhMuc,
                maNhom: settings.groupID,
                luotXem: 0,
                danhGia: 0,
            },
            user: {
                maLoaiNguoiDung: this.props.mangLoaiNguoiDung[0].maLoaiNguoiDung,
                maNhom: settings.groupID,
            }
        });

    }


    handleChange = (e) => {
        let { value, name } = e.target;

        if (!this.state.btnAdd) {
            this.setState({
                khoaHoc: { ...this.state.khoaHoc, [name]: value }
            }, () => {
                console.log(this.state.khoaHoc)
            });
        } else {
            this.setState({
                user: { ...this.state.user, [name]: value }
            }, () => {
                console.log(this.state.user)
            });
        }
    }

    renderSelect = (list) => {

        if (!this.state.btnAdd)
            return list.map((ele, index) => {
                return (
                    <option className='form-control' value={ele.maDanhMuc} key={index}>{index}-{ele.tenDanhMuc}</option>
                )
            })
        else {
            return list.map((ele, index) => {
                return (
                    <option className='form-control' value={ele.maLoaiNguoiDung} key={index}>{index}-{ele.tenLoaiNguoiDung}</option>
                )
            })
        }

    }
    clearField = () => {
        this.setState({
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
    decidedModalBody = () => {

        if (!this.state.btnAdd)
            return (
                <div>
                    <div className="modal-body">
                        <div className="form-group row">
                            <label className="col-sm-4 col-form-label">Mã khóa học: </label>
                            <div className="col-sm-8">
                                <input type="text" className="form-control" id='maKhoaHoc' name='maKhoaHoc' value={this.state.khoaHoc.maKhoaHoc} onChange={this.handleChange} />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-sm-4 col-form-label">Bí danh: </label>
                            <div className="col-sm-8">
                                <input type="text" className="form-control" id='biDanh' name='biDanh' value={this.state.khoaHoc.biDanh} onChange={this.handleChange} />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-sm-4 col-form-label">Tên khóa học: </label>
                            <div className="col-sm-8">
                                <input type="text" className="form-control" id='tenKhoaHoc' name='tenKhoaHoc' value={this.state.khoaHoc.tenKhoaHoc} onChange={this.handleChange} />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-sm-4 col-form-label">Mô tả: </label>
                            <div className="col-sm-8">
                                <input type="text" className="form-control" id='moTa' name='moTa' value={this.state.khoaHoc.moTa} onChange={this.handleChange} />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-sm-4 col-form-label">Hình ảnh: </label>
                            <div className="col-sm-8">
                                <input type="file" placeholder='Chọn file (*.jpg , *.png)' className="form-control" id='hinhAnh' name='hinhAnh' value={this.state.khoaHoc.hinhAnh} onChange={this.handleChange} />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-sm-4 col-form-label">Loại danh mục: </label>
                            <div className="col-sm-8">
                                <select name="maDanhMucKhoaHoc" id="maDanhMucKhoaHoc" onChange={this.handleChange}>
                                    {this.renderSelect(this.props.mangDanhMucKhoaHoc)}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={() => this.setState({ btnUpdate: { bool: false } })}>Đóng</button>
                        {/* <button type="button" className="btn btn-primary" onClick={() => this.props.capNhatKhoaHoc(this.state.khoaHoc)}>Cập nhật</button> */}
                        <button type="submit" className="btn btn-primary" onClick={() => this.props.themKhoaHoc(this.state.khoaHoc, this.clearField)}>Thêm</button>


                    </div>
                </div>
            )
        else return (
            <div>
                <div className="modal-body">
                    <div className="form-group row">
                        <label className="col-sm-4 col-form-label">Tài khoản: </label>
                        <div className="col-sm-8">
                            <input type="text" className="form-control" id='taiKhoan' name='taiKhoan' value={this.state.user.taiKhoan} onChange={this.handleChange} />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-4 col-form-label">Mật khẩu: </label>
                        <div className="col-sm-8">
                            <input type="text" className="form-control" id='matKhau' name='matKhau' value={this.state.user.matKhau} onChange={this.handleChange} />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-4 col-form-label">Họ tên: </label>
                        <div className="col-sm-8">
                            <input type="text" className="form-control" id='hoTen' name='hoTen' value={this.state.user.hoTen} onChange={this.handleChange} />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-4 col-form-label">Số điện thoại: </label>
                        <div className="col-sm-8">
                            <input type="text" className="form-control" id='soDT' name='soDT' value={this.state.user.soDT} onChange={this.handleChange} />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-4 col-form-label">Email: </label>
                        <div className="col-sm-8">
                            <input type="text" className="form-control" id='email' name='email' value={this.state.user.email} onChange={this.handleChange} />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-4 col-form-label">Loại người dùng: </label>
                        <div className="col-sm-8">
                            <select name="maLoaiNguoiDung" id="maLoaiNguoiDung" onChange={this.handleChange}>
                                {this.renderSelect(this.props.mangLoaiNguoiDung)}
                            </select>
                        </div>
                    </div>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={() => this.setState({ btnUpdate: { bool: true } })}>Đóng</button>
                    {/* <button type="button" className="btn btn-primary" onClick={() => this.props.capNhatKhoaHoc(this.state.user)}>Cập nhật</button> */}
                    <button type="button" className="btn btn-primary" onClick={() => this.props.themNguoiDung(this.state.user, this.clearField)}>Thêm</button>

                </div>
            </div>
        )
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
    render() {
        return (
            <div></div>
            // <div className='admin_page'>
            //     <div className="admin_container container-fluid">

            //         <div className="d-flex" id="wrapper">
            //             {/* Sidebar */}
            //             <div className="bg-light border-right" id="sidebar-wrapper">
            //                 <div className="sidebar-heading">
            //                 <NavLink to={`/Admin/${this.state.user.taiKhoan}`} class='text-danger'>ADMIN</NavLink> 
            //               </div>
            //                 <div className="list-group list-group-flush">
            //                     <button className="list-group-item list-group-item-action bg-light" onClick={() => this.changeSideBar(false)}>Quản lý khóa học</button>
            //                     <button className="list-group-item list-group-item-action bg-light" onClick={() => this.changeSideBar(true)}>Quản lý người dùng</button>

            //                 </div>
            //             </div>
            //             {/* /#sidebar-wrapper */}
            //             {/* Page Content */}
            //             <div id="page-content-wrapper">
            //                 <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
            //                     <button className="btn btn-primary" id="menu-toggle" ><i className="fas fa-arrow-left"></i> Menu <i className="fas fa-arrow-right"></i></button>
            //                     <button
            //                         className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
            //                         aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            //                         <span className="navbar-toggler-icon"></span>
            //                     </button>
            //                     <div className="collapse navbar-collapse" id="navbarSupportedContent">
            //                         <ul className="navbar-nav ml-auto mt-2 mt-lg-0 ">

            //                             <li className="nav-item active">
            //                                 <p>Xin chào , {this.props.user.hoTen}</p>
            //                             </li>

            //                             <li className="nav-item dropdown">
            //                                 <p className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            //                                     <i className="fas fa-ellipsis-v"></i>
            //                                 </p>
            //                                 <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
            //                                     <NavLink to={"/TrangChu"} className="dropdown-item">Trang chủ</NavLink>
            //                                     <NavLink to={`/CapNhatNguoiDung/${this.state.user.taiKhoan}`} className="dropdown-item" >Cập nhật thông tin</NavLink>
            //                                     <NavLink to={'/dangnhap'} onClick={() => this.props.dangXuatNguoiDung()} className="dropdown-item" >Đăng xuất</NavLink>

            //                                 </div>
            //                             </li>
            //                         </ul>
            //                     </div>
            //                 </nav>

            //                 <div className="container-fluid py-5">
            //                     <div className="top_content">

            //                         <button className='btn btn-primary' id='btnAdd' data-toggle="modal" data-target="#exampleModalCenter" onClick={() => this.GetFormattedInfo()}> <i className="fa fa-plus" aria-hidden="true"></i> Thêm {this.state.btnAdd === false ? <span>khóa học</span> : <span>người dùng</span>} </button>
            //                         {/* Modal */}
            //                         <div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            //                             <div className="modal-dialog modal-dialog-centered" role="document">
            //                                 <div className="modal-content">
            //                                     <div className="modal-header">
            //                                         <h5 className="modal-title" id="exampleModalLongTitle" >Thêm  {this.state.btnAdd === false ? <span>khóa học</span> : <span>người dùng</span>}</h5>
            //                                         <button onClick={() => this.setState({ btnUpdate: { bool: false } })} type="button" className="close" data-dismiss="modal" aria-label="Close">
            //                                             <span aria-hidden="true">×</span>
            //                                         </button>
            //                                     </div>

            //                                     {this.decidedModalBody()}
            //                                 </div>
            //                             </div>
            //                         </div>
            //                         <div className='top_search py-5'>
            //                             <div className="form-inline d-flex">
            //                                 <input className='form-control' value={this.state.Search.keySearch} name='keySearch' type="text" placeholder='nhập tìm kiếm' onChange={this.searchCourse} />
            //                                 <input className='form-control btn btn-danger' type="submit" value='Tìm' />
            //                             </div>
            //                         </div>

            //                         <div className="bottom_content">

            //                             {this.decidedTable()}

            //                         </div>
            //                     </div>
            //                 </div>

            //             </div>

            //         </div>
            //     </div>

            // </div>
        )
    }



    componentDidMount() {
        this.props.layDanhSachKhoaHoc()
        this.props.layDanhSachNguoiDung()
        this.props.layDanhSachLoaiNguoiDung()
        this.props.layDanhMucKhoaHoc()
    }

    componentDidUpdate(prevProps, prevState) {

        //chưa sử dụng
        if (!isEqual(prevProps.mangDanhMucKhoaHoc, this.props.mangDanhMucKhoaHoc)) {
            this.setState({
                khoaHoc: {
                    maDanhMucKhoaHoc: this.props.mangDanhMucKhoaHoc[0].maDanhMuc,

                }
            })

        }
        //end

    }
}

function mapStateToProps(state) {
    return {
        //Khóa học
        mangKhoaHoc: state.QuanLyKhoaHocReducer.mangKhoaHoc,
        mangDanhMucKhoaHoc: state.QuanLyKhoaHocReducer.mangDanhMucKhoaHoc,
        mangKhoaHocTimKiem: state.QuanLyKhoaHocReducer.mangKhoaHocTimKiem,
        //Người dùng
        mangNguoiDung: state.QuanLyNguoiDungReducer.mangNguoiDung,
        user: state.QuanLyNguoiDungReducer.user,
        mangLoaiNguoiDung: state.QuanLyNguoiDungReducer.mangLoaiNguoiDung,
        mangTimKiemNguoiDung: state.QuanLyNguoiDungReducer.mangTimKiemNguoiDung,
    }
}

function mapDispatchToProps(dispatch) {
    return {

        //Khóa học
        layDanhSachKhoaHoc: () => {
            dispatch(layDanhSachKhoaHocAction())
        },
        layDanhMucKhoaHoc: () => {
            dispatch(layDanhMucKhoaHocAction())
        },
        themKhoaHoc: (khoaHoc, clearField) => {
            dispatch(themKhoaHocAction(khoaHoc, clearField))
        },
        xoaKhoaHoc: (maKhoaHoc) => {
            dispatch(xoaKhoaHocAction(maKhoaHoc))
        },
        capNhatKhoaHoc: (khoaHoc) => {
            dispatch(capNhatKhoaHocAction(khoaHoc))
        },
        timKiemThongTinKhoaHoc: (tenKhoaHoc) => {
            dispatch(timKiemThongTinKhoaHocAction(tenKhoaHoc))
        },

        //Người dùng
        layDanhSachLoaiNguoiDung: () => {
            dispatch(layDanhSachLoaiNguoiDungAction())
        },
        layDanhSachNguoiDung: () => {
            dispatch(layDanhSachNguoiDungAction())
        },
        themNguoiDung: (user, clearField) => {
            dispatch(themNguoiDungAction(user, clearField))
        },

        xoaNguoiDung: (taiKhoan) => {
            dispatch(xoaNguoiDungAction(taiKhoan))
        },
        dangXuatNguoiDung: () => {
            dispatch({
                type: "DANG_XUAT"
            });
        },
        timKiemNguoiDung: (key) => {
            dispatch(timKiemNguoiDungAction(key))
        }

    };
}
export default connect(
    mapStateToProps, mapDispatchToProps
)(Admin);