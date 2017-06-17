import { TwitterService } from './twitter.service';
import { Component, OnInit } from '@angular/core';
import * as Rx from 'rxjs/Rx';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  tweets = [];
  subscription;

  constructor(private service: TwitterService) { }

  ngOnInit() {
    this.service.initialize();
    this.subscription = this.service.getSubscription();
    this.subscription.subscribe(() => {
      this.refresh();
    });
  }

  connect() {
    this.service.connectTwitter();
  }

  refresh() {
    this.service.getLatestTweets()
      .subscribe((tweets) => {
        this.tweets = this.tweets.concat(tweets);
        console.log(this.tweets);
      }, (err) => {
        console.log(err);
      });
  }

  signOut() {
    this.service.clearCache();
    this.tweets = [];
  }
}
