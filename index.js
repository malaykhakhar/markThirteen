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


var date = {
  day: 31,
  month: 12,
  year: 2000
}

var dateStr = numToString(date);

console.log(getNextPalindromeDate(date));