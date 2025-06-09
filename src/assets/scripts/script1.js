let str = "how to add translate / button on to website you are making";
let parstr = "raceCar"
let password = "facebookiaPassword@"
let word = "rationalIsation"
let numarr = [1, 1, 2, 5, 3, 4, 9, 6, 1, 0, 7, 8, 9, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, -5]
let numarr2 = [1, 2, 4, 8, 1, 2, 3]
let numarr3 = [10, 20, 30, 40]
let emobj = {}
let obj = { ram: 123, shyam: 123, rama: 12233 }
let objarray = [['ram', 123], ['shyam', 123], ['rama', 12233]]

//please include any new function in function array last included was agecalculator
// console.log(7 % 3)

const numberextractor = (string) => {
 return string
}

console.log(numberextractor("23ksk123ws"))

const fizbuzz = (num1, num2) => {
  let array = new Array
  for (let index = num1; index <= num2; index++) {
    array.push(index)
  }

  return array.map((item) => {
    if (item % 3 == 0 && item % 5 == 0) {
      return `fizbuzz${item}`
    }
    else if (item % 3 == 0) {
      return `fiz${item}`
    }
    else if (item % 5 == 0) {
      return `buzz${item}`
    }
    else { return item }
  })
}

// console.log(fizbuzz(12,30))

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

// console.log(agecalculator("28-10-1992"))

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

// console.log(daysBetweenDates("12-12-2023", "15-12-2023")) 

const simpleintrestcalculator = (numarray) => {
  console.log(numarray[0], numarray[1], numarray[2])
  return (numarray[0] * numarray[1] * numarray[2]) / 100
}

// console.log(simpleintrestcalculator([10,23,10]))

const checkPalindrome = (str) => {
  if (!str || str.length <= 0) { return false }
  let str1 = str.toLowerCase().replace(/\W/g, "").trim()
  let str2 = str.toLowerCase().replace(/\W/g, "").trim().split("").reverse().join("")
  return str2 == str1
}

// console.log(checkPalindrome(str))

const arrayToObject = (arr) => {
  // let outputobj = {}
  // arr.forEach((item)=>{outputobj[item[0]] = item[1]})
  // return outputobj
  return Object.fromEntries(arr)
}

// console.log(arrayToObject(objarray))

const objectToarray = (object) => {
  // let key = Object.keys(object)
  // let values = Object.values(object)
  // return values.map((value,i)=>{return [key[i],value]})
  return Object.entries(object)
}

// console.log(objectToarray(obj))

const emptyObjetDetector = (object) => {
  let keyarr = []
  for (const key in object) {
    keyarr.push(key)
  }
  // return keyarr.length < 1 ? "object is empty" : "object is not empty"
  return Object.keys(object).length < 1 ? "object is empty" : "object is not empty"
}

// console.log(emptyObjetDetector(emobj))

const hexcolgen = () => {
  let color = "#"
  for (let i = 0; i < 6; i++) {
    color += Math.floor(Math.random() * 16).toString(16)
  }
  return color
}

// console.log(hexcolgen())

const passwordValidator = (pass) => {
  let passobject = { password: pass, error: false, errormessege: "" }
  if (pass.length > 8) {
    let capital = []
    let small = []
    let specialordigit = []
    pass.split('').map((char) => {
      if (char.charCodeAt() >= 65 && char.charCodeAt() <= 90) {
        capital.push(char)
      }
      else if (char.charCodeAt() >= 97 && char.charCodeAt() <= 122) {
        small.push(char)
      } else { specialordigit.push(char) }
    })
    if (capital.length < 1) {
      passobject.error = true
      passobject.errormessege = "password must contain a capital letter"
      return passobject
    }
    if (specialordigit.length < 1) {
      passobject.error = true
      passobject.errormessege = "password must contain a special letter"
      return passobject
    }
    else { return passobject }
  }
  else if (pass.length < 8 || pass.length == 0) {
    passobject.error = true
    passobject.errormessege = "password must be of 8 characters"
    return passobject
  }
}

