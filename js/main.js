function ValidateEmail(email) {
  var validRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  if (email.match(validRegex)) {
    return true;
  } else {
    alert("Địa chỉ email không hợp lệ!");
    return false;
  }
}
function ValidateUsername(username) {
  let validRegex = /^[0-9]{4,6}$/;
  if (username.match(validRegex)) {
    return true;
  } else {
    alert("Tài khoản không hợp lệ, tối đa 4-6 ký số");
    return false;
  }
}

function ValidateFullName(fullName) {
  let validRegex = /^[a-zA-ZÀ-ỹ\s]+$/;
  if (fullName.match(validRegex)) {
    return true;
  } else {
    alert("Tên nhân viên phải là chữ và không được để trống");
    return false;
  }
}

function ValidatePassword(password) {
  let validRegex =
    /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{6,10}$/;
  if (password.match(validRegex)) {
    return true;
  } else {
    alert(
      "mật Khẩu từ 6-10 ký tự (chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt), không để trống"
    );
    return false;
  }
}

function ValidateluongCB(luongCB) {
  if (luongCB <= 20000000 && luongCB >= 1000000) {
    return true;
  } else {
    alert(" Lương cơ bản 1 000 000 - 20 000 000, không để trống");
    return false;
  }
}

function ValidatechucVu(chucVu) {
  if (chucVu == "Sếp" || chucVu == "Trưởng phòng" || chucVu == "Nhân viên") {
    return true;
  } else {
    alert(
      "Chức vụ phải chọn chức vụ hợp lệ (Giám đốc, Trưởng Phòng, Nhân Viên)"
    );
    return false;
  }
}

function ValidategioLam(gioLam) {
  if (gioLam <= 200 && gioLam >= 80) {
    return true;
  } else {
    alert("Số giờ làm trong tháng 80 - 200 giờ, không để trống");
    return false;
  }
}
function hienThiTable(arrNhanVien) {
  let contentTable = "";
  //?duyệt mảng để lấy từng món đi hiển thị
  // map(callback(phần tử của mảng, vị trí phần tử){}) => input array , dùng duyệt mảng, chỉ dừng khi hết mảng
  arrNhanVien.map(function (nhanVien, index) {
    let trNhanVien = `
              <tr>
                  <td>${nhanVien.username}</td>
                  <td>${nhanVien.fullName}</td>
                  <td>${nhanVien.email}</td>
                  <td>${nhanVien.datePicker}</td>
                  <td>${nhanVien.chucVu}</td>
                  <td>${nhanVien.tongLuong}</td>
                  <td>${nhanVien.xepLoai}</td>
                  <td>
                      <button class="btn btn-primary" data-toggle="modal" data-target="#myModal" onclick="xemChiTiet('${nhanVien.username}')"> Xem  </button>
                      <button class="btn btn-danger" onclick="deleteUser('${nhanVien.username}')">Xóa</button>
                  </td>
              </tr>
          `;
    //id: 123, 456 ; f001 => tên biến
    contentTable += trNhanVien;
  });

  document.querySelector("#tableDanhSach").innerHTML = contentTable;
}

const nvSer = new NhanVienService();

function setLocalStorage() {
  localStorage.setItem("nhanVienList", JSON.stringify(nvSer.arrNhanVien));
}

//? Chiều 2: lấy dữ liêu
function getLocalStorage() {
  let result = localStorage.getItem("nhanVienList");
  if (result) {
    //console.log(result)//JSON
    nvSer.arrNhanVien = JSON.parse(result); //Array
    hienThiTable(nvSer.arrNhanVien);
  }
}
//gọi khi load
getLocalStorage();

document.querySelector("#btnThemNV").onclick = function () {
  let username = document.querySelector("#tknv").value;
  let email = document.querySelector("#email").value;
  let fullName = document.querySelector("#name").value;
  let password = document.querySelector("#password").value;
  let datePicker = document.querySelector("#datepicker").value;
  let luongCB = document.querySelector("#luongCB").value;
  let chucVu = document.querySelector("#chucvu").value;
  let gioLam = document.querySelector("#gioLam").value;
  if (
    ValidateUsername(username) &&
    ValidateEmail(email) &&
    ValidateFullName(fullName) &&
    ValidatePassword(password) &&
    ValidateluongCB(luongCB) &&
    ValidatechucVu(chucVu) &&
    ValidategioLam(gioLam)
  ) {
    const newNhanVien = new nhanVien(
      username,
      fullName,
      email,
      password,
      datePicker,
      luongCB,
      chucVu,
      gioLam
    );
    newNhanVien.tinhLuong();
    newNhanVien.xepLoai();
    nvSer.addNhanVien(newNhanVien);
    setLocalStorage();
    getLocalStorage();
    document.querySelector("#btnDong").click();
  }
};

function xemChiTiet(userDetail) {
  let nhanVienObj = nvSer.getDetail(userDetail);
  document.querySelector("#tknv").value = nhanVienObj.username;
  document.querySelector("#email").value = nhanVienObj.email;
  document.querySelector("#name").value = nhanVienObj.fullName;
  document.querySelector("#password").value = nhanVienObj.matKhau;
  document.querySelector("#datepicker").value = nhanVienObj.datePicker;
  document.querySelector("#luongCB").value = nhanVienObj.luongCB;
  document.querySelector("#chucvu").value = nhanVienObj.chucVu;
  document.querySelector("#gioLam").value = nhanVienObj.gioLam;
}

function deleteUser(userDelete) {
  nvSer.userDelete(userDelete);
  alert("Xóa thành công");
  setLocalStorage(); //lưu
  getLocalStorage(); //hiển thị
}

function userUpdate() {
  //?Input -  B1: lấy dữ liệu từ user
  let username = document.querySelector("#tknv").value;
  let email = document.querySelector("#email").value;
  let fullName = document.querySelector("#name").value;
  let password = document.querySelector("#password").value;
  let datePicker = document.querySelector("#datepicker").value;
  let luongCB = document.querySelector("#luongCB").value;
  let chucVu = document.querySelector("#chucvu").value;
  let gioLam = document.querySelector("#gioLam").value;
  if (
    ValidateUsername(username) &&
    ValidateEmail(email) &&
    ValidateFullName(fullName) &&
    ValidatePassword(password) &&
    ValidateluongCB(luongCB) &&
    ValidatechucVu(chucVu) &&
    ValidategioLam(gioLam)
  ) {
    let objUpdate = new nhanVien(
      username,
      fullName,
      email,
      password,
      datePicker,
      luongCB,
      chucVu,
      gioLam
    );
    objUpdate.tinhLuong();
    objUpdate.xepLoai();
    nvSer.userUpdated(objUpdate);
    alert("Cập nhật thành công");
    setLocalStorage();
    getLocalStorage();
    document.querySelector("#btnDong").click();
  }
}

//tìm kiếm phân loại nhân viên
function timKiemNhanVien(xepLoai) {
  let arrKetQua = nvSer.phanLoaiNhanVien(xepLoai);
  if (arrKetQua.length === 0) {
    alert("Không có kết quả tìm kiếm!");
  } else {
    hienThiTable(arrKetQua);
  }
}
document.querySelector("#btnTimNV").onclick = function () {
  let inputXepLoai = document.querySelector("#searchName").value.trim();
  timKiemNhanVien(inputXepLoai);
};
