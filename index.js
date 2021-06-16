/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

// createEmployeeRecord
// Argument(s)
// A 4-element Array of a String, String, String, and Number corresponding to a first name, family name, title, and pay rate per hour
// Returns
// JavaScript Object with keys:
// firstName
// familyName
// title
// payPerHour
// timeInEvents
// timeOutEvents
// Behavior
// Loads Array elements into corresponding Object properties. Additionally, initialize empty Arrays on the properties timeInEvents and timeOutEvents.

function createEmployeeRecord(employee) {
    const employeeRecord = {
      firstName: employee[0],
      familyName: employee[1],
      title: employee[2],
      payPerHour: employee[3],
      timeInEvents: [],
      timeOutEvents: []
    }
  
    return employeeRecord
  }

// createEmployeeRecords
// Argument(s)
// Array of Arrays
// Returns
// Array of Objects
// Behavior
// Converts each nested Array into an employee record using createEmployeeRecord and accumulates it to a new Array

function createEmployeeRecords(arrayOfArrays) {
    return arrayOfArrays.map( employee => {
      return createEmployeeRecord(employee)
    })
  }

// createTimeInEvent
// Argument(s)
// A date stamp ("YYYY-MM-DD HHMM"), where time is expressed in 24-hour standard (Links to an external site.)
// Returns
// The record that was just updated
// Behavior
// Add an Object with keys:
// type: Set to "TimeIn"
// hour: Derived from the argument
// date: Derived from the argument

function createTimeInEvent(dateStamp) {
    const timeInObject = {
      type: "TimeIn",
      hour: parseInt(String(dateStamp.split(" ")[1].slice(0,2)) + "00"),
      date: dateStamp.split(" ")[0]
    }
  
    this.timeInEvents.push(timeInObject)
    return this
  }

// createTimeOutEvent
// Argument(s)
// A date stamp ("YYYY-MM-DD HHMM"), where time is expressed in 24-hour standard (Links to an external site.)
// Returns
// The record that was just updated
// Behavior
// Add an Object with keys:
// type: Set to "TimeOut"
// hour: Derived from the argument
// date: Derived from the argument

function createTimeOutEvent(dateStamp) {
    const timeOutObject = {
      type: "TimeOut",
      hour: parseInt(String(dateStamp.split(" ")[1].slice(0,2)) + "00"),
      date: dateStamp.split(" ")[0]
    }
    this.timeOutEvents.push(timeOutObject)
    return this
  }
// hoursWorkedOnDate
// Argument(s)
// A date of the form "YYYY-MM-DD"
// Returns
// Hours worked, an Integer
// Behavior
// Given a date, find the number of hours elapsed between that date's timeInEvent and timeOutEvent

function hoursWorkedOnDate(dateStamp) {
    const reviewDate = dateStamp.split(" ")[0]
  
    const timeInOnDate = this.timeInEvents.find(dateReviewed)["hour"]
    const timeOutOnDate = this.timeOutEvents.find(dateReviewed)["hour"]
  
    function dateReviewed(element, index, array) {
      return element.date === reviewDate
    }
    return parseInt(String(timeOutOnDate - timeInOnDate)) / 100 
  
}
// wagesEarnedOnDate
// Argument(s)
// A date of the form "YYYY-MM-DD"
// Returns
// Pay owed
// Behavior
// Using hoursWorkedOnDate, multiply the hours by the record's payRate to determine amount owed. Amount should be returned as a number.

function wagesEarnedOnDate(dateString) {

    const amountOwed = hoursWorkedOnDate.call(this, dateString) * this.payPerHour

    return amountOwed
}

// allWagesFor
// Argument(s)
// None
// Returns
// Sum of pay owed to all employees for all dates, as a number
// Behavior
// Using wagesEarnedOnDate, accumulate the value of all dates worked by the employee in the record used as context. Amount should be returned as a number. HINT: You will need to find the available dates somehow....
// findEmployeeByFirstName
// Argument(s)
// srcArray: Array of employee records
// firstName: String representing a first name held in an employee record
// Returns
// Matching record or undefined
// Behavior
// Test the firstName field for a match with the firstName argument

function findEmployeeByFirstName(employeeRecordsArray, firstName) {
    console.log("what is this", this)
    const findEmployee = employeeRecordsArray.find( (element) => { return element.firstName === firstName } )
  
    return findEmployee
} 
  
// calculatePayroll
// Argument(s)
// Array of employee records
// Returns
// Pay owed for all dates
// Behavior
// Using wagesEarnedOnDate, accumulate the value of all dates worked by the employee in the record used as context. Amount should be returned as a number.

function calculatePayroll(employeeRecords) {
    const allWagesDue = employeeRecords.map( (employee) => {return allWagesFor.call(employee)} ) 
  
    let totalWages = allWagesDue.reduce( (memo, wages) => { return memo + wages}, 0)
  
    return totalWages
  }