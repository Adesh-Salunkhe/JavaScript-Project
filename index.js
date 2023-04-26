function getAndUpdate(){
    let tit = document.getElementById("title").value;
    let desc = document.getElementById("description").value;

    if(tit==""){
        alert("Please Provide at least Title")
    }
    else{
    if(localStorage.getItem("itemJson")==null){
        itemJsonArr =[];
        itemJsonArr.push([tit,desc]);
        localStorage.setItem("itemJson",JSON.stringify(itemJsonArr));
        document.getElementById("title").value = "";
        document.getElementById("description").value = "";
    }

    else{
        itemJsonArrStr = localStorage.getItem("itemJson");
        itemJsonArr = JSON.parse(itemJsonArrStr);
        itemJsonArr.push([tit,desc]);
        localStorage.setItem("itemJson",JSON.stringify(itemJsonArr));
        document.getElementById("title").value = "";
        document.getElementById("description").value = "";
    }

    update();
}
}

function update(){
    if(localStorage.getItem("itemJson")==null){
        itemJsonArr = [];
        localStorage.setItem("itemJson",JSON.stringify(itemJsonArr));
    }

    else{
        itemJsonArrStr = localStorage.getItem("itemJson");
        itemJsonArr = JSON.parse(itemJsonArrStr);
        localStorage.setItem("itemJson",JSON.stringify(itemJsonArr));

    }

    let tableBody = document.getElementById("tableBody");
    let str ="";

    itemJsonArr.forEach((element,index) => {
        str +=`
            <tr>
                <th>${index+1}</th>
                <td>${element[0]}</td>
                <td>${element[1]}</td>
                <td><button class="btn btn-secondary" onclick="deleted(${index})">Delete</button></td>
            </tr>
        
        `    
    });
    tableBody.innerHTML = str;
}

add = document.getElementById("add");
add.addEventListener("click",getAndUpdate);
update();

function deleted(itemIndex){
    console.log("Deleted item at index", itemIndex);
    itemJsonArrStr = localStorage.getItem("itemJson");
    itemJsonArr = JSON.parse(itemJsonArrStr);

    itemJsonArr.splice(itemIndex,1);

    localStorage.setItem("itemJson",JSON.stringify(itemJsonArr));
    update();
}

function clearStr(){
    if(confirm("Do You really want to Clear The list")){
        localStorage.clear();
        console.log("List cleared Successfully");
        document.getElementById("title").value = "";
        document.getElementById("description").value = "";
        update();
    }
}