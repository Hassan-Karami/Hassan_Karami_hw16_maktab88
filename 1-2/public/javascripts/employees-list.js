function ali() {
  alert("lkjlkj");
}
$(() => {
  $.ajax({
    url: "http://localhost:4000/employee",
    success: function (data) {
      // $("tbody").append(`<tr><td>${data[0].first_name}<td><td>${data[0].last_name}<td><tr>`)
      for (let i = 0; i < data.length; i++) {
     // Calculate the age of each employee
     const currentYear= new Date().getFullYear();
     const birthYear = new Date(data[i].birthday).getFullYear();
     const age = Math.abs(currentYear - birthYear);
     
        $("tbody").append(
          `
                <tr>
                <th scope="row">${i + 1}</th>
                <td>${data[i].first_name}</td>
                <td>${data[i].last_name}</td>
                <td>${data[i].gender}</td>
                <td>${age}</td>
                <td>${data[i].company}</td>
                <td>${data[i].province}</td>
                <td><button onclick="HandleMoreInfoButtonOnClick()" type="button" class="btn btn-primary">More Info</button></td>
                </tr>
                `
        );
      }
    },
  });
this.HandleMoreInfoButtonOnClick = () => {
  window.location.href= "https://google.com"
};

})();
