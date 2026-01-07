// ===== app.js =====

// ดึงชื่อจาก AuthPro
const params = new URLSearchParams(window.location.search);
const name =
  params.get("name") ||
  params.get("username") ||
  "";

// ❌ ถ้าไม่มีชื่อเลย ให้กลับไป AuthPro
if (!name) {
  window.location.href = "https://authpro.com/login";
}

// แสดงชื่อผู้ใช้งาน
const welcome = document.getElementById("welcome");
if (welcome) {
  welcome.textContent = `ยินดีต้อนรับ ${name}`;
}

// ปุ่ม "ข้อมูลของฉัน" (ตั้งทันที ไม่รอ fetch)
const profileBtn = document.getElementById("profileBtn");
if (profileBtn) {
  profileBtn.href =
    `profile.html?name=${encodeURIComponent(name)}`;
}

// 🔐 กลุ่ม role ที่ถือว่าเป็นระดับจัดการ
const MANAGER_ROLES = [
  "Manager",
  "Admin",
  "Owner",
  "Supervisor"
];

// โหลดข้อมูลผู้ใช้จาก JSON
fetch("data/users.json")
  .then(res => res.json())
  .then(users => {
    const user = users[name];

    // ถ้าไม่มีในระบบ
    if (!user) {
      console.warn("ไม่พบข้อมูลผู้ใช้ใน users.json");
      return;
    }

    // แสดงปุ่ม Manager ถ้ามีสิทธิ์
    if (MANAGER_ROLES.includes(user.role)) {
      const managerBtn = document.getElementById("managerBtn");
      if (managerBtn) {
        managerBtn.style.display = "inline-block";
        managerBtn.href =
          `manager.html?name=${encodeURIComponent(name)}`;
      }
    }
  })
  .catch(err => {
    console.error("โหลด users.json ไม่ได้", err);
  });

// 🚪 Logout กลับ AuthPro
const logoutBtn = document.getElementById("logoutBtn");
if (logoutBtn) {
  logoutBtn.onclick = () => {
    window.location.href =
      "https://www.authpro.com/auth/100000/?action=logout";
  };
}
