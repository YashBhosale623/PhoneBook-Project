window.onload = function(){
	
	var quickAddBtn = document.getElementById('QuickAdd');
	var quickAddFormDiv = document.querySelector('.quickaddForm')
	var cancelBtn = document.getElementById('Cancel');
	var AddBtn = document.getElementById('Add');
	var fullname = document.getElementById('fullname');
	var phone = document.getElementById('phone');
	
	var addBookDiv = document.querySelector('.addbook');

	quickAddBtn.addEventListener("click", function(){
	
		quickAddFormDiv.style.display = "block";
		quickAddBtn.style.display = "none";
		addBookDiv.style.display = "none";

	});

	cancelBtn.addEventListener("click", function(){
		quickAddFormDiv.style.display = "none";
		quickAddBtn.style.display = "block";
			addBookDiv.style.display = "block";
	});

	AddBtn.addEventListener("click", addToBook);


	addBookDiv.addEventListener("click", removeEntry);


	var addressBook = [];
	{var objj = new jsonStructure("name","phone");
	addressBook.push(objj);
			localStorage['addbook'] = JSON.stringify(addressBook);
	addBookDiv.style.display = "none";}
	

	function jsonStructure(fullname,phone,address,city,email){
		this.fullname = fullname;
		this.phone = phone;
	
	}
	
function annotate(){
  var typed= document.getElementById("fullname").value;
  document.getElementById("printchatbox").innerHTML= typed;
}

	function addToBook(){

		var isNull = fullname.value!='' && phone.value!='' ;
		if(isNull){
			
			var obj = new jsonStructure(fullname.value,phone.value);
			addressBook.push(obj);

			localStorage['addbook'] = JSON.stringify(addressBook);
			quickAddFormDiv.style.display = "none";
			clearForm();
			showAddressBook();
			quickAddBtn.style.display = "block";
			addBookDiv.style.display = "block";
		}
	}

	function removeEntry(e){
		
		if(e.target.classList.contains('delbutton')){
			var remID = e.target.getAttribute('data-id');
			addressBook.splice(remID,1);
			localStorage['addbook'] = JSON.stringify(addressBook);
			
				showAddressBook();
			

		}
	}

	function clearForm(){
		var formFields = document.querySelectorAll('.formFields');
		for(var i in formFields){
			formFields[i].value = '';
		}
		document.getElementById('printname').innerHTML = "";
		document.getElementById('printphone').innerHTML ="";
	}

	function showAddressBook(){
		if(localStorage['addbook'] === undefined){
			localStorage['addbook'] = '';
		} else {
			addressBook = JSON.parse(localStorage['addbook']);
			
			addBookDiv.innerHTML = '';
			
			for(var n =0 ; n <1 ; n++){
				var str = '<div class="entry">';
					str += '<div class="name"><p>' + addressBook[n].fullname + '</p></div>';
		
					str += '<div class="phone"><p>' + addressBook[n].phone + '</p></div>';
			
					str += '</div>';
				addBookDiv.innerHTML += str;
			}
			for(var n =1 ; n <addressBook.length ; n++){
				var str = '<div class="entry">';
					str += '<div class="name"><p>' + addressBook[n].fullname + '</p></div>';
			
					str += '<div class="phone"><p>' + addressBook[n].phone + '</p></div>';
			
					str += '<div class="del"><a href="#" class="delbutton" data-id="' + n + '">Delete</a></div>';
					str += '</div>';
				addBookDiv.innerHTML += str;
			}
		}
	}

	showAddressBook();

}
