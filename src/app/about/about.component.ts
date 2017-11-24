import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Leader } from '../shared/leader';
import { LeaderService } from '../services/leader.service';
import { LEADERS } from '../shared/leaders';
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AboutComponent implements OnInit {
  
    leaders: Leader[];
  
    constructor(private leaderService: LeaderService) { }
  
    ngOnInit() {
        this.leaders = this.leaderService.getLeaders();
    }
  
  }
  
