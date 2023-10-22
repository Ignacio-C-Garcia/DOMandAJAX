const table = document.querySelector("table");
const input = document.querySelector("input");
fetch(
  "https://gist.githubusercontent.com/SuecoMarcus/a77af69f0e84c3125a5c0cf43a3ac41b/raw/918cd058b7e2286a36e79643c63a5ebca097d7c8/users.json"
)
  .then((response) => response.json())
  .then((RawPeopleList) => {
    input.addEventListener("input", () => {

      let filteredPeopleList = RawPeopleList.filter((person) =>
        person.firstname
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .toLowerCase()
          .includes(
            input.value
              .normalize("NFD")
              .replace(/[\u0300-\u036f]/g, "")
              .toLowerCase()
          )
      );

      table.innerHTML =
        "<tr><th>Id</th><th>Nombre</th><th>Apellido</th><th>Edad</th></tr>";
      for (const person of filteredPeopleList) {
        table.insertAdjacentHTML(
          "beforeend",
          `<tr><td>${person.id}</td><td>${person.firstname}</td><td>${person.lastname}</td><td>${person.age}</td></tr>`
        );
      }
    });
  });
