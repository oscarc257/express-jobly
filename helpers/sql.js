const { BadRequestError } = require("../expressError");

// THIS NEEDS SOME GREAT DOCUMENTATION.

/**
 * Generates a SQL query for partially updating a row in a database table.
 *
 * @param {Object} dataToUpdate - An object containing the data to update.
 * @param {Object} jsToSql - An object mapping JavaScript-style field names to SQL-style column names.
 * @returns {Object} An object containing the SQL set clause and the values to update.
 * @throws {BadRequestError} If no data is provided to update.
 *
 * @example
 * const dataToUpdate = { firstName: 'Aliya', age: 32 };
 * const jsToSql = { firstName: 'first_name' };
 * const result = sqlForPartialUpdate(dataToUpdate, jsToSql);
 * // result = {
 * //   setCols: '"first_name"=$1, "age"=$2',
 * //   values: ['Aliya', 32]
 * // }
 */

function sqlForPartialUpdate(dataToUpdate, jsToSql) {
  const keys = Object.keys(dataToUpdate);
  if (keys.length === 0) throw new BadRequestError("No data");

  // {firstName: 'Aliya', age: 32} => ['"first_name"=$1', '"age"=$2']
  const cols = keys.map((colName, idx) =>
      `"${jsToSql[colName] || colName}"=$${idx + 1}`,
  );

  return {
    setCols: cols.join(", "),
    values: Object.values(dataToUpdate),
  };
}

module.exports = { sqlForPartialUpdate };
