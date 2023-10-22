const ctx = document.getElementById("myChart");
fetch(
  "https://gist.githubusercontent.com/SuecoMarcus/23bcf8a786725f1b8335ec2dc2d90779/raw/f33d1058b878a7fc95ef202763d0067e8b436e54/uruguay_gdp.json"
)
  .then((response) => response.json())
  .then((arrayOfData) => {
    arrayOfData.sort((a, b) => a.date - b.date);
    new Chart(ctx, {
      type: "line",
      data: {
        labels: arrayOfData.map((data) => data.date),
        datasets: [
          {
            label: "PBI Uruguay",
            data: arrayOfData.map((data) => data.value),
            fill: true,
          },
        ],
      },
    });
  });
