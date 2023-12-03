 /*===============================Start of setting buttons======================*/


 document.getElementById("tab-1").addEventListener("click", showStuff1);

 function showStuff1(){
     
         document.getElementById("tab_list_01").style.display = "block";
         document.getElementById("tab_list_02").style.display = "none";
         document.getElementById("tab_list_03").style.display = "none";
         document.getElementById("tab_list_04").style.display = "none";    
 }

 document.getElementById("tab-2").addEventListener("click", showStuff2);

 function showStuff2(){
     
         document.getElementById("tab_list_02").style.display = "block";
         document.getElementById("tab_list_01").style.display = "none";
         document.getElementById("tab_list_03").style.display = "none";
         document.getElementById("tab_list_04").style.display = "none";    
 }

 document.getElementById("tab-3").addEventListener("click", showStuff3);

 function showStuff3(){
     
         document.getElementById("tab_list_03").style.display = "block";
         document.getElementById("tab_list_01").style.display = "none";
         document.getElementById("tab_list_02").style.display = "none";
         document.getElementById("tab_list_04").style.display = "none";    
 }

 document.getElementById("tab-4").addEventListener("click", showStuff4);

 function showStuff4(){
     
         document.getElementById("tab_list_04").style.display = "block";
         document.getElementById("tab_list_01").style.display = "none";
         document.getElementById("tab_list_02").style.display = "none";
         document.getElementById("tab_list_03").style.display = "none";    
 }

   


 /*===============================End of setting buttons======================*/