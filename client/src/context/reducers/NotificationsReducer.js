export function notificationsReducer(state, action) {
    switch (action.type) {
        case "ADD_NOTIFICATION":
            return { ...state, notifications: {...state.notifications, notificationsData: [{...action.payload, index: state.notifications.notificationsData.length}]} };
        case "CLOSE_NOTIFICATION":
            return { ...state, notifications: {...state.notifications, notificationsData: [...state.notifications.notificationsData.filter((notificationData) => notificationData.index !== action.payload) ]} };
        default:
            return state;
    }
}