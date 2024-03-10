export function getBookDataAsync( isbn ) {
    fetch("http://openlibrary.org/api/books?bibkeys=ISBN:" + isbn + "&jscmd=details&format=json")
    .then(response => {
      // Check if the request was successful (status code in the range 200-299)
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      // Read the response as plain text and log it to the console
      return response.json();
    })
    .then(data => {
      let thumbnail_url_s = data["ISBN:" + isbn]["thumbnail_url"];
      data["ISBN:" + isbn]["thumbnail_url"] = thumbnail_url_s.substr(0, thumbnail_url_s.length-6) + thumbnail_url_s.substr(thumbnail_url_s.length-4, thumbnail_url_s.length);
      console.log(data);
      return data;
    })
    .catch(error => {
      console.error('Error:', error.message);
      return null;
    });
}