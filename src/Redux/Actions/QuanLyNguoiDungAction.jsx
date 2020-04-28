import { actionTypes } from '../Contants/QuanLyNguoiDungConstant';
import { settings } from '../../Commons/Settings';
import axios from 'axios';
import swal from 'sweetalert';

export const dangNhapNguoiDungAction = (user, checkRemeber, handleLogin) => {

    return dispatch => {
        axios({
            url: settings.domain + `/QuanLyNguoiDung/DangNhap`,
            method: 'POST',
            data: user
        }).then(result => {
            
            if (checkRemeber) {//kiểm trả user cho phép nhớ mật khẩu hay không
                localStorage.setItem(settings.userLogin, JSON.stringify(result.data));
                localStorage.setItem(settings.token, result.data.accessToken)
            }
            dispatch({
                type: actionTypes.DANG_NHAP,
                taiKhoan: result.data,
            })
            handleLogin()
        }).catch(error => {
            // console.log(error.response.data)
            swal("Thông báo đăng nhập!", error.response.data, "error");
        })
    }
}

export const dangKyNguoiDungAction = (user, handleClear) => {

    return dispatch => {
        axios({
            url: settings.domain + '/QuanLyNguoiDung/DangKy',
            method: 'POST',
            data: user
        }).then(result => {
            console.log(result.data);


            swal({
                icon: "success",
                title: "Đăng ký thành công",

            })
            handleClear();

        }).catch(error => {
             console.log(error.response)
            swal({
                icon: "warning",
                title: "Đăng ký không thành công.",
                text: error.response.data,
                dangerMode: true,
            });
        })
    }
}

export const layDanhSachNguoiTaoAction = () => {
    return dispatch => {
        axios({
            url: settings.domain + `/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=${settings.groupID}`,
            method: 'GET',
        }).then(result => {
            //Sau khi lấy dữ liệu người dùng về từ api => đưa dữ liệu lên reducer
            dispatch({
                type: actionTypes.LAY_DANH_SACH_NGUOI_TAO,
                mangNguoiDung: result.data.filter(nd => nd.maLoaiNguoiDung === 'GV')
            })

        }).catch(error => {
            console.log(error.response.data);
        })
    }
}

