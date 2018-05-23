const error = require('./error');

module.exports = class Validation{
    //check if docs holds data
    checkDocs(docs) {
        if(docs) {
            if(docs.length > 0) {
                return {
                    check: true,
                };
            } else {
                return {
                    check: false,
                    res: error.error
                };
            }
        } else {
            return {
                check: false,
                res: error.error
            };
        }
    }

    //check if doc holds data
    checkDoc(doc) {
        if(doc) {
            if(doc!=null) {
                return {
                    check: true,
                };
            } else {
                return {
                    check: false,
                    res: error.error
                };
            }
        } else {
            return {
                check: false,
                res: error.error
            };
        }
    }
    
    //check if params holds data
    checkParams(params) {
        if(params) {
            for(let i=0; i<params.length; i++) {
                if(params[i]==null) {
                    return {
                        check: false,
                        res: error.params
                    };
                }
            }
        }
        return {
            check: true
        };
    }

    //check if user holds data and role
    checkUser(user) {
        if(user) {
            if(user.role!=null) {
                return true;
            } else {
                return {error: error.userRole};
            }
        } else {
            return {error: error.userName};
        }
    }
} 