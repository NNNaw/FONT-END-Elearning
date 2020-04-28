import {combineReducers} from 'redux';
import {QuanLyKhoaHocReducer} from './Reducers/QuanLyKhoaHocReducer';
import {QuanLyNguoiDungReducer} from './Reducers/QuanLyNguoiDungReducer';
export const rootReducer = combineReducers({
  //Chứa reducer theo từng nghiệp vụ
  QuanLyKhoaHocReducer,
  QuanLyNguoiDungReducer
});
