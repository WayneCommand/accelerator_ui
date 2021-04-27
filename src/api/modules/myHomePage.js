import req from "@/plugins/requests";

export default {
    myHomePage(obj){
        return req.get("/user/my_home_page", obj);
    }
}