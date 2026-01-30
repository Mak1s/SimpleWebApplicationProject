//let weak=false;
//some global scope variables( can be used anywhere).
let allusers=[];
/*
function pwdShow(){
  if(document.getElementById("pwd").type==="text"){
    document.getElementById("pwd").type="password";
    document.getElementById("checkbtn").value="Show";
  }else{
    document.getElementById("pwd").type="text";
    document.getElementById("checkbtn").value="Hide";
  }
}
function confirmPwdShow(){
  if(document.getElementById("confirmpwd").type==="text"){
    document.getElementById("confirmpwd").type="password";
    document.getElementById("confirmbtn").value="Show";
  }else{
    document.getElementById("confirmpwd").type="text";
    document.getElementById("confirmbtn").value="Hide";
  }
}
function checkPwd(){
  if(document.getElementById("pwd").value==document.getElementById("confirmpwd").value){
    document.getElementById("same").innerHTML="Matching passwords";
  }else{
    document.getElementById("same").innerHTML="Password mismatch";
  }
}
function pwdStrength(){
  let password=document.getElementById("pwd").value;
  let num= password.replace(/[^0-9]/g, '').length;
  let capital=0;
  let small=0;
  let symbol=0;
  for(var i=0; i<password.length;i++){
    if(password.charAt(i).toUpperCase()==password.charAt(i) && password.charAt(i).toLowerCase()!=password.charAt(i)){
      capital++;
    }else if (password.charAt(i).toLowerCase()==password.charAt(i) && password.charAt(i).toUpperCase()!=password.charAt(i)) {
      small++;
    }else if (password.charAt(i).toUpperCase()==password.charAt(i).toLowerCase() && isNaN(password.charAt(i))) {
      symbol++;
    }
  }

  if(password.includes("uoc") || password.includes("helmepa") || password.includes("tuc")){
    document.getElementById("w_s").innerHTML="Cannot do that";
  }else if(num>(parseInt(password.length/2))){
    document.getElementById("w_s").innerHTML="Weak password";
    weak=true;
  }else if(capital>=1 && small>=1 && symbol>=2){
    document.getElementById("w_s").innerHTML="Strong password";
    weak=true;
  }else{
    document.getElementById("w_s").innerHTML="Medium password";
    weak=true;
  }

}

 function canSub() {
   var university=document.getElementById("uni").value;
   var mail=document.getElementById("email").value;
   var unifrommail=mail.split("@").pop().split(".")[0];// seperate eg. uoc from csd4373@uoc.gr.
   var start= new Date(document.getElementById("idstart").value);//2 Date objects with the start and end dates.
   var end=new Date(document.getElementById("idend").value);
   var check=document.getElementById("terms");
   if(weak && document.getElementById("w_s").innerHTML=="Weak password"){ //check if password is weak and if user didnt check the strength warn them.
     document.getElementById("log").innerHTML="Cannot submit if your password is weak :)";
     event.preventDefault();
   }else if(!weak){
     document.getElementById("log").innerHTML="Check please if your password is weak :)";
     event.preventDefault();
   }
   if(mathitis &&(university.toLowerCase() != unifrommail)){//check if the mail and the university are same.
     document.getElementById("log").innerHTML="Is this really your academic email??";
     event.preventDefault();
   }
   if(start >= end){ //check the start and end date.
     document.getElementById("log").innerHTML="Check your pass dates, something is wrong.";
     event.preventDefault();
   }
   if(ugrad){
     if(end.getFullYear()-start.getFullYear()>6){
       document.getElementById("log").innerHTML="Since you are an undergratuate your pass cannot be valid for more than 6 years.";
       event.preventDefault();
     }
   }else if(grad){
     if(end.getFullYear()-start.getFullYear()>2){
       document.getElementById("log").innerHTML="Since you are a gratuate your pass cannot be valid for more than 2 years.";
       event.preventDefault();
     }
   }else if(phd){
     if(end.getFullYear()-start.getFullYear()>5){
       document.getElementById("log").innerHTML="Since you are a doctorate your pass cannot be valid for more than 5 years.";
       event.preventDefault();
     }
   }
   if(!check.checked){
     document.getElementById("log").innerHTML="You have to accept the terms of use and conditions";
     event.preventDefault();
   }
 }



function validCity(){
  const data = null;
  var address=document.getElementById("Address").value+" "+document.getElementById("City").value+","+document.getElementById("country").value;
  const xhr = new XMLHttpRequest();
  xhr.withCredentials = true;
  xhr.addEventListener("readystatechange", function () {
  	if (this.readyState === this.DONE) {
  		console.log(this.responseText);
  	}
  });

  xhr.open("GET", "https://forward-reverse-geocoding.p.rapidapi.com/v1/reverse?q="+address+"&accept-language=en&polygon_threshold=0.0");
  xhr.setRequestHeader("X-RapidAPI-Host", "forward-reverse-geocoding.p.rapidapi.com");
  xhr.setRequestHeader("X-RapidAPI-Key", "33d0cc7daamsheb755a718735dd6p1ca4f7jsneb2254b5644c");

  xhr.send(data);
}
*/
function createTableFromJSON(data) {
    var html = "<table><tr><th>Category</th><th>Value</th></tr>";
    for (const x in data) {
        var category = x;
        var value = data[x];
        html += "<tr><td>" + category + "</td><td>" + value + "</td></tr>";
    }
    html += "</table>";
    return html;

}

