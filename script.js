let mobiles = [];

// Load mobile data
fetch("mobiles.json")
  .then(response => response.json())
  .then(data => {
    mobiles = data;
    loadDropdowns();
  });

// Load mobiles into dropdown
function loadDropdowns() {
    let m1 = document.getElementById("mobile1");
    let m2 = document.getElementById("mobile2");

    mobiles.forEach(mobile => {
        let option1 = new Option(mobile.name, mobile.id);
        let option2 = new Option(mobile.name, mobile.id);
        m1.add(option1);
        m2.add(option2);
    });
}

// Compare function
function compareMobiles() {
    let id1 = document.getElementById("mobile1").value;
    let id2 = document.getElementById("mobile2").value;

    let mobile1 = mobiles.find(m => m.id == id1);
    let mobile2 = mobiles.find(m => m.id == id2);

    let table = document.getElementById("result");

    table.innerHTML = `
      <tr>
        <th>Specification</th>
        <th>${mobile1.name}</th>
        <th>${mobile2.name}</th>
      </tr>
      <tr><td>Display</td><td>${mobile1.display}</td><td>${mobile2.display}</td></tr>
      <tr><td>Processor</td><td>${mobile1.processor}</td><td>${mobile2.processor}</td></tr>
      <tr><td>RAM</td><td>${mobile1.ram}</td><td>${mobile2.ram}</td></tr>
      <tr><td>Storage</td><td>${mobile1.storage}</td><td>${mobile2.storage}</td></tr>
      <tr><td>Camera</td><td>${mobile1.camera}</td><td>${mobile2.camera}</td></tr>
      <tr><td>Battery</td><td>${mobile1.battery}</td><td>${mobile2.battery}</td></tr>
      <tr><td>Price</td><td>${mobile1.price}</td><td>${mobile2.price}</td></tr>
    `;
}
