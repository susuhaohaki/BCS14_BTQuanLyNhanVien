class nhanVien {
  //? Phương thức khởi tạo
  constructor(
    username,
    fullName,
    email,
    matKhau,
    datePicker,
    luongCB,
    chucVu,
    gioLam
  ) {
    this.username = username;
    this.fullName = fullName;
    this.email = email;
    this.matKhau = matKhau;
    this.datePicker = datePicker;
    this.luongCB = luongCB;
    this.chucVu = chucVu;
    this.gioLam = gioLam;
  }

  tinhLuong() {
    switch (this.chucVu) {
      case "Sếp":
        this.tongLuong = this.luongCB * 3;
        break;
      case "Trưởng phòng":
        this.tongLuong = this.luongCB * 2;
        break;
      default:
        this.tongLuong = this.luongCB;
    }
  }
  xepLoai() {
    if (this.gioLam >= 192) {
      this.xepLoai = "Nhân viên xuất sắc";
    } else if (this.gioLam >= 176) {
      this.xepLoai = "Nhân viên giỏi";
    } else if (this.gioLam >= 160) {
      this.xepLoai = "Nhân viên khá";
    } else {
      this.xepLoai = "Nhân viên trung bình";
    }
  }
}
