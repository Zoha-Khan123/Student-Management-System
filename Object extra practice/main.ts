#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";

console.log(chalk.bold.cyanBright("================================================================================================="));

console.log(chalk.bold.greenBright("\n                   Welcome to Student Management System                         "));

console.log(chalk.bold.cyanBright("\n================================================================================================"));


//Empty Array to store data of students
const studentArray: any[] = []

//Id's Of Students
let nextId = 4001;

//Loop
let condition = true;
while (condition) {

  //Choices of Student Management
  const options = await inquirer.prompt([
    {
      type: "list",
      name: "choices",
      message: "\nSelect one option",
      choices: ["Enroll Student", "Pay Tuition Fess", "Show Status", "Search Student", "Delete Student", "Exit"]
    }
  ])

  //Enroll Student
  if (options.choices === "Enroll Student") {

    //Define student
    class Students {
      id: number;
      name: string;
      courses: string
      balance: number;


      //property of student
      constructor() {
        this.id = nextId++;
        this.name = "default";
        this.courses = "default";
        this.balance = 500000;
      }

      //Use inquirer to get student name and subject
      async addStudent() {
        const studentDetails = await inquirer.prompt([
          {
            name: "studentName",
            type: "string",
            message: "Enter your name"
          }, {
            name: "courses",
            type: "list",
            choices: ["Art", "Computer Science", "Geography", "History", "Science", "Economics", "Accounts"]
          },
        ])

        this.name = studentDetails.studentName;
        this.courses = studentDetails.courses;
        console.log(chalk.bold.magentaBright(`${chalk.bold.yellowBright(this.name)} is successfully enrolled in ${chalk.bold.yellowBright(this.courses)}.🤝😊🎉`));

      }

      //Method of student
      biodata() {
        ("Name: " + this.name);
        ("Courses: " + this.courses);
        ("Id: " + this.id);
        ("Balance: " + this.balance);

      }
    }

    //finally print unlimited enrollment of students
    async function run() {
      let enrollStudents = new Students();
      await enrollStudents.addStudent()
      enrollStudents.biodata();
      studentArray.push(enrollStudents);
    }
    await run();
  }





  //Show all students which enrolled 
  else if (options.choices === "Show Status") {

    //Heading of student 1 , student 2 ............
    for (let i = 0; i < studentArray.length; i++) {
      const student = studentArray[i];
      console.log(chalk.bold.magentaBright(`\nStudentHistory ${i + 1}:`));


      //Print one by one student
      console.log((chalk.bold.yellowBright("\n                  Name: ")) + (chalk.bold.greenBright(student.name)));
      console.log((chalk.bold.yellowBright("                  ID: ")) + (chalk.bold.greenBright(student.id)));
      console.log((chalk.bold.yellowBright("                  Courses: ")) + (chalk.bold.greenBright(student.courses)));
      console.log((chalk.bold.yellowBright("                  Balance: ")) + (chalk.bold.greenBright(student.balance)))
      console.log(chalk.bold.cyanBright("\n=============================================================================="));
    }





    //Delete Student
  } else if (options.choices === "Delete Student") {

    //pehlay student ka name langay ka kon say student nay nikalna ha
    const deleteStudent = await inquirer.prompt([
      {
        name: "studentName",
        type: "input",
        message: "Enter name to delete student"
      }
    ]);

    let indexToDelete = -1;
    // Find the index of the student to delete
    for (const [index, student] of studentArray.entries()) {
      if (deleteStudent.studentName === student.name) {
        indexToDelete = index;
        break; // Exit the loop once the student is found
      }
    }

    // Check if the student was found
    if (indexToDelete !== -1) {
      // Remove the student from the array
      studentArray.splice(indexToDelete, 1);
      console.log(chalk.bold.magentaBright(`Student "${chalk.bold.yellowBright(deleteStudent.studentName)}" deleted successfully`));
    } else {
      console.log(chalk.bold.magentaBright(`Student "${chalk.bold.yellowBright(deleteStudent.studentName)}" not found`));
    }

  }





  //Search Student
  else if (options.choices === "Search Student") {

    //pehlay student ka name poochangay ka kis student ko serach karna ha
    const searchStudent = await inquirer.prompt([
      {
        name: "studentName",
        type: "input",
        message: "Enter name to search student"
      }
    ]);


    let found = false
    //Name poochnay ka bad hum student ka sara data print kar dangay

    for (const student of studentArray) {
      if (searchStudent.studentName == student.name) {
        found = true
        console.log(chalk.bold.blueBright(`\n ${student.name} is found successfully.🎉`));
        console.log((chalk.bold.yellowBright("\n                  Name: ")) + (chalk.bold.greenBright(student.name)));
        console.log((chalk.bold.yellowBright("                  ID: ")) + (chalk.bold.greenBright(student.id)));
        console.log((chalk.bold.yellowBright("                  Courses: ")) + (chalk.bold.greenBright(student.courses)));
        console.log((chalk.bold.yellowBright("                  Balance: ")) + (chalk.bold.greenBright(student.balance)))
        console.log(chalk.bold.cyanBright("\n=============================================================================="));
      }
    }
    if (!found) {
      console.log(chalk.bold.redBright("Not found Student"));
    }
  }





  //Tuition Fees
  else if (options.choices === "Pay Tuition Fess") {

    //pehlay student ka name jis nay fees pay karne ho wo langay phir us say poochangay ka kitne fees pay karne ha
    const payFees = await inquirer.prompt([
      {
        name: "name",
        type: "input",
        message: "Enter student name which want to pay fees ",
      }, {
        name: "fees",
        type: "number",
        message: "Enter amount of fees ",
      },
    ]);

    //phir fees minus kar dangay agar student na zyada amount like to if wale condition print hoge or agar sahi likhe to else wale
    for (const student of studentArray) {

      if (payFees.name === student.name) {
        const changeInNumber = parseFloat(payFees.fees)

        if (changeInNumber > student.balance) {
          console.log("Insufficient balance");
        } else {
          student.balance -= parseFloat(payFees.fees)
          console.log(chalk.bold.magentaBright(` ${chalk.bold.yellowBright(student.name)}'s fees ${chalk.bold.yellowBright(payFees.fees)} have been succesfully paid.💱👍🎉`));
        }

      }
    }


    //Exit last ma kardangay
  } else {
    break;
  }

}



console.log(chalk.bold.cyanBright("\n================================================================================================="));

console.log(chalk.bold.greenBright("\n                  Thanks for using my application                         "));

console.log(chalk.bold.cyanBright("\n================================================================================================"));
