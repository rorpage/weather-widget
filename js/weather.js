const elementById = (id) => { return document.getElementById(id) };

const renderItem = (element_id, label, data) => {
  const element = elementById(element_id);

  element.innerHTML = `<strong>${label}</strong><span>${data}</span>`;
};

const title = elementById('title');

loadData();

function loadData() {
  const params = new URLSearchParams(location.search);

  if (params.size === 0 || !params.has('id')) {
    document.getElementById('widget').classList.add('no-id');
    title.innerHTML = "No airport ID provided.<small>Add <code>?id=KIND</code> to the URL.</small>";

    return;
  }

  fetch(`api/info?id=${params.get('id')}`)
    .then(response => response.json())
    .then(data => renderData(data));
}

function renderData(data) {
  title.innerHTML = data.icaoId;

  const rawElement = elementById('raw');
  rawElement.innerHTML = data.rawOb;

  const temperature = data.temp.toFixed(0);
  const temperatureF = ((temperature * (9 / 5)) + 32).toFixed(0);
  const temperatureData = `${temperature}&deg;C (${temperatureF}&deg;F)`;
  renderItem('temperature', 'Temperature', temperatureData);

  renderItem('dewpoint', 'Dewpoint', `${data.dewp.toFixed(0)}&deg;C`);
  renderItem('wind', 'Wind', `${data.wdir}&deg; at ${data.wspd} kt`);
  renderItem('visibility', 'Visibility', `${data.visib} sm`);

  const altimeter = `${(data.altim / 33.864).toFixed(2)} in Hg (${data.altim} mb)`
  renderItem('altimeter', 'Altimeter', altimeter);
}
