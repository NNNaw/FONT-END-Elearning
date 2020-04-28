import React, { Fragment } from 'react';
import { Route,NavLink } from 'react-router-dom';

const AdminLayout = (props) => {
    return <Fragment>
        <ul className="nav nav-tabs bg-dark text-white">
            <li className="nav-item">
                <a href="#" className="nav-link active">Admin index</a>
            </li>
            <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Quản lý khoá học</a>
                <div className="dropdown-menu">
                    <NavLink className="dropdown-item" to='/admin/addcourse'>Thêm khoá học</NavLink>
                    <NavLink className="dropdown-item" to='/admin/courselist'>Danh sách khoá học</NavLink>
                </div>
            </li>
           
        </ul>

        {props.children}
    </Fragment>
}

export const Admin = ({ Component, ...props }) => (
    <Route {...props} render={(propComponent) => (
        <AdminLayout>
            <Component {...propComponent} />
        </AdminLayout>
    )} />
)