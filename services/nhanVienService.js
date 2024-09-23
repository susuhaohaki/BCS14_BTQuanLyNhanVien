class NhanVienService {
  constructor() {
    this.arrNhanVien = [];
  }
  addNhanVien(newNhanVien) {
    this.arrNhanVien.push(newNhanVien);
  }
  getDetail(userDetail) {
    let nhanVienObj = this.arrNhanVien.find(function (nhanVien) {
      return nhanVien.username == userDetail;
    });
    return nhanVienObj;
  }
  userDelete(userDelete) {
    let indexDel = this.arrNhanVien.findIndex(function (nhanVien) {
      return nhanVien.username == userDelete;
    });
    this.arrNhanVien.splice(indexDel, 1);
  }
  userUpdated(objUpdate) {
    let indexUpdate = this.arrNhanVien.findIndex(function (nhanVien) {
      return nhanVien.username == objUpdate.username;
    });
    console.log("indexUpdate", indexUpdate);
    this.arrNhanVien[indexUpdate] = objUpdate;
  }
  phanLoaiNhanVien(xepLoai) {
    let arrNhanVien = nvSer.arrNhanVien.filter(function (nhanVien) {
      return nhanVien.xepLoai === xepLoai;
    });
    return arrNhanVien;
  }
}
