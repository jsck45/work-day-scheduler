// Wait for the DOM to be fully loaded before running the code
$(document).ready(function() {
  // Get the current hour
  var currentHour = dayjs().hour();

  // Loop through each time block
  $('[id^="hour-"]').each(function() {
    var timeBlock = $(this);
    var timeValue = parseInt(timeBlock.attr('id').split('-')[1]);

    // Add class based on current time
    if (timeValue < currentHour) {
      timeBlock.addClass('past');
    } else if (timeValue === currentHour) {
      timeBlock.addClass('present');
    } else {
      timeBlock.addClass('future');
    }

    // Retrieve saved text from local storage
    var savedText = localStorage.getItem(timeBlock.attr('id'));

    // Set the text input value from local storage
    timeBlock.find('.description').val(savedText);

    // Save text to local storage when save button is clicked
    timeBlock.find('.saveBtn').on('click', function() {
      var textInput = timeBlock.find('.description').val();
      localStorage.setItem(timeBlock.attr('id'), textInput);
    });
  });
});

// Add appropriate suffix to date
function getDayWithSuffix(day) {
  if (day >= 11 && day <= 13) {
    return day + 'th';
  }

  switch (day % 10) {
    case 1:
      return day + 'st';
    case 2:
      return day + 'nd';
    case 3:
      return day + 'rd';
    default:
      return day + 'th';
  }
}

// Display today's date in header
const today = dayjs();
$('#currentDay').text(today.format('dddd, MMMM ') + getDayWithSuffix(today.format('D')));
