import React, { Component } from 'react';
import { connect } from 'react-redux';
import { layDanhMucKhoaHocAction, themKhoaHocAction } from '../../Redux/Actions/QuanLyKhoaHocAction';
import { settings } from './../../Commons/Settings'
import { layDanhSachNguoiTaoAction } from '../../Redux/Actions/QuanLyNguoiDungAction';
import isEqual from 'lodash/isEqual'
import { NavLink } from 'react-router-dom';

class ThemKhoaHoc extends Component {

    constructor(props) {
        super(props);
        this.state = ({
            khoaHoc: {
                maKhoaHoc: "",
                biDanh: "",
                tenKhoaHoc: "",
                moTa: '',
                hinhAnh: "",
                luotXem: 0,
                danhGia: 0,
                maNhom: settings.groupID,
                maDanhMucKhoaHoc: this.props.mangDanhMucKhoaHoc.length > 0 ? this.props.mangDanhMucKhoaHoc[0].maDanhMuc : '',
                taiKhoanNguoiTao: this.props.mangNguoiDungGV.length > 0 ? this.props.mangNguoiDungGV[0].taiKhoan : '',
            },
            file: '',
        })

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
        })
    }
    clearField = () => {
        this.setState({
            khoaHoc: {
                ...this.state.khoaHoc,
                maKhoaHoc: "",
                biDanh: "",
                tenKhoaHoc: "",
                moTa: "",
                hinhAnh: '',
                luotXem: 0,
                danhGia: 0,

                maNhom: settings.groupID,
                ngayTao: "",
            },

            file: ''

        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        //Gọi action ajax đưa dữ liệu về server 
    }

    onChangeCKEditor = (event, editor) => {
        const data = editor.getData();

        this.setState({
            khoaHoc: {
                moTa: data
            }
        });
        console.log(data)

    };
    render() {
        console.log("render")
        return (
            <div className='container py-5'>

                <form onSubmit={this.handleSubmit}>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <h3>Tên khoá học</h3>
                                <input className="form-control" name="tenKhoaHoc" value={this.state.khoaHoc.tenKhoaHoc} onChange={this.handleChange} required />
                            </div>
                            <div className="form-group">
                                <h3>Hình ảnh</h3>
                                <input type='file' accept="image/png, image/jpg, image/jpeg" id='hinhAnh' name='hinhAnh' className="form-control" onChange={this.handleChange} required />
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
                                <input className="form-control" name="maKhoaHoc" value={this.state.khoaHoc.maKhoaHoc} onChange={this.handleChange} required />
                            </div>
                            <div className="form-group">
                                <h3>Bí danh</h3>
                                <input className="form-control" name="biDanh" value={this.state.khoaHoc.biDanh} onChange={this.handleChange} />
                            </div>
                            <div className="form-group">
                                <h3>Người tạo</h3>
                                <select className="form-control" name="taiKhoanNguoiTao" value={this.state.khoaHoc.taiKhoanNguoiTao} onChange={this.handleChange}>
                                    {this.props.mangNguoiDungGV.map((ele, index) => {
                                        return (
                                            <option className='form-control' value={ele.taiKhoan} key={index}>{index}-{ele.hoTen}</option>
                                        )
                                    })}
                                </select>
                            </div>
                            <div className="form-group">
                                <h3>Lượt xem</h3>
                                <input className="form-control" name="luotXem" value={this.state.khoaHoc.luotXem} onChange={this.handleChange} />
                            </div>

                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <NavLink className='btn btn-primary' to={'/TabQuanLyKhoaHoc'}>Trở về</NavLink>
                        </div>
                        <div className="col-6">
                            <div className="form-group">
                                <button type="submit" className="btn btn-success" onClick={() => this.props.themKhoaHoc(this.state.khoaHoc, this.clearField, this.state.file)}>Thêm khoá học</button>
                            </div>
                        </div>
                    </div>

                </form>



            </div>
        );
    }
    componentDidMount() {
        this.props.layDanhMucKhoaHoc();
        this.props.layDanhSachNguoiTao();

    }
    componentDidUpdate(prevProps, prevState) {


        if (!isEqual(prevProps.mangDanhMucKhoaHoc, this.props.mangDanhMucKhoaHoc)) {
            this.setState({
                khoaHoc: {
                    ...prevState.khoaHoc,
                    maDanhMucKhoaHoc: this.props.mangDanhMucKhoaHoc[0].maDanhMuc,

                }
            })
        }
        if (!isEqual(prevProps.mangNguoiDungGV, this.props.mangNguoiDungGV)) {
            this.setState({
                khoaHoc: {
                    ...prevState.khoaHoc,
                    taiKhoanNguoiTao: this.props.mangNguoiDungGV[0].taiKhoan,

                }
            })
        }
    }
}
function mapStateToProps(state) {
    return {
        mangDanhMucKhoaHoc: state.QuanLyKhoaHocReducer.mangDanhMucKhoaHoc,
        mangNguoiDungGV: state.QuanLyNguoiDungReducer.mangNguoiDungGV,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        layDanhMucKhoaHoc: () => {
            dispatch(layDanhMucKhoaHocAction())
        },
        themKhoaHoc: (khoaHoc, clearField, file) => {
            dispatch(themKhoaHocAction(khoaHoc, clearField, file))
        },
        layDanhSachNguoiTao: () => {
            dispatch(layDanhSachNguoiTaoAction())
        },

    };

}
export default connect(
    mapStateToProps, mapDispatchToProps
)(ThemKhoaHoc);