import React, { Fragment } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import './Assets/Css/Base.css' // kiểu chữ
import './Assets/Scss/main.scss'
import { Hometemplate } from './Templates/HomeTemplate/HomeTemplate'
import { AdminTemplate } from './Templates/AdminTemplate/Admintemplate'
import Contact from './Pages/Contact/Contact'
import AboutUs from './Pages/AboutUs/AboutUs'
import CourseCategory from './Pages/CourseCategory/CourseCategory'
import CourseDetail from './Pages/CourseDetail/CourseDetail'
import CourseSearch from './Pages/CourseSearch/CourseSearch'
import SignIn from './Pages/SignIn/SignIn'
import SignUp from './Pages/SignUp/SignUp'
import Home from './Pages/Home/HomePage'
import InfoPersonal from './Pages/InfoPersonal/InfoPersonal';
import Admin from './Pages/Admin/Admin';
import TabQuanLyKhoaHoc from './Pages/Admin/TabQuanLyKhoaHoc';
import TabQuanLyNguoiDung from './Pages/Admin/TabQuanLyNguoiDung';

import CapNhatKhoaHoc from './Pages/PageUpdate/CapNhatKhoaHoc';
import CapNhatNguoiDung from './Pages/PageUpdate/CapNhatNguoiDung';
import ThemKhoaHoc from './Pages/PageAdd/ThemKhoaHoc'
import ThemNguoiDung from './Pages/PageAdd/ThemNguoiDung'
function App() {
  return (
    <Fragment>
      <BrowserRouter>

        <Switch>
          <Hometemplate exact path='/' Component={Home} />
          <Hometemplate exact path='/TrangChu' Component={Home} />
          <Hometemplate exact path='/contact' Component={Contact} />
          <Hometemplate exact path='/about' Component={AboutUs} />

          <Hometemplate exact path='/DanhSachKhoaHocTheoDanhMuc/:maDanhMuc' Component={CourseCategory} />
          <Hometemplate exact path='/ThongTinKhoaHoc/:maKhoaHoc' Component={CourseDetail} />
          <Hometemplate exact path='/TimKiemKhoaHoc/:tenKhoaHoc' Component={CourseSearch} />
          <Hometemplate exact path='/TimKiemKhoaHoc/' Component={CourseSearch} />
          {/*Sử dụng route để không kế thừa từ template home hoặc tự định nghĩa ra template riêng cho login */}
          <Route exact path='/ThongTinCaNhan/:taiKhoan' component={InfoPersonal} />
          <Route exact path='/dangnhap' component={SignIn} />
          <Route exact path='/dangky' component={SignUp} />

          {/* <Admin exact path='/admin/addcourse' Component={AddCourse} /> */}
          {/* <Admin exact path='/admin/courselist' Component={CourseList} /> */}

          <AdminTemplate exact path='/Admin/' Component={Admin} />
          <AdminTemplate exact path='/CapNhatKhoaHoc/:maKhoaHoc' Component={CapNhatKhoaHoc} />
          <AdminTemplate exact path='/CapNhatNguoiDung/:taiKhoan' Component={CapNhatNguoiDung} />
          <AdminTemplate exact path='/TabQuanLyNguoiDung' Component={TabQuanLyNguoiDung} />
          <AdminTemplate exact path='/TabQuanLyKhoaHoc' Component={TabQuanLyKhoaHoc} />
          <AdminTemplate exact path='/ThemKhoaHoc' Component={ThemKhoaHoc} />
          <AdminTemplate exact path='/ThemNguoiDung' Component={ThemNguoiDung} />
        </Switch>
      </BrowserRouter>
    </Fragment>
  );
}

export default App;
