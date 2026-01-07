// ===== manager.js =====

// ดึงชื่อจาก URL
const params = new URLSearchParams(window.location.search);
const name = params.get("name") || "";

// ❌ ถ้าไม่มีชื่อ → กลับไปหน้าแรก (AuthPro จะดักเอง)
if (!name) {
  window.location.href = "index.html";
}

// 🔐 role ที่มีสิทธิ์เข้าหน้า Manager
const MANAGER_ROLES = [
  "Manager",
  "Admin",
  "HOD",
  "HOA",
  "HOE",
  "SVP",
  "Owner",
  "Supervisor"
];

// โหลดข้อมูลผู้ใช้ทั้งหมด
fetch("data/users.json")
  .then(res => res.json())
  .then(users => {
    const currentUser = users[name];

    // ❌ ไม่พบผู้ใช้ หรือ role ไม่ผ่าน
    if (!currentUser || !MANAGER_ROLES.includes(currentUser.role)) {
      document.body.innerHTML = `
        <div style="padding:40px;text-align:center">
          <h2>คุณไม่มีสิทธิ์เข้าหน้านี้</h2>
          <a href="index.html" class="btn">กลับหน้าแรก</a>
        </div>
      `;
      return;
    }

    // ✅ ผ่านสิทธิ์ → แสดงรายชื่อพนักงาน
    const staffList = document.getElementById("staffList");

    Object.entries(users).forEach(([uName, data]) => {
      const div = document.createElement("div");
      div.className = "staff-item";
      div.innerHTML = `
        <strong>${uName}</strong><br>
        ตำแหน่ง: ${data.role}<br>
        หน่วยงาน: ${data.org || "-"}<br>
        อีเมล: ${data.email || "-"}
        <hr>
      `;
      staffList.appendChild(div);
    });
  })
  .catch(err => {
    document.body.innerHTML = `
      <div style="padding:40px;text-align:center">
        <h2>เกิดข้อผิดพลาดในการโหลดข้อมูล</h2>
      </div>
    `;
    console.error(err);
  });
