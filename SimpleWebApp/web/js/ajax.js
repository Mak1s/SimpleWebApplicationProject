let allusers=[];

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
    table += "<tr><th>ID</th><th>Name</th><th>Surname</th><th></th><th></th></tr>";
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
