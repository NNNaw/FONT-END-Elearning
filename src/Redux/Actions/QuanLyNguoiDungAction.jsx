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

export const layThongtinTaiKhoanAction = (taiKhoan) => {


    return dispatch => {
        axios({
            url: settings.domain + '/QuanLyNguoiDung/ThongTinTaiKhoan',
            method: 'POST',
            data: { taiKhoan },
            headers: {
                "Authorization": "Bearer " + localStorage.getItem(settings.token)
            }
        }).then(result => {
            dispatch({
                type: actionTypes.LAY_THONG_TIN_TAI_KHOAN,
                thongTinTaiKhoan: result.data
            })
        }).catch(error => {
            console.log(error.response)
        })
    }
}

export const CapNhatThongTinNguoiDungAction = (user) => {

    console.log(user)
    return dispatch => {
        axios({
            url: settings.domain + '/QuanLyNguoiDung/CapNhatThongTinNguoiDung',
            method: 'PUT',
            data: {
                "taiKhoan": user.taiKhoan,
                "matKhau": user.matKhau,
                "hoTen": user.hoTen,
                "soDT": user.soDT,
                "maLoaiNguoiDung": user.maLoaiNguoiDung,
                "maNhom": settings.groupID,
                "email": user.email
            },
            headers: {
                "Authorization": "Bearer " + localStorage.getItem(settings.token)
            }
        }).then(result => {
            console.log(result.data)
            swal({
                icon: "success",
                title: "Cập nhật thành công",
                buttons: false,
                timer: 1000,
            })
            dispatch(layThongtinTaiKhoanAction(user.taiKhoan))
        }).catch(error => {
            console.log(error.response)
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
                mangNguoiDungGV: result.data.filter(nd => nd.maLoaiNguoiDung === 'GV')
            })

        }).catch(error => {
            console.log(error.response.data);
        })
    }
}

export const layDanhSachNguoiDungAction = () => {
    return dispatch => {
        axios({
            url: settings.domain + `/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=${settings.groupID}`,
            method: 'GET'
        }).then(result => {

            dispatch({
                type: actionTypes.LAY_DANH_SACH_NGUOI_DUNG,
                mangNguoiDung: result.data
            })
        }).catch(error => {
            console.log(error.response.data);
        })
    }
}
export const layDanhSachNguoiDungPhanTrangAction = (offset, perPage, set) => {

    return dispatch => {
        axios({
            url: settings.domain + `/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=${settings.groupID}`,
            method: 'GET'
        }).then(result => {
            const data = result.data;
            const dataSliced = data.slice(offset, offset + perPage)

            dispatch({
                type: actionTypes.LAY_DANH_SACH_NGUOI_DUNG_PHAN_TRANG,
                mangNguoiDungPhanTrang: dataSliced
            })
            const count = Math.ceil(data.length / perPage)
            set(count)
        }).catch(error => {
            console.log(error.response.data);
        })
    }
}
export const layDanhSachLoaiNguoiDungAction = () => {
    return dispatch => {
        axios({
            url: settings.domain + `/QuanLyNguoiDung/LayDanhSachLoaiNguoiDung`,
            method: 'GET'
        }).then(result => {

            dispatch({
                type: actionTypes.LAY_DANH_SACH_LOAI_NGUOI_DUNG,
                mangLoaiNguoiDung: result.data
            })
        }).catch(error => {
            console.log(error.response.data);
        })
    }
}

export const themNguoiDungAction = (user, clearField) => {

    return dispatch => {
        axios({
            url: settings.domain + '/QuanLyNguoiDung/ThemNguoiDung',
            method: 'POST',
            data: {
                ...user
            },
            headers: {
                "Authorization": "Bearer " + localStorage.getItem(settings.token)
            }
        }).then(result => {
            console.log(result.data)
            dispatch(layDanhSachNguoiDungAction())
            clearField()
            swal({
                icon: "success",
                title: "Thêm thành công",
                timer: 1000,
                buttons: false
            })
        }).catch(error => {
            console.log(error.response)
            swal({
                icon: "warning",
                title: "Thêm không thành công.",
                text: error.response.data,
                dangerMode: true,
            });
        })
    }
}

export const xoaNguoiDungAction = (taiKhoan) => {

    return dispatch => {
        axios({
            url: settings.domain + `/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${taiKhoan}`,
            method: 'DELETE',

            headers: {
                "Authorization": "Bearer " + localStorage.getItem(settings.token)
            }
        }).then(result => {
            console.log(result.data)
            dispatch(layDanhSachNguoiDungAction())

            swal({
                icon: "success",
                title: "Thêm thành công",
                timer: 1000,
                buttons: false
            })
        }).catch(error => {
            console.log(error.response)
            swal({
                icon: "warning",
                title: "Thêm không thành công.",
                text: error.response.data,
                dangerMode: true,
            });
        })
    }
}

export const timKiemNguoiDungAction = (key) => {

    return dispatch => {
        axios({
            url: settings.domain + `/QuanLyNguoiDung/TimKiemNguoiDung?MaNhom=${settings.groupID}&tuKhoa=${key}`,
            method: 'get',

            headers: {
                "Authorization": "Bearer " + localStorage.getItem(settings.token)
            }
        }).then(result => {


            dispatch({
                type: actionTypes.TIM_KIEM_NGUOI_DUNG,
                mangTimKiemNguoiDung: result.data

            })

        }).catch(error => {
            console.log(error.response)

        })
    }
}

