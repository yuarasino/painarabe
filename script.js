(() => {
  const $form = document.querySelector("#form")
  const $input = document.querySelector("#input")
  const $target = document.querySelector("#target")
  const $output = document.querySelector("#output")

  const $target2 = document.querySelector("#target2")
  const $output2 = document.querySelector("#output2")

  const suitMap = {
    m: "man",
    p: "pin",
    s: "sou",
    z: "ji",
  }

  $form.addEventListener("submit", (e) => {
    e.preventDefault()
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
      const src = `./tiles/${suitMap[suit]}${rank}-66-90-l-emb.png`
      $target.insertAdjacentHTML(
        'beforeend',
        `<img src="${src}" alt="${tile}" />`,
      )
    })

    $output.innerHTML = ""
    const options = {
      width: 66 * tiles.length,
      backgroundColor: "transparent",
    }
    html2canvas($target, options).then((canvas) => {
      const src = canvas.toDataURL("image/png")
      $output.insertAdjacentHTML(
        'beforeend',
        `<img src="${src}" alt="${hand}.png" download="${hand}.png" />`,
      )
    })

    $target2.innerHTML = ""
    tiles.forEach((tile) => {
      const rank = tile[0]
      const suit = tile[1]
      const src = `./tiles2/${suit}${rank}.png`
      $target2.insertAdjacentHTML(
        'beforeend',
        `<img width="200" src="${src}" alt="${tile}" />`,
      )
    })

    $output2.innerHTML = ""
    const options2 = {
      width: 200 * tiles.length,
      backgroundColor: "transparent",
    }
    html2canvas($target2, options2).then((canvas) => {
      const src = canvas.toDataURL("image/png")
      $output2.insertAdjacentHTML(
        'beforeend',
        `<img src="${src}" alt="${hand}.png" download="${hand}.png" />`,
      )
    })
  })
})()
