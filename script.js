document.addEventListener("DOMContentLoaded", function () {
  const calculateButton = document.getElementById("calculate");
  const arrivalHourInput = document.getElementById("arrival-hour");
  const arrivalMinuteInput = document.getElementById("arrival-minute");
  const tripHoursInput = document.getElementById("trip-hours");
  const tripMinutesInput = document.getElementById("trip-minutes");
  const resultDiv = document.getElementById("result");
  const amInput = document.getElementById("AM");

  calculateButton.addEventListener("click", function () {
    const arrivalHour = parseInt(arrivalHourInput.value, 10);
    const arrivalMinute = parseInt(arrivalMinuteInput.value, 10);
    const tripHours = parseInt(tripHoursInput.value, 10) || 0;
    const tripMinutes = parseInt(tripMinutesInput.value, 10) || 0;

    const totalMinutes = tripHours * 60 + tripMinutes;

    let departureAmPm = "";
    if (amInput.checked) {
      departureAmPm = "AM";
    } else {
      departureAmPm = "PM";
    }

    let departureMinute = arrivalMinute - tripMinutes;
    let departureHour = arrivalHour - Math.floor(totalMinutes / 60);

    if (departureMinute < 0) {
      departureMinute = 60 + departureMinute;
      departureHour--;
    }

    let formattedDepartureMinute = departureMinute.toString();

    if (parseInt(formattedDepartureMinute) < 10) {
      formattedDepartureMinute = "0" + formattedDepartureMinute;
    }

    if (departureHour <= 0 && departureAmPm === "AM") {
      departureHour = 12 + departureHour;
      departureAmPm = "PM";
    } else if (departureHour <= 0 && departureAmPm === "PM") {
      departureHour = 12 + departureHour;
      departureAmPm = "AM";
    }

    if (!isNaN(departureHour) && !isNaN(departureMinute) && totalMinutes > 0) {
      const departureTime = `${departureHour}:${formattedDepartureMinute} ${departureAmPm}`;
      resultDiv.textContent = `You should leave by ${departureTime}`;
    } else {
      resultDiv.textContent =
        "Please select a valid arrival time and trip duration.";
    }
  });
});
