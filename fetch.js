//ustalone base api url, opcje dostepu (key, metoda, headery)
const base_url = "https://weatherapi-com.p.rapidapi.com/current.json?q=";
const options = {
  method: "GET",
  headers: {
    "content-type": "application/octet-stream",
    "X-RapidAPI-Key": "6b49cb1091msh623a08e41c66a14p1f9f02jsn896a6852e1c1",
    "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
  },
};
//wyznaczenie buttona ktory bedzie wyzwalal akcje i zadeklarowanie zmiennej searched_url
const button = document.querySelector("button");
const resultElem = document.getElementsByClassName(".result");
const searchNow = document.querySelector("input");
let searched_url;

function showWeather() {
  // button onclick : dane z inputu + uzupelniony link do api:
  button.addEventListener("click", function (e) {
    e.preventDefault();
    searchNow.className = "searchNow"; //przywracanie searchbara do pierwotnej classy, zeby pozniejsza animacja byla powtarzalna
    const val = document.querySelector("input").value;
    searched_url = base_url + val;
    //request fetcha z API
    const request = new Request(searched_url, options);
    async function getData() {
      try {
        const response = await fetch(request);
        const data = await response.json();

        if (response.status === 200) {
          console.log("Success:", data);
          // rzezbimy:

          function displayWeather(data) {
            const locationData =
              "Are you wondering if it's sunny in " +
              data.location["name"] +
              ", " +
              data.location["country"] +
              ", where the local date and time is currently: " +
              data.location["localtime"] +
              " ?";
            const weatherData =
              " Well, the short answer is that it is now " +
              data.current.condition["text"] +
              " over there. The long answer: it does feel like " +
              data.current["feelslike_c"] +
              " degrees Celcius, but the thermometers show " +
              data.current["temp_c"] +
              " degrees, and the wind blows as fast as " +
              data.current["gust_kph"] +
              " kilometers per hour. Hold your hats!";
            //appendChild i pokazywanie nowo stworzonegoo diva na click
            const weatherDiv = document.createElement("div");
            const clearDiv = document.getElementById("div2");
            document.body.insertBefore(weatherDiv, clearDiv);
            weatherDiv.className = "weatherDiv"; //class added for styles.css
            const text = document.createElement("h5");
            const weatherText = document.createElement("h4");
            const weatherImg = document.createElement("img");
            weatherImg.src = data.current.condition["icon"];
            text.innerHTML = locationData;
            weatherText.innerHTML = weatherData;
            weatherDiv.appendChild(text);
            weatherDiv.appendChild(weatherImg);
            weatherDiv.appendChild(weatherText);
            //tried to chain the three Elem above but it look like h4, h5 and img type of Element cannot be chaines together
          }
          displayWeather(data);
        } else {
          console.log("Server error", data.error.message);
          //erroneous location
          const weatherDiv = document.createElement("div");
          const clearDiv = document.getElementById("div2");
          document.body.insertBefore(weatherDiv, clearDiv);
          weatherDiv.className = "weatherDiv";
          if (val === "") {
            const errorData1 = `You have to provide a name of a city, country, airport or a postcode!`;
            const errorText = document.createElement("h5");
            errorText.innerHTML = errorData1;
            weatherDiv.appendChild(errorText);
          } else {
            const errorData2 = `Oops! I am afraid there is no such place as ${val}, sorry mate :(`;
            const errorText = document.createElement("h5");
            errorText.innerHTML = errorData2;
            weatherDiv.appendChild(errorText);
          }
        }
      } catch (error) {
        console.log("Error:", error);
      }
    }
    getData(request);
    document.querySelector("input").value = "";
  });
}
showWeather();
function clearMe() {
  const clearButton = document.getElementById("clear");
  const searchNow = document.querySelector("input");
  clearButton.addEventListener("click", function (e) {
    //e.preventDefault(); --> nic to nie zmienia?
    const weatherDiv = document.getElementsByClassName("weatherDiv");
    if (weatherDiv.innerHTML !== "") {
      while (weatherDiv.length > 0) weatherDiv[0].remove();
      searchNow.className = "animate__animated animate__bounce";
    }
  });
}
clearMe();

// IDEA IDEA IDEA: ADD A RANDOMLY GENERATED / SELECTED/ GOOGLE SEARCHED?? IMAGE OF EACH SEARCHED PLACE
