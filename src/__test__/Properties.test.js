import { properties } from "../properties";
import { collection, getDocs, getFirestore } from "firebase/firestore";


jest.mock("firebase/firestore", () => ({
  getFirestore: jest.fn(),
  collection: jest.fn(),
  getDocs: jest.fn(),
}));

describe("Properties class", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getProperties", () => {

    //testing for property's view
    it("should retrieve and return properties data with views", async () => {
      const mockDocs = [
        { id: "1", data: () => ({ view: 0 }) },
        { id: "2", data: () => ({ view: 1 }) },
      ];
      const mockCollection = "mockCollection";
      const mockPropertiesDoc = { docs: mockDocs };
      collection.mockReturnValue(mockCollection);
      getDocs.mockResolvedValue(mockPropertiesDoc);

      const propertiesData = await properties.getProperties();

      expect(collection).toHaveBeenCalledWith(properties.db, "properties");
      expect(getDocs).toHaveBeenCalledWith(mockCollection);
      expect(propertiesData).toEqual([
        { id: "1", view: 0 },
        { id: "2", view: 1 },
      ]);
    });

    //testing for property's shortlisted
    it("should retrieve and return properties data", async () => {
      //number of users saved that property: 3
      const mockDocs = [
        { id: "1", data: () => ({ savedByUserID: ["User ID 1", "User ID 2", "User ID 3"] }) },
      ];
      const mockCollection = "mockCollection";
      const mockPropertiesDoc = { docs: mockDocs };
      collection.mockReturnValue(mockCollection);
      getDocs.mockResolvedValue(mockPropertiesDoc);

      const propertiesData = await properties.getProperties();

      expect(collection).toHaveBeenCalledWith(properties.db, "properties");
      expect(getDocs).toHaveBeenCalledWith(mockCollection);
      expect(propertiesData[0].savedByUserID.length).toEqual(3);
    });

    //testing if collection is empty and can be return an empty array
    it("should handle an empty collection", async () => {
      const mockCollection = "mockCollection";
      const mockPropertiesDoc = { docs: [] };
      collection.mockReturnValue(mockCollection);
      getDocs.mockResolvedValue(mockPropertiesDoc);

      const propertiesData = await properties.getProperties();

      expect(collection).toHaveBeenCalledWith(properties.db, "properties");
      expect(getDocs).toHaveBeenCalledWith(mockCollection);
      expect(propertiesData).toEqual([]);
    });

    //asserting error in getting properties data
    it("should throw an error if getDocs fails", async () => {
      const mockCollection = "mockCollection";
      const errorMessage = "Failed to fetch documents";
      collection.mockReturnValue(mockCollection);
      getDocs.mockRejectedValue(new Error(errorMessage));

      await expect(properties.getProperties()).rejects.toThrow(errorMessage);
    });
  });
});
