function doPost(e) {
  let params = JSON.parse(e.postData.getDataAsString());
  if (params.type === "url_verification") {
    return ContentService.createTextOutput(params.challenge);
  }

  let texts = params.event.text.split(" ");
  if (texts[0] === "covid19") {
    let url = "***"
    let citiesFile = UrlFetchApp.fetch(url).getContentText("UTF-8");
    let cities = Utilities.parseCsv(citiesFile);

    let city = texts[1];
    let cityIndex = cities[0].indexOf(city); 

    let latest = cities.slice(-1)[0];
    let date = latest[0];

    let testedPositive = latest[cityIndex];
    let message = `【${city}県のcovid-19感染状況です】[${date}] 陽性: ${testedPositive}`;

    let options = {
      "method" : "POST",
      "headers": {"Content-type": "application/json"},
      "payload" : '{"text":"' + message + '"}'
    };

    let webhookUrl = "***"
    UrlFetchApp.fetch(webhookUrl, options);

  }
}
