const departureInput = document.querySelector("#departure");
const arrivalInput = document.querySelector("#arrival");
const dateInput = document.querySelector("#date");
const resultsDiv = document.querySelector("#results");

document.querySelector("#search-btn").addEventListener("click", function () {
  const departure = departureInput.value.trim();
  const arrival = arrivalInput.value.trim();
  const date = dateInput.value;

  if (!departure || !arrival || !date) {
    resultsDiv.innerHTML = "<p>Merci de remplir tous les champs.</p>";
    return;
  }

  fetch("http://localhost:3000/trips", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ departure, arrival, date }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      resultsDiv.innerHTML = "";

      if (data.result) {
        for (let i = 0; i < data.trips.length; i++) {
          document.querySelector("#results").innerHTML += `
          
                <div id='#trip-result'>
                    <div class='trip-route'>
                    <p>
                    <span class='trip-info'>${data.trips[i].departure} > ${data.trips[i].arrival}</span> 
                    <span>${data.trips[i].time}</span> 
                    <span class='trip-price'>${data.trips[i].price}€<span>
                    </p>
                    <button class='book_btn'>book</button>
                    </div>
                </div>
                `;
        }
      }
    });
});
