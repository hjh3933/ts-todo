const express = require("express");
const { sequelize } = require("./models");
//view와 back의 url이 다르면 오류가 나기 때문에 cors가 꼭 필요함
const cors = require("cors");
const app = express();
const PORT = 8080;
//url주소와 server주소 분리
const serverPrefix = "/api-server";

// bodyparser설정 view는 react써서 이제 필요X
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

//routes설정
const indexRouter = require("./routes");
const userRouter = require("./routes/user");
app.use(serverPrefix, indexRouter);
app.use(`${serverPrefix}/user`, userRouter);

//db설정
sequelize
  .sync({ force: false })
  .then(() => {
    app.listen(PORT, () => {
      console.log("server is open");
    });
  })
  .catch((err) => {
    console.log(err);
  });
