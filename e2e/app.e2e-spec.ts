import { ManagementServiceClientPage } from './app.po';

describe('management-service-client App', function() {
  let page: ManagementServiceClientPage;

  beforeEach(() => {
    page = new ManagementServiceClientPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
