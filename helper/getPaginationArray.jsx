import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const PaginationComponent = ({ currentPage, setCurrentPage, totalPages }) => {
  const getPaginationButtons = () => {
    let buttons = [];

    buttons.push(1); // Always include the first page.

    if (currentPage - 2 > 2) {
      buttons.push('...');
    }

    let startPage = Math.max(2, currentPage - 1);
    let endPage = Math.min(totalPages - 1, currentPage + 1);

    if (currentPage === 1) {
      endPage = Math.min(3, totalPages);
    } else if (currentPage === totalPages) {
      startPage = Math.max(totalPages - 2, 2);
    }

    for (let page = startPage; page <= endPage; page++) {
      buttons.push(page);
    }

    if (currentPage + 2 < totalPages - 1) {
      buttons.push('...');
    }

    if (totalPages !== 1) {
      buttons.push(totalPages); // Always include the last page.
    }

    return buttons;
  };

  const renderButton = (page, index) => (
    <TouchableOpacity
      key={index}
      style={styles.button}
      onPress={() => page !== '...' && setCurrentPage(page)}
    >
      <Text style={styles.buttonText}>{page}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {getPaginationButtons().map(renderButton)}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 10,
    overflow: 'scroll',
    width: '100%',
  },
  button: {
    margin: 5,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 5,
    backgroundColor: '#007bff',
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
  },
});

export default PaginationComponent;
