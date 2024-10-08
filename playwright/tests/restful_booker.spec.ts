import { test, expect, Page, Locator } from "@playwright/test";
import data_form from "./data_form.json";
import { IDataForm } from "./data_form.model";

test.describe("restful_booker", function () {
  const link = "https://automationintesting.online/";
  const elForm = {
    name: function (page: Page) {
      return page.getByTestId("ContactName");
    },
    email: function (page: Page) {
      return page.getByTestId("ContactEmail");
    },
    phone: function (page: Page) {
      return page.getByTestId("ContactPhone");
    },
    subject: function (page: Page) {
      return page.getByTestId("ContactSubject");
    },
    description: function (page: Page) {
      return page.getByTestId("ContactDescription");
    },
    submit: function (page: Page) {
      return page.getByRole("button", { name: "Submit" });
    },
    alert: function (page: Page) {
      return page.locator("div.alert");
    },
  };
  async function fillForm(
    page: Page,
    data: IDataForm,
    el: Locator,
    expected: string
  ) {
    await elForm.name(page).fill(data.name!);
    await elForm.email(page).fill(data.email!);
    await elForm.phone(page).fill(data.phone!);
    await elForm.subject(page).fill(data.subject!);
    await elForm.description(page).fill(data.description!);
    await elForm.submit(page).click();
    await expect(el).toHaveText(expected);
  }
  const data = { ...data_form };

  test("has title", async ({ page }) => {
    await page.goto(link);
    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle("Restful-booker-platform demo");
  });

  test("submit form success", async ({ page }) => {
    const dataTest = { ...data };
    await page.goto(link);
    await fillForm(
      page,
      dataTest,
      page.getByRole("heading", { name: "Thanks for getting in touch" }),
      `Thanks for getting in touch ${dataTest.name}!`
    );
  });

  test("check alert submit form without name", async ({ page }) => {
    const dataTest = { ...data };
    dataTest.name = "";
    await page.goto(link);
    await fillForm(page, dataTest, elForm.alert(page), `Name may not be blank`);
  });

  test("check alert submit incorrect email", async ({ page }) => {
    const dataTest = { ...data };
    dataTest.email = "1";
    await page.goto(link);
    await fillForm(
      page,
      dataTest,
      elForm.alert(page),
      `must be a well-formed email address`
    );
  });

  test("check alert submit incorrect phone", async ({ page }) => {
    const dataTest = { ...data };
    dataTest.phone = "alex";
    await page.goto(link);
    await fillForm(
      page,
      dataTest,
      elForm.alert(page),
      `Phone must be between 11 and 21 characters.`
    );
  });

  test("check alert submit incorrect subject", async ({ page }) => {
    const dataTest = { ...data };
    dataTest.subject = "111";
    await page.goto(link);
    await fillForm(
      page,
      dataTest,
      elForm.alert(page),
      `Subject must be between 5 and 100 characters.`
    );
  });

  test("check alert submit incorrect description", async ({ page }) => {
    const dataTest = { ...data };
    dataTest.description = "111";
    await page.goto(link);
    await fillForm(
      page,
      dataTest,
      elForm.alert(page),
      `Message must be between 20 and 2000 characters.`
    );
  });
});
