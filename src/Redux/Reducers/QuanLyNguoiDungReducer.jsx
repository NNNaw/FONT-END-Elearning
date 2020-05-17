import { actionTypes } from '../Contants/QuanLyNguoiDungConstant';

const initialState = {
    user: JSON.parse(localStorage.getItem('userLogin')) || null,
    logOut: JSON.parse(localStorage.getItem('userLogin')) === null ? true : false,
    mangNguoiDung: [],
    mangNguoiDungPhanTrang: [],
    mangNguoiDungGV: [],
    thongTinTaiKhoan: {},
    chiTietKhoaHocGhiDanh: [],
    mangLoaiNguoiDung: [],

    mangHocVienDaXetDuyetDuaVaoKhoaHoc: [],
    mangHocVienChoXetDuyetDuaVaoKhoaHoc: [],
    mangHocVienChuaXetDuyetDuaVaoKhoaHoc: [],
    mangKhoaHocDaXetDuyetDuaVaoHocVien: [],
    mangKhoaHocChoXetDuyetDuaVaoHocVien: [],
    mangKhoaHocChuaXetDuyetDuaVaoHocVien: [],

    mangTimKiemNguoiDung: [],
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
            state.mangNguoiDungGV = action.mangNguoiDungGV;
            return { ...state }
        }
        case actionTypes.LAY_DANH_SACH_NGUOI_DUNG: {
            state.mangNguoiDung = action.mangNguoiDung;
            return { ...state }
        }
        case actionTypes.LAY_DANH_SACH_NGUOI_DUNG_PHAN_TRANG: {
            state.mangNguoiDungPhanTrang = action.mangNguoiDungPhanTrang;
            return { ...state }
        }
        case actionTypes.LAY_DANH_SACH_LOAI_NGUOI_DUNG: {
            state.mangLoaiNguoiDung = action.mangLoaiNguoiDung;
            return { ...state }
        }
        case actionTypes.TIM_KIEM_NGUOI_DUNG: {
            state.mangTimKiemNguoiDung = action.mangTimKiemNguoiDung;
            return { ...state }
        }
        case actionTypes.LAY_DANH_SACH_HOC_VIEN_CHO_XET_DUYET_DUA_VAO_KHOA_HOC: {
            state.mangHocVienChoXetDuyetDuaVaoKhoaHoc = action.mangHocVienChoXetDuyetDuaVaoKhoaHoc;
            return { ...state }
        }
        case actionTypes.LAY_DANH_SACH_HOC_VIEN_DA_XET_DUYET_DUA_VAO_KHOA_HOC: {
            state.mangHocVienDaXetDuyetDuaVaoKhoaHoc = action.mangHocVienDaXetDuyetDuaVaoKhoaHoc;
            return { ...state }
        }
        case actionTypes.LAY_DANH_SACH_KHOA_HOC_CHO_XET_DUYET_DUA_VAO_HOC_VIEN: {
            state.mangKhoaHocChoXetDuyetDuaVaoHocVien = action.mangKhoaHocChoXetDuyetDuaVaoHocVien;
            return { ...state }
        }
        case actionTypes.LAY_DANH_SACH_KHOA_HOC_DA_XET_DUYET_DUA_VAO_HOC_VIEN: {
            state.mangKhoaHocDaXetDuyetDuaVaoHocVien = action.mangKhoaHocDaXetDuyetDuaVaoHocVien;
            return { ...state }
        }
        case actionTypes.LAY_DANH_SACH_KHOA_HOC_CHUA_XET_DUYET_DUA_VAO_HOC_VIEN: {
            state.mangKhoaHocChuaXetDuyetDuaVaoHocVien = action.mangKhoaHocChuaXetDuyetDuaVaoHocVien;
            return { ...state }
        }
        case actionTypes.LAY_DANH_SACH_HOC_VIEN_CHUA_XET_DUYET_DUA_VAO_KHOA_HOC: {
            state.mangHocVienChuaXetDuyetDuaVaoKhoaHoc = action.mangHocVienChuaXetDuyetDuaVaoKhoaHoc;
            return { ...state }
        }

        case actionTypes.LAY_THONG_TIN_TAI_KHOAN: {
            state.thongTinTaiKhoan = action.thongTinTaiKhoan;
            state.chiTietKhoaHocGhiDanh = action.thongTinTaiKhoan.chiTietKhoaHocGhiDanh
            return { ...state }
        }
        default:
            return { ...state }
    }
}
