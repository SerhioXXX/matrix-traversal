# Matrix Traversal Library

A TypeScript library that fetches a square matrix from a remote server and returns it as an array traversed counter-clockwise.

## Installation

```bash
npm install
```

## Usage

```typescript
import { getMatrix } from "matrix-traversal";

// Fetch and traverse matrix
getMatrix("https://example.com/matrix.txt")
  .then((result) => {
    console.log("Traversed matrix:", result);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
```

## API

### `getMatrix(url: string): Promise<number[]>`

Fetches a square matrix from the provided URL and returns it traversed counter-clockwise, starting from the top-left corner.

- **Parameters**

  - `url` (string): The URL from which to fetch the matrix

- **Returns**

  - Promise<number[]>: A promise that resolves to an array of numbers representing the counter-clockwise traversal of the matrix

- **Throws**
  - Network errors (ETIMEDOUT, ECONNREFUSED)
  - HTTP errors (4xx, 5xx status codes)
  - Format errors (if the data is not a valid square matrix)

## Running Tests

```bash
npm test
```

## Example

For a 4x4 matrix like:

```
10  20  30  40
50  60  70  80
90  100 110 120
130 140 150 160
```

The result will be:

```
[10, 50, 90, 130, 140, 150, 160, 120, 80, 40, 30, 20, 60, 100, 110, 70]
```

## Building the Library

```bash
npm run build
```

The compiled JavaScript files will be in the `dist` directory.
