const params = new URLSearchParams(window.location.search);
const name = params.get("name");

document.getElementById("backBtn").href =
  `index.html?name=${encodeURIComponent(name)}`;

const MANAGER_ROLES = ["Manager", "Admin", "Owner", "Supervisor"];

fetch("data/users.json")
  .then(r => r.json())
  .then(users => {
    const me = users[name];

    if (!me || !MANAGER_ROLES.includes(me.role)) {
      document.body.innerHTML =
        "<h2>คุณไม่มีสิทธิ์เข้าหน้านี้</h2>";
      return;
    }

    const box = document.getElementById("staffList");

    Object.entries(users).forEach(([uname, u]) => {
      box.innerHTML += `
        <div>
          <b>${uname}</b><br>
          Role: ${u.role}<br>
          Org: ${u.org}<br>
          Email: ${u.email}
          <hr>
        </div>
      `;
    });
  });
