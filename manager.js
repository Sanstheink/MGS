fetch("data/users.json")
  .then(r => r.json())
  .then(users => {
    const box = document.getElementById("staffList");

    Object.entries(users).forEach(([name, data]) => {
      const div = document.createElement("div");
      div.innerHTML = `
        <strong>${name}</strong><br>
        ตำแหน่ง: ${data.role}<br>
        หน่วยงาน: ${data.org}<br>
        <hr>
      `;
      box.appendChild(div);
    });
  });
