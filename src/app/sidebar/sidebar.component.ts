import {AppComponent} from 'src/app/app.component'; 
import {Component} from '@angular/core';
import {ServerService} from 'src/app/server.service';
import {Http, Headers,Response} from '@angular/http'
import { Observable } from 'rxjs';

@Component({
    selector:'app-SideBar',
    templateUrl:'./sidebar.component.html',
    styleUrls: ['./sidebar.component.css'], 
})

export class SideBarComponent
{
    constructor(private serverService:ServerService,private appComponent:AppComponent,private http:Http){}  
  
onPrevious()
{
  
  this.appComponent.page_no=this.appComponent.page_no-1;
  this.appComponent.onD();  
}
onNext()
{
  this.appComponent.page_no=this.appComponent.page_no+1;
  this.appComponent.onD();
}
onDetails(id:string)
{
  var flag=0;
  this.serverService.getDetails(id)
  .subscribe(
    (response:Response) =>{ 
      const data=response.json();
  this.appComponent.playing_id=id,
  this.appComponent.movie_playing_details[0].title=data.original_title,
  this.appComponent.movie_playing_details[0].overview=data.overview,
  this.appComponent.movie_playing_details[0].popularity=data.popularity,
  this.appComponent.movie_playing_details[0].production_companies[0].name=data.production_companies[0].name,
  this.appComponent.movie_playing_details[0].production_companies[1].name=data.production_companies[1].name,
  this.appComponent.movie_playing_details[0].release_date=data.release_date,
  this.appComponent.movie_playing_details[0].revenue=data.revenue,
  this.appComponent.movie_playing_details[0].tag_line=data.tag_line,
  this.appComponent.movie_playing_details[0].vote_average=data.vote_average,
  this.appComponent.movie_playing_details[0].vote_count=data.vote_count,
  this.appComponent.movie_playing_details[0].id=data.id
      flag=1;
 
  document.getElementById('title').innerHTML="<h2>"+this.appComponent.movie_playing_details[0].title+"</h2>";
  document.getElementById('overview').innerHTML='overview: '+this.appComponent.movie_playing_details[0].overview;
  document.getElementById('production_companies').innerHTML='production companies: '+this.appComponent.movie_playing_details[0].production_companies[0].name+', '+this.appComponent.movie_playing_details[0].production_companies[1].name;
  document.getElementById('release_date').innerHTML='release date: '+this.appComponent.movie_playing_details[0].release_date;
  document.getElementById('revenue').innerHTML='revenue: '+this.appComponent.movie_playing_details[0].revenue;
  document.getElementById('popularity').innerHTML='popularity: '+this.appComponent.movie_playing_details[0].popularity;
  document.getElementById('vote_average').innerHTML='vote average: '+this.appComponent.movie_playing_details[0].vote_average;
  document.getElementById('vote_count').innerHTML='vote count: '+this.appComponent.movie_playing_details[0].vote_count;
 
      console.log(data);
    return data;    
    },
    (error)=> console.log(error));
if(flag==0)
{
  document.getElementById('title').innerHTML=' '; 
  document.getElementById('overview').innerHTML=' ';
  document.getElementById('production_companies').innerHTML=' ';
  document.getElementById('release_date').innerHTML=' ';
  document.getElementById('revenue').innerHTML=' ';
  document.getElementById('popularity').innerHTML=' ';
  document.getElementById('vote_average').innerHTML=' ';
  document.getElementById('vote_count').innerHTML=' ';
}
}

movie(i:number)
{

  this.appComponent.movie_playing[0].key=' ';
  if(i==0)  
  {
    this.appComponent.onDisplay((this.appComponent.current[0].id).toString());
  
    this.onDetails((this.appComponent.current[0].id).toString());
  }
    
  if(i==1)  
  {
    this.appComponent.onDisplay((this.appComponent.current[1].id).toString());

        
    this.onDetails((this.appComponent.current[1].id).toString());
  }
    if(i==2)  
    {
    this.appComponent.onDisplay((this.appComponent.current[2].id).toString());
    this.onDetails((this.appComponent.current[2].id).toString());
    }
    if(i==3)  
    {
    this.appComponent.onDisplay((this.appComponent.current[3].id).toString());
  
    this.onDetails((this.appComponent.current[3].id).toString());
    }
    
}

}

