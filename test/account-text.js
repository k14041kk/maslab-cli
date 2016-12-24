var assert = require("assert");

var account = require("../lib/account");

describe("account", function() {
    it("getDomain", function() {
        assert.equal('jp.ac.aitech.maslab', account.getDomain());
    });
});
