import { fireEvent, render, screen } from "@testing-library/react";
import Form from "./index";
import userEvent from "@testing-library/user-event";

test("koşulların onaylanmasına göre buton aktifliği kontrol etme", async () => {
  // test birleşenini ekrana basma
  render(<Form />);
  //   userin kurulumunu yap
  const user = userEvent.setup();

  // gerekli elemanları alma
  const orderBtn = screen.getByRole("button");
  const checkbox = screen.getByRole("checkbox");

  //   button başlangıçta inaktif
  expect(orderBtn).toBeDisabled();

  //   checkboxi tıkla
  await user.click(checkbox);

  //   button aktif mi kontrol et
  expect(orderBtn).toBeEnabled();

  //   checkboxtan tıkı kaldır
  await user.click(checkbox);

  //   button inaktif mi kontrol et
  expect(orderBtn).toBeDisabled();
});

test("onayla butonu hover olunca bildiirm çıkar", async () => {
  render(<Form />);
  const user = userEvent.setup();

  // gerekli elemanlar
  const checkbox = screen.getByRole("checkbox");
  const button = screen.getByRole("button");

  // button aktif yap
  await user.click(checkbox);

  // mouse'u button üzerine getir
  fireEvent.mouseEnter(button);

  // popup ı çağırma
  const popup = screen.getByText("size gerçekten", { exact: false });

  // bildirimler gözüküyor mu?

  expect(popup).toBeVisible();

  //   mouse'u butondan çek
  fireEvent.mouseLeave(button);

  //   popup görünür değildir (not ünlem işareti görevi görr tersini alır)
  expect(popup).not.toBeVisible();
});
