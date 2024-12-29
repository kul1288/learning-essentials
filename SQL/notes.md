# Updating Multiple Rows with Different Values and Statuses in MySQL

To update multiple rows with different values and statuses for different IDs in MySQL, you can use a CASE statement within an UPDATE query. This method updates all rows in a single query, minimizing database round trips and improving performance.

```sql
UPDATE your_table
SET 
    some_column = CASE id
        WHEN 1 THEN 100
        WHEN 2 THEN 200
        WHEN 3 THEN 300
        ELSE some_column
    END,
    status = CASE id
        WHEN 1 THEN 'processed'
        WHEN 2 THEN 'failed'
        WHEN 3 THEN 'skipped'
        ELSE status
    END
WHERE id IN (1, 2, 3);
```

## Using Node.js to Generate and Execute the Query

You can dynamically generate this query in Node.js based on your data.

```javascript
async function bulkUpdate(rows) {
  // Build the CASE statement for each column
  const someColumnCases = rows
    .map(row => `WHEN ${row.id} THEN ${row.updatedValue}`)
    .join(' ');
  const statusCases = rows
    .map(row => `WHEN ${row.id} THEN '${row.status}'`)
    .join(' ');

  // Build the full SQL query
  const sql = `
    UPDATE your_table
    SET 
        some_column = CASE id
            ${someColumnCases}
        END,
        status = CASE id
            ${statusCases}
        END
    WHERE id IN (${rows.map(row => row.id).join(', ')});
  `;

  // Execute the query
  try {
    await pool.query(sql);
    console.log('Bulk update successful.');
  } catch (error) {
    console.error('Error during bulk update:', error);
  }
}

// Example usage
const rowsToUpdate = [
  { id: 1, updatedValue: 100, status: 'processed' },
  { id: 2, updatedValue: 200, status: 'failed' },
  { id: 3, updatedValue: 300, status: 'skipped' },
];

bulkUpdate(rowsToUpdate);
```

### How It Works

**CASE Statement:**

- Matches each id with the corresponding value or status.
- Defaults to keeping the original value if no match is found (via ELSE).

**WHERE id IN (...):**

- Limits the update to rows whose id is in the list, ensuring efficient execution.

**Dynamically Generated SQL:**

- The Node.js script constructs the SQL query based on the input rows, allowing flexibility for any number of updates.

## Bulk Updates Instead of Row-by-Row

In the bulk updates solution, the `pool.query` runs a single query for the entire batch. This is one of the key advantages of using bulk operations: minimizing the number of database interactions.

### How It Works

**Single SQL Statement:** The query is written as an `INSERT ... ON DUPLICATE KEY UPDATE`, which allows inserting multiple rows in one go and updates rows that already exist (if there’s a unique key conflict).

**Batch Processing:** Instead of sending individual UPDATE queries for each row, all the updates are batched into a single query.

### SQL Breakdown

Here’s the query used:

```sql
INSERT INTO your_table (id, some_column, status)
VALUES (?, ?, ?), (?, ?, ?), ...
ON DUPLICATE KEY UPDATE 
  some_column = VALUES(some_column), 
  status = 'processed'
```

- `VALUES (?, ?, ?)`: Each placeholder set corresponds to a row to be inserted or updated.
- `ON DUPLICATE KEY UPDATE`: If a row with the same id already exists, it updates the specified columns instead of inserting a new row.

### Why Use `INSERT ... ON DUPLICATE KEY UPDATE`?

- It combines insert and update logic into a single query, making it more efficient.
- It works well for scenarios where you need to upsert (insert if not exists, otherwise update).
- Reduces network round-trips, as the database processes the entire batch in one go.

### Node.js Behavior

The `pool.query` function sends this single SQL statement to the database, and MySQL processes it as a single query. The result:

- Faster execution compared to sending one UPDATE query per row.
- Less load on the network and MySQL query parser.

### Example

If you are updating 1000 rows:

```javascript
const updates = [
  [1, 20, 'processed'], // id, some_column, status
  [2, 30, 'processed'],
  [3, 40, 'processed'],
  // ...
];

const query = `
  INSERT INTO your_table (id, some_column, status)
  VALUES ?
  ON DUPLICATE KEY UPDATE 
    some_column = VALUES(some_column), 
    status = 'processed'
`;

// Execute single query for all rows
await pool.query(query, [updates]);
```

### Benefits

- **Single Query Execution:** Only one query is sent to the database for all 1000 rows.
- **Efficiency:** Greatly reduces the number of database calls compared to executing UPDATE for each row.
