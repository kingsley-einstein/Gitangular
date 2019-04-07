import { Component, OnInit, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css']
})
export class ToastComponent implements OnInit {

  constructor(private snackbar: MatSnackBar) { }

  @Input()
  public message: string;

  ngOnInit() {
  }

  public setMessage(message: string) {
    this.message = message;
    this.open();
  }

  open() {
    this.snackbar.open(this.message, null, {
      duration: 2000
    });
  }

}
