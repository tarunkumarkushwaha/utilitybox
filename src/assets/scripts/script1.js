
const agecalculator = (bday) => {
  if (!bday || typeof bday !== "string" || !bday.includes("-")) {
    throw new Error("Please provide date in format dd-mm-yyyy");
  }

  const startdate = new Date(bday.split("-").reverse().join("-"));
  const currentdate = new Date();

  if (isNaN(startdate.getTime())) {
    throw new Error("Invalid date format");
  }

  const timeDifference = currentdate - startdate;
  const years = timeDifference / (1000 * 60 * 60 * 24 * 365);
  return Math.floor(years);
};

const daysBetweenDates = (day1, day2) => {
  if (!day1 || !day2 || !day1.includes("-") || !day2.includes("-")) {
    throw new Error("Both dates must be in dd-mm-yyyy format");
  }

  const startdate = new Date(day1.split("-").reverse().join("-"));
  const enddate = new Date(day2.split("-").reverse().join("-"));

  if (isNaN(startdate.getTime()) || isNaN(enddate.getTime())) {
    throw new Error("Invalid date(s)");
  }

  const timeDifference = enddate - startdate;
  const days = timeDifference / (1000 * 60 * 60 * 24);
  return Math.floor(days);
};


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
    name: "Random color generator",
    inputs: ["string"],
    function: hexcolgen,
    description: "Generates a random hex color code."
  },
];



export default functionarray