function checkInput() {
  let result = {}
  result.page = Number(document.querySelector("#inputPage").value)
  result.limit = Number(document.querySelector("#inputLimit").value)
  result.check = true

  let errPage = !Number.isInteger(result.page) || result.page < 1 || 10 < result.page
  let errLimit = !Number.isInteger(result.limit) || result.limit < 1 || 10 < result.limit

  if (errPage && errLimit) {
    alert("Номер страницы и лимит вне диапазона от 1 до 10");
    result.check = false
  } else if (errPage) {
    alert("Номер страницы вне диапазона от 1 до 10");
    result.check = false
  } else if (errLimit) {
    alert("Лимит вне диапазона от 1 до 10");
    result.check = false
  }

  return result
}

function displayResult(jsonObj) {
  localStorage.setItem("myJson", JSON.stringify(jsonObj))
  let cards = ""
  jsonObj.forEach(item => {
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


const resultNode = document.querySelector(".result")
const jsonString = localStorage.getItem("myJson")
if (jsonString) {
  displayResult(JSON.parse(jsonString))
}

const btnNode = document.querySelector(".button-OK")
btnNode.addEventListener("click", () => {
  const form = checkInput()
  if (form.check) {
    fetch(`https://picsum.photos/v2/list?page=${form.page}&limit=${form.limit}`)
      .then(response => response.json())
      .then(jsonObj => displayResult(jsonObj))
      .catch(() => console.log("error"))
  }
})







