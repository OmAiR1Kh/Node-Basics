
/**
 * Starts the application
 * This is the function that is run when the app starts
 * 
 * It prints a welcome line, and then a line with "----",
 * then nothing.
 *  
 * @param  {string} name the name of the app
 * @returns {void}
 */
function startApp(name){
  process.stdin.resume();
  process.stdin.setEncoding('utf8');
  process.stdin.on('data', onDataReceived);
  console.log(`Welcome to ${name}'s application!`)
  console.log('for help just type "help"')
  console.log("--------------------")
}
/*
help function
help explains all the commands in this app
*/
function help(){
  console.log('hello \t \t hello! \nquit \t \t to quit the app \nlist \t \t show your list \nadd \t \t to add to your task \nremove \t \t to remove (number of task) from list\nedit \t \t to edit a task in your list\ncheck \t \t to check the task you want as done\nuncheck \t \t to uncheck the task you want as undone')
}


/**
 * Decides what to do depending on the data that was received
 * This function receives the input sent by the user.
 * 
 * For example, if the user entered 
 * ```
 * node tasks.js batata
 * ```
 * 
 * The text received would be "batata"
 * This function  then directs to other functions
 * 
 * @param  {string} text data typed by the user
 * @returns {void}
 */
function onDataReceived(text) {
  if (text === 'quit\n') {
    quit();
  }
  else if(text.startsWith('hello')){
    hello(text)
  }
  else if(text === 'help\n'){
    help()
  }
  else if(text === 'list\n'){
    list();
  }
  else if (text.startsWith('add')) {
    add(text);
  }
  else if (text.startsWith('remove')) {
    remove(text);
  }
  else if (text.startsWith('edit')) {
    edit(text);
  }
  else if (text.split(" ")[0] === 'check') {
    check(text);
  }
  else if (text.split(" ")[0] === 'uncheck') {
    uncheck(text);
  }
  else{
    unknownCommand(text);
  }
}

var tasks = [["coding", true], ["english", false]]
var undone = "[ ]"
var done = "[✓]"

/**
 * prints "unknown command"
 * This function is supposed to run when all other commands have failed
 *
 * @param  {string} c the text received
 * @returns {void}
 */
function unknownCommand(c){
  console.log('unknown command: "'+c.trim()+'"')
}


/**
 * Says hello
 *
 * @returns {void}
 */
function hello(text){
  text = text.split(" ")
  console.log('hello! ' + (text[1] || ''))
}

/**
* list 
*
* @returns {void}
*/
function list() {
  console.log("This is the list of all tasks\n")
  for (let i in tasks) {
    if (tasks[i][1] == true) {
      console.log("task " + (i * 1 + 1) + ": " + done + " " + tasks[i][0] + '\n')
    } else console.log("task " + (i * 1 + 1) + ": " + undone + " " + tasks[i][0] + '\n')
  }
}

/**
* list add task
*
* @returns {void}
*/
function add(text) {
  text == "add" ? console.log("Error") : tasks.push([text.substring(4), false])
}

/**
* list remove task
*
* @returns {void}
*/
function remove(text) {
  text = text.split(" ")
  text == "remove" ? tasks.pop() : !isNaN(text[1]) && (text[1] <= tasks.length) ? tasks.splice(text[1] - 1, 1) : console.log("item does not exist")
}

/**
* edit
*
* @returns {void}
*/
function edit(text) {
  text = text.split(' ')
  text == "edit" ? console.log("Error") : !isNaN(text[1]) && (text[1] <= tasks.length) ? tasks[text[1] - 1][0] = text.slice(2).join(' ') : tasks[tasks.length - 1][0] = text.slice(1).join(' ')
  /* if the user input a number bigger than the number of the tasks this will change the last item also */
}

/**
* edit
*
* @returns {void}
*/
function check(text) {
  text = text.split(' ')
  text == "check" ? console.log("Error") : !isNaN(text[1]) && (text[1] <= tasks.length) ? tasks[text[1] - 1][1] = true : isNaN(text[1]) ? console.log("please enter the number of task to be checked") : console.log("item does not exist")
}

/**
* edit
*
* @returns {void}
*/
function uncheck(text) {
  text = text.split(' ')
  text == "uncheck" ? console.log("Error") : !isNaN(text[1]) && (text[1] <= tasks.length) ? tasks[text[1] - 1][1] = false : isNaN(text[1]) ? console.log("please enter the number of task to be checked") : console.log("item does not exist")


}

/**
 * Exits the application
 *
 * @returns {void}
 */
function quit(){
  console.log('Quitting now, goodbye!')
  process.exit();
}
 
// The following line starts the application
startApp("Omair Khoder")
