import supertest from "supertest";
import { newReport } from "../models/newReport";
import { superList } from "../models/adminStatus";
import { confirmedReport } from "../models/confirmedReport";
import { app, server } from "../index";
import { mockReport } from "../mocks/mocks";

const isEmptyJSONResponse = (response) => {
  if (!response) return false;
  if (Array.isArray(response.body)) {
    return response.body.length === 0 ? true : false;
  } else {
    return Object.keys(response.body).length === 0 ? true : false;
  }
};

describe("testing endpoints", function () {
  //beforeAll(() => {
  //});
  afterAll(async () => {
    newReport.sequelize.close();
    superList.sequelize.close();
    confirmedReport.sequelize.close();
    await server.close();
  });

  describe("Get /categories", () => {
    it("It should respond to GET and return a response object", async () => {
      const response = await supertest(app).get("/categories");
      expect(response.statusCode).toBe(200);
      expect(isEmptyJSONResponse(response)).toBe(false);
    });
  });

  describe("Get /newReport", () => {
    it("It should respond to GET and return a response object", async () => {
      const response = await supertest(app).get("/newReport");
      expect(response.statusCode).toBe(200);
      expect(isEmptyJSONResponse(response)).toBe(false);
    });
  });

  // gives addNewSuper.email can not be null
  describe("Post /addNewSuper", () => {
    it("It should respond to POST", async () => {
      const response = await supertest(app)
        .post("/addNewSuper")
        .send({ email: "testsuper@test.com" });
      expect(response.statusCode).toBe(201);
    });
  });

  describe("Get /superList", () => {
    it("It should retrieve previously added super", async () => {
      const response = await superList.findOne({
        where: { email: "testsuper@test.com" },
      });
      expect(isEmptyJSONResponse(response)).toBe(false);
    });
  });

  describe("Post /newReport", () => {
    it("It should respond to POST", async () => {
      const response = await supertest(app).post("/newReport").send(mockReport);
      expect(response.statusCode).toBe(201);
    });
  });

  describe("Post /deleteReport", () => {
    it("It should fetch previously added report and delete it", async () => {
      const fetchedPost = await newReport.findOne({
        where: {
          productName: "test name",
        },
      });

      const response = await supertest(app).post("/deleteReport").send({
        id: fetchedPost.dataValues.id,
        emailAddress: "testsuper@test.com",
      });

      expect(fetchedPost.dataValues.id).toBeTruthy();
      expect(response.statusCode).toBe(200);
    });
  });

  describe("Post /deleteSuper", () => {
    it("It should respond to POST and delete previously added super", async () => {
      const response = await supertest(app)
        .post("/deleteSuper")
        .send({ email: "testsuper@test.com" });

      const fetchSuper = await superList.findOne({
        where: { email: "testsuper@test.com" },
      });

      expect(isEmptyJSONResponse(fetchSuper)).toBe(true);
      expect(response.statusCode).toBe(201);
    });
  });
});
