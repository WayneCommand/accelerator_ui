import req from '../../plugins/requests';

export default {
    loginByPassword(obj){
        return req.post("/login", obj);
    },
    lookup(obj){
        return req.get("/login/lookup", obj);
    },
    refreshToken(obj){
        return req.post("/login/refreshToken",obj)
    },
    signUp(obj){
        return req.post("/login/signUp",obj)
    }
}