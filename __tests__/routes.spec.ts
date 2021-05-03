import supertest from "supertest";
import { newReport } from "../models/newReport";
import { superList } from "../models/adminStatus";
import { confirmedReport } from "../models/confirmedReport";
import { app, server } from "../index";
import { mockReport } from "../mocks/mocks";

describe("testing endpoints", function () {
  //beforeAll(() => {
  //});
  afterAll(() => {
    newReport.sequelize.close();
    superList.sequelize.close();
    confirmedReport.sequelize.close();
    server.close();
  });

  describe("Get /categories", () => {
    it("It should response the GET method", async () => {
      const response = await supertest(app).get("/categories");
      expect(response.statusCode).toBe(200);
    });
  });

  describe("Get /newReport", () => {
    it("It should response the GET method", async () => {
      const response = await supertest(app).get("/newReport");
      expect(response.statusCode).toBe(200);
    });
  });

  // gives addNewSuper.email can not be null
  describe("Post /addNewSuper", () => {
    it("It should response the POST method", async () => {
      const response = await supertest(app)
        .post("/addNewSuper")
        .send({ email: "testsuper@test.com" });
      expect(response.statusCode).toBe(201);
    });
  });

  describe("Post /newReport", () => {
    it("It should response the POST method", async () => {
      const response = await supertest(app).post("/newReport").send(mockReport);
      expect(response.statusCode).toBe(201);
    });
  });
  // actually gives "ERR_HTTP_HEADERS_SENT"
  describe("Post /deleteReport", () => {
    it("It should delete id posted to /newReport", async () => {
      const testPost = await newReport.findOne({
        where: {
          productName: "test name",
        },
      });
      const response = await supertest(app).post("/deleteReport").send({
        id: testPost.dataValues.id,
        emailAddress: "testsuper@test.com",
      });
      expect(response.statusCode).toBe(200);
    });
  });

  describe("Post /deleteSuper", () => {
    it("It should response the POST method", async () => {
      const response = await supertest(app)
        .post("/deleteSuper")
        .send({ email: "testsuper@test.com" });
      expect(response.statusCode).toBe(201);
    });
  });
});
