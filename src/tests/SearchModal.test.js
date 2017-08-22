import { Selector } from 'testcafe';
import ReactSelector from 'testcafe-react-selectors';

/* Quote view */

fixture`Search - Quote view`
  .page`http://localhost:3000/search/panadol?quotes_with=ketorin&page=1`;

test('Can use a link to navigate to a specific quote', async t => {
  const header = Selector('h1').withText('Posts with panadol and ketorin')();
  await t
    .expect(await header.exists).ok();

  const firstQuote = Selector('.quote-modal').find("span").nth(0)();
  await t.expect(await firstQuote.innerText).ok();
});

test('Can navigate using pagination', async t => {
  const activeLabel = Selector('.pagination-active');
  await t.expect(await activeLabel().textContent).eql('1');
    
  await t
    .click(await Selector('.quote-modal').find('a').withText('2')())
    .wait(1000);

  await t.expect(await activeLabel().innerText).eql('2');
  await t
    .expect(await Selector('.quote-modal')
      .find('span')
      .nth(0)()
      .innerText).ok();
});


fixture`Search - Quote view`
  .page`http://localhost:3000/search/panadol?quotes_with=ketorin&page=2`;

test('Can use a link to navigate to a specific page', async t => {
  const header = Selector('h1').withText('Posts with panadol and ketorin')();
  await t
    .expect(await header.exists).ok();

  const firstQuote = Selector('.quote-modal').find("span").nth(0)();
  await t.expect(await firstQuote.innerText).ok();
});


