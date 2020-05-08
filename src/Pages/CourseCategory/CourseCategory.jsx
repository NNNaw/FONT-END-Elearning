import React, { Component } from 'react';
import { connect } from 'react-redux'
import swal from 'sweetalert';
import { layDanhSachKhoaHocTheoDanhMucAction, dangKyKhoaHocAction } from '../../Redux/Actions/QuanLyKhoaHocAction'
import {NavLink} from 'react-router-dom'
import { spaceNumber } from '../../Commons/handleCommons'
class CourseCategory extends Component {

    constructor(props) {
        super(props);
        this.state = {
            maDanhMuc: this.props.match.params.maDanhMuc,
            offset: 0,
            perPage: 8,
            currentPage: 0,
            pageCount: 0,
        }
    }
    componentDidMount() {
        //lấy giá trị tham số từ url this.props.match.params.tenThamSo
        let { maDanhMuc } = this.state;
        this.props.layDanhSachKhoaHocTheoDanhMuc(maDanhMuc);

    }
    componentDidUpdate(nextProps, prevState) {
        let { maDanhMuc } = this.props.match.params;


        if (maDanhMuc !== this.state.maDanhMuc) {
            this.props.layDanhSachKhoaHocTheoDanhMuc(maDanhMuc);
            this.setState({
                maDanhMuc: maDanhMuc
            });


        }
    }

    handleSignUpCourse = (maKhoaHoc) => {
        //xử lý đăng nhập hay chưa??
        if (this.props.user === null) {
            swal({
                icon: "warning",
                title: "Thông Báo",
                text: "Bạn cần đăng nhập trước khi đăng ký!!",
                dangerMode: true,
            });
            return
        }

        this.props.dangKyKhoaHoc(this.props.user.taiKhoan, maKhoaHoc);

    }

    renderCourseList = () => {

        return this.props.mangKhoaHocTheoDanhMuc.map((element, index) => {
            return (
                <div className="col-3 card-content" key={index}>
                    <div className="card card-detail">
                        <NavLink to={`/ThongTinKhoaHoc/${encodeURIComponent(element.maKhoaHoc)}`}>
                            <img className="card-img-top" src={element.hinhAnh} alt={element.tenKhoaHoc.toString()} />
                        </NavLink>

                        <div className="card-body">
                            <div className="card_header">
                                <NavLink to={`/ThongTinKhoaHoc/${encodeURIComponent(element.maKhoaHoc)}`} className="card-title">
                                    {element.tenKhoaHoc}</NavLink>
                            </div>

                            <div className='card_footer'>
                                <span><i className="fas fa-eye"></i> {spaceNumber(element.luotXem)}</span>
                                <button className='btn btn_main card_bnt_dangky' onClick={() => this.handleSignUpCourse(element.maKhoaHoc)}>Đăng ký</button>
                            </div>

                        </div>
                    </div>
                </div>

            )
        });
    }


    render() {
        return (
            <div className='courseList'>
                <div className="courseList_container container">
                    <div className="row courseList_card">
                        {this.renderCourseList()}
                    </div>

                </div>

            </div>
        );
    }
}

const mapStateToProp = state => {
    return {
        mangKhoaHocTheoDanhMuc: state.QuanLyKhoaHocReducer.mangKhoaHocTheoDanhMuc,
        user: state.QuanLyNguoiDungReducer.user,

    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        layDanhSachKhoaHocTheoDanhMuc: (maDanhMuc) => {
            dispatch(layDanhSachKhoaHocTheoDanhMucAction(maDanhMuc))
        },
        dangKyKhoaHoc: (taiKhoan, maKhoaHoc) => {
            dispatch(dangKyKhoaHocAction(taiKhoan, maKhoaHoc))
        }
    }
}

export default connect(mapStateToProp, mapDispatchToProps)(CourseCategory);