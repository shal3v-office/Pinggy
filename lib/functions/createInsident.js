const insidentService = require("../../services/insidentService");
const contactGroupService = require("../../services/contactGroupServies");

const changeStream = async(change) => {
    try {
        const managars = [];
        const openInsidents = await insidentService.getOpenedInsidentBySiteId(change.fullDocument.site);
        console.log("open insident: ", openInsidents);
        if(change.fullDocument.firstOfSite && !openInsidents.length)
        {
            const groups = await contactGroupService.getGroupsBySiteId(change.fullDocument.site);
            for(const group of groups){
                Array.prototype.push.apply(managars, group.onCallContacts.map(a=>a._id));
            }
            const insident ={
                url: change.fullDocument.url,
                status: 'OPENED',
                monitorError: change.documentKey._id,
                site: change.fullDocument.site,
                managars: managars,
                statusDesc: "insident Created"
            };
            const newInsident = await insidentService.createOrUpdateInsident(insident,0);
            return newInsident;
        }
    } catch (err) {
        console.log(err);
    }
};

module.exports = changeStream;