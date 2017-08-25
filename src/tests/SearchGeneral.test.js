import { Selector } from 'testcafe';
import ReactSelector from 'testcafe-react-selectors';

fixture`Search - General`
  .page`http://localhost:3000/search/panacod`;

/* General result view */

test('Can show posts of keyword', async t => {
  const quotesButton = Selector('.post-link-container').find('a')();
  const header = Selector('h1').nth(0)();

  await t.click(await quotesButton);
  await t.expect(await header.innerText).eql("Posts with panacod");
});

test('Can show basket of keyword', async t => {
  const basketButton = Selector('.basket-link-container').find('a')();
  const header = Selector('h1').nth(0)();

  await t.click(await basketButton);
  await t.expect(await header.innerText).eql("Words interpreted as panacod");
});

