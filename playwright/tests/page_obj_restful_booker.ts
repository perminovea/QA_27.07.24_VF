import { expect, Locator, Page } from "@playwright/test";
import { IDataForm } from "./data_form.model";
import data_form from "./data_form.json";

export class Restful_booker_form {
  readonly link: string;
  data: IDataForm;
  readonly page: Page;
  readonly elForm: {
    name: Locator;
    email: Locator;
    phone: Locator;
    subject: Locator;
    description: Locator;
  };
  readonly elSubmit: Locator;

  constructor(page: Page) {
    this.page = page;
    this.link = "https://automationintesting.online/";
    this.elForm = {
      name: this.page.getByTestId("ContactName"),
      email: this.page.getByTestId("ContactEmail"),
      phone: this.page.getByTestId("ContactPhone"),
      subject: this.page.getByTestId("ContactSubject"),
      description: this.page.getByTestId("ContactDescription"),
    };
    this.elSubmit = this.page.getByRole("button", { name: "Submit" });
  }

  initData(dataTest?: IDataForm) {
    const dataForm = { ...data_form };
    if (dataTest != undefined)
      Object.entries(dataTest).forEach(
        ([key, value]) => (dataForm[key] = value)
      );

    this.data = dataForm;
  }

  async goto() {
    await this.page.goto(this.link);
  }

  async fillForm() {
    const arrElForm = Object.entries(this.elForm);
    for (let index = 0; index < arrElForm.length; index++) {
      const el = arrElForm[index][1];
      const key = arrElForm[index][0];
      await el.fill(this.data[key]);
    }
    await this.elSubmit.click();
  }

  async checkSuccess() {
    await expect(
      this.page.getByRole("heading", {
        name: "Thanks for getting in touch",
      })
    ).toHaveText(`Thanks for getting in touch ${this.data.name}!`);
  }

  async checkAlert(el: string) {
    const textAlert = {
      name: `Name may not be blank`,
      email: `must be a well-formed email address`,
      phone: `Phone must be between 11 and 21 characters.`,
      subject: `Subject must be between 5 and 100 characters.`,
      description: `Message must be between 20 and 2000 characters.`,
    };
    await expect(this.page.locator("div.alert")).toHaveText(textAlert[el]);
  }
}
