import UiStore from './UiStore';

it('toggles forecast flag', () => {
  // setup
  UiStore.showForecast = false;

  // run code
  UiStore.toggleForecast();

  // ensure it works
  expect(UiStore.showForecast).toEqual(true);
});
