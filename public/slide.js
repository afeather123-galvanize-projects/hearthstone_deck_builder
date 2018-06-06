var slideIndex=[1,1];
var slideId = ["mySlides1"];
showSlids(1,0);
showSlids(1,1);

function plusSlids(n, no){
  showSlids(slideIndex[no]+=n,no);
  
  
}

function showSlids(n, no){
  var i;
  var x =document.querySelectorAll('.' + slideId[no]);
  if(n>x.length){
    slideIndex[no]=1
  }
  if(n<1){
    slideIndex[no]=x.length
  }
  for(i =0;i<x.length; i++){
    x[i].style.display="none";
  }
  x[slideIndex[no]-1].style.display="block";
}