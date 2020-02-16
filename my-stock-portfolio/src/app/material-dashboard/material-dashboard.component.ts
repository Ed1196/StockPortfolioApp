import { Component, Input } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-material-dashboard',
  templateUrl: './material-dashboard.component.html',
  styleUrls: ['./material-dashboard.component.css']
})
export class MaterialDashboardComponent {

  @Input()
  ngSwitch: any

  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'search', cols: 2, rows: 2 },
          { title: 'portfolio', cols: 1, rows: 1 },
          { title: 'transactions', cols: 1, rows: 1 },
        ];
      }

      return [
        { title: 'search', cols: 2, rows: 2 },
        { title: 'portfolio', cols: 1, rows: 1 },
        { title: 'transaction', cols: 1, rows: 1 },
      ];
    })
  );

  constructor(private breakpointObserver: BreakpointObserver) {}
}
