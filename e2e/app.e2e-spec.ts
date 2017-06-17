import { SebestoimostFaq2017Page } from './app.po';

describe('sebestoimost-faq2017 App', () => {
  let page: SebestoimostFaq2017Page;

  beforeEach(() => {
    page = new SebestoimostFaq2017Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
