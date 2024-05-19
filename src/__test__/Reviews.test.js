import { reviews } from "../firebase/reviews";
import { addDoc, collection } from "firebase/firestore";

jest.mock("../firebase/firebase", () => ({
  currentUser: {
    uid: "currentUserId", // Mocking current user's uid to simulate signed in
  },
}));

// Mock addDoc function
jest.mock("firebase/firestore", () => ({
  ...jest.requireActual("firebase/firestore"),
  addDoc: jest.fn(),
  collection: jest.fn(),
}));

describe("Ratings class", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("successfully creates a rating", async () => {
    // Mock addDoc to resolve successfully
    addDoc.mockResolvedValue();

    const agentID = "agentId";
    const review = 5;

    //calling my entity function create rating
    const result = await reviews.createReview(agentID, review);

    expect(result).toBe(true);
  });

  test("fails to create a rating", async () => {
    // Mock addDoc to reject with an error
    const errorMessage = "Failed to add rating";
    addDoc.mockRejectedValue(new Error(errorMessage));

    const agentID = "agentId";
    const review = 5;


    //calling my entity function create rating
    const result = await reviews.createReview(agentID, review);

    expect(result).toBe(false);
  });
});