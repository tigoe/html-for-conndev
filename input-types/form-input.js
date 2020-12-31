function getValues() {
   let myForm = document.getElementById("input-form");
   let text = "";
   for (var i = 0; i < myForm.length ;i++) {
      let elt = myForm.elements[i];
      //document.getElementById("values").innerHTML = elt;
      console.log(elt.name)
   }
 }