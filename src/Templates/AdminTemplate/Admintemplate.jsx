import React, { Fragment } from 'react';
import { Route, NavLink } from 'react-router-dom';


let user = JSON.parse(localStorage.getItem('userLogin'))

const AdminLayout = (props) => {
  return <Fragment>
    <div className="d-flex" id="wrapper">
      {/* Sidebar */}
      <div className="bg-light border-right" id="sidebar-wrapper">
        <div className="sidebar-heading">
          <NavLink to={'/Admin'} className='text-danger'>ADMIN</NavLink>
        </div>
        <div className="list-group list-group-flush">
          <NavLink to={'/TabQuanLyKhoaHoc'} className="list-group-item list-group-item-action bg-dark text-light" >Quản lý khóa học</NavLink>
          <NavLink to={'/TabQuanLyNguoiDung'} className="list-group-item list-group-item-action bg-dark text-light" >Quản lý người dùng</NavLink>
        </div>
      </div>
      {/* /#sidebar-wrapper */}
      {/* Page Content */}
      <div id="page-content-wrapper">
        <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
          <button className="btn btn-primary" id="menu-toggle"><i className="fas fa-arrow-left"></i> Menu <i className="fas fa-arrow-right"></i></button>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
              <li className="nav-item active">
                <p>Xin chào , {user.hoTen}</p>
              </li>

              <li className="nav-item dropdown">
                <p className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <i className="fas fa-ellipsis-v"></i>
                </p>
                <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                  <NavLink to={"/TrangChu"} className="dropdown-item">Trang chủ</NavLink>
                  <NavLink to={`/CapNhatNguoiDung/${user.taiKhoan}`} className="dropdown-item" >Cập nhật thông tin</NavLink>
                  <NavLink to={'/dangnhap'} onClick={() => localStorage.clear()} className="dropdown-item" >Đăng xuất</NavLink>

                </div>
              </li>
            </ul>
          </div>
        </nav>
        <div className="container-fluid">
          {props.children}
        </div>
      </div>
      {/* /#page-content-wrapper */}
    </div>


  </Fragment>
}

export const AdminTemplate = ({ Component, ...props }) => (
  <Route {...props} render={(propComponent) => (
    <AdminLayout>
      <Component {...propComponent} />
    </AdminLayout>
  )} />
)