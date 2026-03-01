import { test } from '@playwright/test';
import { TimeIsPage } from '../../pages/TimeIsPage';

//TODO: make a function only and parameterize the city name, duration. So multiple tests can call that function with diff parameters
test('access timing ui - Hanoi', {
  tag: ['@ui', '@timing', '@happyFlow'],
}, async ({ page }) => {
  const timeIsPage = new TimeIsPage(page);
  await timeIsPage.openTimeIsPage();
  await timeIsPage.verifyCityNameAfterSearch('Hanoi');
  await timeIsPage.verifyCurrentDate();
  await timeIsPage.verifyCurrentTimeRunning(5);
});

test('access timing ui - Nha Trang', {
  tag: ['@ui', '@timing', '@happyFlow'],
}, async ({ page }) => {
  const timeIsPage = new TimeIsPage(page);
  await timeIsPage.openTimeIsPage();
  await timeIsPage.verifyCityNameAfterSearch('Nha Trang');
  await timeIsPage.verifyCurrentDate();
  await timeIsPage.verifyCurrentTimeRunning(3);
});
