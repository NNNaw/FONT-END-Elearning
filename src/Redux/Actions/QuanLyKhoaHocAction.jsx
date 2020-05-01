import { actionType } from '../Contants/QuanLyKhoaHocConstant';
import { settings } from '../../Commons/Settings';
import axios from 'axios';

export const layDanhMucKhoaHocAction = () => {
  return dispatch => {
    axios({
      url: settings.domain + '/quanlykhoahoc/laydanhmuckhoahoc',
      method: 'get'
    }).then(result => {
      //Đưa mangDanhMucKhoaHoc => Reducer
      dispatch({
        type: actionType.LAY_DANH_MUC_KHOA_HOC,
        mangDanhMucKhoaHoc: result.data
      });
    }).catch(error => {
      console.log(error.response.data);
    })
  }
}
//định nghĩa action lấy danh sách các khoá học từ api
export const layDanhSachKhoaHocAction = () => {
  return dispatch => {
    axios({
      url: settings.domain + `/QuanLyKhoaHoc/LayDanhSachKhoaHoc?MaNhom=${settings.groupID}`,
      method: 'get'
    }).then(result => {
      //Đưa mangDanhMucKhoaHoc => Reducer
      dispatch({
        type: actionType.LAY_DANH_SACH_KHOA_HOC,
        mangKhoaHoc: result.data
      });
    }).catch(error => {
      console.log(error.response.data);
    })
  }
}
export const layDanhSachKhoaHocPhanTrangAction = (offset, perPage, set) => {
  return dispatch => {
    axios({
      url: settings.domain + `/QuanLyKhoaHoc/LayDanhSachKhoaHoc?MaNhom=${settings.groupID}`,
      method: 'get'
    }).then(result => {
      //Đưa mangDanhMucKhoaHoc => Reducer
      const data = result.data;
      const dataSliced = data.slice(offset, offset + perPage)

      dispatch({
        type: actionType.LAY_DANH_SACH_KHOA_HOC_PHAN_TRANG,
        mangKhoaHocPhanTrang: dataSliced
      });

      const count = Math.ceil(data.length / perPage)
      set(count)
    }).catch(error => {
      console.log(error.response.data);
    })
  }
}
export const layThongTinKhoaHocAction = (maKhoaHoc) => {
  return dispatch => {
    axios({
      url: settings.domain + `/QuanLyKhoaHoc/LayThongTinKhoaHoc?maKhoaHoc=${maKhoaHoc}`,
      type: 'GET'
    }).then(result => {
      console.log(result.data)
      dispatch({
        type: actionType.LAY_THONG_TIN_KHOA_HOC,
        thongTinKhoaHoc: result.data
      })
    }).catch(error => {
      console.log(error.response.data)
    })
  }
}
export const layThongTinKhoaHocTimKiemAction = (tenKhoaHoc, errorSearch, offset, perPage, set) => {
  return dispatch => {
    axios({
      url: settings.domain + `/QuanLyKhoaHoc/LayDanhSachKhoaHoc?tenKhoaHoc=${tenKhoaHoc}&MaNhom=${settings.groupID}`,
      type: 'GET'
    }).then(result => {
      const data = result.data;
      const dataSliced = data.slice(offset, offset + perPage)

      dispatch({
        type: actionType.LAY_THONG_TIN_KHOA_HOC_TIM_KIEM,
        mangKhoaHocTimKiem: dataSliced
      })
      const count = Math.ceil(data.length / perPage)
      set(count)
    }).catch(error => {
      console.log(error.response.data)
      errorSearch(error.response.data)
    })
  }
}
export const layDanhSachKhoaHocTheoDanhMucAction = (maDanhMuc) => {
  return dispatch => {
    axios({
      url: settings.domain + `/QuanLyKhoaHoc/LayKhoaHocTheoDanhMuc?maDanhMuc=${maDanhMuc}&MaNhom=${settings.groupID}`,
      type: 'GET'
    }).then(result => {

      dispatch({
        type: actionType.LAY_DANH_DANH_SACH_KHOA_HOC_THEO_DANH_MUC,
        mangKhoaHocTheoDanhMuc: result.data
      })

    }).catch(error => {
      console.log(error.response.data)
    })
  }
}


export const themKhoaHocAction = (khoaHoc) => {
  return dispatch => {
    axios({
      url: settings.domain + `/QuanLyKhoaHoc/ThemKhoaHoc`,
      method: 'post',
      data: { ...khoaHoc, maNhom: settings.groupID, ngayTao: '10/10/2019' },
      headers: {
        "Authorization": "Bearer " + localStorage.getItem(settings.token)
      }
    }).then(result => {
      console.log(result.data);
    }).catch(error => {
      console.log(error.response.data);
    })
  }
}




// export const layDanhSachKhoaHocPhanTrangAction1 = (pageCurrent, sizePage) => {
//   return dispatch => {
//     axios({
//       url: settings.domain + `/QuanLyKhoaHoc/LayDanhSachKhoaHoc_PhanTrang?page=${pageCurrent}&pageSize=${sizePage}&MaNhom=${settings.groupID}`,
//       method: 'GET',
//     }).then(result => {
//       console.log(result.data)
//       dispatch({
//         type : actionType.LAY_DANH_SACH_KHOA_HOC_PHAN_TRANG,
//         mangKhoaHocPhanTrang : result.data.items,
//         thongTinKhoaHocPhanTrang : result.data
//       })
//     }).catch(error => {
//       console.log(error.response.data);
//     })
//   }
// }