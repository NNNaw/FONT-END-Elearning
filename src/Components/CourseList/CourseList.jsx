import React, { Component } from 'react'
import { connect } from 'react-redux'
import ReactPaginate from 'react-paginate';
import swal from 'sweetalert';
import './CourseList.css'
import { layDanhSachKhoaHocPhanTrangAction } from '../../Redux/Actions/QuanLyKhoaHocAction'
import { dangKyKhoaHocAction } from './../../Redux/Actions/QuanLyNguoiDungAction'
class CourseList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            offset: 0,
            perPage: 8,
            currentPage: 0,
            pageCount: 0,
        }
    }

    componentDidMount() {

        this.props.layDanhSachKhoaHocPhanTrang(this.state.offset, this.state.perPage, this.set)
    }
    set = (count) => {
        this.setState({ pageCount: count });
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

        return this.props.mangKhoaHocPhanTrang.map((element, index) => {
            return (
                <div className="col-3 card-content" key={index}>
                    <div className="card card-detail">
                        <img className="card-img-top" src={element.hinhAnh} alt={element.tenKhoaHoc} />
                        <div className="card-body">
                            <div className="card_header">
                                <h4 className="card-title">{element.tenKhoaHoc}</h4>
                            </div>
                            <div className='card_footer'>
                                <span><i className="fas fa-eye"></i> {element.luotXem}</span>
                                <button className='btn btn_main card_bnt_dangky' onClick={() => this.handleSignUpCourse(element.maKhoaHoc)} >
                                    Đăng ký</button>
                            </div>

                        </div>
                    </div>
                </div>

            )
        });
    }


    handlePageClick = (e) => {

        const selectedPage = e.selected;
        const offset = selectedPage * this.state.perPage;
        console.log(selectedPage)
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

    render() {
        return (
            <div className='courseList'>
                <div className="courseList_container container">
                    <h3>Danh sách các khóa học:</h3>
                    <div className="row courseList_card">

                        {this.renderCourseList()}
                    </div>
                    <div className="row courseList_page_index">
                        {this.renderPageIndex()}
                    </div>
                </div>

            </div>
        )
    }
}

const mapStateToProp = state => {
    return {
        mangKhoaHoc: state.QuanLyKhoaHocReducer.mangKhoaHoc,
        mangKhoaHocPhanTrang: state.QuanLyKhoaHocReducer.mangKhoaHocPhanTrang,
        thongTinKhoaHocPhanTrang: state.QuanLyKhoaHocReducer.thongTinKhoaHocPhanTrang,
        user: state.QuanLyNguoiDungReducer.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        layDanhSachKhoaHocPhanTrang: (offset, perPage, set) => {
            dispatch(layDanhSachKhoaHocPhanTrangAction(offset, perPage, set))
        },
        dangKyKhoaHoc: (taiKhoan, maKhoaHoc) => {
            dispatch(dangKyKhoaHocAction(taiKhoan, maKhoaHoc))
        }
    }
}

export default connect(mapStateToProp, mapDispatchToProps)(CourseList)

