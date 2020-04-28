import {actionType} from '../Contants/QuanLyKhoaHocConstant';
const initialState = {
    mangDanhMucKhoaHoc:[],
    mangKhoaHoc: [],
    thongTinKhoaHoc:{}
}
export const QuanLyKhoaHocReducer = (state = initialState, action) => {
  switch (action.type) {

  case actionType.LAY_DANH_MUC_KHOA_HOC:
    {
      state.mangDanhMucKhoaHoc = action.mangDanhMucKhoaHoc;
      return { ...state }
    }
  case actionType.LAY_DANH_SACH_KHOA_HOC:{
      state.mangKhoaHoc = action.mangKhoaHoc
      return {...state}
  }
  case actionType.LAY_CHI_TIET_KHOA_HOC: {
      state.thongTinKhoaHoc = action.thongTinKhoaHoc;
      return {...state}
  }

  default:
    return {...state}
  }
}
