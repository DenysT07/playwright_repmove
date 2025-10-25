import { Locator, Page } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { generatePhoneNumber } from "phone-number-generator-js";
import countries from "i18n-iso-countries";

export class Helper {

  async generateRandomPhoneNumber(locator: Locator): Promise<string> {
    const countryNameShort = await locator.getAttribute('class')
    const countryNameFull = countries.getName(countryNameShort?.replace('fi fi-', '').toUpperCase(), 'en')
    return generatePhoneNumber({ countryName: countryNameFull, withoutCountryCode: true })
  }

  generateWrongEmails(): string[] {
    return [`${faker.string.alpha()}@`,
    `${faker.string.alpha()}@ ${faker.string.alpha()}.com`,
    `${faker.string.alpha()}@@${faker.string.alpha()}.com`,
    `${faker.string.alpha()}()@${faker.string.alpha()}.com`]
  }
}