// console.log(passwordValidator(password))

const numberGenerator = (a, b, arr = []) => {
  // for (let index = a; index <= b; index++) {
  //   arr.push(index) 
  // }
  // return arr

  // important

  if (a <= b) {
    arr.push(a);
    return numberGenerator(a + 1, b, arr)
  }
  return arr
}

// console.log(numberGenerator(-2, 10))

const truncateString = (str, maxLength) => {
  if (str.length > maxLength) {
    return str.slice(0, maxLength).concat('...')
  } else { return str }
}

// console.log(truncateString(parstr, 4))

const repeatString = (str, times) => {
  // if (times <= 0) {
  //   return "enter valid string";
  // } else if (times === 1) {
  //   return str;
  // } else {
  //   return str + repeatString(str, times - 1);
  // }
  return times > 0 ? str.repeat(times) : "enter valid string"
}

// console.log(repeatString("robo-", 4))

const FibonacciCalculator = (num) => {
  //   if (num == 0) {
  //     return num
  //   }
  //   else {
  //     let result = [0, 1]
  //     for (let i = 1; i < num-1; i++) {
  //       result.push(result[i] + result[i - 1])
  //     }
  //     return result[result.length - 1]
  //   }
  if (num <= 1) {
    return num;
  } else {
    return FibonacciCalculator(num - 1) + FibonacciCalculator(num - 2);
  }
}

// console.log(FibonacciCalculator(7))

const repetationCheck = (array) => {
  let max = 0
  let output = {}
  // for (const element of new Set([...array])) {
  //   output[element] = array.filter(item => item == element).length
  //   if (max < output[element]) {
  //     max = element
  //     output.maxRepeatedNo = max
  //   }
  // }

  for (const element of array) {
    output[element] = (output[element] || 0) + 1
    if (max < output[element]) {
      max = element
      output.maxRepeatedNo = max
    }
  }
  return output
}

console.log(repetationCheck(numarr2))

const medianCalculator = (numarray) => {
  let median = 0
  if (numarray.length % 2 == 0) {
    let index1 = parseInt((numarray.length - 1) / 2)
    let index2 = index1 + 1
    median = (numarray[index1] + numarray[index2]) / 2
  } else {
    let index = (numarray.length - 1) / 2
    median = numarray[index]
  }
  return median
}

// console.log(medianCalculator(numarr3))

const meanCalculator = (numarray) => {
  if (numarray.every((item) => typeof item == "string" ? false : true)) {
    return (numarray.reduce((acc, curr) => acc + (+curr), 0)) / numarray.length
  }
}

// console.log(meanCalculator(numarr3))

const stringReverser = (str) => {
  if (!str || str.length <= 0) { return false }
  let str1 = str.toLowerCase().trim().split("")
  let str2 = []
  for (let index = str1.length - 1; index >= 0; index--) {
    str2.push(str1[index])
  }
  return str2.join('')
}

// console.log(stringReverser(word))

const IsUpperCaseOrLOwerCase = (char) => {
  if (!char || char.length > 1) { return false }
  // if (char.charCodeAt() >= 65 && char.charCodeAt() <= 90) {
  //   return "is upper case"
  // }
  // else if (char.charCodeAt() >= 97 && char.charCodeAt() <= 122) {
  //   return "is lower case"
  // } 
  // or 
  if (char.trim() == char.toUpperCase()) {
    return "is upper case"
  }
  if (char.trim() == char.toLowerCase()) {
    return "is lower case"
  }
  else { return "is not alphabet" }
}

// console.log(IsUpperCaseOrLOwerCase("z"))

const convertToCamelCase = (str) => {
  if (!str || str.length <= 0) { return false }
  let str1 = str.toLowerCase().trim().split(" ")
  return str1.map(item => item[0].toUpperCase() + item.slice(1)).join('')
}

