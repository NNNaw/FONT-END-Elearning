import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';

const AdminLayout = (props) => {
    return <Fragment>
        {/* <ul className="nav nav-tabs bg-dark text-white">
            <li className="nav-item">
                <a href="#" className="nav-link active">Admin Template</a>
            </li>
            <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Quản lý khoá học</a>
                <div className="dropdown-menu">
                    <p className="dropdown-item" >Thêm khoá học</p>
                    <p className="dropdown-item" >Danh sách khoá học</p>
                </div>
            </li>
           
        </ul> */}
        
        {props.children}
    </Fragment>
}

export const AdminTemplate = ({ Component, ...props }) => (
    <Route {...props} render={(propComponent) => (
        <AdminLayout>
            <Component {...propComponent} />
        </AdminLayout>
    )} />
)