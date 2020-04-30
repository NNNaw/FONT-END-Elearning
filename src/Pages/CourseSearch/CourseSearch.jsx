import React, { Component } from 'react';
import { connect } from 'react-redux';
import { layThongTinKhoaHocTimKiemAction } from '../../Redux/Actions/QuanLyKhoaHocAction'


class CourseSearch extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tenKhoaHoc: this.props.match.params.tenKhoaHoc
        }
    }

    componentDidMount() {
        console.log(this.state.tenKhoaHoc)
        this.props.layThongTinKhoaHocTimKiem(this.state.tenKhoaHoc)
    }
    componentDidUpdate() {
        let { tenKhoaHoc } = this.props.match.params
        if (this.state.tenKhoaHoc !== tenKhoaHoc) {
            this.props.layThongTinKhoaHocTimKiem(tenKhoaHoc)
            this.setState({ tenKhoaHoc: tenKhoaHoc })
        }
    }
    renderCourseSearch = () => {
        return this.props.mangKhoaHocTimKiem.map((element, index) => {
            return (
                <div className="row" key={index}>
                    <div className="col-3">
                        <img src={element.hinhAnh} height='200' width='100%' alt={element.tenKhoaHoc} />
                    </div>
                    <div className="col-6">
                        <h3>{element.tenKhoaHoc}</h3>
                        <p>{element.moTa}</p>
                    </div>
                    <div className="col-3">
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
            <div className='CourseSearch'>
                <div className="CourseSearch_container container">
                    <h2>Tìm thấy {this.props.mangKhoaHocTimKiem.length} khóa học "{this.state.tenKhoaHoc}"</h2>
                    {this.renderCourseSearch()}
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
        layThongTinKhoaHocTimKiem: (tenKhoaHoc) => {
            dispatch(layThongTinKhoaHocTimKiemAction(tenKhoaHoc))
        }
    };
}
export default connect(
    mapStateToProps, mapDispatchToProps
)(CourseSearch);