const { app, BrowserWindow } = require('electron');
const fs = require('fs')
const path = require('path')

var btnCreate = document.getElementById('btnCreate')
var btnRead = document.getElementById('btnRead')
var btnDelete = document.getElementById('btnDelete')
var btnUpdate = document.getElementById('btnUpdate') 
var fileName = document.getElementById('fileName')
var fileContents = document.getElementById('fileContents')

let pathName = path.join(__dirname, 'Files')

btnCreate.addEventListener('click', function(){  //creating text file when user clicks CREATE button
  let file = path.join(pathName, fileName.value)
  let contents = fileContents.value
  fs.writeFile(file, contents, function(err){ 
    if(err){
      return console.log(err)
    }
    var txtfile = document.getElementById("fileName").value
    alert(txtfile + ", your top 5 makeup list has been created!")    
    console.log("The file was created")
  
  })
  
})

btnRead.addEventListener('click', function(){  //read contents of the created text file
  let file = path.join(pathName, fileName.value)
 
  fs.readFile(file, function(err, data){ 
    if(err){
      return console.log(err)
    }
    fileContents.value = data
    console.log("The file was read!")
  })
  
})

btnUpdate.addEventListener('click', function(){  //update contents of the text file
  let file = path.join(pathName, fileName.value)
  let contents = fileContents.value
  fs.writeFile(file, contents, function(err){ 
    if(err){
      return console.log(err)
    }
    fs.readFile(file, 'utf8', function(err, data) {
      if (err) {
        return console.log(err)
      }
      fileContents.value = data
      var txtfile = document.getElementById("fileName").value
      alert(txtfile + ", your top 5 makeup list has been updated!")    
      console.log("The file was updated")
    })
  })
})
btnDelete.addEventListener('click', function(){  
  let file = path.join(pathName, fileName.value)
 
  fs.unlink(file, function(err){ 
    if(err){
      return console.log(err)
    }
    fileName.value = ""
    fileContents.value = ""
    console.log("The file was deleted!")
  })
  
})

function goBack() {
  window.location.href = "index.html";
}