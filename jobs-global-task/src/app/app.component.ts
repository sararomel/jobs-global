import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DynamicDialogModule, DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,DynamicDialogModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [DialogService],
  standalone: true,
})
export class AppComponent {
  title = 'jobs-global-task';
}
