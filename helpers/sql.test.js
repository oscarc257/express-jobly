
const { sqlForPartialUpdate } = require("./sql");
const { BadRequestError } = require("../expressError");

describe("sqlForPartialUpdate", function () {
  //Tests the function with a single field to update.
  test("works: single field", function () {
    const result = sqlForPartialUpdate(
      { firstName: "Aliya" },
      { firstName: "first_name" }
    );
    expect(result).toEqual({
      setCols: '"first_name"=$1',
      values: ["Aliya"],
    });
  });

 //Tests the function with multiple fields to update.
  test("works: multiple fields", function () {
    const result = sqlForPartialUpdate(
      { firstName: "Aliya", age: 32 },
      { firstName: "first_name" }
    );
    expect(result).toEqual({
      setCols: '"first_name"=$1, "age"=$2',
      values: ["Aliya", 32],
    });
  });

  //Tests the function with no jsToSql mapping. 
  test("works: no jsToSql mapping", function () {
    const result = sqlForPartialUpdate(
      { firstName: "Aliya", age: 32 },
      {}
    );
    expect(result).toEqual({
      setCols: '"firstName"=$1, "age"=$2',
      values: ["Aliya", 32],
    });
  });

  //Tests the function with no data to update.
  test("throws BadRequestError if no data", function () {
    expect(() => {
      sqlForPartialUpdate({}, {});
    }).toThrow(BadRequestError);
  });

  //Tests the function with two fields to update.
  //Expects the function to return the correct SQL set clause and values.
  test("works: 2 items", function () {
    const result = sqlForPartialUpdate(
      { f1: "v1", jsF2: "v2" },
      { jsF2: "f2" }
    );
    expect(result).toEqual({
      setCols: '"f1"=$1, "f2"=$2',
      values: ["v1", "v2"],
    });
  });
});
