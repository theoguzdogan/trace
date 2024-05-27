// Bookshelf.js
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native';

const Bookshelf = ({ navigation }) => {
  const [books, setBooks] = useState(
[
    {
      "id": 1,
      "title": "Yeraltından Notlar",
      "author": "F.M. Dostoyevski",
      "coverImageUrl": "https://covers.openlibrary.org/b/id/12358359.jpg"
    },
    {
      "id": 2,
      "title": "Fahrenheit 451",
      "author": "Ray Bradbury",
      "coverImageUrl": "https://covers.openlibrary.org/b/id/8751572.jpg"
    },
    {
      "id": 3,
      "title": "Türkiyede Geri Kalmışlığın Tarihi",
      "author": "İsmail Cem",
      "coverImageUrl": "https://covers.openlibrary.org/b/id/12358278.jpg"
    },
    {
      "id": 4,
      "title": "Suç ve Ceza",
      "author": "F.M. Dostoyevski",
      "coverImageUrl": "https://covers.openlibrary.org/b/id/10736127.jpg"
    }
]);

  const handleBookPress = (book) => {
    // Navigate to the book details screen or perform any other action
    console.log('Book pressed:', book.title);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {books.map(book => (
        <TouchableOpacity
          key={book.id}
          style={styles.bookButton}
          onPress={() => handleBookPress(book)}
        >
          <Image
            source={{ uri: book.coverImageUrl }}
            style={styles.coverImage}
          />
          <Text style={styles.title}>{book.title}</Text>
          <Text style={styles.author}>{book.author}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    padding: 16,
  },
  bookButton: {
    alignItems: 'center',
    marginBottom: 16,
  },
  coverImage: {
    width: 130,
    height: 200,
    resizeMode: 'stretch',
    borderRadius: 8,
  },
  title: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: 'bold',
  },
  author: {
    fontSize: 14,
    color: 'gray',
  },
});

export default Bookshelf;
