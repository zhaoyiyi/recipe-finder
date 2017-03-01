import { RecipeFinderPage } from './app.po';

describe('recipe-finder App', () => {
  let page: RecipeFinderPage;

  beforeEach(() => {
    page = new RecipeFinderPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
