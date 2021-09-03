function reverseString(str) {
  var listOfChars = str.split('');
  var reversedListOfChar = listOfChars.reverse();
  var reversedString = reversedListOfChar.join('');
  return reversedString;
}

function checkPalindrome(str) {
  var reversedString = reverseString(str);
  return (str === reversedString);
}

function numToString(date) {
  var dateInStr = {
    day: '',
    month: '',
    year: ''
  }

  if (date.day < 10) {
    dateInStr.day = '0' + date.day;
  } else {
    dateInStr.day = date.day.toString();
  }

  if (date.month < 10) {
    dateInStr.month = '0' + date.month;
  } else {
    dateInStr.month = date.month.toString();
  }

  dateInStr.year = date.year.toString();
  return (dateInStr);
}

function dateAllFormats(date) {
  var ddmmyyyy = date.day + date.month + date.year;
  var mmddyyyy = date.month + date.day + date.year;
  var yyyymmdd = date.year + date.month + date.day;
  var ddmmyy = date.day + date.month + date.year.slice(-2);
  var mmddyy = date.month + date.day + date.year.slice(-2);
  var yymmdd = date.year.slice(-2) + date.month + date.day;

  return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd]
}

function checkForAllDates(date) {
  var palindromeList = dateAllFormats(date);
  var flag = false;
  for (var i = 0; i < palindromeList.length; i++) {
    if (checkPalindrome(palindromeList[i])) {
      flag = true;
      break;
    }
  }
  return flag;
}

function isLeapYear(year) {
  if (year % 400 === 0) {
    return true;
  }
  if (year % 100 === 0) {
    return false;
  }
  if (year % 4 === 0) {
    return true;
  }
  return false;
}

function getNextDate(date) {
  var day = date.day + 1;
  var month = date.month;
  var year = date.year;

  var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (month === 2) {
    if (isLeapYear(year)) {
      if (day > 29) {
        day = 1;
        month++;
      }
    } else {
      if (day > 28) {
        day = 1;
        month++;
      }
    }
  } else {
    if (day > daysInMonth[month - 1]) {
      day = 1;
      month++;
    }
  }

  if (month > 12) {
    month = 1;
    year++;
  }

  return {
    day: day,
    month: month,
    year: year
  };
}

function getNextPalindromeDate(date) {
  var counter = 0;
  var nextDate = getNextDate(date);

  while (1) {
    counter++;
    var dateStr = numToString(nextDate);
    var isPalindrome = checkForAllDates(dateStr);

    if (isPalindrome) {
      break;
    }
    nextDate = getNextDate(nextDate);
  }

  return [counter, nextDate];
}

function getPreviousDate(date) {
  var day = date.day - 1;
  var month = date.month;
  var year = date.year;

  var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (day === 0) {
    month--;
    if (month === 0) {
      month = 12;
      day = 31;
      year--;
    } else if (month === 2) {
      if (isLeapYear(year)) {
        day = 29;
      } else {
        day = 28;
      }
    } else {
      day = daysInMonth[month - 1];
    }
  }

  return {
    day: day,
    month: month,
    year: year
  }
}


function getPreviousPalindromeDate(date) {

  var previousDate = getPreviousDate(date);
  var counter = 0;

  while (1) {
    counter++;
    var dateStr = numToString(previousDate);
    var isPalindrome = checkForAllDates(dateStr);

    if (isPalindrome) {
      break;
    }
    previousDate = getPreviousDate(previousDate);
  }
  return [counter, previousDate];
}



var inputDate = document.querySelector(".input");
var checkButton = document.querySelector("#check-btn");
var output = document.querySelector(".output");

function checkDays(num) {
  return (num > 1 ? 'days' : 'day');
}

function clickHandler(e) {
  var bdayStr = inputDate.value;

  if (bdayStr !== '') {
    var listOfDate = bdayStr.split('-');
    var date = {
      day: Number(listOfDate[2]),
      month: Number(listOfDate[1]),
      year: Number(listOfDate[0])
    };

    var tempDate = numToString(date);
    var isPalindrome = checkForAllDates(tempDate);

    if (isPalindrome) {
      output.innerText = "Your birthday is palindrome";
    } else {
      var [nextCounter, nextDate] = getNextPalindromeDate(date);
      var [previousCounter, previousDate] = getPreviousPalindromeDate(date);

      if (nextCounter < previousCounter) {
        output.innerText = `The next palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year}. You missed it by ${nextCounter} ${checkDays(nextCounter)}.`
      } else {
        output.innerText = `The previous palindrome date was ${previousDate.day}-${previousDate.month}-${previousDate.year}. You missed it by ${previousCounter} ${checkDays(previousCounter)}.`
      }
    }
  } else {
    output.innerText = `Please enter the input.`
  }
}

checkButton.addEventListener("click", clickHandler);