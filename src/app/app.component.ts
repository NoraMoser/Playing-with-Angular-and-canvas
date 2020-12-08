import { Component } from '@angular/core';

// interface Website {

//   value: string;

//   viewValue: string;

// }

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Tour of Heroes';

  public value: number;

  // websites: Website[] = [

  //   {value: '1', viewValue: 'HDTuto.com'},

  //   {value: '2', viewValue: 'HDTuto.com'},

  //   {value: '3', viewValue: 'Nicesnippets.com'}

  // ];

  getValue(event) {
    this.value = event.value;
    console.log(this.value);
  }
}
