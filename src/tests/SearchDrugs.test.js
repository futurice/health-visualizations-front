import { Selector } from 'testcafe';
import ReactSelector from 'testcafe-react-selectors';

fixture`Search - Drugs view`
  .page`http://localhost:3000/search/panacod`;

/* Drugs view */

test('Can see drugs header', async t => {
  const header = Selector('h4').withText('Drugs associated with panacod')();
  await t.expect(await header.exists).ok();
});

test('Can adjust slider', async t => {
  const handle = Selector('.rc-slider-handle')();

  /* Value is 30 at first */
  await t.expect(await handle.getAttribute('aria-valuenow')).eql('30');

  /* Drag slider */
  await t.drag(await handle, -30, 0)
  
  /* Value is now less */
  await t.expect(await handle.getAttribute('aria-valuenow')).lt('30');

});

test('Can see medical advice warnings', async t => {
  const text = "This is not medical advice, the data only reflects what people talk about.";
  const warning = Selector('span').withText(text)();
  await t.expect(await warning.exists).ok();
});

test('Can click on chart to get quotes', async t => {
  const circle = Selector('svg').find('.dots').nth(0)();
  const header = Selector('h1').nth(0)();

  await t.click(await circle);
  await t.expect(await header.innerText).eql("Posts with panacod and kodeiini");

  const prev = Selector("li").nth(0)();
  await t.expect(await prev.exists).ok();
  await t.expect(await prev.hasClass('disabled')).ok();

  const next = Selector("li").withText("NEXT")();
  await t.expect(await next.exists).ok();
});