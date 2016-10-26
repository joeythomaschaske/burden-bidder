burdenBidderApp.service('UserService', function() {

    this.user;

    this.setUser = function (User) {
        this.user = User;
    };

    this.getUser = function() {
        return this.user;
    }
});