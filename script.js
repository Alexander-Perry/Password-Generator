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

  // Prompt for password length - validates that chosen length is valid (8-128 chars)
  var passLength = prompt("Please choose your password length between 8-128 characters");
  if (passLength < 8 || passLength > 128 || isNaN(passLength) || passLength === null || passLength == "") {
    alert("Invalid password length. \n Please choose a password length between 8-128 characters.");
    return "Invalid password length. \n Please choose a password length between 8-128 characters.";
  }

  // Prompt for lower case
  if (confirm("Do you require Lower Case characters?")) {
    passSelection.push(lowercaseChars);
  }

  // Prompt for Upper case
  if (confirm("Do you require Upper Case characteds?")) {
    passSelection.push(uppercaseChars);
  }

  // Prompt for Numbers; 
  if (confirm("Do you require Numbers?")) {
    passSelection.push(numbers);
  }

  // Prompt for Special Chars
  if (confirm("Do you require Special Chars?")) {
    passSelection.push(specialchars);
  }

  // Check to ensure at least one option is selected
  if (passSelection == "") {
    alert("You have not selected any options. \nPlease try again");
    return "You have must select at least 1 option. \nPlease try again.";
  }

  // Function to create the password.
  CreatePassword(passLength, passSelection);

  // Generates the password and then validates to ensure it meets user requirements. If requirements are unmet, generate new password. 
  function CreatePassword(passLength, passSelection) {
    var charType = [passSelection.length].fill(0); // Used to validate that each requested character type has been used at least once,

    // Loop through to the password length, and select random characters within the array(s).
    // Dimension 1 is character type, dimension 2 is a nested array containing the characters for the associated selection. 
    for (let index = 0; index < passLength; index++) {
      var randDim1 = Math.floor(Math.random() * passSelection.length); //randomise array dimension 1
      var randDim2 = Math.floor(Math.random() * passSelection[randDim1].length); //randomise array dimension 2 (size based on chosen dimension 1)
      charType[randDim1] = 1; // Set the charType to 1 - to ensure each char-type has been used 
      password += passSelection[randDim1][randDim2]; 
    }
    // Validate that the charType array is of same size as the user selected criteria array. (required for following for-loop)
    if (charType.length < passSelection.length) {
      password = "";
      CreatePassword(passLength, passSelection);
    }
    // checks that each charType value is 1 to ensure each user selected option hsa been used. If fails, clear the password, restart the function and generate a new password. 
    for (i = 0; i < charType.length; i++) {
      if (charType[i] == 0) {
        password = "";
        CreatePassword(passLength, passSelection);
      }
    }
  }

  return password; //return the output password value
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
