//object
const person={
    name:"John Doe",
    age:30,
    isStudent:false,
    hobbies:["reading","swimming","painting"]
};
console.log(person);
console.log(person.hobbies);

// use of const( if any variable is const then the data inside it doesnot change)

const name='arushi';
console.log(name);
//name='surjeet';
//console.log(name)

// use of let and var
let num1=2;
let num2=5;
let total=num1+num2;
console.log(total);

var num3=8;
var num4=5;
num3=10;   //we can change the value of let and var.
let total1=num3+num4;
console.log(total1)
console.log(typeof total1)

//array
const cars=["BMW","volvo","ferreri", 32, 'c']; // you can print anything with out declear its types.
console.log(cars)
cars.push("tesla");
//cars=["BMW","volvo","ferreri", 32, 'c',"lambourgini"]  you can't do like that seperately adding the elemnt to the const define element.
cars.pop();
cars.pop();
console.log(cars);
console.log(cars[2]);

// if else
var hour=16;
if(hour<12){
    console.log("we are not allowed");
}
else{
    console.log("we are allowed")
}

//loop
var count=10;
for(i=0; i<count; i++){
    console.log(i);
}

//function & different types of function
const ages=[32,33,16,40];
const result=ages.filter(checkage);

function checkage(age){
    return age>=18;
}
console.log(result);

//first way
function add(a,b){
  return a+b;
}
//second way
var add=function(a,b){
    return a+b;
}
//third way
var add=(a,b) =>{
    return a+b
}
//forth way
var add=(a,b) => a+b;

// run function directly
(function (){
    console.log('surjeet kumar')
})();

var finalresult=add(44,7);  // call of add function and store in finalresult
console.log(finalresult);

// callback function:- when one fuction is call into another function
/*function callback(){
    console.log('surjeet is calling the callback function')
    
} 
*/  
/*const subtract=(x,y,callback)=>{
    var res=x+y;
    console.log(res);
    callback();
}
subtract(4,9,callback);
*/

// second way to calling the function without defining the callback function.

const subtract=(x,y,callback)=>{
    var res=x-y;
    console.log(res);
    callback();
}
//subtract(5,3, function(){
  //      console.log('subtract complete');
//})

subtract(5,3, ()=>console.log('subtract complete'));



// important core modules fuction of Node Js
var fs=require('fs');
var os=require('os');

var user=os.userInfo();
console.log(user);
console.log(user.username);

fs.appendFile('greeting.txt', 'Hi'+ user.username + '!\n', ()=>{
    console.log('file is created');
})

console.log(fs)

// importing the other file through module.exports
const notes=require('./notes.js');
var age=notes.age;
var final=notes.addnummber(8,5);
console.log(final);
console.log(age);
var _=require('lodash');  // handy to deal with the data
const data=["person","person",1,1,2,2,"name", "age", "age"];
var filter=_.uniq(data);
console.log(filter);
