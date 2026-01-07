const params = new URLSearchParams(window.location.search);
const name = params.get("name") || "ผู้ใช้งาน";

fetch("data/users.json")
  .then(r => r.json())
  .then(users => {
    const user = users[name];

    document.getElementById("name").textContent = name;

    if (!user) {
      document.getElementById("role").textContent = "ตำแหน่ง: -";
      document.getElementById("org").textContent = "หน่วยงาน: -";
      document.getElementById("email").textContent = "Email: -";
      return;
    }

    document.getElementById("role").textContent =
      "ตำแหน่ง: " + user.role;
    document.getElementById("org").textContent =
      "หน่วยงาน: " + user.org;
    document.getElementById("email").textContent =
      "Email: " + user.email;
  });
