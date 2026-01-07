const params = new URLSearchParams(window.location.search);
const name = params.get("name");

// ❌ ถ้าไม่มี name
if (!name) {
  document.body.innerHTML = `
    <h2 style="text-align:center;margin-top:50px">
      กรุณาเข้าสู่ระบบผ่าน AuthPro
    </h2>
  `;
  throw new Error("No name");
}

// แสดงชื่อ
document.getElementById("welcome").textContent =
  `ยินดีต้อนรับ ${name}`;

// ปุ่มข้อมูลของฉัน
document.getElementById("profileBtn").href =
  `profile.html?name=${encodeURIComponent(name)}`;

// Logout
document.getElementById("logoutBtn").onclick = () => {
  window.location.href = "https://www.authpro.com/auth/100000/?action=logout";
};

// role ที่ถือว่าเป็น Manager
const MANAGER_ROLES = ["Manager", "HOA", "HOD", "HOE", "MD", "Admin", "Owner", "Supervisor"];

// โหลด users.json
fetch("data/users.json")
  .then(res => res.json())
  .then(users => {
    const user = users[name];

    if (!user) return;

    // ถ้าเป็น Manager → โชว์ปุ่ม
    if (MANAGER_ROLES.includes(user.role)) {
      const btn = document.getElementById("managerBtn");
      btn.style.display = "inline-block";
      btn.href = `manager.html?name=${encodeURIComponent(name)}`;
    }
  });
