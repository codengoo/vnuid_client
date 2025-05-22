export function removeTones(str: string) {
  return str
    .normalize("NFD") // Tách chữ và dấu ra riêng
    .replace(/[\u0300-\u036f]/g, "") // Xóa các dấu thanh (sắc, huyền, hỏi, ngã, nặng)
    .replace(/đ/g, "d") // Chuyển đ → d
    .replace(/Đ/g, "D") // Chuyển Đ → D
    .replace(/[^a-zA-Z0-9 ]/g, "") // Loại bỏ ký tự đặc biệt (nếu cần)
    .replace(/\s+/g, " ") // Loại bỏ khoảng trắng thừa
    .trim(); // Xóa khoảng trắng đầu/cuối
}

export function compareText(a: string, b: string) {
  const case1 = removeTones(a).replaceAll(" ", "").toLocaleLowerCase();
  const case2 = removeTones(b).replaceAll(" ", "").toLocaleLowerCase();

  return case1.includes(case2);
}
