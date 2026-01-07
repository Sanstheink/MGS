const params = new URLSearchParams(window.location.search);

// 👉 รับชื่อจาก AuthPro (ใช้ name เป็นหลัก)
const name =
  params.get("name") ||
  params.get("username") ||
  "ผู้ใช้งาน";

// แสดงชื่อ
document.getElementById("welcome").textContent =
  `ยินดีต้อนรับ ${name}`;

// ลิงก์ไปหน้าโปรไฟล์ (ตั้งทันที ไม่รอ JSON)
document.getElementById("profileBtn").href =
  `profile.html?name=${encodeURIComponent(name)}`;

// โหลดข้อมูลผู้ใช้จาก JSON
fetch("data/users.json")
  .then(r => r.json())
  .then(users => {
    const user = users[name];

    // ถ้าเป็น Manager ให้เห็นปุ่มผู้จัดการ
    if (user && user.role === "Manager") {
      const managerBtn = document.getElementById("managerBtn");
      managerBtn.style.display = "block";
      managerBtn.href =
        `manager.html?name=${encodeURIComponent(name)}`;
    }
  })
  .catch(() => {
    console.log("โหลด users.json ไม่ได้ แต่ยังใช้งานพื้นฐานได้");
  });

// Logout กลับ AuthPro
document.getElementById("logoutBtn").onclick = () => {
  window.location.href = "https://authpro.com/logout";
};
