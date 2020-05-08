import React, { Component } from 'react'
import { connect } from 'react-redux'
import { layThongTinKhoaHocAction, dangKyKhoaHocAction } from '../../Redux/Actions/QuanLyKhoaHocAction'
import swal from 'sweetalert'
import { spaceNumber } from '../../Commons/handleCommons'
class CourseDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            maKhoaHoc: this.props.match.params.maKhoaHoc,

        }
    }

    componentDidMount() {
        //lấy giá trị tham số từ url this.props.match.params.tenThamSo
        let { maKhoaHoc } = this.props.match.params;

        this.props.layThongTinKhoaHoc(maKhoaHoc);

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
    render() {
        let { hinhAnh, tenKhoaHoc, moTa, maKhoaHoc, luotXem, ngayTao, soLuongHocVien } = this.props.thongTinKhoaHoc;
        return (
            <div className='courseDetail'>
                <div className="courseDetail_container container-fluid">
                    <div className="courseDetail_banner">
                        <div className="courseDetail_img">
                            <img src={hinhAnh} alt={tenKhoaHoc} />
                        </div>
                        <div className="courseDetail_banner_info">
                            <p>{tenKhoaHoc}</p>
                            <p><i className="fa fa-eye"></i> {spaceNumber(luotXem)}</p>
                            <button className='btn btn_main courseDetail_bnt_dangky' onClick={() => this.handleSignUpCourse(maKhoaHoc)}>Đăng ký</button>
                        </div>
                    </div>
                    <div className="courseDetail_info container">
                        <h3>Thông tin khóa học</h3>
                        <p><span>Tên khóa học</span>: {tenKhoaHoc}</p>
                        <p><span>Lượt xem</span>: {luotXem}</p>
                        <p><span>Ngày tạo</span>: {ngayTao}</p>
                        <p><span>Số lượng học viên</span>: {soLuongHocVien}</p>
                        <h3>Giới thiệu khóa học (phần mô tả khóa học)</h3>
                        <p>
                            {moTa}
                        </p>
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProp = state => {
    return {
        thongTinKhoaHoc: state.QuanLyKhoaHocReducer.thongTinKhoaHoc,
        user: state.QuanLyNguoiDungReducer.user,

    }
}

const mapDispatchToProps = (dispatch) => {
    return {

        layThongTinKhoaHoc: (maKhoaHoc) => {
            dispatch(layThongTinKhoaHocAction(maKhoaHoc))
        },
        dangKyKhoaHoc: (taiKhoan, maKhoaHoc) => {
            dispatch(dangKyKhoaHocAction(taiKhoan, maKhoaHoc))
        }
    }
}

export default connect(mapStateToProp, mapDispatchToProps)(CourseDetail);