import { CkyMetaPage } from './app.po';

describe('cky-meta App', function() {
  let page: CkyMetaPage;

  beforeEach(() => {
    page = new CkyMetaPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
