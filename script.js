// array of lowercase letter
var lowercaseLetters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
// ARRAY OF UPPERCASE
var uppercaseLetters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
//array of special cases
var specialItems = ['!', '@', '#', '$', '%', '^','&', '*', '(', ')', '_', '+', '-', '=']
//array of numbers
var numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'] 

// function to prompt user for password options
function password(){
    var length = parseInt ( //parseint is used to get a number back in response to prompt
        prompt ("How long would you like your password to be?")
    )

    // if user does not type number in prompt this will alert
    if ( isNaN (length) === true) {
        alert ("Your password length must be a number!") 
        return;
    }
    // if length is less than 8 it will alert
    if ( length < 8){
        alert("Must be at least 8 characters!") 
        return;
    }
    if ( length > 128){
        alert("Cannot be greater than 128 characters")
        return;
    }

    // click ok or cancel for each options in a confirm popup
    var hasSpecialChar = confirm("Click ok if you want special characters");
    var hasLowercase = confirm ("Click ok if you want lowercase letters");
    var hasUppercase = confirm ("Click ok if you want uppercase letters");
    var hasNumbers = confirm ("Click ok if you want numbers");

    //if user clicks cancel on all it will alert and return to prompt
    if ( hasSpecialChar === false && hasLowercase === false && hasUppercase === false && hasNumbers === false){
        alert ("You must select at least one character type")
        return;
    }

    // this is an object that stores users input
    var passwordOptions = {
        length: length,
        hasSpecialChar: hasSpecialChar, 
        hasLowercase: hasLowercase,
        hasUppercase: hasUppercase,
        hasNumbers: hasNumbers

    }

    //returning password options object so we have access to it in other functions
    return passwordOptions

}

//getting a random element from arrays
function getRandom (array){

//user math.floor to grab random index from array.
var randomIndex = Math.floor (Math.random () * array.length) 
var randomElement = array [randomIndex]
return randomElement;
//return randomElement 

}
// function to generate password with user input 
function generatePassword (){
    var options = password() //holding start of password function
    var results = [] // var to store password as its being concatinated 
    var possibleChar = [] //array to store types of characters to include in password
    var guaranteedChars = [] // array to contain one of each type of chosen characters to be used

    // conditional statement that adds array of special characters into array of possible characters based on user input
    // push new random special char to guaranteed char
    if (options.hasSpecialChar){
        possibleChar = possibleChar.concat(specialItems)
        guaranteedChars.push(getRandom(specialItems))
    }
    if (options.hasLowercase){
        possibleChar= possibleChar.concat(lowercaseLetters)
        guaranteedChars.push(getRandom(lowercaseLetters))
    }
    if (options.hasUppercase){
        possibleChar = possibleChar.concat(uppercaseLetters)
        guaranteedChars.push(getRandom(uppercaseLetters))
    }
    if (options.hasNumbers){
        possibleChar = possibleChar.concat(numbers)
        guaranteedChars.push(getRandom(numbers))
    }

    // for loop to go through password length from the options object 
    //selecting random indexes from array from possible characters and concatinating those charectors into result array
    for ( i = 0; i < options.length; i++){
        var possibleCharacters = getRandom(possibleChar)
        results.push (possibleCharacters)
    }
    // to mix in at least one of each guaranteed character into the reult
    for ( i = 0; i < guaranteedChars.length; i ++){
        results[i] = guaranteedChars[i]
    }
    return results.join ("") // transform result into string and pass into the rightPassword function
}

var generateButton = document.querySelector("#button") // get references to generate id element
function rightPassword (){ // write password to id of passwordinput
    var password = generatePassword()
    var passwordText = document.querySelector ("#password")
    passwordText.value = password
}
generateButton.addEventListener("click", rightPassword) // eventlistener for generate button