function sortArray(array) {
    return array.map( (elm, i) => {
        elm.id = i;
        return elm;
      }
    )
    .sort( (a, b) =>
      a.y - b.y
    );
  }
  export default sortArray;