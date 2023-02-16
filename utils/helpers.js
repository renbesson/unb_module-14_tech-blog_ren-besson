module.exports = {
  format_date: (date) => {
    // Format date as MM/DD/YYYY
    return date.toLocaleDateString();
  },
  is_eq: (var1, var2) => {
    return var1 == var2;
  },
};
