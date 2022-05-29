// Assignment Code

//Array of chartacters
const lowercaseChars = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
const uppercaseChars = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const specialchars = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '+', '-', '.', '~', '|', '<', '>', '=', '-', '_', '/', ':', ';', '?', '[', ']', '{', '}', '~'];

var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");
  passwordText.value = password;
}

// Gather user inputs for password length and Character Types
function generatePassword() {
  var password = ""; //Clear any previously set passwords
  var passSelection = []; //Create the array for Character type selections

  var passLength = prompt("Please choose your password length (8-128 chars)");
  if (passLength < 8 || passLength > 128 || isNaN(passLength) || passLength === null || passLength == ""  ) {
    // alert("Invalid password length, please choose between 8 and 128 characters. ");
    return "Invalid password length, please choose between 8 and 128 characters. Try Again";
  }
  // if (passLength === null || passLength == ""){
  //   return;
  // }
  // Prompt for lower case
  if (confirm("Do you require Lower Case characters?")) {
    passSelection.push(lowercaseChars);
  }
  
  // Prompt for Upper case
  if (confirm("Do you require Upper Case characteds?")) {
    passSelection.push(uppercaseChars);
  }
  // Prompt for numeric; 
  if (confirm("Do you require Numbers?")) {
    passSelection.push(numbers);
  }
  // Prompt for Special Chars
  if (confirm("Do you require Special Chars?")) {
    passSelection.push(specialchars);

  }
  // Check to ensure at least one option is selected
  if (passSelection == "") {
    alert("You have not selected any options, please try again");
    return "Try again";
  }

    // Function to create the password, validating that each charType has been met
  CreatePassword(passLength, passSelection);



  function CreatePassword(passLength, passSelection) {
    // Create an array the same size as the user selected options to record each count of character type that the user wants 
    // Used to validate that each requested character type has been used at least once,
    var charType = [passSelection.length].fill(0);

    // For loop will loop through each iteration, randomizing both dimensions of the array to select random character type and character. 
    // Dimension 1 is character type, dimension 2 is the character at that position within the sub-array. 
    for (let index = 0; index < passLength; index++) {
      var randDim1 = Math.floor(Math.random() * passSelection.length);
      var randDim2 = Math.floor(Math.random() * passSelection[randDim1].length);
      charType[randDim1] = 1;
      password += passSelection[randDim1][randDim2];
    }
    if(charType.length < passSelection.length){
      password = "";
      CreatePassword(passLength, passSelection);
    }

    for(i = 0; i<charType.length; i++){
      if (charType[i] == 0) {
        password = "";
        console.log(charType);
        console.log("Failed validation");
        CreatePassword(passLength, passSelection); 
      }
    }
   
    return password;
  }
  console.log("Passed Validation");
  return password;
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
