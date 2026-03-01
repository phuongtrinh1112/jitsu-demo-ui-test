import { Page, test } from '@playwright/test';
import { TimeIsPage } from '../../pages/TimeIsPage';

async function timeIsCheck(page: Page, cityName: string, duration: number) {
    const timeIsPage = new TimeIsPage(page);
    //open time.is page
    await timeIsPage.openTimeIsPage();
    //search by city name and verify result
    await timeIsPage.verifyCityNameAfterSearch(cityName);
    //verify current date after searching by city name
    await timeIsPage.verifyCurrentDate();
    //verify current time is running after searching by city name
    await timeIsPage.verifyCurrentTimeRunning(duration);
}

test('access timing ui - Hanoi', {
  tag: ['@ui', '@timing', '@happyFlow', '@hanoi'],
}, async ({ page }) => {
  await timeIsCheck(page, 'Hanoi', 5);
});

test('access timing ui - Nha Trang', {
  tag: ['@ui', '@timing', '@happyFlow', '@nhaTrang'],
}, async ({ page }) => {
    await timeIsCheck(page, 'Nha Trang', 3);
});
