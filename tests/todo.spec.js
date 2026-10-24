import { test, expect } from '@playwright/test';

test('управління списком задач TodoMVC', async ({ page }) => {
  const todoItems = ['Купити молоко', 'Прочитати документацію', 'Написати тест'];

  await page.goto('https://demo.playwright.dev/todomvc');

  const newTodoInput = page.getByPlaceholder('What needs to be done?');

  for (const item of todoItems) {
    await newTodoInput.fill(item);
    await newTodoInput.press('Enter');
  }

  const todoCount = page.getByTestId('todo-count');
  await expect(todoCount).toHaveText('3 items left');

  const firstTodoCheckbox = page.getByTestId('todo-item').first().getByRole('checkbox');
  await firstTodoCheckbox.check();

  await expect(todoCount).toHaveText('2 items left');
});