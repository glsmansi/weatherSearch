const city = document.getElementById("city");
const btn = document.querySelector(".btn");
const weatherReport = document.querySelector(".weather-report");

city.focus();
btn.addEventListener("click", async () => {
  console.log(city.value);

  const config = {
    headers: {
      Accept: "application/json",
    },
  };
  if (city.value != "") {
    const res = await fetch(
      "http://api.weatherstack.com/current?access_key=b02c8c68c4cadeeb83db62abb4663d2f&query=" +
        city.value +
        "&units=f",
      config
    );

    const data = await res.json();
    if (!data.error) {
      const celsiusTemp = +((data.current.temperature - 32) * 5) / 9;
      weatherReport.style.fontSize = "8rem";
      weatherReport.style.fontWeight = "800";
      weatherReport.classList.add("rainbow-text");

      weatherReport.innerText = await `${Math.ceil(celsiusTemp)}°C`;

      city.value = "";
    } else {
      invalidInput();
    }
  } else {
    invalidInput();
  }
});

function invalidInput() {
  weatherReport.style.fontSize = "35px";
  weatherReport.style.fontWeight = "800";
  weatherReport.classList.remove("rainbow-text");
  weatherReport.innerText = "*Valid Content Expected*";
}
