// Bookshelf.js
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native';

const Bookshelf = ({ navigation }) => {
  const [books, setBooks] = useState(
[
    {
        "id": 1,
        "title": "Book 1",
        "author": "Author 1",
        "coverImageUrl": "https://covers.openlibrary.org/b/id/12358359.jpg"
    },
    {
        "id": 2,
        "title": "Book 2",
        "author": "Author 2",
        "coverImageUrl": "https://covers.openlibrary.org/b/id/12358359.jpg"
    },
    {
        "id": 3,
        "title": "Book 3",
        "author": "Author 3",
        "coverImageUrl": "https://covers.openlibrary.org/b/id/12358359.jpg"
    },
    {
        "id": 4,
        "title": "Book 4",
        "author": "Author 4",
        "coverImageUrl": "https://covers.openlibrary.org/b/id/12358359.jpg"
    },
    {
        "id": 5,
        "title": "Book 5",
        "author": "Author 5",
        "coverImageUrl": "https://covers.openlibrary.org/b/id/12358359.jpg"
    },
    {
        "id": 6,
        "title": "Book 6",
        "author": "Author 6",
        "coverImageUrl": "https://covers.openlibrary.org/b/id/12358359.jpg"
    },
    {
        "id": 7,
        "title": "Book 7",
        "author": "Author 7",
        "coverImageUrl": "https://covers.openlibrary.org/b/id/12358359.jpg"
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
