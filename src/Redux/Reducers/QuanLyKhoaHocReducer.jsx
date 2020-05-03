import { actionType } from '../Contants/QuanLyKhoaHocConstant';
const initialState = {
  mangDanhMucKhoaHoc: [],
  mangKhoaHocTheoDanhMuc: [],
  mangKhoaHoc: [],
  mangKhoaHocPhanTrang: [],
  thongTinKhoaHocPhanTrang: [],
  thongTinKhoaHoc: [],
  
  mangKhoaHocTimKiem: [],
}
export const QuanLyKhoaHocReducer = (state = initialState, action) => {
  switch (action.type) {

    case actionType.LAY_DANH_MUC_KHOA_HOC:
      {
        state.mangDanhMucKhoaHoc = action.mangDanhMucKhoaHoc;
        return { ...state }
      }
    case actionType.LAY_DANH_SACH_KHOA_HOC: {
      state.mangKhoaHoc = action.mangKhoaHoc
      return { ...state }
    }
    case actionType.LAY_THONG_TIN_KHOA_HOC: {
      state.thongTinKhoaHoc = action.thongTinKhoaHoc;
     
      return { ...state }
    }
    case actionType.LAY_DANH_SACH_KHOA_HOC_PHAN_TRANG: {
      state.mangKhoaHocPhanTrang = action.mangKhoaHocPhanTrang
      state.thongTinKhoaHocPhanTrang = action.thongTinKhoaHocPhanTrang
      return { ...state }
    }
    case actionType.LAY_DANH_DANH_SACH_KHOA_HOC_THEO_DANH_MUC: {
      state.mangKhoaHocTheoDanhMuc = action.mangKhoaHocTheoDanhMuc;
      return { ...state }
    }
    case actionType.LAY_THONG_TIN_KHOA_HOC_TIM_KIEM: {
      state.mangKhoaHocTimKiem = action.mangKhoaHocTimKiem;
      return { ...state }
    }
    default:
      return { ...state }
  }
}
