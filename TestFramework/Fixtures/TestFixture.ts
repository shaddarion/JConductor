/* eslint-disable no-empty-pattern */
import { test as base } from '@playwright/test';
import { LoginPage } from '../Pages/LoginPage';
import { ChooseSitePage } from '../Pages/ChooseSitePage';
import { CCEPages } from '../Pages/CCEPages';
import { SharedActions } from '../Actions/SharedActions';
import { AppSettings } from '../../AppSettings';
import { DbFixture } from '../Fixtures/DbFixture';

type MyFixtures = {
  loginPage: LoginPage;
  chooseSitePage: ChooseSitePage;
  cce: CCEPages;
  sharedActions: SharedActions;
  db: DbFixture;
};

export const test = base.extend<MyFixtures>({
  loginPage: [
    async ({ page }, use) => {
      // Set up the fixture.
      const loginPage = new LoginPage(page);
      await page.goto('/', { waitUntil: 'commit' });
      await loginPage.populateName(AppSettings.Username);
      await loginPage.populatePassword(AppSettings.Password);
      await loginPage.clickSignInButton();

      await use(loginPage);
    },
    { auto: true },
  ],

  chooseSitePage: [
    async ({ page }, use) => {
      const chooseSitePage = new ChooseSitePage(page);
      await chooseSitePage.selectSite(AppSettings.Site);
      await chooseSitePage.clickSelectButton();
      await use(chooseSitePage);
    },
    { auto: true },
  ],

  cce: [
    async ({ page }, use) => {
      const cce = new CCEPages(page);
      await use(cce);
    },
    { auto: true },
  ],

  sharedActions: [
    async ({ page }, use) => {
      const sharedActions = new SharedActions(page);
      await use(sharedActions);
    },
    { auto: true },
  ],

  db: [
    async ({}, use) => {
      const dbFixture = new DbFixture();
      await use(dbFixture);
    },
    { auto: true },
  ],
});

export { expect } from '@playwright/test';
