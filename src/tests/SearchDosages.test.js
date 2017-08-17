import { Selector } from 'testcafe';
import ReactSelector from 'testcafe-react-selectors';

/* Dosages view */

fixture`Search - Dosages view with drug`
  .page`http://localhost:3000/search/panadol`;

test('Can see dosages chart when searching with a drug', async t => {
  
  const bubbleChart = Selector('#bubbles-chart')();
  await t.expect(await bubbleChart.exists).ok();
});

fixture`Search - Dosages view with symptom`
  .page`http://localhost:3000/search/kipu`;

test('Can not see dosages chart when searching with a symptom', async t => {
  
  const bubbleChart = Selector('#bubbles-chart')();
  await t.expect(await bubbleChart.exists).notOk();
});