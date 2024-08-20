export async function GetLocationData() {
    const url = 'https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json';
    const response = await fetch(url);
    const data = await response.json();
    return data;
  }