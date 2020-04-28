import {actionType} from '../Contants/QuanLyKhoaHocConstant';
import {settings} from '../../Commons/Settings';
import axios from 'axios';

export const layDanhMucKhoaHocAction = ()=>{
  return dispatch => {
    axios({
      url: settings.domain + '/quanlykhoahoc/laydanhmuckhoahoc',
      method:'get'
    }).then(result =>{
      //Đưa mangDanhMucKhoaHoc => Reducer
      dispatch({
        type:actionType.LAY_DANH_MUC_KHOA_HOC,
        mangDanhMucKhoaHoc:result.data
      });
    }).catch(error => {
      console.log(error.response.data);
    })
  }
} 
//định nghĩa action lấy danh sách các khoá học từ api
export const layDanhSachKhoaHocAction = ()=>{
  return dispatch => {
    axios({
      url: settings.domain + `/QuanLyKhoaHoc/LayDanhSachKhoaHoc?MaNhom=${settings.groupID}`,
      method:'get'
    }).then(result =>{
      //Đưa mangDanhMucKhoaHoc => Reducer
      dispatch({
        type:actionType.LAY_DANH_SACH_KHOA_HOC,
        mangKhoaHoc:result.data
      });
    }).catch(error => {
      console.log(error.response.data);
    })
  }
} 

export const layChiTietKhoaHocAction = (maKhoaHoc) => {
  return dispatch => {
    axios({
      url:settings.domain + `/QuanLyKhoaHoc/LayThongTinKhoaHoc?maKhoaHoc=${maKhoaHoc}`,
      type:'GET'
    }).then(result => {
      dispatch({
        type:actionType.LAY_CHI_TIET_KHOA_HOC,
        thongTinKhoaHoc:result.data
      })
    }).catch(error =>{
      console.log(error.response.data)
    })
  }
}

export const themKhoaHocAction = (khoaHoc) => {
    return dispatch => {
      axios({
        url:settings.domain + `/QuanLyKhoaHoc/ThemKhoaHoc`,
        method:'post',
        data:{...khoaHoc,maNhom:settings.groupID,ngayTao:'10/10/2019'},
        headers:{
          "Authorization": "Bearer " +  localStorage.getItem(settings.token)
        }
      }).then(result => {
        console.log(result.data);
      }).catch(error => {
        console.log(error.response.data);
      })
    }
}
