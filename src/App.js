import React, { Fragment } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import './Assets/Css/Base.css' // kiểu chữ
import './Assets/Scss/main.scss'
import {Hometemplate} from './Templates/HomeTemplate/HomeTemplate'
import Contact from './Pages/Contact/Contact'
import AboutUs from './Pages/AboutUs/AboutUs'
import SignIn from './Pages/SignIn/SignIn'
import SignUp from './Pages/SignUp/SignUp'
import Home from './Pages/Home/HomePage'
function App() {
  return (
    <Fragment>
      <BrowserRouter>

        <Switch>
          <Hometemplate exact path='/contact' Component={Contact} />
          <Hometemplate exact path='/about' Component={AboutUs} />
          {/* <Home exact path='/coursedetail/:maKhoaHoc' Component={CourseDetail} /> */}

          {/*Sử dụng route để không kế thừa từ template home hoặc tự định nghĩa ra template riêng cho login */}

          <Route exact path='/dangnhap' component={SignIn} />
          <Route exact path='/dangky' component={SignUp} />

          {/* <Admin exact path='/admin/addcourse' Component={AddCourse} /> */}
          {/* <Admin exact path='/admin/courselist' Component={CourseList} /> */}

          {/* <Admin exact path='/admin' Component={AdminIndex} /> */}
          <Hometemplate exact path='/' Component={Home} />
        </Switch>
      </BrowserRouter>
    </Fragment>
  );
}

export default App;
