import { Selector } from 'testcafe';
import ReactSelector from 'testcafe-react-selectors';

fixture`Landing`
  .page`http://localhost:3000/search/panacod`;



test('Can click on chart to get quotes', async t => {
  const circle = Selector('svg').find('.dots').nth(0)();
  const header = Selector('h1').nth(0)();
  
  await t.click(await circle);
  await t.expect(await header.innerText).eql("Posts with panacod and kodeiini");
});

test('Can show posts of keyword', async t => {
  const quotesButton = Selector('.list-of-posts')();
  const header = Selector('h1').nth(0)();

  await t.click(await quotesButton);
  await t.expect(await header.innerText).eql("Posts with panacod");
});

test('Can show basket of keyword', async t => {
  const basketButton = Selector('.list-of-bucket')();
  const header = Selector('h1').nth(0)();

  await t.click(await basketButton);
  await t.expect(await header.innerText).eql("Words interpreted as panacod");
});

