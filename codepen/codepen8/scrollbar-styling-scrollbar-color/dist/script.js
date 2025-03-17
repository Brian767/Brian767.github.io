document.querySelectorAll('[type="color"]').forEach(($input) => {
  $input.addEventListener("change", (e) => {
    document
      .querySelector(".scroller")
      .style.setProperty(`--${$input.getAttribute("id")}`, $input.value);
  });
});

document.querySelectorAll('[name="width"]').forEach(($input) => {
  $input.addEventListener("change", (e) => {
    document
      .querySelector(".scroller")
      .style.setProperty("--scrollbar-width", $input.value);
  });
});

document.querySelectorAll('[name="gutter"]').forEach(($input) => {
  $input.addEventListener("change", (e) => {
    document
      .querySelector(".scroller")
      .style.setProperty("--scrollbar-gutter", $input.value);
  });
});