function createEmployeeRecord(array) {
    return {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: [],
    };
}

function createEmployeeRecords(arrays) {
    return arrays.map(array => createEmployeeRecord(array));
}

function createTimeInEvent(dateAndTime) {
    const [date, hour] = dateAndTime.split(' ');
    this.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour),
        date: date
    });
    return this;
}

function createTimeOutEvent(dateAndTime) {
    const [date, hour] = dateAndTime.split(' ');
    this.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour),
        date: date
    });
    return this;
}

function hoursWorkedOnDate(dateAndTime) {
    const timeIn = this.timeInEvents.find(event => event.date === dateAndTime).hour;
    const timeOut = this.timeOutEvents.find(event => event.date === dateAndTime).hour;
    return (timeOut - timeIn) / 100;
}

function wagesEarnedOnDate(dateAndTime) {
    const hoursWorked = hoursWorkedOnDate.call(this, dateAndTime);
    return hoursWorked * this.payPerHour;
}


function findEmployeeByFirstName(srcArray, firstName) {
    return srcArray.find(employee => employee.firstName === firstName);
  }


/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

function calculatePayroll(employeesArray) {
    return employeesArray.reduce((totalPayroll, employee) => totalPayroll + allWagesFor.call(employee), 0);
  }