import React, { Component } from 'react';
import logo from '../../Assets/Images/LogoEducation.png'
class Footer extends Component {
    render() {
        return (
            <div className='footer'>
                <div className="footer_container container">
                    <div className="row footer-tittle">
                        <div className="col-4 footer-tittle-left">
                            <h3 className='footer_h3_title'>NHẬN TIN SỰ KIỆN & KHUYẾN MÃI</h3>
                        </div>
                        <div className="col-4 footer-tittle-middle">
                            <h3 className='footer_h3_title'>ĐĂNG KÝ TƯ VẤN</h3>
                        </div>
                        <div className="col-4 footer-tittle-right"></div>
                    </div>
                    <div className="row footer_content">
                        <div className="col-4 footer_content_left">
                            <p className='footer_descript_p'>CyberSoft sẽ gởi các khóa học trực tuyến & các chương trình CyberLive hoàn toàn MIỄN PHÍ và các chương trình KHUYẾN MÃI hấp dẫn đến các bạn.</p>
                            <div className="footer_left_formGroup">
                                <form className="footer_left_form">
                                    <input className='form-control footer_form_email' type="email" placeholder="Nhập email của bạn" />
                                    <input className='btn btn_main' type="submit" Value="Đăng ký" />
                                </form>
                            </div>
                        </div>

                        <div className="col-4 footer_content_middle">

                            <div className="form-group">
                                <input type="text" name id className="form-control" placeholder='Họ tên (*)' aria-describedby="helpId" />
                                <input type="text" name id className="form-control" placeholder='Số điện thoại (*)' aria-describedby="helpId" />
                                <input type="email" name id className="form-control" placeholder='Email (*)' aria-describedby="helpId" />
                                <input type="submit" className='btn btn_main' value='ĐĂNG KÝ TƯ VẤN' />
                            </div>


                        </div>

                        {/* <div className="col-4 footer_content_right">
                            <div class="fb-page" data-href="https://www.facebook.com/lophocviet" data-tabs="timeline" data-width="400"
                                data-height="400" data-small-header="true" data-adapt-container-width="true" data-hide-cover="true" data-show-facepile="true">
                                <blockquote cite="https://www.facebook.com/facebook" class="fb-xfbml-parse-ignore">
                                    <a href="https://www.facebook.com/facebook">Facebook</a></blockquote></div>
                        </div> */}

                    </div>
                    <div className="row footer_info">
                        <div className="col-4 footer_info_left">
                            <ul className='menu_info'>
                                <li className='item_info'>
                                    <i class="fas fa-map-marker-alt"></i>
                                    <span> Cơ sở 1: 376 Võ Văn Tần – Quận 3</span>
                                </li>
                                <li className='item_info'>
                                    <i class="fas fa-map-marker-alt"></i>
                                    <span> Cơ sở 2: 459 Sư Vạn Hạnh – Quận 10</span>
                                </li>
                                <li className='item_info'>
                                    <i class="fas fa-map-marker-alt"></i>
                                    <span> Cơ sở 3: 82 Ung Văn Khiêm – Bình Thạnh</span>
                                </li>
                                <li className='item_info'>
                                    <i class="fas fa-map-marker-alt"></i>
                                    <span> Cơ sở 4: 110 Đường số 10 nội bộ khu CityLand Phan Văn Trị – Gò Vấp</span>
                                </li>
                                <li className='item_info'>
                                    <i class="fas fa-phone"></i>
                                    <span>096.105.1014 – 098.407.5835</span>
                                </li>
                            </ul>
                        </div>
                        <div className="col-4 footer_infor_middle">
                            <p>
                                <a href="/lap-trinh-front-end-chuyen-nghiep/">Lập trình Front End ,</a>
                                <a href="https://cybersoft.edu.vn/lap-trinh-front-end-tich-hop/">Lập trình React JS ,</a>
                                <a href="https://cybersoft.edu.vn/lap-trinh-front-end-tich-hop/">Lập trình React Angular ,</a>
                                <a href="http://tư duy" target="_blank" rel="noopener">Lập trình tư duy ,</a>
                                <a href="https://cybersoft.edu.vn/chuyen-gia-fullstack-javascript-voi-reactjs-nodejs-express/">Lập trình NodeJS ,</a>
                                <a href="/lap-trinh-back-end-java-web-chuyen-nghiep/">Lập trình Backend ,</a>
                                <a href="/lap-trinh-back-end-java-web-chuyen-nghiep/">Lập trình Java Web ,</a>
                                <a href="/lap-trinh-back-end-java-web-chuyen-nghiep/">Lập trình Java Spring – Java Boot ,</a>
                                <a href="https://toidicodedao.com" target="_blank" rel="noopener">Tôi Đi Code Dạo ,</a>
                                <a href="http://vietmoz.edu.vn/" target="_blank" rel="noopener">Học SEO Hà Nội ở Vietmoz ,</a>
                                <a href="https://myclass.vn" target="_blank" rel="noopener">Học lập trình trực tuyến</a>
                            </p>
                        </div>
                    </div>
                    <div className="row copy_right">
                        <p>© Bản quyền CyberSoft 2017 - 2019</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default Footer;