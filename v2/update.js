var download = "";


function updateData() {
  fetchAsync("https://nzbev.github.io/v2/data.json")
  console.log(download)
  localStorage.setItem('nzb_online_storage', download); 
  setConfig()
}



function fetchAsync(url){
  fetch(url).then(function(response) {
    return response.text();
  }).then(function(data) {
    //console.log(data);
    download = data;
    console.log("yeah")
  }).catch(function(err) {
    console.log('Fetch Error :-S', err);
  });
}


