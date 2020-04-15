import endpoints from "@/api/endpoints";

const totalQuantityOfEndpoints = 2;

describe("Endpoints list helper", () => {
  it("gets all the endpoint URLs from the endpoints helper", () => {
    let counter = 0;
    for (let url in endpoints) {
      const value = endpoints[url];
      expect(value).toBeDefined();
      if (typeof value === "function") {
        const url = value("param");
        expect(url).toBeDefined();
      }
      counter++;
    }
    expect(counter).toBe(totalQuantityOfEndpoints);
  });
});
