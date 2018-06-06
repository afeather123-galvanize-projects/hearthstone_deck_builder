var slideId = ["mySlides1"]
var slides = document.getElementsByClassName(slideId[0]);
console.log(slides);
var slideIndex = [1,1];
showSlides(1, 0);
showSlides(1, 1);


function plusSlides(n, no) {
  console.log('click is working!');
  showSlides(slideIndex[no] += n, no);
}

function showSlides(n, no) {
  var i;
  if (n > slides.length) {slideIndex[no] = 1}    
  if (n < 1) {slideIndex[no] = slides.length}
  for (i = 0; i < slides.length; i++) {
     slides[i].style.display = "none";  
  }
  slides[slideIndex[no]-1].style.display = "block";  
}