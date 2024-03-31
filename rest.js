export function getBookDataAsync(isbn) {
  return fetch("http://openlibrary.org/api/books?bibkeys=ISBN:" + isbn + "&jscmd=details&format=json")
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      try {
        let thumbnail_url_s = data["ISBN:" + isbn]["thumbnail_url"];
        data["ISBN:" + isbn]["thumbnail_url"] = thumbnail_url_s.substr(0, thumbnail_url_s.length-6) + thumbnail_url_s.substr(thumbnail_url_s.length-4, thumbnail_url_s.length);
        return data["ISBN:" + isbn];
      } catch {
        return null;
      }
    })
    .catch(error => {
      console.error('Error:', error.message);
      return null;
    });
}
