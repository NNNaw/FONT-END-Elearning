import { actionType } from '../Contants/QuanLyKhoaHocConstant';
import { settings } from '../../Commons/Settings';
import { layThongtinTaiKhoanAction } from './QuanLyNguoiDungAction'
import axios from 'axios';
import swal from 'sweetalert'

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

      set(data.length)
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


// export const themKhoaHocAction = (khoaHoc) => {
//   return dispatch => {
//     axios({
//       url: settings.domain + `/QuanLyKhoaHoc/ThemKhoaHoc`,
//       method: 'post',
//       data: { ...khoaHoc, maNhom: settings.groupID, ngayTao: '10/10/2019' },
//       headers: {
//         "Authorization": "Bearer " + localStorage.getItem(settings.token)
//       }
//     }).then(result => {
//       console.log(result.data);
//     }).catch(error => {
//       console.log(error.response.data);
//     })
//   }
// }
export const dangKyKhoaHocAction = (taiKhoan, maKhoaHoc) => {

  return dispatch => {
    axios({
      url: settings.domain + '/QuanLyKhoaHoc/DangKyKhoaHoc',
      method: 'POST',
      data: {
        taiKhoan,
        maKhoaHoc
      },
      headers: {
        "Authorization": "Bearer " + localStorage.getItem(settings.token)
      }
    }).then(result => {

      swal({
        icon: "success",
        title: "Đăng ký thành công",
        timer: 1000,
        buttons: false
      })
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

export const huyGhiDanhAction = (maKhoaHoc, taiKhoan) => {
  return dispatch => {
    axios({
      url: settings.domain + `/QuanLyKhoaHoc/HuyGhiDanh`,
      method: 'POST',
      data: {
        "maKhoaHoc": maKhoaHoc,
        "taiKhoan": taiKhoan
      },
      headers: {
        "Authorization": "Bearer " + localStorage.getItem(settings.token)
      }

    }).then(result => {
      dispatch(layThongtinTaiKhoanAction(taiKhoan))

      swal({
        icon: "success",
        title: "Hủy thành công",

      })

    }).catch(error => {

      console.log(error.response.data);
      swal({
        icon: "warning",
        title: "Đăng ký không thành công.",
        text: error.response.data,
        dangerMode: true,
      });
    })
  }
}

export const themKhoaHocAction = (khoaHoc, clearField) => {
  return dispatch => {
    axios({
      url: settings.domain + '/QuanLyKhoaHoc/ThemKhoaHoc',
      method: 'POST',
      data: {
        ...khoaHoc
      },
      headers: {
        "Authorization": "Bearer " + localStorage.getItem(settings.token)
      }
    }).then(result => {
      console.log(result.data)
      dispatch(layDanhSachKhoaHocAction())
      clearField();
      swal({
        icon: "success",
        title: "Thêm thành công",
        timer: 1000,
        buttons: false
      })
    }).catch(error => {
      console.log(error.response.data)
      swal({
        icon: "warning",
        title: "Thêm không thành công.",
        text: error.response.data,
        dangerMode: true,
      });
    })
  }
}

export const xoaKhoaHocAction = (maKhoaHoc) => {
  return dispatch => {
    axios({
      url: settings.domain + `/QuanLyKhoaHoc/XoaKhoaHoc?MaKhoaHoc=${encodeURIComponent(maKhoaHoc)}`,
      method: 'DELETE',

      headers: {
        "Authorization": "Bearer " + localStorage.getItem(settings.token)
      }

    }).then(result => {
      console.log(result.data)
      dispatch(layDanhSachKhoaHocAction())

      swal({
        icon: "success",
        title: result.data,
        timer: 1000,
        buttons: false
      })
    }).catch(error => {

      console.log(error.response.data)
      swal({
        icon: "warning",
        title: "Thông báo!!!",
        text: error.response.data,
        dangerMode: true,
      });
    })
  }
}



export const capNhatKhoaHocAction = (khoaHoc) => {


  console.log(khoaHoc)
  return dispatch => {
    axios({
      url: settings.domain + `/QuanLyKhoaHoc/CapNhatKhoaHoc`,
      method: 'PUT',
      data: { ...khoaHoc },

      headers: {
        "Authorization": "Bearer " + localStorage.getItem(settings.token)
      }

    }).then(result => {
      console.log(result.data)
      dispatch(layDanhSachKhoaHocAction())

      swal({
        icon: "success",
        title: "Cập nhật thành công!",
        timer: 1000,
        buttons: false
      })
    }).catch(error => {

      console.log(error.response.data)
      swal({
        icon: "warning",
        title: "Thông báo!!!",
        text: error.response.data,
        dangerMode: true,
      });
    })
  }
}