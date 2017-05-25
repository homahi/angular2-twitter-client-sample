import { TwitterPage } from './app.po';

describe('twitter App', () => {
  let page: TwitterPage;

  beforeEach(() => {
    page = new TwitterPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