// console.log(convertToCamelCase(str))

const sumSquareAllArrayElements = (numArr) => {
  if (numArr.every((item) => typeof item == "string" ? false : true)) {
    // return numArr.reduce((acc, item, index) => {
    //   if (index <= (numArr.length - 1)) {
    //     acc += (item*item)
    //   }
    //   return acc
    // }, 0)

    // or  

    let sum = 0
    for (let i of numArr) {
      sum += i * i
    }
    return sum
  }
  else { return "numm arr has string" }
}

// console.log(sumSquareAllArrayElements(numarr3))

const ispowerof2 = (num) => {
  return num <= 0 ? false : num.toString(2).split('').map(item => parseInt(item)).filter((i) => i == 1).length == 1
}

// console.log(ispowerof2(7))
// console.log(ispowerof2(8))
// console.log(ispowerof2(0))

const vowelcheck = (str) => {
  if (!str || str.length <= 0) { return false }
  let str1 = str.toLowerCase().trim().split(" ")
  return str1.reduce((acc, curr) => {
    if (curr[0] === "a" || curr[0] === "e" || curr[0] === "i" || curr[0] === "o" || curr[0] === "u") {
      // acc = acc + 1
      acc += 1
    }
    return acc
  }, 0)
}

// console.log(vowelcheck(str))

const sumofd = (num) => {
  let numdigit = num.toString().split("")
  // return numdigit.reduce((acc,curr) => acc + (+curr),0)
  let sum = 0
  numdigit.forEach((item) => sum = sum + (+item))
  return sum
}

// console.log(sumofd(55550))

const arrayEqualityCheck = (arr1, arr2) => {
  if (arr1.length !== arr2.length) return false;
  // for(let i = 0; i < arr1.length; i++){
  //   if(arr1[i] !== arr2[i]) return false;
  // }
  // return true;

  return arr1.every((item, i) => item == arr2[i])
}
// console.log(arrayEqualityCheck(numarr3, numarr2))

const factorialCalculator = (num) => {
  if (num == 0) {
    return 1
  }
  else {
    // let result = num
    // for (let i = 1; i < num; i++) {
    //   result = result * (num - i)
    // }
    // return result

    // BY RECURSION 
    return num * factorialCalculator(num - 1)
  }
}

// console.log(factorialCalculator(5))


const checkMax = (numarray) => {
  if (numarray.length <= 0) { return "array empty" }
  if (numarray.every((item) => typeof item == "string" ? false : true)) { return "array has string" }
  // let maxno = numarray.sort((a,b) => b-a)
  //   return maxno[0]
  return Math.max(...numarray)
}

// console.log(checkMax(numarr))

const checkMin = (numarray) => {
  if (numarray.length <= 0) { return "array empty" }
  if (numarray.every((item) => typeof item == "string" ? false : true)) { return "array has string" }
  let minno = numarray.sort((a, b) => a - b)
  return minno[0]
  // return Math.min(...numarray)
}

// console.log(checkMin(numarr))

const checkTriangleType = (a, b, c) => {
  if (a == b && b == c) { return "equlateral tringle" }
  else if (a != b && b != c && a != c) { return "scalane tringle" }
  return "isosceles tringle"
}
// console.log(checkTriangleType(3,2,1))

const occuranceletter = (word, char) => {
  if (!word || word.length <= 0) { return false }
  let arr = word.toLowerCase().trim().split("")
  // let result = arr.reduce((acc,i)=>{if(i==char){
  //   acc++
  // }
  //    return acc                              
  //    },0)
  let result = arr.filter((i) => i == char).length
  return result
}

// console.log(occuranceletter(word,"a"))

const occuranceword = (str, char) => {
  if (!str || str.length <= 0 || str.length >= 280) { return false }
  let arr = str.trim().split(" ")
  let result = arr.filter((i) => i == char).length
  // console.log(str,char)
  return result
}

