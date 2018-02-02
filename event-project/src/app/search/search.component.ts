import { Component, OnInit, SimpleChanges} from '@angular/core';
import { Http, Headers, RequestOptions } from "@angular/http";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit{

  searchQuery: string
  eventList: any[]
  n: number = 1


  constructor(private route : Router, private actroute: ActivatedRoute, private http: Http) { 
    this.actroute.queryParams.subscribe(params => {
      this.searchQuery = params['search'];
      if(this.searchQuery){
        this.loadSearch();
      } // Print the parameter to the console. 
  });
  }

  ngOnInit() {
    this.loadSearch();
  }


  

  loadSearch() {
    this.http.get("http://localhost:3000/api/event?limit=5&search=" + this.searchQuery)
      .subscribe(
      result => {
        this.eventList = result.json();
        console.log(this.eventList);
      },
      error => {
        console.log("Get Eventlist error");
      }
      )
  }

  searchButton(){
    this.route.navigate(['/search'], { queryParams: { search: this.searchQuery } })

    this.loadSearch();
  }

  nextButton() {

    this.n++

    this.http.get("http://localhost:3000/api/event?limit=4&page=" + this.n+"&search="+this.searchQuery)
      .subscribe(
      result => {

        if (result.json().length > 0) {
          this.eventList = result.json();
          console.log(this.eventList);
        } else{
          this.n--
        }
      },
      error => {
        console.log("Get Eventlist error");
      }
      )
  }

  prevButton() {

    //misal n lebih besar prevButton() baru bisa di eksekusi
    if(this.n>1){
      this.n--

      this.http.get("http://localhost:3000/api/event?limit=4&page=" + this.n+"&search="+this.searchQuery)
      .subscribe(
      result => {
        this.eventList = result.json();
        console.log(this.eventList);
      },
      error => {
        console.log("Get Eventlist error");
      }
      )    
    }
  }


  convertDate(d) {
    var newDate = new Date(d);
    return newDate.getDate();
  }

  convertMonth(m) {
    var newMonth = new Date(m).getMonth();

    var month = new Array();
    month[0] = "JAN";
    month[1] = "FEB";
    month[2] = "MAR";
    month[3] = "APR";
    month[4] = "MAY";
    month[5] = "JUN";
    month[6] = "JUL";
    month[7] = "AUG";
    month[8] = "SEP";
    month[9] = "OCT";
    month[10] = "NOV";
    month[11] = "DEC";
    return month[newMonth]
  }

}
