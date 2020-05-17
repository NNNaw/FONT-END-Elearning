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
            file: '',
        }
    }


    handleSubmit = (e) => {
        e.preventDefault();
        //Gọi action ajax đưa dữ liệu về server 
    }


    handleChange = (e) => {
        let { value, name } = e.target;


        if (name === 'hinhAnh') {
            value = value.split(/(\\|\/)/g).pop()
            let file = e.target.files[0]
            this.setState({
                file: file,

            }, () => {
                console.log(file)
            });
        }

        this.setState({
            khoaHoc: { ...this.state.khoaHoc, [name]: value }
        }, () => {
            console.log(this.state.khoaHoc)
        });

    }
    render() {
        return (
            <div className='container py-5'>
                <h2 className='text-center'>Cập Nhật Khóa Học</h2>
                <form onSubmit={this.handleSubmit}>
                    <div className="row">
                        <div className="col-md-6">

                            <div className="form-group">
                                <h3>Tên khoá học</h3>
                                <input className="form-control" name="tenKhoaHoc" value={this.state.khoaHoc.tenKhoaHoc} onChange={this.handleChange} />
                            </div>


                            <div className="form-group">
                                <h3>Hình ảnh</h3>
                                <input type='file' accept="image/png, image/jpg, image/jpeg" id='hinhAnh' name='hinhAnh' className="form-control" onChange={this.handleChange} />
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
                                <h3>Mô tả</h3>
                                <textarea className='form-control' name="moTa" id="moTa" rows="5" value={this.state.khoaHoc.mota} onChange={this.handleChange}></textarea>

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
                    <div className="row">
                        <div className="col-6">
                            <div className="form-group">
                                <NavLink to={'/TabQuanLyKhoaHoc'} className='btn btn-primary' > &#60;= Trở về</NavLink>

                            </div>
                        </div>
                        <div className="col-6">
                            <div className="form-group">
                                <button type="submit" className="btn btn-success" onClick={() => this.props.capNhatKhoaHoc(this.state.khoaHoc, this.state.file)}>Cập nhật khoá học</button>
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
                    //hinhAnh:'',   
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
        capNhatKhoaHoc: (khoaHoc, file) => {
            dispatch(capNhatKhoaHocAction(khoaHoc, file))
        },

        layThongTinTaiKhoan: (taiKhoan) => {
            dispatch(layThongtinTaiKhoanAction(taiKhoan))
        },

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CapNhatKhoaHoc)



