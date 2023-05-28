function checkInput() {
  let result = {}
  result.width = Number(document.querySelector("#inputWidth").value)
  result.height = Number(document.querySelector("#inputHeight").value)
  result.check = true
  if (!Number.isInteger(result.width) || result.width < 100 || 300 < result.width) {
    alert("Ширина вне диапазона от 100 до 300");
    result.check = false
  } else if (!Number.isInteger(result.height) || result.height < 100 || 300 < result.height) {
    alert("Высота вне диапазона от 100 до 300");
    result.check = false
  }
  return result
}


const pictureNode = document.querySelector("#ourPicture")
const btnNode = document.querySelector(".button-OK")
btnNode.addEventListener("click", () => {
  const form = checkInput()
  if (form.check) {
    fetch(`https://picsum.photos/${form.width}/${form.height}`)
      .then(response => response.blob())
      .then(blob => pictureNode.src = URL.createObjectURL(blob))
      .catch(() => console.log("error"))
  }
})
