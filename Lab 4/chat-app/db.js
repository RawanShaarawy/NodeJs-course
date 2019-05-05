const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/chat-app", { useNewUrlParser: true, autoIndex: true, useCreateIndex: true });
