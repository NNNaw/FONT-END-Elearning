import { actionTypes } from '../Contants/QuanLyNguoiDungConstant';

const initialState = {
    user: JSON.parse(localStorage.getItem('userLogin')) || null,
    logOut: JSON.parse(localStorage.getItem('userLogin')) === null ? true : false,
    mangNguoiDung: []
}

export const QuanLyNguoiDungReducer = (state = initialState, action) => {
    switch (action.type) {

        case actionTypes.DANG_NHAP: {
            state.user = action.taiKhoan;
            state.logOut = false;
            return { ...state }
        }
        case actionTypes.DANG_XUAT: {
            state.logOut = true;
            localStorage.clear();
            return { ...state }
        }
        case actionTypes.LAY_DANH_SACH_NGUOI_TAO: {
            state.mangNguoiDung = action.mangNguoiDung;
            return { ...state }
        }
        default:
            return { ...state }
    }
}
