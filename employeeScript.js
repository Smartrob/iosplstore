let sheetData = [];

    function fetchData() {
        const url = 'https://docs.google.com/spreadsheets/d/1aKOaicQuUGHdRD0uahIfej1C6Ut77M27WGIZzeZe9CE/gviz/tq?tqx=out:json'; // Replace with your actual modified URL
        fetch(url)
            .then(response => response.text())
            .then(data => {
                const jsonData = JSON.parse(data.substr(47).slice(0, -2));
                sheetData = jsonData.table.rows.map(row => ({
                    IssueDate: row.c[0]?.v || '',
                    EmployeeID: row.c[1]?.v || '',
                    EmployeeName: row.c[2]?.v || '',
                    ppeName: row.c[3]?.v || '',
                    NextDue: row.c[4]?.v || ''
                }));
                console.log(sheetData); // Check the data in console
            })
            .catch(error => console.error('Error fetching data:', error));
    }

    function filterData() {
        const employeeId = document.getElementById('employeeIdInput').value;
        const filteredData = sheetData.filter(row => row.EmployeeID === employeeId);
        displayData(filteredData);
    }

    function displayData(data) {
        const tableBody = document.getElementById('ppeTable').querySelector('tbody');
        tableBody.innerHTML = '';
        data.forEach(row => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${row.IssueDate}</td>
                <td>${row.EmployeeID}</td>
                <td>${row.EmployeeName}</td>
                <td>${row.ppeName}</td>
                <td>${row.NextDue}</td>
            `;
            tableBody.appendChild(tr);
        });
    }

    // Fetch data when the page loads
    window.onload = fetchData;

    // https://docs.google.com/spreadsheets/d/1aKOaicQuUGHdRD0uahIfej1C6Ut77M27WGIZzeZe9CE/gviz/tq?tqx=out:json