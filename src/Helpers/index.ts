

export class Helpers {
    handleTrueFalse(reqParam) {
        if (typeof (reqParam) !== 'undefined') {
            if (reqParam == 'false' || reqParam == false || reqParam == 0) {
                reqParam = 0;
            }
            else if (reqParam == 'true' || reqParam == true || reqParam == 1) {
                reqParam = 1;
            }
        }
        return reqParam;
    }
}