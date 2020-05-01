import React, { Component } from 'react';
import { connect } from 'react-redux';
import { layThongTinKhoaHocTimKiemAction } from '../../Redux/Actions/QuanLyKhoaHocAction'
import { NavLink } from 'react-router-dom';
import './CourseSearch.css'
import ReactPaginate from 'react-paginate';

class CourseSearch extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tenKhoaHoc: this.props.match.params.tenKhoaHoc,
            error: '',

            offset: 0,
            perPage: 4,
            currentPage: 0,
            pageCount: 0,
        }
    }

    componentDidMount() {
        let { offset, perPage, tenKhoaHoc } = this.state
        this.props.layThongTinKhoaHocTimKiem(tenKhoaHoc, this.errorSearch, offset, perPage, this.set)
    }
    componentDidUpdate() {
        let { tenKhoaHoc } = this.props.match.params
        if (this.state.tenKhoaHoc !== tenKhoaHoc) {
            this.props.layThongTinKhoaHocTimKiem(tenKhoaHoc, this.errorSearch)
            this.setState({ tenKhoaHoc: tenKhoaHoc, error: '' })
        }
    }
    set = (count) => {
        this.setState({ pageCount: count });
    }
    errorSearch = (err) => {
        this.setState({
            error: err
        });
    }

    handleView = (mota, id) => {


        let moTaPhiaSau = mota.substring(200, mota.length)
        let moTaPhiaTruoc = mota.substring(0, 200)

        return (
            <p className='text-white'>{moTaPhiaTruoc}<span id={`dots_${id}`} >...</span><span className='more' id={`more_${id}`}>{moTaPhiaSau}</span></p>
        )
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

    handlePageClick = (e) => {

        const selectedPage = e.selected;
        const offset = selectedPage * this.state.perPage;
        console.log(selectedPage)
        this.setState({
            currentPage: selectedPage,
            offset: offset
        }, () => {
            let { offset, perPage, tenKhoaHoc } = this.state
            this.props.layThongTinKhoaHocTimKiem(tenKhoaHoc, this.errorSearch, offset, perPage, this.set)
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
    renderCourseSearch = () => {
        return this.props.mangKhoaHocTimKiem.map((element, index) => {
            return (
                <div className="row bg-dark my-3 py-3" height={200} key={index}>
                    <NavLink to={`/ThongTinKhoaHoc/${element.maKhoaHoc}`} className="col-3">
                        <img src={element.hinhAnh} height='200' width='100%' alt={element.tenKhoaHoc} />
                    </NavLink>
                    <div className="col-6">
                        <NavLink to={`/ThongTinKhoaHoc/${element.maKhoaHoc}`}><h3>{element.tenKhoaHoc}</h3></NavLink>
                        {this.handleView(element.moTa, index)}
                        <span className='btn btn-success' id={`btnReadMore_${index}`} onClick={() => this.readMore(index)}>Đọc Thêm</span>
                    </div>
                    <div className="col-3 text-white">
                        <p>Lượt xem: {element.luotXem}</p>
                        <p>Số lượng học viên: {element.soLuongHocVien}</p>
                        <p>Ngày tạo: {element.ngayTao}</p>
                    </div>
                </div>
            )
        })
    }
    render() {
        return (
            <div className='CourseSearch '>
                <div className="CourseSearch_container container my-5">
                    {this.state.error !== '' ? <div><p>{this.state.error}</p></div> :
                        <div>
                            <h2>Tìm thấy {this.props.mangKhoaHocTimKiem.length} khóa học "{this.state.tenKhoaHoc}"</h2>
                            {this.renderCourseSearch()}
                        </div>
                    }
                    <div className="row">
                        {this.renderPageIndex()}
                    </div>
                </div>
            </div>
        );
    }
}
function mapStateToProps(state) {
    return {
        mangKhoaHocTimKiem: state.QuanLyKhoaHocReducer.mangKhoaHocTimKiem
    };
}

function mapDispatchToProps(dispatch) {
    return {
        layThongTinKhoaHocTimKiem: (tenKhoaHoc, errorSearch, offset, perPage, set) => {
            dispatch(layThongTinKhoaHocTimKiemAction(tenKhoaHoc, errorSearch, offset, perPage, set))
        }
    };
}
export default connect(
    mapStateToProps, mapDispatchToProps
)(CourseSearch);