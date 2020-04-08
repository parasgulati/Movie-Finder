import { Component } from '@angular/core';
import {ServerService} from './server.service';
import {Http,Response} from '@angular/http'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],  
})

export class AppComponent {
  data=[];

  movie_poster=[];
  
  movie_playing=[
  {
  key:' ',
  name:' ',
  site:' ',
  size:0,
  type:' '

}];
  current=[];

  movie_playing_details=[
  {
    title:'',
    overview:'',
    popularity:0,
    production_companies:[
      {
        name:''
      },
      {
        name:''
      }
    ],
    release_date:'',
    revenue:0,
    tag_line:'',
    vote_average:0,
    vote_count:0,
    id:' '
  }
  ];
GuestSessionDetails=[
  {
    success:'',
    guest_session_id:'',
    expires_at:''
  }
];

rating=[
{
  value:0
}
];
status=[
  {
    status_code:'',
    status_message:''
  }
];
playing_id='';

gmail={
  username:"",
  email:"",
}
page=0;
page_no=0;
name='';

liked='i';
x={lik:'i'};

constructor(private serverService:ServerService,private http:Http){}

onDisplay(id:string)
{
    var flag=0;
    this.serverService.getVideo(id)
   .subscribe(
      (response:Response) =>{ 
        const data=response.json();
        flag=1;
        this.movie_playing[0].key=data.results[0].key,
        this.movie_playing[0].name=data.results[0].name,
        this.movie_playing[0].site=data.results[0].site,
        this.movie_playing[0].size=data.results[0].size,
        this.movie_playing[0].type=data.results[0].type
        document.getElementsByTagName("iframe")[0].src='https://www.youtube.com/embed/'+(this.movie_playing[0].key).toString();
        this.search_query();
        
        console.log(data);
     return data;    
    },
     (error)=> console.log(error));
        
     if(flag==0)
       document.getElementsByTagName("iframe")[0].src='';
        
  }

search_query()
{
    this.http.get('https://moviefinderrestapi.herokuapp.com/search'+this.movie_playing[0].key)
    .subscribe((msg:any)=>{

          this.liked=msg["liked_or_not"];
          
          });
            
}
getColor()
{
  if(this.liked=='y')
  {
    return "green";
  }
  if(this.liked=='n')
  {
    return "red";
  }
  if(this.liked=='i')
  {
    return "blue";
  }
}
likedstatusupdate()
{
  if(this.liked=='i')
  {
    this.liked='y';  
  }
  else
  {
    if(this.liked=='y')
    {
      this.liked='n';
    }
    else
    {
      this.liked='i';
    }
    
  }
  var data={
    liked_or_not:this.liked,
    movie_key:this.movie_playing[0].key
  }
  this.http.get('https://moviefinderrestapi.herokuapp.com/update'+data)
  .subscribe((msg:any)=>{
            console.log("success");
          });  
  }
enter(event:Event)
{
  this.name=(<HTMLInputElement>event.target).value;
}
onD()
{
  this.current=[];
  for(var j=0;j<4;j++)
  {
    this.current.push(
      {
        id:this.movie_poster[(this.page_no-1+j)%this.page].id,
        original_title:this.movie_poster[(this.page_no-1+j)%this.page].original_title,
        poster_path:this.movie_poster[(this.page_no-1+j)%this.page].poster_path
      });

      var x=document.getElementsByClassName('each_img')[j];
      
      x.innerHTML=' ';
      var y=document.createElement("div");
      var z=document.createElement("h3");
      var image=document.createElement("img");
      
      var source=document.createAttribute("src");
      source.nodeValue="http://image.tmdb.org/t/p/w185/"+this.movie_poster[(this.page_no-1+j)%this.page].poster_path;

      image.setAttributeNode(source);

      var heigh=document.createAttribute("height");
      heigh.nodeValue='250';
      image.setAttributeNode(heigh);

      var width=document.createAttribute("width");
      width.nodeValue='300';
      image.setAttributeNode(width);

      var clname=document.createAttribute("class");
      clname.nodeValue='searched_image';
      image.setAttributeNode(clname);

      var t=document.createTextNode(this.movie_poster[(this.page_no-1+j)%this.page].original_title);
      z.appendChild(t);
      y.appendChild(image);
      x.appendChild(y);
      x.appendChild(z);
      
  }
}



ong(name:string)
{

  return new Promise(resolve=>{
    this.serverService.getServers(name)
    .subscribe(
      (response:Response) =>{ 
        const data=response.json();
           var total=data.total_results;
          this.page=Math.ceil(total/4); 
   
         for(var i=0;i<total;i++)
         {
           this.movie_poster.push(
             {
               id:data.results[i].id,
               original_title:data.results[i].original_title,
               poster_path:data.results[i].poster_path
             }
           );   
         }
     
        console.log(data);
        return data;    
        
      },
      
      (error)=> console.log(error));
      
      resolve( this.movie_poster);
     
  });
}
onGet(name:string)
{
    this.ong(name).then(x=>{
    this.page_no=1;
    this.onD(); 
    
  })
}
 

}