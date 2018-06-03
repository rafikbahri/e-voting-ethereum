import { EvotingBlockchainPage } from './app.po';

describe('evoting-blockchain App', () => {
  let page: EvotingBlockchainPage;

  beforeEach(() => {
    page = new EvotingBlockchainPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