function getUser() {
    let myForm = document.getElementById('form');
    let formData = new FormData(myForm);
    const data ={};
    formData.forEach((value, key) => (data[key] = value));
    var jsonData=JSON.stringify(data);
    var xhr = new XMLHttpRequest();
    console.log(xhr);
    xhr.onload = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
        console.log(xhr);
        const responseData = JSON.parse(jsonData);   
        $('#log').html("Successful Registration.");
        $('#ajaxContent').append(createTableFromJSON(responseData));
        console.log(responseData);
    } else if (xhr.status !== 200) {
        document.getElementById("ajaxContent").innerHTML = "Request failed. Returned status of " + xhr.status + "<br>";
    }
    };
    console.log(jsonData);
    xhr.open("POST", "GetUser");
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.send(jsonData);
    
}

function displayUsers(){
    var xhr = new XMLHttpRequest();

    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const users = JSON.parse(xhr.responseText);
            $('#ajaxContent').html("<h3>All Users</h3>");
            $('#ajaxContent').append(createNameTable(users));
            allusers=users;
        }
    };
    var x=document.getElementById("ajaxContent");
    var y=document.getElementById("form");
    x.style.display="block";
    y.style.display="none";
    xhr.open("GET", "GetAllUsers");
    xhr.send();
}



function openRegister(){
    var x=document.getElementById("form");
    var y=document.getElementById("ajaxContent");
    y.style.display="none";
    x.style.display="block";
    
}



function createNameTable(users) {
    let table = `<table border='1'>`;
    table += "<tr><th>ID</th><th>Name</th><th>Surname</th></tr>";
    let i = 0;
    users.forEach(user => {
        table += `<tr id="row-${user.user_id}">
                    <td>${user.user_id}</td>
                    <td>${user.name}</td>
                    <td>${user.surname}</td>
                    <td><button id="more" onclick="showmore('${user.user_id}');">More</button></td>
                    <td><button id="delete" onclick="deleteUser('${user.user_id}');">Delete</button></td>
        
                  </tr>`;
        i++;
        
    });

    table += "</table>";
    return table;
}

function showmore(user_id){
    const row = document.getElementById(`row-${user_id}`);
    const id = Number(user_id);
    const user = allusers.find(u => u.user_id === id);
    if (!user) return;

    const existing = document.getElementById(`expand-${id}`);
    if (existing) {
        existing.remove();
        return;
    }

    const newRow = document.createElement("tr");
    newRow.id = `expand-${id}`;
    newRow.innerHTML = `<td colspan="5">
                            <b>Birthdate:</b> ${user.birthdate} <br>
                            <b>Gender:</b> ${user.gender} <br>
                            <b>Home:</b> ${user.homeaddress} <br>
                            <b>Work:</b> ${user.workaddress}<br>
                            <button id="more" onclick="showless(${id});">Show Less</button>
                        </td>`;

    row.parentNode.insertBefore(newRow, row.nextSibling);
}

function showless(index){
    if (document.getElementById(`expand-${index}`)) {
        document.getElementById(`expand-${index}`).remove();
        return;
    }
}

function deleteUser(index) {
    const id = index;
    const data = {
        user_id: id
    };

    const jsonData = JSON.stringify(data);

    const xhr = new XMLHttpRequest();

    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            console.log("Deleted:", id);

            document.getElementById("row-" + index).remove();
            $('#ajaxContent').html("<h4>User deleted sucessfully</h4>");

        } else {
            console.log("Delete failed");
        }
    };

    xhr.open("POST", "deleteUser"); 
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.send(jsonData);
}
