let id = "no";
//localStorage.clear();
selectData();

function manageData() {
  document.getElementById("msg").innerHTML = "";
  let name = document.getElementById("name").value;
  if (name == "") {
    document.getElementById("msg").innerHTML = "Please enter your name"; 
	document.getElementById("msg").classList.add('alert');
	document.getElementById("msg").classList.add('alert-danger');
	setTimeout(clearMessage, 3000);
  } else {
    console.log(id);
    if (id == "no") {
      let arr = getCrudData();
      if (arr == null) {
        let data = [name];
        setCrudData(data);
      } else {
        arr.push(name);
        setCrudData(arr);
      }
      document.getElementById("msg").innerHTML = "Data added";
	  document.getElementById("msg").classList.add('alert');
	  document.getElementById("msg").classList.remove('alert-danger');
	  document.getElementById("msg").classList.add('alert-success');
	  setTimeout(clearMessage, 3000);
    } else {
      let arr = getCrudData();
      arr[id] = name;
      setCrudData(arr);
    document.getElementById("msg").innerHTML = "Data updated";
	  document.getElementById("msg").classList.add('alert');
	  document.getElementById("msg").classList.remove('alert-danger');
	  document.getElementById("msg").classList.remove('alert-success');
	  document.getElementById("msg").classList.add('alert-warning');
	  id = "no";
	  setTimeout(clearMessage, 3000);
    }
    document.getElementById("name").value = "";
    selectData();
}
}


function selectData() {
  let arr = getCrudData();

  if(arr.length <= 0 ) {
    document.getElementById("deleteAllBtn").style.display = "none";
  } else {
    document.getElementById("deleteAllBtn").style.display = "block";
  }

  if (arr != null) {
    let html = "";
    let sno = 1;
    for (let k in arr) {
      html =
        html +
        `<tr>
			<td>${sno}</td>
			<td>${arr[k]}</td>
			<td><button class="btn btn-warning" onclick="editData(${k})">Edit</button>
				<button class="btn btn-danger" onclick="deleteData(${k})">Delete</button>
			</td>
		</tr>`;
      sno++;
    }
    document.getElementById("root").innerHTML = html;
  }
}

function editData(rid) {
  id = rid;
  let arr = getCrudData();
  document.getElementById("name").value = arr[rid];
}

function deleteData(rid) {
  let arr = getCrudData();
  arr.splice(rid, 1);
  setCrudData(arr);
  selectData(); 
  confirm("Are you sure, you want to delete the record!");
}

function getCrudData() {
  let arr = JSON.parse(localStorage.getItem("crud"));
  return arr;
}

function setCrudData(arr) {
  localStorage.setItem("crud", JSON.stringify(arr));
}

function deleteAll(){
	let confirmation = confirm("Are you sure, you want to clear all the data !");
	if(confirmation) {
		localStorage.setItem("crud", JSON.stringify([]));
		selectData();
	}
}


function clearMessage() {
	document.getElementById("msg").innerHTML = "" ;
	document.getElementById("msg").classList.remove('alert');
	document.getElementById("msg").classList.remove('alert-danger');
	document.getElementById("msg").classList.remove('alert-success');
}