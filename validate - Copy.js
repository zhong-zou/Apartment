/**  Develper: Fengzhong Zou
  * Date    : 29/5/2021 
  * This script validates user input in a web form. When the user click the form 'Submit' button, this scripts 
  * will run to validate the user input in the form, to ensure that the input is appropriate. It makes use of 
  *  regular expression to perform the checkup of user inputs.
  * if validation is successful, the form will be submitted. if not successful, the submission will be stopped.
*/

var bookings = [];


/**
 * This function is used to validate the user input in a contact form. It checks text messages, emails, check boxes, phone numbers and so on.
 * @returns It retruns true if the form input data are valid, the submission will proceed. Otherwise, the return is false, preventing the submission.
 */

function validateMyForm(){

  var pass=true;
  var email=true,Phone=true;
  var eid, eidm;
  eid=document.getElementById('name');
  eidm=document.getElementById('vname');
  if(/^[a-zA-Z]{2,15}$/.test(eid.value) == false) {
    eidm.innerText="Appropriate name is required.";
    pass=false;
  } else { eid.style.borderColor = "green";}
 if ((document.getElementById("email").value=="")&&(document.getElementById("phone").value=="")) {
   pass=false;
   document.getElementById("vphone").innerText="Email and phone cannot both be left blank.";}
 else {
  if (!document.getElementById("email").value=="") {
    eid=document.getElementById('email');
    eidm=document.getElementById('vemail');
    if(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(eid.value) == false) {
     email=false;
      eidm.innerText="Inappropriate email.";
   } else { eid.style.borderColor = "green";}
  }
  if (!document.getElementById("phone").value=="") {
    eid=document.getElementById('phone');
    eidm=document.getElementById('vphone');
   if(/^[0-9]{4,10}$/.test(eid.value) == false) {
     phone=false;
     eidm.innerText="Inappropriate phone number.";
   } else { eid.style.borderColor = "green";}
  }

 }


   eid=document.getElementById('message');
   eidm=document.getElementById('vmessage');
   if((/^[a-zA-Z\s]*$/.test(eid.value) == false)||(eid.value.trim()=="")) {
     eidm.innerText="Appropriate message is required.";
     pass=false;
   } else { eid.style.borderColor = "green";}

   
 return pass&&(email||phone);
}

 function dPicker() {
	 var month=["January","February","March","April","May","June","July","August","September","October","November","December"];
	 var day = ["Sunday","Monday","Tuesday","Wendesday","Thursday","Friday","Saturday"];
	 var d=new Date();
	 var currentM=d.getMonth();
	 var currentDt=d.getDate();
	 var currentDy=d.getDay();
	 var tHead1 = ['<table><tr><td colspan="7">'+month[currentM]+'</td></tr><tr><td> Sun </td><td> &nbsp;Mon </td><td> &nbsp;Tue </td><td> &nbsp;Wed </td><td> &nbsp;Thu </td><td> &nbsp;Fri </td><td> &nbsp;Sat </td></tr>'];
	 document.getElementById("calOne").innerHTML=tHead1;
	 
	 
	 
	 
	 
	 
	 function gCol(date, day) {
		 hstring="";
		 if (day=0) hstring="<tr>";
		 hstring += '<td onClick="dPicker()" id="'+date+'">'+date+'</td>';
	 }
 }
 
 


 /**
  * This function calculates the total cost for a stay in the Sorrento Apartment. The user gives the start and end date of the stay, this function will provide the user with the total expense.
  * @param the starting and ending date parameters are read from the form elements.
  * @returns There are two returns or output. The first one is the total cost of the stay. The other is a list of all bookings in the order from the earliest date to the latest date (starting).
  */
 function priceCal(){
	 var startDate, endDate;
   document.getElementById("dispPrice").innerText="";
	 startDate=document.getElementById("sdate").value;
	 endDate=document.getElementById("edate").value;
	 var sstartDate=new Date(startDate);
	 var eendDate=new Date(endDate);
	 var days=(eendDate.getTime()-sstartDate.getTime())/(1000*3600*24);
     console.log("The date is:"+sstartDate);
	 sMonth=sstartDate.getMonth();
	 var rate=250;
	 if (sMonth>=1 && sMonth<=4) rate=220;
	 if (sMonth>=5 && sMonth<=7) rate=200;
	 if (sMonth>=8 && sMonth<=11) rate=210;
	 var price=rate*days;
	 document.getElementById("dispPrice").innerText='$'+price; 
	 record={sdate:sstartDate,tprice:price};
   var don=false;
	 if (bookings.length==0) bookings.push(record);
	 else {
		 for (var i=0;i<bookings.length;i++) {
			 if (bookings[i].sdate.getTime()>record.sdate.getTime()) {bookings.splice(i,0,record);	don=true;break;}	 
		 }
     if (!don) bookings.push(record);
	 }
	 
	 list();
	 
	 
 }
 

 /**
  * This function generates a list of bookings. It displays the list on the website for management purposes. Of courses only authorized staff has access to it.
  */
 function list() {
   var html='<table><tr><th>Start Date&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th><th>Price</th></tr>';
  
   bookings.forEach(element => {
     dateMonth=element.sdate.getDate()+'/'+(element.sdate.getMonth()+1);

     html+='<tr><td>'+dateMonth+'</td><td>$'+element.tprice+'</td></tr>';
   });

   html+='</table>';
   document.getElementById("bookList").innerHTML=html;

	 
 }

 /**
  * This function performs a binary search in the booking listing to find a specific booking records.
  * @param the starting date of the booking records
  * @returns if the booking record is found then it is displayed in the webpage. Otherwise, it prompts the user that it is not found.
  */
 function searchBook() {
   var searchDate1=document.getElementById('ssdate').value;
   var searchDate=new Date(searchDate1);
  let left=0;
	let right=bookings.length-1;
	while (left != right) {
        let middle = Math.ceil((left + right) / 2);

        if (bookings[middle].sdate.getTime() > searchDate.getTime()) {
            right= middle - 1;
		}
        else {
            left = middle;
		}
		if (bookings[left].sdate.getTime() == searchDate.getTime()) {
            returnstr=" "+bookings[left].sdate.getDate()+'/'+(bookings[left].sdate.getMonth()+1)+'-- $'+bookings[left].tprice;
            document.getElementById('searchRecord').innerText=returnstr;
		} else document.getElementById('searchRecord').innerText="Not found.";
	}
  

 }