export const layDanhSachHocVienChoXetDuyetDuaVaoKhoaHocAction = (maKhoaHoc) => {
    // console.log(offset, perPage)
    return dispatch => {
        axios({

            url: settings.domain + `/QuanLyNguoiDung/LayDanhSachHocVienChoXetDuyet`,
            method: 'POST',
            data: {
                "MaKhoaHoc": maKhoaHoc
            },
            headers: {
                "Authorization": "Bearer " + localStorage.getItem(settings.token)
            }
        }).then(result => {

            dispatch({
                type: actionTypes.LAY_DANH_SACH_HOC_VIEN_CHO_XET_DUYET_DUA_VAO_KHOA_HOC,
                mangHocVienChoXetDuyetDuaVaoKhoaHoc: result.data
            })

        }).catch(error => {
            console.log(error.response.data)
        })
    }
}

export const LayDanhSachHocVienDaXetDuyetDuaVaoKhoaHocAction = (maKhoaHoc) => {

    return dispatch => {
        axios({
            url: settings.domain + `/QuanLyNguoiDung/LayDanhSachHocVienKhoaHoc`,
            method: 'POST',
            data: { "MaKhoaHoc": maKhoaHoc },
            headers: {
                "Authorization": "Bearer " + localStorage.getItem(settings.token)
            }
        }).then(result => {

            dispatch({
                type: actionTypes.LAY_DANH_SACH_HOC_VIEN_DA_XET_DUYET_DUA_VAO_KHOA_HOC,
                mangHocVienDaXetDuyetDuaVaoKhoaHoc: result.data
            })

        }).catch(error => {
            console.log(error.response.data)
        })
    }
}

export const LayDanhSachKhoaHocChoXetDuyetDuaVaoHocVienAction = (taiKhoan) => {

    return dispatch => {
        axios({
            url: settings.domain + `/QuanLyNguoiDung/LayDanhSachKhoaHocChoXetDuyet`,
            method: 'POST',
            data: { "TaiKhoan": taiKhoan },
            headers: {
                "Authorization": "Bearer " + localStorage.getItem(settings.token)
            }
        }).then(result => {

            dispatch({
                type: actionTypes.LAY_DANH_SACH_KHOA_HOC_CHO_XET_DUYET_DUA_VAO_HOC_VIEN,
                mangKhoaHocChoXetDuyetDuaVaoHocVien: result.data
            })

        }).catch(error => {
            console.log(error.response.data)
        })
    }
}

export const LayDanhSachKhoaHocDaXetDuyetDuaVaoHocVienAction = (taiKhoan) => {

    console.log(taiKhoan)
    return dispatch => {
        axios({
            url: settings.domain + `/QuanLyNguoiDung/LayDanhSachKhoaHocDaXetDuyet`,
            method: 'POST',
            data: { "TaiKhoan": taiKhoan },
            headers: {
                "Authorization": "Bearer " + localStorage.getItem(settings.token)
            }
        }).then(result => {

            dispatch({
                type: actionTypes.LAY_DANH_SACH_KHOA_HOC_DA_XET_DUYET_DUA_VAO_HOC_VIEN,
                mangKhoaHocDaXetDuyetDuaVaoHocVien: result.data
            })

        }).catch(error => {
            console.log(error.response.data)
        })
    }
}
export const LayDanhSachHocVienChuaXetDuyetDuaVaoKhoaHocAction = (maKhoaHoc) => {

    return dispatch => {
        axios({
            url: settings.domain + `/QuanLyNguoiDung/LayDanhNguoiDungChuaGhiDanh`,
            method: 'POST',
            data: { "MaKhoaHoc": maKhoaHoc },
            headers: {
                "Authorization": "Bearer " + localStorage.getItem(settings.token)
            }
        }).then(result => {

            dispatch({
                type: actionTypes.LAY_DANH_SACH_HOC_VIEN_CHUA_XET_DUYET_DUA_VAO_KHOA_HOC,
                mangHocVienChuaXetDuyetDuaVaoKhoaHoc: result.data
            })

        }).catch(error => {
            console.log(error.response.data)
        })
    }
}

export const LayDanhSachKhoaHocChuaXetDuyetDuaVaoHocVienAction = (taiKhoan) => {

    return dispatch => {
        axios({
            url: settings.domain + `/QuanLyNguoiDung/LayDanhSachKhoaHocChuaGhiDanh`,
            method: 'POST',
            data: { "TaiKhoan": taiKhoan },
            headers: {
                "Authorization": "Bearer " + localStorage.getItem(settings.token)
            }
        }).then(result => {

            dispatch({
                type: actionTypes.LAY_DANH_SACH_KHOA_HOC_CHUA_XET_DUYET_DUA_VAO_HOC_VIEN,
                mangKhoaHocChuaXetDuyetDuaVaoHocVien: result.data
            })

        }).catch(error => {
            console.log(error.response.data)
        })
    }
}
