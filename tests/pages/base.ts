import { Locator, Page } from '@playwright/test';

export class Base {
  readonly page: Page;
  readonly signBtn: Locator;
  readonly toastMsg: Locator;

  readonly element: (name: string, subLocator?: string) => Locator;

  constructor(page: Page) {
    this.page = page;
    this.toastMsg = page.locator('#toast-container');

    this.element = (selector: string, subLocator = ' input') => {
      return page.locator(`[formcontrolname="${selector}"]${subLocator}`)
    }
    this.signBtn = page.locator('[type="submit"]');
  }
  getValidationMsgForField(fieldName: string, isSibling = false): Locator {
    return this.element(fieldName, `${isSibling? '~':' '}app-validation-message`)
  }
  async setTextFieldByName(fieldName: string, value: string): Promise<void> {
    await this.element(fieldName).fill(value);
  }
  async clickSubmite(): Promise<void> {
    await this.signBtn.click();
  }
}