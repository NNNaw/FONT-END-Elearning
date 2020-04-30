import React, { Component } from 'react';
import './Carousel.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { layDanhSachKhoaHocAction } from '../../Redux/Actions/QuanLyKhoaHocAction'


class Carousel extends Component {


    componentDidMount() {
        this.props.layDanhSachKhoaHoc();
    }
    xemtt = (ma) => {
        console.log(encodeURIComponent(ma))
    }


    render() {

        const settings = {
            arrows: false,
            infinite: true,
            autoplay: true,
            speed: 1000,
            autoplaySpeed: 5000,
            slidesToShow: 1,
            slidesToScroll: 1,
            className: 'slides'
        };

        return (
            <div className='Carousel'>
                <Slider {...settings}>
                    {this.props.mangKhoaHoc.map((khoaHoc, index) => {
                        let maKhoaHoc = encodeURIComponent(khoaHoc.maKhoaHoc) 
                        return (
                            <div className='carousel_content' key={index}>
                                <img className='carousel_img' src={khoaHoc.hinhAnh} alt={khoaHoc.tenKhoaHoc} />
                                <div className="carousel_info">
                                    <NavLink to={`/ThongTinKhoaHoc/${maKhoaHoc}`}  onClick={() => this.xemtt(khoaHoc.maKhoaHoc)} className='btn btn_main'>
                                        Xem Chi Tiết
                                        </NavLink>
                                </div>
                            </div>
                        )
                    })}


                </Slider>
            </div>
        )
    }
}

const mapStateToProp = state => {
    return {
        mangKhoaHoc: state.QuanLyKhoaHocReducer.mangKhoaHoc,

    }
}

const mapDispatchToProps = (dispatch) => {
    return {

        layDanhSachKhoaHoc: () => {
            dispatch(layDanhSachKhoaHocAction())
        },

    }
}

export default connect(mapStateToProp, mapDispatchToProps)(Carousel);