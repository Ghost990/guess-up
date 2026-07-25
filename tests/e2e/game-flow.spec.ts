import { expect, test } from "@playwright/test";

test("English two-player game survives refresh and reaches game over", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Hogyan játssz?" }).click();
  await expect(page.getByRole("dialog", { name: "Így játsszatok" })).toBeVisible();
  await page.getByRole("button", { name: "Értem, kezdhetjük" }).last().click();
  await page.getByRole("button", { name: "English" }).first().click();
  await page.getByText("Low English", { exact: true }).click();
  await expect(page.getByRole("radio", { name: /Low English/ })).toBeChecked();
  await page.getByLabel("Player name 1").fill("Anna");
  await page.getByLabel("Player name 2").fill("Ben");

  const rounds = page.getByRole("group", { name: "Rounds per player" });
  await rounds.getByRole("button", { name: "1", exact: true }).click();
  await page.getByRole("button", { name: "Start game" }).click();
  await expect.poll(async () =>
    page.evaluate(() => {
      const persisted = JSON.parse(
        localStorage.getItem("guessup-game-state") ?? "{}",
      );
      return persisted.state?.game?.settings?.difficulty;
    }),
  ).toBe("lowEnglish");

  const playerOrder = await page.evaluate(() => {
    const persisted = JSON.parse(
      localStorage.getItem("guessup-game-state") ?? "{}",
    );
    return persisted.state.game.players.map((player: { name: string }) => player.name) as string[];
  });
  const [firstPlayer, secondPlayer] = playerOrder;

  expect(new Set(playerOrder)).toEqual(new Set(["Anna", "Ben"]));
  await expect(page.getByRole("heading", { name: `${firstPlayer}, you’re up` })).toBeVisible();
  await page.getByRole("button", { name: "Reveal task" }).click();
  await page.getByRole("button", { name: "Start now" }).click();
  await page.getByRole("button", { name: "Got it!" }).click();
  await page.getByRole("dialog").getByRole("button", { name: secondPlayer }).click();

  await expect(page.getByRole("heading", { name: "Nice one!" })).toBeVisible();
  await page.getByRole("button", { name: "Next turn" }).click();
  await expect(page.getByRole("heading", { name: `${secondPlayer}, you’re up` })).toBeVisible();

  await page.reload();
  await expect(page.getByRole("heading", { name: `${secondPlayer}, you’re up` })).toBeVisible();
  await page.getByRole("button", { name: "Reveal task" }).click();
  await page.getByRole("button", { name: "Start now" }).click();
  await page.getByRole("button", { name: "Pass" }).click();

  await expect(page.getByRole("heading", { name: `${firstPlayer} wins!` })).toBeVisible();
  await expect(page.getByText("Final standings")).toBeVisible();
});
