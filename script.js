(() => {
  const $form = document.querySelector("#form")
  const $input = document.querySelector("#input")
  const $target = document.querySelector("#target")
  const $output = document.querySelector("#output")
  const $quality = document.querySelector("#quality")
  const $width = document.querySelector("#width")

  const suitMap = {
    m: "man",
    p: "pin",
    s: "sou",
    z: "ji",
  }

  $form.addEventListener("submit", (e) => {
    e.preventDefault()
    const quality = $quality.checked
    const width = Number($width.value)
    const tiles = []
    const hand = $input.value.replace(/r5/g, "0")
    const regex = /[0-9]+[mpsz]/g
    const matches = hand.match(regex)
    matches.forEach((match) => {
      const suit = match.slice(-1)
      const ranks = match.slice(0, -1).split("")
      ranks.forEach((rank) => {
        tiles.push(rank + suit)
      })
    })
    $target.innerHTML = ""
    tiles.forEach((tile) => {
      const rank = tile[0]
      const suit = tile[1]
      const src = quality ? `./tiles2/${suit}${rank}.png` : `./tiles/${suitMap[suit]}${rank}-66-90-l-emb.png`
      $target.insertAdjacentHTML(
        'beforeend',
        `<img width="${width}" src="${src}" alt="${tile}" />`,
      )
    })

    $output.innerHTML = ""
    const options = {
      width: width * tiles.length,
      backgroundColor: "transparent",
    }
    html2canvas($target, options).then((canvas) => {
      const src = canvas.toDataURL("image/png")
      $output.insertAdjacentHTML(
        'beforeend',
        `<img src="${src}" alt="${hand}.png" download="${hand}.png" />`,
      )
    })
  })
})()
