import applyCaseMiddleware from "axios-case-converter";
import axios from "axios";

const options = {
  ignoreHeaders: true,
};

const client = applyCaseMiddleware(
  axios.create({
    // baseURL: "http://localhost:3001/api/v1",
    baseURL:
      "http://timer-external-alb-1532364907.ap-northeast-1.elb.amazonaws.com//api/v1",
  }),
  options,
);

export default client;
