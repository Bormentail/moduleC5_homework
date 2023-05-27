const xmlString = `
<list>
  <student>
    <name lang="en">
      <first>Ivan</first>
      <second>Ivanov</second>
    </name>
    <age>35</age>
    <prof>teacher</prof>
  </student>
  <student>
    <name lang="ru">
      <first>Петр</first>
      <second>Петров</second>
    </name>
    <age>58</age>
    <prof>driver</prof>
  </student>
</list>`

const parser = new DOMParser();
const listNode = parser.parseFromString(xmlString, "text/xml")
const students = listNode.querySelectorAll("student")

const jsObject = {list: []}
for (let student of students) {
  let person = {}
  person.name = student.querySelector("first").textContent + " " + student.querySelector("second").textContent;
  person.age = Number(student.querySelector("age").textContent);
  person.prof = student.querySelector("prof").textContent;
  person.lang = student.querySelector("name").getAttribute("lang");
  jsObject.list.push(person);
}

console.log(jsObject)
