import casual from "casual";

const mocks = {
    UserNotifications: () => ({
        count: casual.integer(1,20)
    })
};

export default mocks;