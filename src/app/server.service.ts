import {Injectable} from '@angular/core'
import {Http, Headers,Response} from '@angular/http'
import {AppComponent} from './app.component';
@Injectable()
export class ServerService{
    constructor(private http:Http){}
    getServers(name:string){
        var y:string='https://api.themoviedb.org/3/search/movie?api_key=6f255db00a57bb89ccb1e9eb1fbd57bd&language=en-US&query='+name+'&page=1&include_adult=false';
        return this.http.get(y);
    }

    getVideo(id:string){
        var z:string='https://api.themoviedb.org/3/movie/'+id+'/videos?api_key=6f255db00a57bb89ccb1e9eb1fbd57bd&language=en-US';
        return this.http.get(z);
    }
    getDetails(id:string)
    {
        var x:string="https://api.themoviedb.org/3/movie/"+id+"?api_key=6f255db00a57bb89ccb1e9eb1fbd57bd&language=en-US";
        return this.http.get(x);
    }
    createGuestSession()
    {
        var m:string="https://api.themoviedb.org/3/authentication/guest_session/new?api_key=6f255db00a57bb89ccb1e9eb1fbd57bd";
        return this.http.get(m);
        
    }
    put_rating(id:string,guest_session_id:string,rating:any[])
    {
        var u:string="https://api.themoviedb.org/3/movie/"+id+"/rating?api_key=6f255db00a57bb89ccb1e9eb1fbd57bd&guest_session_id="+guest_session_id;
        return this.http.post(u,rating[0]);
    }
    fetchData()
    {
        var t:string="https://moviefinderrestapi.herokuapp.com/set"; 
        return this.http.get(t);
    }
    
}
