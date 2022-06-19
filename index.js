// Your code here
function createEmployeeRecord(arrayRecord){
    let testEmployee ={
        firstName: arrayRecord[0],
        familyName: arrayRecord[1],
        title: arrayRecord[2],
        payPerHour:arrayRecord[3],
        timeInEvents: [],
        timeOutEvents: [],
    }

 return testEmployee
}

function createEmployeeRecords(arrayRecords){
    let employeeRecords = []
    arrayRecords.map(response =>{
        employeeRecords.push(createEmployeeRecord(response))
    })
   return employeeRecords
}

function createTimeInEvent(employeeObj, dateStamp){
    let dateSplit = dateStamp.split(" ")
    let date = dateSplit[0]
    let time = dateSplit[1]
    let timeInObj ={
        type: "TimeIn",
        hour: parseInt(time),
        date: date
       
    }

    employeeObj.timeInEvents.push(timeInObj)
    return employeeObj
}

function createTimeOutEvent(employeeObj, dateStamp){
    let dateSplit = dateStamp.split(" ")
    let date = dateSplit[0]
    let time = dateSplit[1]
    let timeOutObj ={
        type: "TimeOut",
        hour: parseInt(time),
        date: date
       
    }

    employeeObj.timeOutEvents.push(timeOutObj)
    return employeeObj

}

function hoursWorkedOnDate(employeeObj, date){
    let timeIn 
    let timeOut 
    for ( let i = 0; i < employeeObj.timeOutEvents.length; i++){

        if (employeeObj.timeOutEvents[i].date === date){

            timeIn = employeeObj.timeInEvents[i].hour.toString()
            timeOut = employeeObj.timeOutEvents[i].hour.toString()
    
        }

    }
  let stop = Number(timeOut.substring(0, timeOut.length-2))  
  let start = Number(timeIn.substring(0, timeIn.length-2))

  let totalHours = stop - start
  return totalHours
}

function wagesEarnedOnDate(employeeObj, date){
    let totalHours = hoursWorkedOnDate(employeeObj, date)
    return totalHours*employeeObj.payPerHour
}

function allWagesFor(employeeObj){
        let wages =[]
        for (let i = 0; i < employeeObj.timeInEvents.length; i++){
            let dayWage = wagesEarnedOnDate(employeeObj, employeeObj.timeOutEvents[i].date)
            wages.push(dayWage);
        }
    
        const reducer = (originalValue, newValue) => originalValue + newValue;
    
        let allWages = wages.reduce(reducer)
        return allWages

    
}

function calculatePayroll(records){
    let totalPay = []
    for (let i = 0; i < records.length; i++){
        let wages = allWagesFor(records[i])
        totalPay.push(wages)
    }
    const reducer = (originalValue, newValue) => originalValue + newValue

    let payroll = totalPay.reduce(reducer)
    return payroll
}