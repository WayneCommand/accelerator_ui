import req from '../../plugins/requests';

export default {
    myInfo(obj){
        return req.get("/user/my_info", obj);
    },
    updateProfile(obj){
        return req.post("/user/update_profile", obj);
    }
}