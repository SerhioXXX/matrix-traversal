import { getMatrix } from "./matrix-traversal";

// Test URL from the assignment
const SOURCE_URL =
  "https://raw.githubusercontent.com/Real-Estate-THE-Capital/js-assignment/main/matrix.txt";

// Expected traversal result
const EXPECTED_TRAVERSAL = [
  10, 50, 90, 130, 140, 150, 160, 120, 80, 40, 30, 20, 60, 100, 110, 70,
];

// Run the test
async function runTest() {
  try {
    const result = await getMatrix(SOURCE_URL);

    console.log("Result:", result);

    const testPassed =
      JSON.stringify(result) === JSON.stringify(EXPECTED_TRAVERSAL);
    console.log(testPassed ? "✅ Test passed!" : "❌ Test failed!");

    if (!testPassed) {
      console.log("Expected:", EXPECTED_TRAVERSAL);
      console.log("Received:", result);
    }
  } catch (error) {
    console.error("Error during test:", error);
  }
}

// Run the test
runTest();
