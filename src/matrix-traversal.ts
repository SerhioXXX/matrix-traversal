/**
 * Fetches a square matrix from a URL and returns it traversed counter-clockwise
 * @param url The URL from which to fetch the matrix
 * @returns Promise resolving to an array of numbers (counter-clockwise traversal)
 */
export async function getMatrix(url: string): Promise<number[]> {
  try {
    // Fetch matrix data from URL
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.text();

    // Parse matrix from text
    const matrix = parseMatrix(data);

    // Validate that matrix is square
    if (!isSquareMatrix(matrix)) {
      throw new Error("The matrix is not square (NxN)");
    }

    // Traverse the matrix counter-clockwise
    return traverseMatrixCounterClockwise(matrix);
  } catch (error: any) {
    if (error.code === "ETIMEDOUT") {
      console.error("⏰ Server did not respond in time (timeout)");
    } else if (error.code === "ECONNREFUSED") {
      console.error("🚫 Connection refused. Check server availability.");
    } else {
      console.error("❌ An error occurred:", error.message);
    }

    throw new Error("Failed to retrieve the matrix");
  }
}

/**
 * Parses a string representation of a matrix into a 2D array of numbers
 * @param data String containing the matrix data
 * @returns 2D array of numbers
 */
function parseMatrix(data: string): number[][] {
  // Filter out the separator rows (rows that start with '+')
  const contentRows = data
    .trim()
    .split("\n")
    .filter((line) => line.trim().startsWith("|"));

  // Extract numbers from each row
  return contentRows.map((row) => {
    // Split by | and filter out empty strings
    const cells = row.split("|").filter((cell) => cell.trim());

    // Convert each cell to a number
    return cells.map((cell) => parseInt(cell.trim(), 10));
  });
}

/**
 * Checks if a matrix is square (NxN)
 * @param matrix The matrix to check
 * @returns Boolean indicating if the matrix is square
 */
function isSquareMatrix(matrix: number[][]): boolean {
  const rows = matrix.length;

  if (rows === 0) return false;

  return matrix.every((row) => row.length === rows);
}

/**
 * Traverses a square matrix counter-clockwise starting from the top-left corner
 * @param matrix The matrix to traverse
 * @returns Array of numbers in counter-clockwise traversal order
 */
function traverseMatrixCounterClockwise(matrix: number[][]): number[] {
  const n = matrix.length;
  const result: number[] = [];

  let top = 0;
  let bottom = n - 1;
  let left = 0;
  let right = n - 1;

  while (top <= bottom && left <= right) {
    // Traverse down the left column
    for (let i = top; i <= bottom; i++) {
      result.push(matrix[i][left]);
    }
    left++;

    // Traverse right along the bottom row
    for (let i = left; i <= right; i++) {
      result.push(matrix[bottom][i]);
    }
    bottom--;

    // Traverse up the right column
    if (left <= right) {
      for (let i = bottom; i >= top; i--) {
        result.push(matrix[i][right]);
      }
      right--;
    }

    // Traverse left along the top row
    if (top <= bottom) {
      for (let i = right; i >= left; i--) {
        result.push(matrix[top][i]);
      }
      top++;
    }
  }

  return result;
}
