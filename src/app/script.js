onUp()
{
  
d=document.getElementByClassName('one')[0];      
var att=document.createAttribute('onclick');
att.nodeValue='movie('+this.movie_poster[0].id+')';
d.setAttributeNode(att);
}

