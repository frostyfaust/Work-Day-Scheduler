//Global variables
var todaysDateEl = $("#currentDay");
var topDivEl = $("#topDiv");

// Array of objects for hours in a business day
var businessHourBlock = [
  { time: "9AM", militaryTime: 9 },
  { time: "10AM", militaryTime: 10 },
  { time: "11AM", militaryTime: 11 },
  { time: "12PM", militaryTime: 12 },
  { time: "1PM", militaryTime: 13 },
  { time: "2PM", militaryTime: 14 },
  { time: "3PM", militaryTime: 15 },
  { time: "4PM", militaryTime: 16 },
  { time: "5PM", militaryTime: 17 },
];

function displayTime() {
  var todaysDate = dayjs().format("dddd, MMMM D, YYYY h:mm:ss A");
  todaysDateEl.text(todaysDate);
}

$(function () {
  // itterates through array and creates div with text area & save button
  for (var i = 0; i < businessHourBlock.length; i++) {
    var newDiv = $("<div>");
    newDiv.addClass("row time-block");
    newDiv.attr({ id: businessHourBlock[i].time });

    // Checks the time and adds appropriate class
    var time = dayjs().format("H");
    if (businessHourBlock[i].militaryTime > time) {
      newDiv.removeClass("present past");
      newDiv.addClass("future");
    } else if (businessHourBlock[i].militaryTime == time) {
      newDiv.removeClass("future past");
      newDiv.addClass("present");
    } else {
      newDiv.removeClass("present future");
      newDiv.addClass("past");
    }

    //creates new div that displays hour of the day
    var hourBlock = $("<div>");
    hourBlock.addClass("col-2 col-md-1 hour text-center py-3");
    hourBlock.text(businessHourBlock[i].time);

    //creates text area for user to write in.
    var textArea = $("<textarea>");
    textArea.addClass("col-8 col-md-10 description");
    textArea.attr("rows", "3");

    //creates button to save text written by user in text area
    var saveButton = $("<button>");
    saveButton.addClass("btn saveBtn col-2 col-md-1");
    saveButton.ariaLabel = "save";

    //stores data of specific div to local storage
    saveButton.on("click", function () {
      var textDescription = $(this).siblings(".description").val();
      var textTime = $(this).parent().attr("id");
      localStorage.setItem(textTime, textDescription);
    });

    //add save logo to save button
    var saveLogo = $("<i>");
    saveLogo.addClass("fas fa-save");
    saveLogo.ariaHidden = "true";

    //appends newly created divs + text area & button to parent element div
    topDivEl.append(newDiv);
    newDiv.append(hourBlock);
    newDiv.append(textArea);
    newDiv.append(saveButton);
    saveButton.append(saveLogo);

    //renders the locally stored data to appropiate time slot text area
    var idName = businessHourBlock[i].time;
    $("#" + idName + " .description").val(localStorage.getItem(idName));
  }
  displayTime();
  setInterval(displayTime, 1000);
});
