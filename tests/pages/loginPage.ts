import { Locator, Page } from '@playwright/test';
import { Base } from './base';

export class LoginPage extends Base {
  readonly signUpNowBtn: Locator;
  readonly forgotPassword: Locator;

  constructor(page: Page) {
    super(page);
    this.signUpNowBtn = page.locator(' Sign Up Now ');
    this.forgotPassword = page.getByText('Forgot password');
  }

  async clickSignUpNowBtn(): Promise<void> {
    await this.signUpNowBtn.click();
  }

  async clickForgotPassword(): Promise<void> {
    await this.forgotPassword.click();
  }
}