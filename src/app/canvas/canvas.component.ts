import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { SquareComponent } from '../square/square.component';
// import { SelectComponent } from '../select/select.component';

interface Color {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-canvas',
  template: `
    <h4>Choose Color</h4>
      <mat-form-field appearance="fill">
        <mat-label>Drawing color</mat-label>
        <mat-select [(ngModel)]="selectedValue" name="color">
          <mat-option *ngFor="let color of colors" [value]="color.value">
            {{color.viewValue}}
          </mat-option>
        </mat-select>
      </mat-form-field>

    <canvas (document:mousedown)="startPosition($event)" (document:mouseup)="endPosition()" (document:mousemove)="draw($event)" id='canvas' #myCanvas></canvas>
    <button (click)="animate()">Play</button>`,
  styleUrls: ['./canvas.component.css']
})

export class CanvasComponent implements OnInit {
  @ViewChild('myCanvas', { static: true })
  canvas: ElementRef<HTMLCanvasElement>;

  public ctx: CanvasRenderingContext2D;
  public painting: boolean;
  public mouse: any;
  public selectedValue: string;
  public iDunno: string;

  colors: Color[] = [
    {value: 'red', viewValue: 'Red'},
    {value: 'blue', viewValue: 'Blue'},
    {value: 'green', viewValue: 'Green'}
  ];

  // constructor(private select: SelectComponent) { }

  ngOnInit(): void {
    this.ctx = this.canvas.nativeElement.getContext('2d');
    this.canvas.nativeElement.width = window.innerWidth;
    this.canvas.nativeElement.height = window.innerHeight;
    this.painting = false;
    this.mouse = {x : 0, y : 0, lastX : 0, lastY : 0}

  }

  startPosition(e) {
    this.painting = true;
    this.draw(e);
  }

  endPosition() {
    this.painting = false;
    this.ctx.beginPath();
  }

  draw(e) {
    if (!this.painting) return;
    var pos = this.getMousePos(this.canvas.nativeElement, e);
    this.ctx.lineWidth = 5;
    this.ctx.lineCap = 'round';
    this.ctx.strokeStyle = this.selectedValue;
    this.ctx.lineTo(pos.x, pos.y)
    this.ctx.stroke();
    this.ctx.beginPath();
    this.ctx.moveTo(pos.x, pos.y);
  }

  getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
}

  line(x: number, y: number) {
    this.ctx.strokeStyle = 'blue';
    this.ctx.lineWidth = 3;
    this.ctx.beginPath();
    this.ctx.moveTo(100, 50);
    this.ctx.lineTo(x, y);
    this.ctx.stroke();
  }

  square(x: number, y: number, z: number) {
    this.ctx.strokeStyle = 'red';
    this.ctx.lineWidth = 6;
    this.ctx.strokeRect(z * x, z * y, z, z);
  }

  animate(): void {
    this.square(10, 10, 60);
    this.line(10, 50);
  }
}
