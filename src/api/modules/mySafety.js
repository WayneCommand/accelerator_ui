import req from '../../plugins/requests';

export default {
    mySafety(obj){
        return req.get("/user/my_safety", obj);
    },
    verifyPassword(obj) {
        return req.post("/user/verify_password", obj)
    },
    changePassword(obj) {
        return req.post("/user/change_password", obj)
    }

}