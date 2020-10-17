const MongoHelper = require("../helpers/mongo-helper");

let db;

class UpdateAccessTokenRepository {
    constructor(userModel) {
        this.userModel = userModel;
    }

    async update(userId, accessToken) {
        await this.userModel.updateOne(
            { _id: userId },
            { $set: { accessToken } }
        );
    }
}

describe("UpdateAccessToken Repository", () => {
    beforeAll(async () => {
        await MongoHelper.connect(process.env.MONGO_URL);
        db = await MongoHelper.getDb();
    });

    beforeEach(async () => {
        await db.collection("users").deleteMany();
    });

    afterAll(async () => {
        await MongoHelper.disconnect();
    });

    test("Should update the user with the given access token", async () => {
        const userModel = db.collection("users");
        const sut = new UpdateAccessTokenRepository(userModel);

        const fakeUser = await userModel.insertOne({
            name: "any_name",
            email: "valid_email@mail.com",
            age: 50,
            state: "any_state",
            password: "hashed_password",
        });

        await sut.update(fakeUser.ops[0]._id, "valid_token");

        const updatedFakeUser = await userModel.findOne(fakeUser.ops[0]._id);

        expect(updatedFakeUser.accessToken).toBe("valid_token");
    });
});
