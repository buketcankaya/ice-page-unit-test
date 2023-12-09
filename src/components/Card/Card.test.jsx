import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Card from ".";

test("koşulların onaylanmasına göre buton aktifliği", async () => {
  // test bileşenini ekrana basma (sanal)
  // tarzında testleri yapmamızı sağlıyacak bir test fonksiyonu
  const mock = jest.fn();

  render(
    <Card
      data={{
        name: "Salted caramel",
        imagePath: "/images/salted-caramel.png",
      }}
      basket={[
        [
          {
            name: "Mint chip",
            imagePath: "/images/mint-chip.png",
          },
          {
            name: "Chocolate",
            imagePath: "/images/chocolate.png",
          },
        ],
      ]}
      setBasket={mock}
    />
  );

  // user'ın kurulumunu yap
  const user = userEvent.setup();

  const addBtn = screen.getByText("Ekle");
  await user.click(addBtn);

  expect(mock).toBeCalled;
});
