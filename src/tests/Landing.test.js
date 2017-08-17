import { Selector } from 'testcafe';
import ReactSelector from 'testcafe-react-selectors';

fixture`Landing`
  .page`http://localhost:3000/`;


test('Send feedback links to Google Forms', async t => {
  const feedbackButton = Selector('.feedback-button')();
  
  await t
    .click(await feedbackButton);

  const content = Selector('div').withText('Nettipuoskari feedback')();
  await t.expect(await content.exists).ok();
});

test('Can search from Landing', async t => {

  await t
    .typeText('#search-input', 'burana')
    .click('#search-button');

  const header = await Selector('.search-term-info').child(1)().innerText;

  await t
    .expect(header).eql('burana')
});

test('Most common charts have correct items', async t => {
  const mostCommonDrug = Selector('svg').find('.labels').nth(0)();
  await t
    .expect(await mostCommonDrug.textContent).eql("kannabis");
    
  const mostCommonSymptom = Selector('svg').nth(1).find('.labels').nth(0)();
  await t
    .expect(await mostCommonSymptom.textContent).eql("kipu");
});
