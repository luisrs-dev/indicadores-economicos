export const randomColor = () => {
    var x = Math.floor(Math.random() * 256);
    var y = Math.floor(Math.random() * 256);
    var z = Math.floor(Math.random() * 256);
    // var bgColor = "rgb(" + x + "," + y + "," + z + ")";
    var bgColor = `rgba(${x},${y},${z},0.5)`;
    return bgColor;
  }