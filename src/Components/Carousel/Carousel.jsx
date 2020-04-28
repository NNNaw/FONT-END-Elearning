import React, { Component } from 'react';
import './Carousel.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { connect } from 'react-redux'
import { layDanhSachKhoaHocAction } from '../../Redux/Actions/QuanLyKhoaHocAction'


class Carousel extends Component {


    componentDidMount() {
        this.props.layDanhSachKhoaHoc();
    }

    render() {

        const settings = {
            arrows: true,
            infinite: true,
            autoplay: true,
            speed: 1000,
            autoplaySpeed : 5000,
            slidesToShow: 1,
            slidesToScroll: 1,
            className: 'slides'
        };

        return (
            <div className='Carousel'>
                <Slider {...settings}>
                    {this.props.mangKhoaHoc.map((khoaHoc, index) => {
                        return (
                            <div>
                                <img width='100%' height='300' src={khoaHoc.hinhAnh} alt={khoaHoc.tenKhoaHoc} />
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
        mangKhoaHoc : state.QuanLyKhoaHocReducer.mangKhoaHoc,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {

        layDanhSachKhoaHoc: () => {
            dispatch(layDanhSachKhoaHocAction())
        }
    }
}

export default connect(mapStateToProp, mapDispatchToProps)(Carousel);