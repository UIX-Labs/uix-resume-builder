function isEmpty(value: any) {
  if (value == null) return true;

  // Empty string
  if (typeof value === "string" && value.trim() === "") return true;

  // Empty array or array where every item is empty object/string
  if (Array.isArray(value)) {
    if (value.length === 0) return true;

    return value.every(item => {
      // item is an empty object like { key: "" }
      if (typeof item === "object") {
        return Object.values(item).every(v => v === "" || v == null);
      }

      // item is string
      if (typeof item === "string") {
        return item.trim() === "";
      }

      return false;
    });
  }

  return false;
}

export default isEmpty;