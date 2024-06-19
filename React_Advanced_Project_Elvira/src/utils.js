// src/utils.js
export function handlePointerEvent(event, callback) {
  let pointerType = "mouse"; // Default to mouse for backward compatibility

  if (event.pointerType) {
    pointerType = event.pointerType;
  } else if (event.mozInputSource !== undefined) {
    // Mapping old mozInputSource values to pointerType
    switch (event.mozInputSource) {
      case 1:
        pointerType = "mouse";
        break;
      case 2:
        pointerType = "pen";
        break;
      case 4:
        pointerType = "touch";
        break;
      default:
        pointerType = "unknown";
    }
  } else if (event.detail === 0 && !event.pointerType) {
    pointerType = "virtual";
  }

  callback(pointerType);
}
