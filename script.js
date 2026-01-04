
const API_KEY = "5fec79a4c7msh4a9df39095a85a4p14ffbdjsnd4c8ec2dd321";   // 🔴 replace with your NEW key
const API_HOST = "mobile-phone-specs-database.p.rapidapi.com";


window.onload = () => {
  loadMobilesByBrand("samsung"); // default brand
};


async function loadMobilesByBrand(brand) {
  const url = `https://mobile-phone-specs-database.p.rapidapi.com/gsm/get-models-by-brand/${brand}`;

  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": API_KEY,
      "X-RapidAPI-Host": API_HOST
    }
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();

    const m1 = document.getElementById("mobile1");
    const m2 = document.getElementById("mobile2");

    // clear old options
    m1.innerHTML = `<option value="">Select Mobile 1</option>`;
    m2.innerHTML = `<option value="">Select Mobile 2</option>`;

    data.forEach(phone => {
      m1.add(new Option(phone.name, phone.id));
      m2.add(new Option(phone.name, phone.id));
    });

  } catch (error) {
    console.error("Error loading mobiles:", error);
    alert("Failed to load mobile list");
  }
}


async function getPhoneSpecs(phoneId) {
  const url = `https://mobile-phone-specs-database.p.rapidapi.com/gsm/get-specifications-by-phone-custom-id/${phoneId}`;

  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": API_KEY,
      "X-RapidAPI-Host": API_HOST
    }
  };

  const response = await fetch(url, options);
  return await response.json();
}


async function compareMobiles() {
  const id1 = document.getElementById("mobile1").value;
  const id2 = document.getElementById("mobile2").value;

  if (!id1 || !id2) {
    alert("Please select two mobiles to compare");
    return;
  }

  try {
    document.getElementById("result").innerHTML =
      "<tr><td colspan='3'>Loading comparison...</td></tr>";

    const phone1 = await getPhoneSpecs(id1);
    const phone2 = await getPhoneSpecs(id2);

    showComparison(phone1, phone2);

  } catch (error) {
    console.error("Comparison error:", error);
    alert("Failed to fetch mobile specifications");
  }
}

function showComparison(p1, p2) {
  document.getElementById("result").innerHTML = `
    <tr>
      <th>Specification</th>
      <th>${p1.phone_name || "Mobile 1"}</th>
      <th>${p2.phone_name || "Mobile 2"}</th>
    </tr>
    <tr><td>Brand</td><td>${p1.brand}</td><td>${p2.brand}</td></tr>
    <tr><td>Display</td><td>${p1.display}</td><td>${p2.display}</td></tr>
    <tr><td>Processor</td><td>${p1.processor}</td><td>${p2.processor}</td></tr>
    <tr><td>RAM</td><td>${p1.ram}</td><td>${p2.ram}</td></tr>
    <tr><td>Storage</td><td>${p1.storage}</td><td>${p2.storage}</td></tr>
    <tr><td>Camera</td><td>${p1.camera}</td><td>${p2.camera}</td></tr>
    <tr><td>Battery</td><td>${p1.battery}</td><td>${p2.battery}</td></tr>
  `;
}

