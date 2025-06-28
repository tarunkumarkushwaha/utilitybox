
const agecalculator = (bday) => {
  let startdate = new Date(bday.split("-").reverse().join("-"))
  let currentdate = new Date()
  let timeDifference = currentdate - startdate;

  if (isNaN(startdate)) {
    alert("dates are invalid")
  }
  let daysDifference = timeDifference / (1000 * 60 * 60 * 24 * 365);
  return Math.floor(daysDifference)
}

const daysBetweenDates = (day1, day2) => {
  let startdate = new Date(day1.split("-").reverse().join("-"))
  let enddate = new Date(day2.split("-").reverse().join("-"))
  let timeDifference = enddate - startdate;

  if (isNaN(startdate) || isNaN(enddate)) {
    alert("dates are invalid")
  }
  let daysDifference = timeDifference / (1000 * 60 * 60 * 24);
  return daysDifference
}

const hexcolgen = () => {
  let color = "#"
  for (let i = 0; i < 6; i++) {
    color += Math.floor(Math.random() * 16).toString(16)
  }
  return color
}

const functionarray = [
  {
    name: "Days Between Dates",
    inputs: ["start date", "end date"],
    function: daysBetweenDates,
    description: "Finds days past between given dates in format DD-MM-YYYY"
  },
  {
    name: "Age calculator",
    inputs: ["string"],
    function: agecalculator,
    description: "Finds age given birth date in format DD-MM-YYYY"
  },
  // {
  //   name: "",
  //   inputs: [""],
  //   function: ,
  //   description: ""
  // },
  {
    name: "random color generator",
    inputs: ["string"],
    function: hexcolgen,
    description: "Generates a random hex color code."
  },
];



export default functionarray