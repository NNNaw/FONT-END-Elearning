import React, { Component } from 'react';
import { connect } from 'react-redux';
import './startbootstrap-simple-sidebar-gh-pages/css/simple-sidebar.css'
import { LayDanhSachHocVienDaXetDuyetDuaVaoKhoaHocAction, layDanhSachHocVienChoXetDuyetDuaVaoKhoaHocAction } from '../../Redux/Actions/QuanLyNguoiDungAction';
import { layDanhSachKhoaHocAction } from '../../Redux/Actions/QuanLyKhoaHocAction';
// import { LayDanhSachHocVienDaXetDuyetDuaVaoKhoaHocAction, layDanhSachHocVienChoXetDuyetDuaVaoKhoaHocAction } from '../../Redux/Actions/QuanLyKhoaHocAction';



class Admin extends Component {

    constructor(props) {
        super(props);
        this.state = ({
            user: {
                taiKhoan: JSON.parse(localStorage.getItem('userLogin')).taiKhoan
            },
            khoaHoc: {
                maKhoaHoc: 'C#1',
            },
            hocVienChoGhiDanh: [],

        })
    }

    renderTableWait = () => {
        return this.props.mangKhoaHocChoXetDuyet.map((ele, index) => {
            return (
                <tr key={index}>
                    <td>{index}</td>
                    <td>{ele.tenKhoaHoc}</td>
                    <td>
                        <button>Xác thực</button>
                        <button>Hủy</button>
                    </td>
                </tr>
            )
        })
    }
    renderTableConfirmed = () => {
        return this.props.mangKhoaHocChoXetDuyet.map((ele, index) => {
            return (
                <tr key={index}>
                    <td>{index}</td>
                    <td>{ele.tenKhoaHoc}</td>
                    <td>
                        <button>Xác thực</button>
                        <button>Hủy</button>
                    </td>
                </tr>
            )
        })
    }


    renderTabCourse = () => {
        return (
            <div className="tabCourse ">
                <div className="form-inline ">
                    <input type="search" className='form-control' placeholder='Nhâp từ khóa' />
                    <input type="button" className='form-control bg-danger' defaultValue='Tìm' />
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
                                    <th>Tên khóa học</th>
                                    <th>Thao tác</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* {this.renderTableWait()} */}
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
                                    <th>Tên khóa học</th>
                                    <th>Thao tác</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* {this.renderTableConfirmed()} */}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        )
    }

    layTatCaHocVienChoGhiDanh = () => {
    
    }

    render() {
      //  this.layTatCaHocVienChoGhiDanh()
        return (
            <div className='Admin'>
                <div className="Admin_container container-fluid">
                    <ul className="nav nav-tabs" id="myTab" role="tablist">
                        <li className="nav-item">
                            <a className="nav-link active text-danger h-100" id="home-tab" data-toggle="tab"
                                href="#home" role="tab" aria-controls="ghiDanhQuaKhoaHoc" aria-selected="true">Ghi danh qua khóa học</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link text-danger h-100" id="profile-tab" data-toggle="tab"
                                href="#profile" role="tab" aria-controls="ghiDanhQuaTaiKhoan" aria-selected="false">Ghi danh qua tài khoản</a>
                        </li>

                    </ul>
                    <div className="tab-content p-4" id="myTabContent">
                        <div className="tab-pane fade show active" id="ghiDanhQuaKhoaHoc" role="tabpanel" aria-labelledby="home-tab">
                            {/* {this.renderTabCourse()} */}
                        </div>
                        <div className="tab-pane fade" id="ghiDanhQuaTaiKhoan" role="tabpanel" aria-labelledby="profile-tab">
                            {/* {this.renderTabCourse()} */}

                        </div>
                    </div>
                </div>
            </div>
        );
    }

    componentDidMount() {
        // this.props.LayDanhSachKhoaHocChoXetDuyetDuaVaoNguoiDung(this.state.user.taiKhoan)
        // this.props.LayDanhSachKhoaHocChoXetDuyetDuaVaoNguoiDung(this.state.user.taiKhoan)

     //   this.props.LayDanhSachHocVienDaXetDuyetDuaVaoKhoaHoc(this.state.khoaHoc.maKhoaHoc)
       // this.props.layDanhSachHocVienChoXetDuyetDuaVaoKhoaHoc(this.state.khoaHoc.maKhoaHoc)

        //khóa học 
        this.props.layDanhSachKhoaHoc()
    }
}





function mapStateToProps(state) {
    return {
        mangHocVienChoXetDuyetDuaVaoKhoaHoc: state.QuanLyNguoiDungReducer.mangHocVienChoXetDuyetDuaVaoKhoaHoc,
        mangHocVienDaXetDuyetDuaVaoKhoaHoc: state.QuanLyNguoiDungReducer.mangHocVienDaXetDuyetDuaVaoKhoaHoc,
        mangKhoaHoc: state.QuanLyKhoaHocReducer.mangKhoaHoc,


    };
}

function mapDispatchToProps(dispatch) {
    return {
        // LayDanhSachKhoaHocDaXetDuyetDuaVaoNguoiDung: (taiKhoan) => {
        //     dispatch(LayDanhSachKhoaHocDaXetDuyetDuaVaoNguoiDungAction(taiKhoan))
        // },
        // LayDanhSachKhoaHocChoXetDuyetDuaVaoNguoiDung: (taiKhoan) => {
        //     dispatch(LayDanhSachKhoaHocChoXetDuyetDuaVaoNguoiDungAction(taiKhoan))
        // },

        //Khóa học
        layDanhSachKhoaHoc: () => {
            dispatch(layDanhSachKhoaHocAction())
        },


        //Người dùng
        layDanhSachHocVienChoXetDuyetDuaVaoKhoaHoc: (maKhoaHoc) => {
            dispatch(layDanhSachHocVienChoXetDuyetDuaVaoKhoaHocAction(maKhoaHoc))
        },
        LayDanhSachHocVienDaXetDuyetDuaVaoKhoaHoc: (maKhoaHoc) => {
            dispatch(LayDanhSachHocVienDaXetDuyetDuaVaoKhoaHocAction(maKhoaHoc))
        },
    };
}
export default connect(
    mapStateToProps, mapDispatchToProps
)(Admin);