// console.log(occuranceword(str,"to"))

const hashgenerator = (str) => {
  if (!str) { return false }
  if (str.length <= 0 || str.length >= 280) { return false }
  let arr = str.trim().split(" ")
  arr = arr.map(item => {
    return item.slice(0, 1).toUpperCase().concat(item.slice(1))
    // return item.replace(item[0],item[0].toUpperCase())
  })
  arr.unshift("#")
  return arr.join("")
}

// console.log(hashgenerator(str))

const longestWordCheck = (str) => {
  if (!str) { return false }
  if (str.length <= 0) { return false }
  let arr = str.trim().split(" ");
  // let word =""
  // for(let i=0;i<arr.length;i++){
  //   if(word.length < arr[i].length){
  //     word = arr[i]
  //   }
  //   }
  // return word;
  return arr.sort((b, a) => a.length - b.length)[0]
}

// console.log(longestWordCheck(str))

const functionarray = [
  {
    name: "simple intrest calculator",
    inputs: ["num array"],
    function: simpleintrestcalculator,
    description: "Calculates the simple interest given the principal, rate, and time."
  },
  {
    name: "hashgenerator",
    inputs: ["string"],
    function: hashgenerator,
    description: "Generates a hash value for the given string."
  },
  {
    name: "check Palindrome",
    inputs: ["string"],
    function: checkPalindrome,
    description: "Checks if the given string is a palindrome."
  },
  {
    name: "longest Word finder",
    inputs: ["string"],
    function: longestWordCheck,
    description: "Finds the longest word in the given string."
  },
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
    name: "occurance of word",
    inputs: ["sentance", "word"],
    function: occuranceword,
    description: "Finds the number of occurrences of a word in a sentence."
  },
  {
    name: "random color generator",
    inputs: ["string"],
    function: hexcolgen,
    description: "Generates a random hex color code."
  },
  {
    name: "number repetation Check",
    inputs: ["number"],
    function: repetationCheck,
    description: "Checks for repetitions of a number in a given array."
  },
  {
    name: "median Calculator",
    inputs: ["num array"],
    function: medianCalculator,
    description: "Calculates the median of an array of numbers."
  },
  {
    name: "mean Calculator",
    inputs: ["num array"],
    function: meanCalculator,
    description: "Calculates the mean of an array of numbers."
  },
  {
    name: "string Reverser",
    inputs: ["string"],
    function: stringReverser,
    description: "Reverses the given string."
  },
  {
    name: "convert To CamelCase",
    inputs: ["string"],
    function: convertToCamelCase,
    description: "Converts the given string to camelCase."
  },
  {
    name: "Nth Fibonacci no",
    inputs: ["number"],
    function: FibonacciCalculator,
    description: "Calculates the Nth Fibonacci number."
  },
  {
    name: "sum of Square numbers",
    inputs: ["num array"],
    function: sumSquareAllArrayElements,
    description: "Calculates the sum of squares of all elements in the array."
  },
  {
    name: "check no of vowel",
    inputs: ["string"],
    function: vowelcheck,
    description: "Counts the number of vowels in the given string."
  },
  {
    name: "sum of digits",
    inputs: ["number"],
    function: sumofd,
    description: "Calculates the sum of the digits of the given number."
  },
  {
    name: "factorial Calculator",
    inputs: ["number"],
    function: factorialCalculator,
    description: "Calculates the factorial of the given number."
  },
  {
    name: "check Max number",
    inputs: ["num array"],
    function: checkMax,
    description: "Finds the maximum number in the array."
  },
  {
    name: "check Min number",
    inputs: ["num array"],
    function: checkMin,
    description: "Finds the minimum number in the array."
  },
  {
    name: "check Triangle Type",
    inputs: ["num array"],
    function: checkTriangleType,
    description: "Determines the type of triangle given the lengths of its sides."
  }
];



export default functionarray