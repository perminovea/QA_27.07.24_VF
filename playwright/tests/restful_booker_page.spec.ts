import { test } from "@playwright/test";
import { IDataForm } from "./data_form.model";
import { Restful_booker_form } from "./page_obj_restful_booker";

test.describe("restful_booker_page_object", function () {
  let testСases: { title: string; data: IDataForm }[] = [
    { title: "submit form success page_object", data: {} },
    {
      title: "check alert submit form without name page_object",
      data: { name: "" },
    },
    {
      title: "check alert submit incorrect email page_object",
      data: { email: "1" },
    },
    {
      title: "check alert submit incorrect phone page_object",
      data: { phone: "alex" },
    },
    {
      title: "check alert submit incorrect subject page_object",
      data: { subject: "111" },
    },
    {
      title: "check alert submit incorrect description page_object",
      data: { description: "111" },
    },
  ];

  for (let index = 0; index < testСases.length; index++) {
    const test_case = testСases[index];

    test(test_case.title, async ({ page }) => {
      const booker = new Restful_booker_form(page);
      const objKeys = Object.keys(test_case.data);

      await test.step(`Формирую тестовые данные`, async function () {
        booker.initData(test_case.data);
      });

      await test.step(`Перехожу на страницу`, async function () {
        await booker.goto();
      });

      await test.step(`Заполняю и отправляю форму`, async function () {
        await booker.fillForm();
      });

      if (objKeys.length === 0) {
        await test.step(`Проверка успешной отправки`, async function () {
          await booker.checkSuccess();
        });
      } else {
        await test.step(`Проверка уведомления об ошибке`, async function () {
          await booker.checkAlert(objKeys[0]);
        });
      }
    });
  }
});
