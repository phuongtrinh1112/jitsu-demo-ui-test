import { Page } from '@playwright/test';
import { expect } from '@playwright/test';
import { WEB_LINK } from '../constants/web-link';
import { getCurrentDate, calculateTimeToANumber } from '../utils/DateCalculation';

export class TimeIsPage {
  readonly searchBoxLocator = '[id="q"]';
  readonly cityTextLocator = '[id="msgdiv"]';
  readonly currentDateLocator = '[title="Press for calendar"]';
  readonly currentTimeLocator = '[id="clock0_bg"]';
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async openTimeIsPage(): Promise<void> {
    await this.page.goto(WEB_LINK.TIME_IS, { waitUntil: 'domcontentloaded', timeout: 60000 });
  }

  /**
   * Search for a city and return the city name text from the search result
   * 
   * @param cityName city name
   * @returns text which store city name from web element
   */
  async searchCity(cityName: string): Promise<string | null> {
    await this.page.locator(this.searchBoxLocator).waitFor({ state: 'visible', timeout: 10000 });
    await this.page.locator(this.searchBoxLocator).click();
    await this.page.locator(this.searchBoxLocator).fill(cityName);
    await this.page.locator(this.searchBoxLocator).press('Enter');
    //wait for the search result to be displayed then return the city name text
    await this.page.waitForSelector(this.cityTextLocator, { timeout: 10000 });
    return this.page.locator(this.cityTextLocator).textContent();
  }

  /**
   * Search for a city and verify the city name in the search result contains the searched city name
   * 
   * @param cityName city name
   */
  async verifyCityNameAfterSearch(cityName: string): Promise<void> {
    const result = await this.searchCity(cityName);
    expect(result).toContain(cityName);
  }

  /**
   * Verify the current date is displayed correctly by comparing the printed date on UI with the current date
   */
  async verifyCurrentDate(): Promise<void> {
    await this.page.locator(this.currentDateLocator).waitFor({ state: 'visible', timeout: 10000 });
    //get printed date on UI and compare with current date
    const printedDate = await this.page.locator(this.currentDateLocator).textContent();
    console.log('Printed date: ', printedDate);
    const expectedCurrentDate = getCurrentDate();
    console.log('Expected current date: ', expectedCurrentDate);
    expect(printedDate).toBe(expectedCurrentDate);
  }

  /**
   * Verify current time is displayed in format HH:MM:SS, is continously updated and progresses foward over time by 
   * comparing the printed time on UI at 2 different time points and verify the second printed time is greater than the first one
   * 
   * @param second duration time
   */
    async verifyCurrentTimeRunning(second : number): Promise<void> {
        await this.page.locator(this.currentTimeLocator).waitFor({ state: 'visible', timeout: 10000 });
        const timeLocator = this.page.locator(this.currentTimeLocator);
        const time1 = await timeLocator.textContent();
        console.log('Time 1: ', time1);
        const time1InSeconds = calculateTimeToANumber(time1!);
        console.log('Time 1 in seconds: ', time1InSeconds);
        //wait for a few seconds then get the time again
        await this.page.waitForTimeout(second * 1000);

        const time2 = await timeLocator.textContent();
        console.log('Time 2: ', time2);
        const time2InSeconds = calculateTimeToANumber(time2!);
        console.log('Time 2 in seconds: ', time2InSeconds);

        //expect time2 to be greater than time1, which means the time is running and progressing forward
        expect(time2InSeconds).toBeGreaterThan(time1InSeconds);
  }
}
