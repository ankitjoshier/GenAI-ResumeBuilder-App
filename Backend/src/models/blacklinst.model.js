const mongoose = require("mongoose");

const blascklistTokenSchema = new mongoose.Schema(
  {
    token: {
      type: String,
      required: [true, "Token is required to be addes in blacklist."],
    },
  },
  {
    timestamps: true,
  },
);

const tokenBlacklistModel = mongoose.model(
  "blacklistTokens",
  blascklistTokenSchema,
);

module.exports = tokenBlacklistModel;
