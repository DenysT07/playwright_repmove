import { Locator, Page } from '@playwright/test';
import { Base } from './base';
import { faker } from '@faker-js/faker';
import { Helper } from './helper';

let helper = new Helper()

export class RegistrationPage extends Base {

  readonly phoneNumber: Locator
  readonly industryDrop: Locator
  readonly modalHeader: Locator
  readonly dropListValues: (value?: string) => Locator;

  constructor(page: Page) {
    super(page);
    this.phoneNumber = page.locator('[fxlayoutalign="start start"] app-input');
    this.industryDrop = page.locator('[formcontrolname="industry"]');
    this.modalHeader = page.locator('[class="__header"]');
    this.dropListValues = (value?: string) => {
      return page.locator(`.ng-option`, { hasText: value })
    }
  }

  async setTextFieldByName(fieldName: string, value: string): Promise<void> {
    await this.element(fieldName, fieldName === 'phone' ? ' app-input input' : undefined).fill(value);
  }

  async chooseRandomDropdownListValue(): Promise<Locator> {
    const allDropdownValues = await this.dropListValues().all()
    const randomValue = faker.helpers.arrayElement(allDropdownValues)
    return randomValue
  }

  async setRandomPhoneNumber(): Promise<void> {
    await this.element('phone', ' .ng-value-container').click()

    const randomLocator = await this.chooseRandomDropdownListValue()
    const value = await helper.generateRandomPhoneNumber(randomLocator.locator('.fi'))

    await randomLocator.click()
    await this.setTextFieldByName('phone', value)
    if (await this.getValidationMsgForField('phone').isVisible()) await this.setRandomPhoneNumber()
  }

  async setDropListByName(fieldName: string, value?: string): Promise<void> {
    const element = this.element(fieldName, fieldName === 'phone' ? ' .ng-value-container' : '')
    await element.click()

    const item = value ? this.dropListValues(value) : await this.chooseRandomDropdownListValue()
    await item.click()
  }

}