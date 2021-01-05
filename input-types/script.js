function getValue(target) {
   // get the span associated with this element
   // and put the element's value in the span's innerHTML
   // unless it's a radio orcheckbox, in which case use the checked value:
   if (target.type == 'radio' || target.type == 'checkbox') {
      document.getElementById(target.type + "Val").innerHTML = target.checked;
   } else {
      document.getElementById(target.type + "Val").innerHTML = target.value;
   }
}

function clearValues() {
   // get all the span elements:
   let spans = document.getElementsByTagName("span");
   // iterate over the spans, clear their HTML:
   for (let s of spans) {
      s.innerHTML = "";
   }
}