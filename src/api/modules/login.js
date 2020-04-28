import req from '../../plugins/requests';

export default {
    loginByPassword(obj){
        return req.post("/login", obj);
    },
    lookup(obj){
        return req.get("/login/lookup", obj);
    }
}