"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var profile_details_service_service_1 = require("./profile-details-service.service");
describe('ProfileDetailsServiceService', function () {
    beforeEach(function () { return testing_1.TestBed.configureTestingModule({}); });
    it('should be created', function () {
        var service = testing_1.TestBed.get(profile_details_service_service_1.ProfileDetailsServiceService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=profile-details-service.service.spec.js.map