import React, { Component } from 'react'
import { connect } from 'react-redux'
import { layThongTinKhoaHocAction, layDanhMucKhoaHocAction, capNhatKhoaHocAction } from '../../Redux/Actions/QuanLyKhoaHocAction';
import { layThongtinTaiKhoanAction } from '../../Redux/Actions/QuanLyNguoiDungAction';
import { settings } from '../../Commons/Settings';
import { NavLink } from 'react-router-dom';

class CapNhatKhoaHoc extends Component {
    constructor(props) {
        super(props);
        this.state = {
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
        }
    }


    handleSubmit = (e) => {
        e.preventDefault();
        //Gọi action ajax đưa dữ liệu về server 
    }


    handleChange = (e) => {
        let { value, name } = e.target;

        this.setState({
            khoaHoc: { ...this.state.khoaHoc, [name]: value }
        }, () => {
            console.log(this.state.khoaHoc)
        });

    }
    render() {
        return (
            <div className='container py-5'>
                <NavLink to={'/Admin'} className='btn btn-warning'>  Admin </NavLink>
                <form onSubmit={this.handleSubmit}>
                    <div className="row">
                        <div className="col-md-6">

                            <div className="form-group">
                                <h3>Tên khoá học</h3>
                                <input className="form-control" name="tenKhoaHoc" value={this.state.khoaHoc.tenKhoaHoc} onChange={this.handleChange} />
                            </div>

                            <div className="form-group">
                                <h3>Mô tả</h3>
                                <input className="form-control" name="moTa" value={this.state.khoaHoc.moTa} onChange={this.handleChange} />
                            </div>
                            <div className="form-group">
                                <h3>Hình ảnh</h3>
                                <input className="form-control" name="hinhAnh" value={this.state.khoaHoc.hinhAnh} onChange={this.handleChange} />
                            </div>
                            <div className="form-group">
                                <h3>Danh mục khoá học</h3>
                                <select className="form-control" name="maDanhMucKhoaHoc" value={this.state.khoaHoc.maDanhMucKhoaHoc} onChange={this.handleChange}>
                                    {this.props.mangDanhMucKhoaHoc.map((ele, index) => {
                                        return (
                                            <option className='form-control' value={ele.maDanhMuc} key={index}>{index}-{ele.tenDanhMuc}</option>
                                        )
                                    })}
                                </select>
                            </div>
                            <div className="form-group">
                                <button type="submit" className="btn btn-success" onClick={() => this.props.capNhatKhoaHoc(this.state.khoaHoc)}>Cập nhật khoá học</button>
                            </div>
                        </div>
                        <div className="col-md-6">


                            <div className="form-group">
                                <h3>Mã khoá học</h3>
                                <input disabled className="form-control" name="maKhoaHoc" value={this.state.khoaHoc.maKhoaHoc} onChange={this.handleChange} />
                            </div>
                            <div className="form-group">
                                <h3>Bí danh</h3>
                                <input disabled className="form-control" name="biDanh" value={this.state.khoaHoc.biDanh} onChange={this.handleChange} />
                            </div>
                            <div className="form-group">
                                <h3>Người tạo</h3>
                                <input disabled className="form-control" name="hinhAnh" value={this.state.khoaHoc.taiKhoanNguoiTao} />
                            </div>
                            <div className="form-group">
                                <h3>Ngày tạo</h3>
                                <input disabled className="form-control" name="hinhAnh" value={this.state.khoaHoc.ngayTao} />
                            </div>
                            <div className="form-group">
                                <h3>Lượt xem</h3>
                                <input disabled className="form-control" name="hinhAnh" value={this.state.khoaHoc.luotXem} />
                            </div>

                        </div>

                    </div>

                </form>
            </div>
        )
    }




    componentDidMount() {
        let { maKhoaHoc } = this.props.match.params;

        this.props.layThongTinKhoaHoc(maKhoaHoc);
        this.props.layDanhMucKhoaHoc();
    }


    componentDidUpdate(prevProps, prevState) {
        let { thongTinKhoaHoc } = this.props;
        if (this.props.thongTinKhoaHoc !== prevProps.thongTinKhoaHoc) {
            //let maKhoaHocEncoding = encodeURIComponent(thongTinKhoaHoc.maKhoaHoc)
            this.setState({
                khoaHoc: {
                    maKhoaHoc: thongTinKhoaHoc.maKhoaHoc,
                    biDanh: thongTinKhoaHoc.biDanh,
                    tenKhoaHoc: thongTinKhoaHoc.tenKhoaHoc,
                    moTa: thongTinKhoaHoc.moTa,
                    hinhAnh: thongTinKhoaHoc.hinhAnh,
                    luotXem: 0,
                    danhGia: 0,
                    maNhom: settings.groupID,
                    ngayTao: thongTinKhoaHoc.ngayTao,
                    maDanhMucKhoaHoc: thongTinKhoaHoc.danhMucKhoaHoc.maDanhMucKhoahoc,
                    taiKhoanNguoiTao: thongTinKhoaHoc.nguoiTao.taiKhoan,

                }

            });
        }
    }

}



const mapStateToProps = (state) => {
    return {
        thongTinKhoaHoc: state.QuanLyKhoaHocReducer.thongTinKhoaHoc,
        mangDanhMucKhoaHoc: state.QuanLyKhoaHocReducer.mangDanhMucKhoaHoc,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        layThongTinKhoaHoc: (maKhoaHoc) => {
            dispatch(layThongTinKhoaHocAction(maKhoaHoc))
        },
        layDanhMucKhoaHoc: () => {
            dispatch(layDanhMucKhoaHocAction())
        },
        capNhatKhoaHoc: (khoaHoc) => {
            dispatch(capNhatKhoaHocAction(khoaHoc))
        },

        layThongTinTaiKhoan: (taiKhoan) => {
            dispatch(layThongtinTaiKhoanAction(taiKhoan))
        },

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CapNhatKhoaHoc)



