import { Injectable } from '@angular/core';
import '../../node_modules/oauth-js/lib/oauth.js';
import * as Rx from 'rxjs/Rx';

declare var OAuth: any;


@Injectable()
export class TwitterService {

  authResult = false;
  auth: any;
  connect = new Rx.Subject();
  tweets = new Rx.Subject();
  constructor() {

  }

  initialize() {
    OAuth.initialize('gSTryt_cd2eQnPbuLrN6kjRtyCs', {
      cache: true
    });
    this.auth = OAuth.create('twitter');
  }

  getSubscription() {
    return this.connect;
  }

  connectTwitter() {
    OAuth.popup('twitter').done((result) => {
      this.auth = result;
      this.authResult = true;
      this.connect.next(false);
    });
  }

  isReady() {
    return this.authResult;
  }

  getLatestTweets() {
    const url = '/1.1/statuses/home_timeline.json';
    this.auth.get(url)
      .done((result) => {
        this.tweets.next(result);
      })
      .fail((err) => {
        this.tweets.error(err);
      });
    return this.tweets.asObservable();
  }

  clearCache() {
    OAuth.clearCache('twitter');
    this.authResult = false;
  }

}
