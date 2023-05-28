function checkInput() {
  let value = Number(document.querySelector(".input-number").value)
  if (!Number.isInteger(value) || value < 1 || 10 < value) {
    alert("Число вне диапазона от 1 до 10");
    value = null
  }
  return value
}

function useRequest(url, cb) {
  const xhr = new XMLHttpRequest()
  xhr.open("GET", url)

  xhr.onload = function() {
    if (xhr.status != 200) {
      console.log("Статус ответа: ", xhr.status)
    } else if (cb) {
      cb(JSON.parse(xhr.response))
    }
  }

  xhr.onerror = function() {
    console.log("Ошибка! Статус ответа: ", xhr.status)
  }

  xhr.send()
}

function displayResult(data) {
  let cards = ""
  data.forEach(item => {
    const cardBlock = `
      <div class="card">
        <img src="${item.download_url}" class="card-image"/>
        <p>${item.author}</p>
      </div>
    `
    cards = cards + cardBlock
  })
  resultNode.innerHTML = cards
}


const resultNode =document.querySelector(".result")
const btnNode = document.querySelector(".button-OK")
btnNode.addEventListener("click", () => {
  const num = checkInput()
  if (num) {
    useRequest("https://picsum.photos/v2/list?limit=" + num, displayResult)
  }
})

