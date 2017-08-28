import { Selector } from 'testcafe';
import ReactSelector from 'testcafe-react-selectors';

fixture`Search - Symptoms view`
  .page`http://localhost:3000/search/burana`;

/* Symptoms view */

test('Can see medical advice warnings', async t => {
  const text = "This is not medical advice, the data only reflects what people talk about.";
  const warning = Selector('#symptoms-chart').find('span').withText(text)();
  await t.expect(await warning.exists).ok();
});

test('Can adjust slider', async t => {
  await t.click(await Selector('a').withText('Sample size filtering').nth(1)());
  
  const handle = Selector('.rc-slider-handle')();
  let plotFirst = Selector('#symptoms-chart').find('.labels').nth(0)();

  /* Value is 30 at first and plot has hammassärky on top */
  await t
    .expect(await handle.getAttribute('aria-valuenow')).eql('30')
    .expect(await plotFirst.textContent).eql("hammassärky");

  const plotFirstY = await plotFirst.getAttribute('y');

  /* Drag slider */
  await t.drag(await handle, -70, 0)

  /* Value is now less */
  await t
    .expect(await handle.getAttribute('aria-valuenow')).lt('30')
    .wait(1000);

  /* Plot changed, jälkisärky is now the first */ 
  await t.expect(await Selector('#symptoms-chart').find('.labels').nth(0)().textContent).eql("jälkisärky");  
});

test('Can see symptoms header', async t => {
  const header = Selector('h4').withText('Symptoms associated with burana')();
  await t.expect(await header.exists).ok();
});