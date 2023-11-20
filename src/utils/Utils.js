import { Redirect } from "react-router-dom";

//url for production
// export var url = "";
// if (process.env.NODE_ENV === "development") {
//   url = "";
// } else {
//   url = window.location.host.split("/")[1];
//   if (url) {
//     url = `/${window.location.host.split("/")[1]}`;
//   } else url = process.env.PUBLIC_URL; /// ADD YOUR CPANEL SUB-URL
// }

export const QueryReallignment = (queryData) => {
  if (queryData) {
    let query = '';
    for (const [key, value] of Object.entries(queryData)) {
      // console.log(value)
      if (
        value === null ||
        (typeof value === 'string' && value.trim() === '')
      ) {
      } else {
        let result = `${key}=${value}&`;
        query = result + query;
      }
    }
    let result = query.slice(0, -1);
    return result;
  }
};

export const formatNumber = (number) => {
  const decillion = 1e33;
  const nonillion = 1e30;
  const octillion = 1e27;
  const septillion = 1e24;
  const sextillion = 1e21;
  const quintillion = 1e18;
  const trillion = 1e12;
  const billion = 1e9;
  const million = 1e6;
  const thousand = 1e3;

  if (Math.abs(number) >= decillion) {
    return (number / decillion).toFixed(2).replace(/\.0$/, '') + 'D';
  } else if (Math.abs(number) >= nonillion) {
    return (number / nonillion).toFixed(2).replace(/\.0$/, '') + 'N';
  } else if (Math.abs(number) >= octillion) {
    return (number / octillion).toFixed(2).replace(/\.0$/, '') + 'O';
  } else if (Math.abs(number) >= septillion) {
    return (number / septillion).toFixed(2).replace(/\.0$/, '') + 'S';
  } else if (Math.abs(number) >= sextillion) {
    return (number / sextillion).toFixed(2).replace(/\.0$/, '') + 'SX';
  } else if (Math.abs(number) >= quintillion) {
    return (number / quintillion).toFixed(2).replace(/\.0$/, '') + 'Q';
  } else if (Math.abs(number) >= trillion) {
    return (number / trillion).toFixed(2).replace(/\.0$/, '') + 'T';
  } else if (Math.abs(number) >= billion) {
    return (number / billion).toFixed(2).replace(/\.0$/, '') + 'B';
  } else if (Math.abs(number) >= million) {
    return (number / million).toFixed(2).replace(/\.0$/, '') + 'M';
  } else if (Math.abs(number) >= thousand) {
    return (number / thousand).toFixed(2).replace(/\.0$/, '') + 'K';
  } else {
    return number;
  }
}

//Function to validate and return errors for a form
export const checkForm = (formData) => {
  let errorState = {};
  Object.keys(formData).forEach((item) => {
    if (formData[item] === null || formData[item] === "") {
      errorState[item] = "This field is required";
    }
  });
  return errorState;
};

//Function that returns the first or first two letters from a name
export const findUpper = (string) => {
  let extractedString = [];

  for (var i = 0; i < string.length; i++) {
    if (string.charAt(i) === string.charAt(i).toUpperCase() && string.charAt(i) !== " ") {
      extractedString.push(string.charAt(i));
    }
  }
  if (extractedString.length > 1) {
    return extractedString[0] + extractedString[1];
  } else {
    return extractedString[0];
  }
};

//Function that calculates the from current date
export const setDeadline = (days) => {
  let todayDate = new Date();
  var newDate = new Date(todayDate);
  newDate.setDate(newDate.getDate() + days);
  return newDate;
};

// Function to set deadline for projects
export const setDeadlineDays = (deadline) => {
  var currentDate = new Date();
  var difference = deadline.getTime() - currentDate.getTime();
  var days = Math.ceil(difference / (1000 * 3600 * 24));
  return days;
};

//Date formatter function
export const dateFormatterAlt = (date, reverse) => {
  let d = date.getDate();
  let m = date.getMonth();
  let y = date.getFullYear();
  reverse ? (date = m + "-" + d + "-" + y) : (date = y + "-" + d + "-" + m);
  return date;
};

//Date formatter function
export const dateFormatter = (date, reverse) => {
  var dateformat = date.split("-");
  //var date = dateformat[1]+"-"+dateformat[2]+"-"+dateformat[0];
  reverse
    ? (date = dateformat[2] + "-" + dateformat[0] + "-" + dateformat[1])
    : (date = dateformat[1] + "-" + dateformat[2] + "-" + dateformat[0]);
  return date;
};

//Month Names
export const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

//todays Date
export const todaysDate = new Date();

// Function to structure date ex : Jun 4, 2011;
export const getDateStructured = (date) => {
  let d = date.getDate();
  let m = date.getMonth();
  let y = date.getFullYear();
  let final = monthNames[m] + " " + d + ", " + y;
  return final;
};

// Function to structure date ex: YYYY-MM-DD
export const setDateForPicker = (rdate) => {
  let d = rdate.getDate();
  d < 10 && (d = "0" + d);
  let m = rdate.getMonth() + 1;
  m < 10 && (m = "0" + m);
  let y = rdate.getFullYear();
  rdate = y + "-" + m + "-" + d;

  return rdate;
};

//current Time
export const currentTime = () => {
  var hours = todaysDate.getHours();
  var minutes = todaysDate.getMinutes();
  var ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;
  var strTime = hours + ":" + minutes + " " + ampm;
  return strTime;
};

//Percentage calculation
export const calcPercentage = (str1, str2) => {
  let result = Number(str2) / Number(str1);
  result = result * 100;
  return Math.floor(result);
};

//shortens a long string
export const truncate = (str, n) => {
  return str.length > n ? str.substr(0, n - 1) + " " + truncate(str.substr(n - 1, str.length), n) : str;
};

export const RedirectAs404 = ({ location }) => (
  <Redirect to={Object.assign({}, location, { state: { is404: true } })} />
);

// returns upload url
export const getUploadParams = () => {
  return { url: "https://httpbin.org/post" };
};

// Converts KB to MB
export const bytesToMegaBytes = (bytes) => {
  let result = bytes / (1024 * 1024);
  return result.toFixed(2);
};

export const bulkActionOptions = [
  { value: "suspend", label: "Suspend User" },
  { value: "delete", label: "Delete User" },
];
